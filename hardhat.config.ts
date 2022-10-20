// Adding imports to the config, so when executing "npx hardhat"
// it loads this, hence it loads these libraries.
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  paths: {
    sources: "./contract",
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
  },
};
