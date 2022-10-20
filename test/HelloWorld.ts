import "@nomiclabs/hardhat-ethers";
import { expect } from "chai";
import { ContractName } from "../src/data/enum/contract";
import { deployContractToPrivateTestNetwork } from "../src/util/deploy";

describe("hellor world", () => {
  it("should say hi", async () => {
    const contract = await deployContractToPrivateTestNetwork(
      ContractName.HelloWorld
    );

    expect(await contract.hello()).to.equal("Hello, world");
  });
});
