// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

/**
 * @title XarbFee
 * @author Farbod Shams (farbodshams.2000@gmail.com)
 * @dev Adds support of marketplace commission of each trade of ERC721 / ERC1155 tokens;
 */

contract XarbFeeUpgradeable is OwnableUpgradeable {
    uint private fee;
    address payable private feeReceiver;

    event ContractFeeChanged(uint fee);
    event ContractFeeReceiverAddressChanged(address feeReceiver);

    function __XarbFee_init(uint _fee) internal onlyInitializing {
        __Ownable_init_unchained();
        __XarbFee_init_unchained(_fee);
    }

    function __XarbFee_init_unchained(uint _fee) internal onlyInitializing {
        fee = _fee;
        emit ContractFeeChanged(_fee);

        feeReceiver = payable(_msgSender());
        emit ContractFeeReceiverAddressChanged(_msgSender());
    }

    function getContractFee() public view returns(uint) {
        return fee;
    }

    function getContractFeeReceiverAddress() public view returns(address payable) {
        return feeReceiver;
    }

    function setContractFee(uint _fee) public onlyOwner {
        fee = _fee;
        emit ContractFeeChanged(_fee);
    }

    function setContractFeeReceiverAddress(address payable _feeReceiver) public onlyOwner {
        feeReceiver = _feeReceiver;
        emit ContractFeeReceiverAddressChanged(_feeReceiver);
    }

    // Reserved storage space in order to add more state variables later.
    uint256[48] private __gap;
}
