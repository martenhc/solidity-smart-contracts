import { providers, Contract } from "ethers";
import { RequestMethod } from "../data/enum/request-method";

const hasAvailableAccounts = async () => {
  let accounts: Array<string>;

  accounts = await eth.request({
    method: RequestMethod.eth_accounts,
  });

  if (!accounts || accounts.length === 0) {
    accounts = await eth.request({
      method: RequestMethod.eth_requestAccounts,
    });
  }

  return !accounts || accounts.length === 0;
};

const getContract = async () => {
  if (await hasAvailableAccounts()) {
    alert("No Metamask account available");
    return;
  }

  const helloWorldContract = new Contract(
    // Contract address created on deployment. It's always the same in test network.
    // TODO: replace hardcode
    "0x5fbdb2315678afecb367f032d93f642f64180aa3",
    [
      "function hello() public pure returns (string memory)", // Signature of the method to call
    ],
    new providers.Web3Provider(eth) // Using Metamask, so connect with that as a provider
  );

  document.body.innerHTML = await helloWorldContract.hello();
};

/*********/

let eth: providers.ExternalProvider;

if (window.ethereum) {
  eth = window.ethereum;
} else {
  alert("Get Metamask");
  throw new Error("Get Metamask");
}

getContract();
