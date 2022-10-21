// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Hero {
    enum Class {
        Mage,
        Healer,
        Barbarian
    }

    // addressToHeroes = {
    //   address1: [...],
    //   address2: [...]
    //   ...
    // }
    mapping(address => uint256[]) addressToHeroes;

    // "memory": memory that is created within a function vs "storage",
    // memory that is stored on the contract.
    // It gets the array into a memory location, so we get the full array
    // as opposed to only the pointer to the array.
    function getHeroes() public view returns (uint256[] memory) {
        return addressToHeroes[msg.sender];
    }

    // "payable": This function can accept money into it
    function createHero(Class classIndex) public payable {
        // Assert conditions. If not met, the contract will revert itself, sending the specified error.
        require(msg.value >= 0.05 ether, "More ether is needed");
        // TODO: create hero
    }
}
