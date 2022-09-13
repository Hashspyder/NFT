// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "../RoyaltyStruct.sol";

/**
 * @title Royalties
 * @author Farbod Shams (farbodshams.2000@gmail.com)
 * @dev Provides multiple royalties support to ERC721 and ERC1155 tokens.
 */

contract Royalties is Ownable {

    mapping(uint => RoyaltyStruct.Royalty[]) internal _royalties;
    uint private maxRoyalty;

    event MaxPossibleRoyaltyChanged(uint royalty);

    constructor(uint _maxRoyalty) {
        maxRoyalty = _maxRoyalty;
        emit MaxPossibleRoyaltyChanged(_maxRoyalty);
    }

    function setMaxPossibleRoyalty(uint royalty) public onlyOwner {
        maxRoyalty = royalty;
        emit MaxPossibleRoyaltyChanged(royalty);
    }

    function maxPossibleRoyalty() public view returns(uint) {
        return maxRoyalty;
    }

    function _setRoyalties(uint256 tokenId, address[] calldata addresses, uint[] calldata royalties) internal returns(RoyaltyStruct.Royalty[] memory) {
        require(addresses.length == royalties.length, "Royalties: addresses and royalties length mismatch");
        require(addresses.length < 10 && royalties.length < 10, "Royalties: Only 10 separate addresses could be entered as royalty receiver");
        uint Troyalties;
        for(uint i = 0; i < royalties.length; i++) {
            Troyalties += royalties[i];
        }

        require(Troyalties <= maxRoyalty, "Royalties: Entered royalties exceeds maximum amount of royalty");

        for(uint i = 0; i < addresses.length; i++) {
            _royalties[tokenId].push(RoyaltyStruct.Royalty(payable(addresses[i]), royalties[i]));
        }
        return _royalties[tokenId];
    }

    function getRoyalties(uint256 tokenId) public view returns(RoyaltyStruct.Royalty[] memory) {
        return _royalties[tokenId];
    }
}
