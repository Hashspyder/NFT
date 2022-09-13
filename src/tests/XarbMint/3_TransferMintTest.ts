import {suite, test} from "@testdeck/mocha";
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers";
import {expect} from "chai";
import {BigNumber} from "ethers";
import {ethers} from "hardhat";
import Deployer from "../../services/Deployer";
import {XarbMint} from "../../types";
import mintPrepare from "../utils/mintPrepare";

/**
 * Unit test for transfer functionality of XarbMint contract
 * @author Farbod Shams <farbodshams.2000@gmail.com>
 */

@suite
class TransferMintTest {
    private static contract: XarbMint;
    private static signers: SignerWithAddress[];

    public static async before(): Promise<void> {
        TransferMintTest.signers = await ethers.getSigners();

        const deployer: Deployer = new Deployer("XarbMint", this.signers[0]);
        const contract: XarbMint = (await deployer.deploy(500)) as XarbMint;
        TransferMintTest.contract = await mintPrepare(contract, TransferMintTest.signers);
    }
    
    @test
    public async shouldTransferByCreator(): Promise<void> {
        const sender: SignerWithAddress = TransferMintTest.signers[1];
        const receiver: SignerWithAddress = TransferMintTest.signers[4];
        const tx = await TransferMintTest.contract.connect(sender).safeTransferFrom(sender.address, receiver.address, 0, 1, "0x00");
        await tx.wait();

        expect(await TransferMintTest.contract.balanceOf(receiver.address, 0)).to.equal(BigNumber.from(1));
    }

    @test
    public async shouldTransferByOperator(): Promise<void> {
        const operator: SignerWithAddress = TransferMintTest.signers[3];
        const sender: SignerWithAddress = TransferMintTest.signers[1];
        const receiver: SignerWithAddress = TransferMintTest.signers[4];
        const tx = await TransferMintTest.contract.connect(operator).safeTransferFrom(sender.address, receiver.address, 0, 1, "0x00");
        await tx.wait();

        expect(await TransferMintTest.contract.balanceOf(receiver.address, 0)).to.equal(BigNumber.from(2));
    }

    @test
    public async shouldNotTransferBySomeoneElse(): Promise<void> {
        const sender: SignerWithAddress = TransferMintTest.signers[1];
        const receiver: SignerWithAddress = TransferMintTest.signers[4];
        expect(TransferMintTest.contract.safeTransferFrom(sender.address, receiver.address, 0, 1, "0x00")).to
            .be.revertedWith("ERC1155: caller is not token owner nor approved")
    }

    @test
    public async shouldBatchTransferByCreator(): Promise<void> {
        const sender: SignerWithAddress = TransferMintTest.signers[2];
        const receiver: SignerWithAddress = TransferMintTest.signers[4];
        const tx = await TransferMintTest.contract.connect(sender)
            .safeBatchTransferFrom(sender.address, receiver.address, [1, 2], [1, 1], "0x00");
        await tx.wait();

        expect(await TransferMintTest.contract.balanceOfBatch(Array(2).fill(receiver.address), [1, 2])).to
            .eql(Array(2).fill(BigNumber.from(1)));
    }

    @test
    public async shouldBatchTransferByOperator(): Promise<void> {
        const operator: SignerWithAddress = TransferMintTest.signers[3];
        const sender: SignerWithAddress = TransferMintTest.signers[2];
        const receiver: SignerWithAddress = TransferMintTest.signers[4];
        const tx = await TransferMintTest.contract.connect(operator)
            .safeBatchTransferFrom(sender.address, receiver.address, [1, 2], [1, 1], "0x00");
        await tx.wait();

        expect(await TransferMintTest.contract.balanceOfBatch(Array(2).fill(receiver.address), [1, 2])).to
            .eql(Array(2).fill(BigNumber.from(2)));
    }

    @test
    public async shouldNotBatchTransferBySomeoneElse(): Promise<void> {
        const sender: SignerWithAddress = TransferMintTest.signers[1];
        const receiver: SignerWithAddress = TransferMintTest.signers[4];
        await expect(TransferMintTest.contract.connect(receiver)
            .safeBatchTransferFrom(sender.address, receiver.address, [1, 2], [1, 1], "0x00"))
            .to.be.revertedWith("ERC1155: caller is not token owner nor approved")
    }
}