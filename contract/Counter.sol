// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Counter {
    uint32 counter; // could be bigger (eg: uint256) if there's overflow danger

    // TODO Check "index" out
    event CounterIncrement(uint32 counter);

    // There is a state mutation that has to be processed,
    // hence a new block is created each time this is invoked.
    // Value mutations also require gas.
    function count() public {
        counter++;
        console.log("Counter is now: ", counter);
        emit CounterIncrement(counter);
    }

    // "view": Only reads blockchain data, hence no changes are expected to be processed. No gas is consumed.
    function getCounter() public view returns (uint32) {
        return counter;
    }
}
