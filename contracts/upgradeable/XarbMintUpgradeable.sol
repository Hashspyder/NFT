// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
import "./RoyaltiesUpgradeable.sol";

/// @custom:security-contact security@xarb.io

/**
 * @title XarbSwap
 * @author Farbod Shams (farbodshams.2000@gmail.com)
 * @dev An Openzeppelin (https://openzeppelin.com) implementation of ERC1155
 * contract with some more features including metadata and royalty support.
 */

contract XarbMintUpgradeable is Initializable, ERC1155Upgradeable, OwnableUpgradeable, PausableUpgradeable, RoyaltiesUpgradeable {
    using CountersUpgradeable for CountersUpgradeable.Counter;

    CountersUpgradeable.Counter private _tokenIdCounter;
    mapping(uint => string) private _metadata;
    mapping(uint => address) private _creators;

    event Minted(address indexed creator, uint indexed tokenId, uint256 amount, string metadata, RoyaltyStruct.Royalty[] royalties);
    event BatchMinted(address indexed creator, uint[] tokenIds, uint256[] amounts, string[] metadata, RoyaltyStruct.Royalty[][] royalties);

    modifier onlyExistedToken(uint256 id){
        require(bytes(_metadata[id]).length > 0, "XarbMint: This token is not existed");
        _;
    }

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(uint _maxRoyaltiesAmount) initializer public {
        __ERC1155_init("");
        __Ownable_init();
        __Pausable_init();
        __Royalties_init(_maxRoyaltiesAmount);
    }

    function setURI(string memory baseUri) public onlyOwner {
        _setURI(baseUri);
    }

    function token(uint256 tokenId) external view onlyExistedToken(tokenId) returns (string memory) {
        return _metadata[tokenId];
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function mint(uint256 amount, string memory metadata, address[] calldata royaltyAddresses, uint[] calldata royalties) public {
        uint _current = _tokenIdCounter.current();
        _mint(_msgSender(), _current, amount, "");
        _metadata[_current] = metadata;
        RoyaltyStruct.Royalty[] memory structRoyalties = _setRoyalties(_current, royaltyAddresses, royalties);
        emit Minted(_msgSender(), _current, amount, metadata, structRoyalties);
        _creators[_current] = _msgSender();
        _tokenIdCounter.increment();
    }

    function creatorOf(uint tokenId) public view returns (address){
        require(_creators[tokenId] != address(0), "XarbMint: This token is not existed");
        return _creators[tokenId];
    }

    function mintBatch(uint256[] memory amounts, string[] memory metadata, address[][] calldata royaltyAddresses, uint[][] calldata royalties) public {
        require(amounts.length == metadata.length && amounts.length == royaltyAddresses.length && amounts.length == royalties.length,
            "XarbMint: amounts, metadata, royaltyAddresses and royalties length mismatch");
        uint256[] memory ids = new uint[](amounts.length);
        RoyaltyStruct.Royalty[][] memory structRoyalties = new RoyaltyStruct.Royalty[][](amounts.length);
        for (uint i = 0; i < amounts.length; i++) {
            ids[i] = _tokenIdCounter.current();
            _tokenIdCounter.increment();
        }
        _mintBatch(_msgSender(), ids, amounts, "");
        for (uint i = 0; i < ids.length; i++) {
            _metadata[ids[i]] = metadata[i];
            _creators[ids[i]] = _msgSender();
            structRoyalties[i] = _setRoyalties(ids[i], royaltyAddresses[i], royalties[i]);
        }
        emit BatchMinted(_msgSender(), ids, amounts, metadata, structRoyalties);
    }

    function burn(
        address account,
        uint256 id,
        uint256 value
    ) public virtual {
        require(
            account == _msgSender() || _msgSender() == owner() || isApprovedForAll(account, _msgSender()),
            "ERC1155: caller is not token owner nor approved"
        );

        _burn(account, id, value);
    }

    function burnBatch(
        address account,
        uint256[] memory ids,
        uint256[] memory values
    ) public virtual {
        require(
            account == _msgSender() || _msgSender() == owner() || isApprovedForAll(account, _msgSender()),
            "ERC1155: caller is not token owner nor approved"
        );

        _burnBatch(account, ids, values);
    }

    function _beforeTokenTransfer(address operator, address from, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
    internal
    whenNotPaused
    override
    {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }

    // Reserved storage space in order to add more state variables later.
    uint256[47] private __gap;
}