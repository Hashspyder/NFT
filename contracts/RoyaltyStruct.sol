// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

/**
 * @title RoyaltyStruct
 * @author Farbod Shams (farbodshams.2000@gmail.com)
 * @dev Struct for royalties. Added a separate contract for using it in more than one contract (Both XarbMint and XarbSwap)
 */

library RoyaltyStruct {
    struct Royalty {
        address payable receiver;
        uint amount;
    }
}
