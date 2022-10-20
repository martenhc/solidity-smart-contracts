import { Contract, providers } from "ethers";
import { RequestMethod } from "../data/enum/request-method";
import { getCounterContract } from "./util/contract";

/***** RPC Funcs *****/

const hasAvailableAccounts = async () => {
  let accounts: Array<string>;

  accounts = await ethProvider.request({
    method: RequestMethod.eth_accounts,
  });

  if (!accounts || accounts.length === 0) {
    accounts = await ethProvider.request({
      method: RequestMethod.eth_requestAccounts,
    });
  }

  return !accounts || accounts.length === 0;
};

/***** Funcs *****/

const getContract = async () => {
  if (await hasAvailableAccounts()) {
    alert("No Metamask account available.");
    throw Error("No Metamask account available.");
  }

  return getCounterContract(ethProvider);
};

/***** Globals *****/

let ethProvider: providers.ExternalProvider;
let counterContract: Contract;
const counterButton = document.getElementsByClassName("count-button")[0];
const countContainer = document.getElementsByClassName("count-container")[0];

/**********/

// No need for removal right now
counterButton.addEventListener("click", async () => {
  // Await for transaction to be accepted.
  const transaction = await counterContract.count();
  // Await for transaction to be confirmed.
  await transaction.wait();
  countContainer.innerHTML = await counterContract.getCounter();
});

if (window.ethereum) {
  // From Ethers docs: A Provider abstracts a connection to the Ethereum blockchain,
  // for issuing queries and sending state changing transactions.
  // In our case, this is Metamask.
  ethProvider = window.ethereum;
} else {
  alert("Get Metamask");
  throw new Error("Get Metamask");
}

getContract().then(async (contract) => {
  counterContract = contract;
  countContainer.innerHTML = await counterContract.getCounter();
});
