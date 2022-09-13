import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "@openzeppelin/hardhat-upgrades";
import "@nomiclabs/hardhat-etherscan";
import type { HardhatUserConfig } from "hardhat/config";
import dotenv from "dotenv";

dotenv.config();

console.log((process.env.WALLET_PRIVATE_KEYS as string).split(","));

const config: HardhatUserConfig = {
    solidity: "0.8.4",
    typechain: {
        outDir: "./src/types",
    },
    paths: {
        tests: "./src/tests",
    },
    networks: {
        localhost: {
            url: "http://0.0.0.0:8545",
            accounts: "remote",
        },
        mumbai: {
            // url: "https://rpc-mumbai.matic.today/",
            url: "https://matic-mumbai.chainstacklabs.com/",
            // url: "https://rpc-mumbai.maticvigil.com/",
            accounts: (process.env.WALLET_PRIVATE_KEYS as string).split(","),
            // gasPrice: 20e9,
            // timeout: 3600000,
            // chainId: 80001
        },
        polygon: {
            url: "https://polygon-rpc.com",
            accounts: (process.env.WALLET_PRIVATE_KEYS as string).split(","),
        }
    },
    etherscan: {
        apiKey: {
            polygonMumbai: process.env.ETHERSCAN_API_KEY as string,
            polygon: process.env.ETHERSCAN_API_KEY as string,
        }
    }
};

export default config;
