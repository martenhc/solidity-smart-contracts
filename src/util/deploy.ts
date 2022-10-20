import { ethers } from "hardhat";
import { ContractName } from "../../data/enum/contract";

export const deployContractToPrivateTestNetwork = async (
  contractName: keyof typeof ContractName
) => {
  const contractFactory = await ethers.getContractFactory(contractName);
  const contract = await contractFactory.deploy();
  await contract.deployed();

  return contract;
};