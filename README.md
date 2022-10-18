# Smart contracts practice

### Local test chainblock network deployment

- The `local:node` command runs a local network that starts at block 0, with 20 pre-seeded accounts to enable local deployment. The test account #0 "pays" that deployment.

### Additional notes

- Hardhat's default sources folder for contracts is `./contracts`. This has been overriden in `hardhat.config.ts` to use `./contract` instead, since I rather have folder names in singular.
