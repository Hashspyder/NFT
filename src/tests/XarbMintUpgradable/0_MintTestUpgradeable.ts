import {suite, test} from "@testdeck/mocha";
import {XarbMint, XarbMintUpgradeable, XarbMintUpgradeableTestV2} from "../../types";
import Deployer from "../../services/Deployer";
import {ethers} from "hardhat";
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers";
import {expect} from "chai";
import {BigNumber, ContractFactory} from "ethers";

/**
 * Unit test for global functionality of XarbMint contract
 * @author Farbod Shams <farbodshams.2000@gmail.com>
 */

@suite
class MintTestUpgradeable {
    private static contract: XarbMint;
    private static signers: SignerWithAddress[];

    public static async before(): Promise<void> {
        MintTestUpgradeable.signers = await ethers.getSigners();

        const deployer: Deployer = new Deployer("XarbMintUpgradeable", this.signers[0]);
        MintTestUpgradeable.contract = (await deployer.deployUpgradable(500)) as XarbMintUpgradeable;
    }

    @test
    public async shouldReturnOwner(): Promise<void> {
        const account = MintTestUpgradeable.signers[0];

        expect(await MintTestUpgradeable.contract.owner()).to.equal(account.address);
    }

    @test
    public async shouldSetApprovalForAll(): Promise<void> {
        const account = MintTestUpgradeable.signers[1];
        const operator = MintTestUpgradeable.signers[3];
        const tx = await MintTestUpgradeable.contract.connect(account).setApprovalForAll(operator.address, true);
        await tx.wait();

        expect(await MintTestUpgradeable.contract.isApprovedForAll(account.address, operator.address)).to.be.true;
    }

    @test
    public async shouldNotPauseContractByNotOwner(): Promise<void> {
        const account = MintTestUpgradeable.signers[1];
        expect(MintTestUpgradeable.contract.connect(account).pause()).to.be
            .revertedWith("Ownable: caller is not the owner");
    }

    @test
    public async shouldPauseContract(): Promise<void> {
        const tx = await MintTestUpgradeable.contract.pause();
        await tx.wait();

        expect(await MintTestUpgradeable.contract.paused()).to.be.true;
    }

    @test
    public async shouldNotMintOnPausedContract(): Promise<void> {
        const account = MintTestUpgradeable.signers[1];
        expect(MintTestUpgradeable.contract.connect(account)
            .mint(20, "ipfs://QmYtMkhkUhwD7eeyCqBqZpumhyxbrmAnfjKfov64MEmGFv", [
                account.address
            ], [200])).to.be
            .revertedWith("Pausable: paused");
    }

    @test
    public async shouldNotBatchMintOnPausedContract(): Promise<void> {
        const account = MintTestUpgradeable.signers[1];
        await expect(MintTestUpgradeable.contract.connect(account).mintBatch([5, 5], [
            "ipfs://QmeWoVX7icvpwAAugmiSyfJDVxE3Vpk3DF4bEXbXU1XYTe",
            "ipfs://Qmeb3W4ZLnHb4kbcZQ1f57ebR7w51fGi8mchX5T1fsoFbu",
        ], [[account.address], [account.address]], [[100, 100],[100, 100]]))
            .to.be.revertedWith("Pausable: paused");
    }

    @test
    public async shouldNotTransferOnPausedContract(): Promise<void> {
        const account = MintTestUpgradeable.signers[1];
        const receiver = MintTestUpgradeable.signers[4];
        expect(MintTestUpgradeable.contract.connect(account)
            .safeTransferFrom(account.address, receiver.address, 0, 1, "0x00")).to.be
            .revertedWith("Pausable: paused");
    }

    @test
    public async shouldNotBatchTransferOnPausedContract(): Promise<void> {
        const account = MintTestUpgradeable.signers[2];
        const receiver = MintTestUpgradeable.signers[4];
        expect(MintTestUpgradeable.contract.connect(account)
            .safeBatchTransferFrom(account.address, receiver.address, [1, 2], [1, 1], "0x00")).to.be
            .revertedWith("Pausable: paused");
    }

