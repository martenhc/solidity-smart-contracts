import "@nomiclabs/hardhat-ethers";
import { Contract } from "ethers";
import { ContractName } from "../data/enum/contract";
import { deployContractToPrivateTestNetwork } from "../util/deploy";

const deploy = async () => {
  return await deployContractToPrivateTestNetwork(ContractName.Counter);
};

const count = async (contract: Contract) => {
  await contract.count();
  console.log("Counter", await contract.getCounter());
};

deploy().then(count);
