import {suite, test} from "@testdeck/mocha";
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers";
import {expect} from "chai";
import {BigNumber} from "ethers";
import {ethers} from "hardhat";
import Deployer from "../../services/Deployer";
import {XarbMint, XarbMintUpgradeable} from "../../types";
import mintPrepare from "../utils/mintPrepare";

/**
 * Unit test for transfer functionality of XarbMint contract
 * @author Farbod Shams <farbodshams.2000@gmail.com>
 */

@suite
class TransferMintTestUpgradeable {
    private static contract: XarbMint;
    private static signers: SignerWithAddress[];

    public static async before(): Promise<void> {
        TransferMintTestUpgradeable.signers = await ethers.getSigners();

        const deployer: Deployer = new Deployer("XarbMintUpgradeable", this.signers[0]);
        const contract: XarbMintUpgradeable = (await deployer.deployUpgradable(500)) as XarbMintUpgradeable;
        TransferMintTestUpgradeable.contract = await mintPrepare(contract, TransferMintTestUpgradeable.signers);
    }
    
    @test
    public async shouldTransferByCreator(): Promise<void> {
        const sender: SignerWithAddress = TransferMintTestUpgradeable.signers[1];
        const receiver: SignerWithAddress = TransferMintTestUpgradeable.signers[4];
        const tx = await TransferMintTestUpgradeable.contract.connect(sender).safeTransferFrom(sender.address, receiver.address, 0, 1, "0x00");
        await tx.wait();

        expect(await TransferMintTestUpgradeable.contract.balanceOf(receiver.address, 0)).to.equal(BigNumber.from(1));
    }

    @test
    public async shouldTransferByOperator(): Promise<void> {
        const operator: SignerWithAddress = TransferMintTestUpgradeable.signers[3];
        const sender: SignerWithAddress = TransferMintTestUpgradeable.signers[1];
        const receiver: SignerWithAddress = TransferMintTestUpgradeable.signers[4];
        const tx = await TransferMintTestUpgradeable.contract.connect(operator).safeTransferFrom(sender.address, receiver.address, 0, 1, "0x00");
        await tx.wait();

        expect(await TransferMintTestUpgradeable.contract.balanceOf(receiver.address, 0)).to.equal(BigNumber.from(2));
    }

    @test
    public async shouldNotTransferBySomeoneElse(): Promise<void> {
        const sender: SignerWithAddress = TransferMintTestUpgradeable.signers[1];
        const receiver: SignerWithAddress = TransferMintTestUpgradeable.signers[4];
        expect(TransferMintTestUpgradeable.contract.safeTransferFrom(sender.address, receiver.address, 0, 1, "0x00")).to
            .be.revertedWith("ERC1155: caller is not token owner nor approved")
    }

    @test
    public async shouldBatchTransferByCreator(): Promise<void> {
        const sender: SignerWithAddress = TransferMintTestUpgradeable.signers[2];
        const receiver: SignerWithAddress = TransferMintTestUpgradeable.signers[4];
        const tx = await TransferMintTestUpgradeable.contract.connect(sender)
            .safeBatchTransferFrom(sender.address, receiver.address, [1, 2], [1, 1], "0x00");
        await tx.wait();

        expect(await TransferMintTestUpgradeable.contract.balanceOfBatch(Array(2).fill(receiver.address), [1, 2])).to
            .eql(Array(2).fill(BigNumber.from(1)));
    }

    @test
    public async shouldBatchTransferByOperator(): Promise<void> {
        const operator: SignerWithAddress = TransferMintTestUpgradeable.signers[3];
        const sender: SignerWithAddress = TransferMintTestUpgradeable.signers[2];
        const receiver: SignerWithAddress = TransferMintTestUpgradeable.signers[4];
        const tx = await TransferMintTestUpgradeable.contract.connect(operator)
            .safeBatchTransferFrom(sender.address, receiver.address, [1, 2], [1, 1], "0x00");
        await tx.wait();

        expect(await TransferMintTestUpgradeable.contract.balanceOfBatch(Array(2).fill(receiver.address), [1, 2])).to
            .eql(Array(2).fill(BigNumber.from(2)));
    }

    @test
    public async shouldNotBatchTransferBySomeoneElse(): Promise<void> {
        const sender: SignerWithAddress = TransferMintTestUpgradeable.signers[1];
        const receiver: SignerWithAddress = TransferMintTestUpgradeable.signers[4];
        await expect(TransferMintTestUpgradeable.contract.connect(receiver)
            .safeBatchTransferFrom(sender.address, receiver.address, [1, 2], [1, 1], "0x00"))
            .to.be.revertedWith("ERC1155: caller is not token owner nor approved")
    }
}