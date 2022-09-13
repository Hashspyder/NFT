/**
 * Deploy XarbMint and XarbSwap contracts
 * @author Farbod Shams <farbodshams.2000@gmail.com>
 */

import Deployer from "../services/Deployer";
import {XarbMint, XarbSwap} from "../types";

async function deploy() {
    const deployer = new Deployer("XarbMint");
    const xarbMint = (await deployer.deploy()) as XarbMint;

    deployer.setFactoryName("XarbSwap");
    const xarbSwap = (await deployer.deploy(xarbMint.address)) as XarbSwap;
    return {mint: xarbMint.address, swap: xarbSwap.address, context: {xarbMint, xarbSwap}}
}

deploy().then(ctx => {
    console.log(ctx);
    process.exit(0)
}).catch(err => {
    console.error(err);
    process.exit(1);
})