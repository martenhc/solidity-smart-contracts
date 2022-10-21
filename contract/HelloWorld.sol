// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HelloWorld {
    // "pure": Returns a value without reading it from the blockchain.
    function hello() public pure returns (string memory) {
        return "Hello, world";
    }
}
