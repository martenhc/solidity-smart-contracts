import "@nomiclabs/hardhat-ethers";
import { Contract } from "ethers";
import { ContractName } from "../data/enum/contract";
import { deployContractToPrivateTestNetwork } from "../util/deploy";

const deploy = async () => {
  return await deployContractToPrivateTestNetwork(ContractName.HelloWorld);
};

const sayHello = async (contract: Contract) => {
  console.log(`Say Hello:, ${await contract.hello()}`);
};

deploy().then((contract) => sayHello(contract));
