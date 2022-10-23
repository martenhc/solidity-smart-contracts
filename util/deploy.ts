import { ethers } from "hardhat";
import { ContractName, TestContractName } from "../data/enum/contract";

export const deployContractToPrivateTestNetwork = async (
  contractName: keyof typeof ContractName | keyof typeof TestContractName,
  ...args: Array<unknown>
) => {
  const contractFactory = await ethers.getContractFactory(contractName);
  const contract = await contractFactory.deploy(...args);
  await contract.deployed();

  return contract;
};
