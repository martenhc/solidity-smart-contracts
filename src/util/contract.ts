import { Contract, providers } from "ethers";
import Counter from "../../artifacts/contract/Counter.sol/Counter.json";
import HelloWorld from "../../artifacts/contract/HelloWorld.sol/HelloWorld.json";

export const getCounterContract = (provider: providers.ExternalProvider) =>
  new Contract(
    // Contract address created on deployment.
    process.env.COUNTER_CONTRACT_ADDRESS,
    // The Json has all of the contract interface data.
    Counter.abi, // abi = "application binary interface"
    // State-changing transactions need a signer.
    new providers.Web3Provider(provider).getSigner()
  );

export const getHelloWorldContract = (provider: providers.ExternalProvider) =>
  new Contract(
    process.env.HELLO_WORLD_CONTRACT_ADDRESS,
    // ["function hello() public pure returns (string memory)"], <== This is a manual way to set this up.
    HelloWorld.abi, // <== This is much easier and is automatically updated after deploying a contract.
    new providers.Web3Provider(provider)
  );
