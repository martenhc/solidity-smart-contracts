// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Hero {
    enum Class {
        Mage,
        Healer,
        Barbarian
    }

    enum Stat {
        Strength,
        Health,
        Dexterity,
        Intellect,
        Magic
    }

    // addressToHeroes = {
    //   address1: [...],
    //   address2: [...]
    //   ...
    // }
    mapping(address => uint32[]) addressToHeroes;

    // IMPORTANT: block difficulty and timestamp could be manipulated.
    // Check https://docs.chain.link/docs/vrf/v2/introduction/ for a potential prod-ready solution.
    function generateRandomNumber() public view virtual returns (uint256) {
        return
            uint256(
                // keccak256 generates out a random number (0 to 2^256)
                keccak256(abi.encodePacked(block.difficulty, block.timestamp))
            );
    }

    // "memory": memory that is created within a function vs "storage",
    // memory that is stored on the contract.
    // It gets the array into a memory location, so we get the full array
    // as opposed to only the pointer to the array.
    function getHeroes() public view returns (uint32[] memory) {
        return addressToHeroes[msg.sender];
    }

    // "payable": This function can accept money into it
    function createHero(Class classIndex) public payable {
        // Assert conditions. If not met, the contract will revert itself, sending the specified error.
        require(msg.value >= 0.05 ether, "More ether is needed");

        // TODO: Messure if using uint8 for stats makes is worth it having to do these casts
        uint8[] memory stats = new uint8[](5);
        stats[uint8(Stat.Strength)] = 2;
        stats[uint8(Stat.Health)] = 7;
        stats[uint8(Stat.Dexterity)] = 12;
        stats[uint8(Stat.Intellect)] = 17;
        stats[uint8(Stat.Magic)] = 22;

        uint8 statsArrayLength = uint8(stats.length);

        // A hero will include the data of its class and stats in a single value.
        // The class will be stored in the first 2 positions of the binary array,
        // since the values can only be: 0 (Mage), 1 (Healer), and 2 (Barbarian).

        // We will be using the rest of the binary positions to store their stats information.
        // As 18 is the highest possible value, we need 5 binary positions (2^4,2^3,...,2^0) for each stat.
        // This is why the above stats values start from 2 and have an increment of 5, and the
        // reason why we need a uint of 32 bits (to store 5 + 5 + 5 + 5 + 5 + 2 values).
        uint32 hero = uint32(classIndex);

        do {
            uint8 position = uint8(generateRandomNumber() % statsArrayLength);
            // Stat values can go from 1 to 18, the maximum decrementing by 1 for each subsequent stat.
            // value is uint32 because we will be shifting it.
            uint32 value = uint32(
                (generateRandomNumber() % (13 + statsArrayLength)) + 1
            );

            // Binarily shift X amount of values to the left to position our value.
            // For example, we got a decimal 3 (binary 00011) for Dexterity (position 12):
            //     value << stats[position]: Add 12 0 to the right of 00011, then we get: 00011000000000000
            // Next, bit-wise add (|=) this value to my hero.
            //     hero |= ...
            // For example, if we have selected the class Healer (index #1 (binary 01) in our class enum)
            // and this is our first stat to add, the binary value of "hero" after this operation will be:
            // 00011000000000001
            hero |= value << stats[position];

            statsArrayLength--;

            // Overwrite current position with last element of the array,
            // so the value can't be repeated without the need to remove a position from the array.
            // The next iteration will ignore the values above the iterated index.
            stats[position] = stats[statsArrayLength];
        } while (statsArrayLength > 0);

        // Binary example of a randomly generated (except for the class) hero at this point:
        //                   Magic = 16, Intellect = 9, Dexterity = 3, Health = 18, Strenght = 3, Class = Healer
        //                   10000       01001          00011          10010        00011         01
        // Position index:      22          17             12              7            2          0
        addressToHeroes[msg.sender].push(hero);
    }

    function getStat(uint32 hero, uint8 statPosition)
        public
        pure
        returns (uint32)
    {
        // To get a hero's particular stat, shift its binary value to the right X amount of times
        // (X's value being passed as statPosition):
        //    (hero >> statPosition)
        // And get the first 5 bits. That is:
        //    0x1f Hexadecimal to Decimal = 31 (1x16^1 + 15x16^0)
        //    31 Decimal to Binary = 11111 (2^4 + 2^3 + 2^2 + 2^1 + 2^0)
        // Binary '&' will return the exact same 5 bits in the "hero" variable's binary positions possed.
        //    ... & 0x1F
        return (hero >> statPosition) & 0x1F;
    }
}
