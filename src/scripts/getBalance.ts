import fs from "fs";
import {ethers} from "hardhat";
import {XarbSwapUpgradeable} from "../types";
import {BigNumber} from "ethers";
import {task} from "hardhat/config";

const TOKEN_ID = 5;
const EDITIONS = 1;
const PRICE = 0.5;

async function exec() {
    const signers = await ethers.getSigners();
    for(const signer of signers) {
        const balance = await signer.getBalance();
        const maticBalance = Number(balance.toBigInt() / BigInt("100000000000000")) / 1e4;
        console.log(`${signer.address}: ${maticBalance.toString()} MATIC`);
    }
}

exec().then(() => {});