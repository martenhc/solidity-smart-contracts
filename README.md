# Smart contracts practice

### Local test chainblock network deployment

- The `local:node` command runs a local network that starts at block 0, with 20 pre-seeded accounts to enable local deployment. The test account #0 "pays" that deployment.

### Contracts

- HelloWorld
  This contract returns a value without doing making changes. It purely reads a state.
- Counter
  There is a transaction that has to be processed, hence a new block is created each time this is invoked. Value mutations also require gas.

### Additional notes

- Hardhat's default sources folder for contracts is `./contracts`. This has been overriden in `hardhat.config.ts` to use `./contract` instead, since I rather have folder names in singular.
