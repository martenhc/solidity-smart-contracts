import "@nomiclabs/hardhat-ethers";
import { fail } from "assert";
import { expect } from "chai";
import { Contract } from "ethers";
import { ethers } from "hardhat";
import { ContractName } from "../data/enum/contract";
import { deployContractToPrivateTestNetwork } from "../util/deploy";

describe("Hero", () => {
  let heroContract: Contract;

  before(async () => {
    heroContract = await deployContractToPrivateTestNetwork(ContractName.Hero);
  });

  it("should fail at creating hero because of payment", async () => {
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
});
