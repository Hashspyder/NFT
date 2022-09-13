// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "../upgradeable/XarbMintUpgradeable.sol";

/**
 * @title XarbMintUpgradeableTestV2
 * @author Farbod Shams (farbodshams.2000@gmail.com)
 * @dev A test upgrade which adds a method to XarbMint contract for local testing
 */

contract XarbMintUpgradeableTestV2 is XarbMintUpgradeable {
    function getMintVersion() public pure returns(uint) {
        return 2;
    }
}
