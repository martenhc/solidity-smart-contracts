// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../Hero.sol";

contract TestHero is Hero {
    uint256 random;

    function generateRandomNumber() public view override returns (uint256) {
        return random;
    }

    function setRandomNumber(uint256 _random) public {
        random = _random;
    }
}
