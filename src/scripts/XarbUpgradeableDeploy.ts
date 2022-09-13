/**
 * Deploy XarbMint and XarbSwap contracts
 * @author Farbod Shams <farbodshams.2000@gmail.com>
 */

import Deployer from "../services/Deployer";
import {XarbMintUpgradeable, XarbSwapUpgradeable} from "../types";

async function deploy() {
    const deployer = new Deployer("XarbMintUpgradeable");
    const xarbMint = (await deployer.deployUpgradable(900)) as XarbMintUpgradeable;

    deployer.setFactoryName("XarbSwapUpgradeable");
    const xarbSwap = (await deployer.deployUpgradable(xarbMint.address, 100)) as XarbSwapUpgradeable;
    return {mint: xarbMint.address, swap: xarbSwap.address, context: {xarbMint, xarbSwap}}
}

deploy().then(ctx => {
    console.log(ctx);
    process.exit(0)
}).catch(err => {
    console.error(err);
    process.exit(1);
})