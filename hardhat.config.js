require("@nomiclabs/hardhat-waffle");

const mnemonic = 'aqui va el mnemonic';
const privateKey = 'aqui va el privateKey';

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    rinkeby: {
      url: 'https://eth-rinkeby.alchemyapi.io/v2/VCZNtAMkQS4464sW2A2Pwrf0iuT_r1N6',
      accounts: [privateKey]
    },
    goerly: {
      url: 'https://eth-goerli.alchemyapi.io/v2/GfZs5eUYEk8tp2tX9kEdymBVbBvswEUU',
      accounts: [privateKey]
    },
    bscTestnet: {
      url: 'https://data-seed-prebsc-1-s1.binance.org:8545',
      chainId: 97,
      accounts: {
        mnemonic: mnemonic
      }
    }
  },
  paths: {
    sources: './src/ethereum-hardhat/contracts',
    tests: './src/ethereum-hardhat/test',
    cache: './src/ethereum-hardhat/cache',
    artifacts: './src/ethereum-hardhat/artifacts'
  }
};
