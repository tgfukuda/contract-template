// copied from https://github.com/foundry-rs/hardhat-foundry-template/blob/master/hardhat.config.ts
import fs from "fs";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-preprocessor";
import "@nomiclabs/hardhat-ethers";
import { HardhatUserConfig, task } from "hardhat/config";
import * as path from 'path';
import { config as dotenvConf } from "dotenv";

function getRemappings() {
  return fs
    .readFileSync("remappings.txt", "utf8")
    .split("\n")
    .filter(Boolean)
    .map((line) => line.trim().split("="));
}

import { HardhatRuntimeEnvironment } from "hardhat/types";

task(
  'signer',
  "show signer status gotten from environment",
  async (arg, hre, runSup) => {
    dotenvConf({ path: path.join(__dirname, ".env") });
    const signers = await hre.ethers.getSigners();
    if (signers.length) {
      for (const signer of signers) {
        console.log(`ADDRESS: ${signer.address}`);
        console.log(`RPC ENDPOINT: ${(signer.provider as InstanceType<typeof hre.ethers.providers.JsonRpcProvider>)['connection'].url}`)
      }
    } else {
      console.error(`no signer loaded`);
    }
  }
);

fs.access('./typechain-types', fs.constants.F_OK, (err) => {
  if (!err) {
    // if any task depending on 'typechain-types', assign it in this braces.
  }
});

const DEFAULT_MNEMONIC = 'test test test test test test test test test test test junk';

dotenvConf({ path: path.join(__dirname, ".env") });
const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    mainnet: {
      url: `https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      accounts: {
        mnemonic: process.env.MNEMONIC || DEFAULT_MNEMONIC,
        path: "m/44'/60'/0'/0",
        initialIndex: 0,
        count: 20,
      },
    },
    ropsten: {
      url: `https://ropsten.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      accounts: {
        mnemonic: process.env.MNEMONIC || DEFAULT_MNEMONIC,
        path: "m/44'/60'/0'/0",
        initialIndex: 0,
        count: 20,
      },
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      accounts: {
        mnemonic: process.env.MNEMONIC || DEFAULT_MNEMONIC,
        path: "m/44'/60'/0'/0",
        initialIndex: 0,
        count: 20,
      },
    },
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      accounts: {
        mnemonic: process.env.MNEMONIC || DEFAULT_MNEMONIC,
        path: "m/44'/60'/0'/0",
        initialIndex: 0,
        count: 20,
      },
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      accounts: {
        mnemonic: process.env.MNEMONIC || DEFAULT_MNEMONIC,
        path: "m/44'/60'/0'/0",
        initialIndex: 0,
        count: 20,
      },
    },
    localhost: {
      local: {
        url: process.env['ETH_RPC_URL'] || "http://127.0.0.1:8545",
        accounts: [
          process.env['RAW_PRIVATE_KEY'] || "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", // 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 popular development key
        ],
      }
    },
    hardhat: {
      initialDate: '0',
      allowUnlimitedContractSize: true,
      accounts: {
        mnemonic: process.env.MNEMONIC || DEFAULT_MNEMONIC,
        path: "m/44'/60'/0'/0",
        initialIndex: 0,
        count: 20,
      },
    },
  },
  gasReporter: {
    enabled: !!process.env.REPORT_GAS,
    outputFile: process.env.REPORT_GAS_FILE ? "./gas_report.md" : null,
    noColors: process.env.REPORT_GAS_FILE ? true : false
  },
  etherscan: {
    apiKey: {
      goerli: `${process.env.ETHERSCAN_API_KEY}`,
      sepolia: `${process.env.ETHERSCAN_API_KEY}`,
      mainnet: `${process.env.ETHERSCAN_API_KEY}`
    },
  },
  paths: {
    sources: "./src", // Use ./src rather than ./contracts as Hardhat expects
    cache: "./cache_hardhat", // Use a different cache for Hardhat than Foundry
  },
  // This fully resolves paths for imports in the ./lib directory for Hardhat
  preprocess: {
    eachLine: (hre: HardhatRuntimeEnvironment) => ({
      transform: (line: string) => {
        if (line.match(/^\s*import /i)) {
          getRemappings().forEach(([find, replace]) => {
            if (line.match(find)) {
              line = line.replace(find, replace);
            }
          });
        }
        return line;
      },
    }),
  },
} as HardhatUserConfig;

export default config;
