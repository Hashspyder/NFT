import Deployer from "../services/Deployer";
import {XarbMintUpgradeableTestV2} from "../types";

async function main() {
    const deployer: Deployer = new Deployer("XarbMintUpgradeable");
    return await deployer.upgradeContract("0xD665C8b215F0810860E8ECBB7dc6b480E0DEE262");
}

main().then(res => {
    console.log(res);
    process.exit(0)
})