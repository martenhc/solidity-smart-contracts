import "@nomiclabs/hardhat-ethers";
import { fail } from "assert";
import { expect } from "chai";
import { Contract } from "ethers";
import { ethers } from "hardhat";
import { TestContractName } from "../data/enum/contract";
import { HeroClass, HeroStat, HeroStatBinaryPosition } from "../data/enum/hero";
import { deployContractToPrivateTestNetwork } from "../util/deploy";

describe("Hero", () => {
  let heroContract: Contract;

  before(async () => {
    heroContract = await deployContractToPrivateTestNetwork(
      TestContractName.TestHero
    );
  });

  it("should not create a hero if there is not enough ether", async () => {
    try {
      await heroContract.createHero(
        // Hero enum index
        0,
        // Additional medatada
        {
          value: ethers.utils.parseEther("0.049"),
        }
      );

      fail();
    } catch (error) {
      expect(error.message.includes("More ether is needed")).to.equal(true);
    }
  });

  it("should get a zero hero array", async () => {
    expect(await heroContract.getHeroes()).to.deep.equal([]);
  });

  it("should create a hero with the right stats", async () => {
    await heroContract.setRandomNumber(85);

    await heroContract.createHero(HeroClass.Mage, {
      value: ethers.utils.parseEther("0.05"),
    });

    const firstHero = (await heroContract.getHeroes())[0];

    // 1st iteration:
    // iterable stats = [ Strength, Health, Dexterity, Intellect, Magic ]
    // position = 85 % 5 = 0; (Strength)
    // value = (85 % 18) + 1 = 14;
    expect(
      await heroContract.getStat(firstHero, HeroStatBinaryPosition.Strength)
    ).to.equal(14);

    // 2nd iteration:
    // iterable stats = [ Magic, Health, Dexterity, Intellect ]
    // position = 85 % 4 = 1; (Health)
    // value = (85 % 17) + 1 = 1
    expect(
      await heroContract.getStat(firstHero, HeroStatBinaryPosition.Health)
    ).to.equal(1);

    // 3rd iteration:
    // iterable stats = [ Magic, Intellect, Dexterity ]
    // position = 85 % 3 = 1; (Intellect)
    // value = (85 % 16) + 1 = 6
    expect(
      await heroContract.getStat(firstHero, HeroStatBinaryPosition.Intellect)
    ).to.equal(6);

    // 4th iteration:
    // iterable stats = [ Magic, Dexterity ]
    // position = 85 % 2 = 1; (Dexterity)
    // value = (85 % 15) + 1 = 11
    expect(
      await heroContract.getStat(firstHero, HeroStatBinaryPosition.Dexterity)
    ).to.equal(11);

    // Last iteration:
    // iterable stats = [ Magic ]
    // position = 85 % 1 = 0; (Magic)
    // value = (85 % 14) + 1 = 2
    expect(
      await heroContract.getStat(firstHero, HeroStatBinaryPosition.Magic)
    ).to.equal(2);
  });
});
