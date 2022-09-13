import {XarbMint} from "../../types";
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers";

/**
 * Prepare a scenario in XarbMint contract which described bellow for testing:
 *
 *   TokenId    Creator     Editions    Operator                        royalties
 *  --------- ------------ ---------- ------------ ---------------------------------------------------
 *         0   signers[1]          5   signers[3]   signers[1]: 100, signers[2]: 150, signers[3]: 200
 *         1   signers[2]          5   signers[3]   signers[1]: 100, signers[2]: 200
 *         2   signers[2]          5   signers[3]   signers[2]: 200, signers[3]: 200
 *
 * @author Farbod Shams <farbodshams.2000@gmail.com>
 * @param contract: An instance of XarbMint contract
 * @param signers: An array includes all available accounts
 */

async function mintPrepare(contract: XarbMint, signers: SignerWithAddress[]): Promise<XarbMint> {
    const account1 = signers[1];
    const account2 = signers[2];
    const operator = signers[3];

    const operatorTx1 = await contract.connect(account1).setApprovalForAll(operator.address, true);
    await operatorTx1.wait();
    const operatorTx2 = await contract.connect(account2).setApprovalForAll(operator.address, true);
    await operatorTx2.wait();

    const mintTx1 = await contract.connect(account1).mint(5, "ipfs://QmYtMkhkUhwD7eeyCqBqZpumhyxbrmAnfjKfov64MEmGFv", [
        account1.address,
        account2.address,
        operator.address
    ], [100, 150, 200]);
    await mintTx1.wait()
    const mintTx2 = await contract.connect(account2).mintBatch([5, 5], [
        "ipfs://QmeWoVX7icvpwAAugmiSyfJDVxE3Vpk3DF4bEXbXU1XYTe",
        "ipfs://Qmeb3W4ZLnHb4kbcZQ1f57ebR7w51fGi8mchX5T1fsoFbu"
    ], [[
        account2.address,
        account1.address
    ], [
        account2.address,
        operator.address
    ]], [[200, 100], [200, 200]]);
    await mintTx2;
    return contract;
}

export default mintPrepare;