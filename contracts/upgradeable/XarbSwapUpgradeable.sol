// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "./XarbMintUpgradeable.sol";
import "./XarbFeeUpgradeable.sol";
import "./ListableUpgradeable.sol";

/// @custom:security-contact security@xarb.io

/**
 * @title XarbSwap
 * @author Farbod Shams (farbodshams.2000@gmail.com)
 * @dev Swap contract to handle trade of a specific ERC721 / ERC1155 contract tokens.
 */

contract XarbSwapUpgradeable is Initializable, OwnableUpgradeable, PausableUpgradeable, XarbFeeUpgradeable, ListableUpgradeable {
    XarbMintUpgradeable private mintContract;
    address private _mintAddress;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(address mintAddress, uint commission) initializer public {
        __Ownable_init();
        __Pausable_init();
        __XarbFee_init(commission);
        __Listable_init();

        changeMintAddress(mintAddress);
    }

    function changeMintAddress(address mintAddress) public onlyOwner {
        _mintAddress = mintAddress;
        mintContract = XarbMintUpgradeable(mintAddress);
    }

    function getMintAddress() public view returns(address) {
        return _mintAddress;
    }

    function list(address tokenOwner, uint tokenId, uint amount, uint price) public whenNotPaused {
        require(price > 0 && amount > 0, "XarbSwap: Both price and swap must be greater than 0");
        require(mintContract.isApprovedForAll(tokenOwner, address(this)),
            "XarbSwap: Contract is not approved for managing tokens owned by this address");

        bool isApproval = mintContract.isApprovedForAll(tokenOwner, _msgSender());
        require(isApproval || tokenOwner == _msgSender(), "XarbSwap: caller is not token owner nor approved");

        uint tokenBalance = mintContract.balanceOf(tokenOwner, tokenId);
        require((tokenBalance - _getActiveListings(tokenOwner, tokenId)) >= amount, "XarbSwap: List amount exceeds not listed balance");
        _list(_msgSender(), tokenOwner, tokenId, amount, price);
    }

    function cancelListing(uint swapId) public whenNotPaused {
        Swap memory swap = getSwap(swapId);
        require(swap.state == SwapState.OPEN, "Listable: Selected listing is not existed, already canceled or finished");

        bool isApproval = mintContract.isApprovedForAll(swap.tokenOwner, _msgSender());
        require(isApproval || swap.tokenOwner == _msgSender() || _msgSender() == owner(), "Listable: caller is not token owner nor approved");
        _cancelListing(swapId);
    }

    function collect(uint swapId, uint editions) payable public whenNotPaused {
        Swap memory swap = getSwap(swapId);
        require(swap.state == SwapState.OPEN, "XarbSwap: Selected listing is not existed, already canceled or finished");
        require(swap.amountLeft >= editions, "XarbSwap: Collect amount exceeds amount left");
        require(swap.tokenOwner != _msgSender(), "XarbSwap: Cannot collect from a swap which is created by the same address as collector");
        require(msg.value >= swap.price * editions, "XarbSwap: Insufficient credit");

        RoyaltyStruct.Royalty[] memory royalties = mintContract.getRoyalties(swap.tokenId);

        _transferAmounts(swap, editions, royalties, getContractFeeReceiverAddress(), getContractFee());

        mintContract.safeTransferFrom(swap.tokenOwner, _msgSender(), swap.tokenId, editions, "");
        _collectListing(swapId, editions, _msgSender());
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    // Reserved storage space in order to add more state variables later.
    uint256[48] private __gap;
}