    @test
    public async shouldNotUnpauseContractByNotOwner(): Promise<void> {
        const account = MintTestUpgradeable.signers[1];
        expect(MintTestUpgradeable.contract.connect(account).unpause()).to.be
            .revertedWith("Ownable: caller is not the owner");
    }

    @test
    public async shouldUnpauseContract(): Promise<void> {
        const tx = await MintTestUpgradeable.contract.unpause();
        await tx.wait();

        expect(await MintTestUpgradeable.contract.paused()).to.be.false;
    }

    @test
    public async shouldRevokeApprovalForAll(): Promise<void> {
        const account: SignerWithAddress = MintTestUpgradeable.signers[2];
        const operator: SignerWithAddress = MintTestUpgradeable.signers[3];
        const tx = await MintTestUpgradeable.contract.connect(account).setApprovalForAll(operator.address, false);
        await tx.wait();

        expect(await MintTestUpgradeable.contract.isApprovedForAll(account.address, operator.address)).to.be.false;
    }

    @test
    public async shouldNotChangeTokenUriByNotOwner(): Promise<void> {
        const account = MintTestUpgradeable.signers[2];
        await expect(MintTestUpgradeable.contract.connect(account).setURI("https://xarb.io/"))
            .to.be.revertedWith("Ownable: caller is not the owner");
    }

    @test
    public async shouldChangeTokenUri(): Promise<void> {
        const tx = await MintTestUpgradeable.contract.setURI("https://xarb.io/");
        await tx.wait();

        expect(await MintTestUpgradeable.contract.uri(4)).to.equal("https://xarb.io/");
    }

    @test
    public async shouldNotTransferOwnershipByNotOwner(): Promise<void> {
        const account: SignerWithAddress = MintTestUpgradeable.signers[1];
        const newOwner: SignerWithAddress = MintTestUpgradeable.signers[5];

        await expect(MintTestUpgradeable.contract.connect(account).transferOwnership(newOwner.address))
            .to.be.revertedWith("Ownable: caller is not the owner");
    }

    @test
    public async shouldNotTransferOwnershipToZeroAddress(): Promise<void> {
        const account: SignerWithAddress = MintTestUpgradeable.signers[0];
        const newOwner: string = "0x" + "0".repeat(40);

        await expect(MintTestUpgradeable.contract.connect(account).transferOwnership(newOwner))
            .to.be.revertedWith("Ownable: new owner is the zero address");
    }

    @test
    public async shouldTransferOwnership(): Promise<void> {
        const newOwner: SignerWithAddress = MintTestUpgradeable.signers[5];
        const tx = await MintTestUpgradeable.contract.transferOwnership(newOwner.address);
        await tx.wait();

        expect(await MintTestUpgradeable.contract.owner()).to.equal(newOwner.address);
    }

    @test
    public async shouldRenounceOwnership(): Promise<void> {
        const newOwner: SignerWithAddress = MintTestUpgradeable.signers[5];
        const tx = await MintTestUpgradeable.contract.connect(newOwner).renounceOwnership();
        await tx.wait();

        expect(await MintTestUpgradeable.contract.owner()).to.equal("0x" + "0".repeat(40));
    }


    @test
    public async shouldBeUpgraded(): Promise<void> {
        const deployer: Deployer = new Deployer("XarbMintUpgradeableTestV2");
        await deployer.upgradeContract(MintTestUpgradeable.contract.address);
        const factory: ContractFactory = await deployer.getContractFactory();
        const contract: XarbMintUpgradeableTestV2 = factory.attach(MintTestUpgradeable.contract.address) as XarbMintUpgradeableTestV2;

        expect(await contract.getMintVersion()).to.equal(BigNumber.from(2));
    }
}