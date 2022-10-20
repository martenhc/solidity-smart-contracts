## Smart contracts practice

This is a test project made while following ThePrimeagen's Web3 Smart Contracts course in [Frontendmasters](https://frontendmasters.com/courses/web3-smart-contracts/).

I have taken the time to add some of my coding standars (though none of this is prod ready!), as well as explaining some key concepts in this README, and sometimes as comments in the code to help (me) understand what's happening at every step of the process.

### Requirements:

- Install [Metamask](https://metamask.io/) and create an account.

### Local test chainblock network deployment

- The `local:node` command runs a local network that starts at block 0, with 20 pre-seeded accounts to enable local deployment. The test account #0 "pays" that deployment.

### Local .env file

Webpack is configured to read values from the .env file and make them available as environment variables.
Make sure that you create a .env file with the values defined in webpack.config.js, in the webpack.DefinePlugin consctuctor.
This file is not pushed because the values of the contract addresses will change. Get them from your local network's logs after deploying your contracts.

### Hardhat configuration (hardhat.config.ts)

- Hardhat's default sources folder for contracts is `./contracts`. This has been overriden in `hardhat.config.ts` to use `./contract` instead, since I rather have folder names in singular.

- Metamask assumes that any local networks' chainId is 1337. Hardhat uses another id, that is why we are setting this up in the config.
  Read more bout it [here](https://hardhat.org/hardhat-network/docs/metamask-issue).

### "NONCE too high" issue.

To fix this issue, reset your account in Metamask. [Like so](https://miro.medium.com/max/596/1*3mQe7MwIJFugo7E7h_F1kg.gif).

---

### Notes on contracts

- HelloWorld
  - hello(): This contract's only _pure_ method returns a hardcoded value without reading it from the blockchain.
- Counter
  - count(): There is a state mutation that has to be processed, hence a new block is created each time this is invoked. Value mutations also require gas.
  - getCounter(): This is a _view_ function, hence no changes are expected to be processed. No gas is consumed.

#### Pure vs View functions

- Pure functions not only indicate that no change is being done in the blockchain, but also that no value from the blockchain is being read.
- View functions don't change values, but can read a value from the blockchain.
