import "@nomiclabs/hardhat-ethers";
import { expect } from "chai";
import { ContractName } from "../data/enum/contract";
import { deployContractToPrivateTestNetwork } from "../util/deploy";

describe("hellor world", () => {
  it("should say hi", async () => {
    const contract = await deployContractToPrivateTestNetwork(
      ContractName.HelloWorld
    );

    expect(await contract.hello()).to.equal("Hello, world");
  });
});
