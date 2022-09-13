import fs from "fs";
import {ethers} from "hardhat";
import {XarbMintUpgradeable} from "../../types";

async function exec() {
    const abi = JSON.parse(fs.readFileSync("./artifacts/contracts/upgradeable/XarbMintUpgradeable.sol/XarbMintUpgradeable.json").toString());
    const signers = await ethers.getSigners();
    const signer = signers[1];
    const contract = new ethers.Contract(process.env.MINT_CONTRACT_ADDRESS as string, abi.abi, signer) as XarbMintUpgradeable;
    const res = await contract.mint(6, "ipfs://QmdTvPxYR3heYfzzyQN13ZJ44AhEvXZuBNGwebhwULFuXS", [signer.address], [200]);
    const receipt = await res.wait(1);
    console.log(receipt.events);
}

exec().then(() => {});
