// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "../RoyaltyStruct.sol";

/**
 * @title Listable
 * @author Farbod Shams (farbodshams.2000@gmail.com)
 * @dev Provides list, cancel listing and collect functionalities to swap contract.
 */

contract Listable is Context {
    using Counters for Counters.Counter;

    enum SwapState {CANCELED, OPEN, SOLD_OUT}
    struct Swap {
        address creator;
        address tokenOwner;
        uint tokenId;
        uint amount;
        uint amountLeft;
        uint price;
        SwapState state;
    }

    mapping(uint => Swap) private swaps;
    mapping(uint => mapping(address => uint)) activeListings;
    Counters.Counter private _swapIdCounter;

    event Listed(uint indexed id , address creator, address indexed tokenOwner, uint indexed tokenId, uint amount, uint price);
    event ListingCanceled(uint indexed id);
    event Collected(uint indexed id, uint indexed editions, address indexed buyer);

    function getSwap(uint swapId) public view returns (Swap memory) {
        require(swaps[swapId].amount > 0, "Listable: This swap is not existed");
        return swaps[swapId];
    }

    function _getActiveListings(address _address, uint tokenId) internal view returns(uint) {
        return activeListings[tokenId][_address];
    }

    function _list(address _creator, address _tokenOwner, uint _tokenId, uint _amount, uint _price) internal {
        Swap memory swap = Swap(_creator, _tokenOwner, _tokenId, _amount, _amount, _price, SwapState.OPEN);
        swaps[_swapIdCounter.current()] = swap;
        activeListings[_tokenId][_tokenOwner] += _amount;
        emit Listed(_swapIdCounter.current(), _creator, _tokenOwner, _tokenId, _amount, _price);
        _swapIdCounter.increment();
    }

    function _transferAmounts(Swap memory swap, uint editions, RoyaltyStruct.Royalty[] memory royalties, address payable contractFeeReceiverAddress, uint contractFee) internal {
        uint totalSentAmount = 0;

        // commission
        uint sendAmount = contractFee * swap.price * editions / (100 * 10);
        Address.sendValue(contractFeeReceiverAddress, sendAmount);
        totalSentAmount += sendAmount;

        // supply royalties
        for (uint i = 0; i < royalties.length; i++) {
            sendAmount = royalties[i].amount * swap.price * editions / (100 * 10);
            Address.sendValue(royalties[i].receiver, sendAmount);
            totalSentAmount += sendAmount;
        }

        // transfer money to token owner
        sendAmount = (swap.price * editions) - totalSentAmount;
        Address.sendValue(payable(swap.tokenOwner), sendAmount);
        totalSentAmount += sendAmount;

        //take additional money back to sender
        Address.sendValue(payable(_msgSender()), msg.value - totalSentAmount);
    }

    function _collectListing(uint swapId, uint editions, address buyer) internal {
        Swap memory swap = getSwap(swapId);
        swap.amountLeft -= editions;
        activeListings[swap.tokenId][swap.tokenOwner] -= swap.amountLeft;
        if (swap.amountLeft == 0) {
            swap.state = SwapState.SOLD_OUT;
        }
        swaps[swapId] = swap;
        emit Collected(swapId, editions, buyer);
    }

    function _cancelListing(uint swapId) internal {
        Swap memory swap = getSwap(swapId);
        swap.state = SwapState.CANCELED;
        activeListings[swap.tokenId][swap.tokenOwner] -= swap.amountLeft;
        swaps[swapId] = swap;
        emit ListingCanceled(swapId);
    }
}
