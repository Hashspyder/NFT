import fs from "fs";
import {ethers} from "hardhat";
import {XarbSwapUpgradeable} from "../../types";

const SWAP_ID = 19;
const EDITIONS = 1;
const PRICE = 0.5;

async function exec() {
    const abi = JSON.parse(fs.readFileSync("./artifacts/contracts/upgradeable/XarbSwapUpgradeable.sol/XarbSwapUpgradeable.json").toString());
    const signers = await ethers.getSigners();
    const signer = signers[0];
    const contract = new ethers.Contract(process.env.SWAP_CONTRACT_ADDRESS as string, abi.abi, signer) as XarbSwapUpgradeable;
    const res = await contract.collect(SWAP_ID, EDITIONS, {value: BigInt(PRICE * 1e18)});
    const receipt = await res.wait(1);
    console.log(receipt.events);
}

exec().then(() => {});
