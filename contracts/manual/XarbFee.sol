// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title XarbFee
 * @author Farbod Shams (farbodshams.2000@gmail.com)
 * @dev Adds support of marketplace commission of each trade of ERC721 / ERC1155 tokens;
 */

contract XarbFee is Ownable {
    uint private fee;
    address payable private feeReceiver;

    event ContractFeeChanged(uint fee);
    event ContractFeeReceiverAddressChanged(address feeReceiver);

    constructor(uint _fee) {
        fee = _fee;
        feeReceiver = payable(_msgSender());

        emit ContractFeeChanged(_fee);
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
}
