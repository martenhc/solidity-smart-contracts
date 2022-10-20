// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Counter {
    uint32 counter; // could be uint256 if there's overflow danger

    // Check "index" out
    event CounterIncrement(uint32 counter);

    function count() public {
        counter++;
        console.log("Counter is now: ", counter);
        emit CounterIncrement(counter);
    }

    function getCounter() public view returns (uint32) {
        return counter;
    }
}
