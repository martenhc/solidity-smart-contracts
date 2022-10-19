## Smart contracts practice

This is a test project made while following ThePrimeagen's Web3 Smart Contracts course in [Frontendmasters](https://frontendmasters.com/courses/web3-smart-contracts/).

I have taken the time to add some of my coding standars, as well as explaining some key concepts in this README, and sometimes as comments in the code to help (me) understand what's happening at every step of the process.

### Local test chainblock network deployment

- The `local:node` command runs a local network that starts at block 0, with 20 pre-seeded accounts to enable local deployment. The test account #0 "pays" that deployment.

### Contracts

- HelloWorld
  - hello(): This contract's only _pure_ method returns a hardcoded value without reading it from the blockchain.
- Counter
  - count(): There is a state mutation that has to be processed, hence a new block is created each time this is invoked. Value mutations also require gas.
  - getCounter(): This is a _view_ function, hence no changes are expected to be processed. No gas is consumed.

#### Pure vs View functions

- Pure functions not only indicate that no change is being done in the blockchain, but also that no value from the blockchain is being read.
- View functions don't change values, but can read a value from the blockchain.

### Additional notes

- Hardhat's default sources folder for contracts is `./contracts`. This has been overriden in `hardhat.config.ts` to use `./contract` instead, since I rather have folder names in singular.
