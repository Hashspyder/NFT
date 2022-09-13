// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "../upgradeable/XarbSwapUpgradeable.sol";

/**
 * @title XarbSwapUpgradeableTestV2
 * @author Farbod Shams (farbodshams.2000@gmail.com)
 * @dev A test upgrade which adds a method to XarbSwap contract for local testing
 */

contract XarbSwapUpgradeableTestV2 is XarbSwapUpgradeable{
    function getSwapVersion() public pure returns(uint) {
        return 2;
    }
}
