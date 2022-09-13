import fs from "fs";
import {ethers} from "hardhat";
import {XarbSwapUpgradeable} from "../../types";

const TOKEN_ID = 113;
const EDITIONS = 1;
const PRICE = 0.1;

async function exec() {
    const abi = JSON.parse(fs.readFileSync("./artifacts/contracts/upgradeable/XarbSwapUpgradeable.sol/XarbSwapUpgradeable.json").toString());
    const signers = await ethers.getSigners();
    const signer = signers[1];
    const contract = new ethers.Contract(process.env.SWAP_CONTRACT_ADDRESS as string, abi.abi, signer) as XarbSwapUpgradeable;
    const res = await contract.list(signer.address, TOKEN_ID, EDITIONS, BigInt((PRICE * 1e5).toString() + "0".repeat(13)));
    const receipt = await res.wait(1);
    console.log(receipt.events);
}

exec().then(() => {});
