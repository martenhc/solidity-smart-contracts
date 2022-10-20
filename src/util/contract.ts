import { Contract, providers } from "ethers";

export const getCounterContract = (provider: providers.ExternalProvider) =>
  new Contract(
    // Contract address created on deployment.
    process.env.COUNTER_CONTRACT_ADDRESS,
    // List of signature of the available methods, or methos that will be called
    [
      "function count() public",
      "function getCounter() public view returns (uint32)",
    ],
    // State-changing transactions need a signer.
    new providers.Web3Provider(provider).getSigner()
  );

export const getHelloWorldContract = (provider: providers.ExternalProvider) =>
  new Contract(
    process.env.HELLO_WORLD_CONTRACT_ADDRESS,
    ["function hello() public pure returns (string memory)"],
    new providers.Web3Provider(provider)
  );
