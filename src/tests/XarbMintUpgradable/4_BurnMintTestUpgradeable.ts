import {XarbMint, XarbMintUpgradeable} from "../../types";
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers";
import {ethers} from "hardhat";
import Deployer from "../../services/Deployer";
import {suite, test} from "@testdeck/mocha";
import {expect} from "chai";
import {BigNumber} from "ethers";
import mintPrepare from "../utils/mintPrepare";

/**
 * Unit test for burn functionality of XarbMint contract
 * @author Farbod Shams <farbodshams.2000@gmail.com>
 */

@suite
class BurnMintTestUpgradeable {
    private static contract: XarbMint;
    private static signers: SignerWithAddress[];

    public static async before(): Promise<void> {
        BurnMintTestUpgradeable.signers = await ethers.getSigners();

        const deployer: Deployer = new Deployer("XarbMintUpgradeable", this.signers[0]);
        const contract: XarbMintUpgradeable = (await deployer.deployUpgradable(500)) as XarbMintUpgradeable;
        BurnMintTestUpgradeable.contract = await mintPrepare(contract, BurnMintTestUpgradeable.signers);
    }

    @test
    public async shouldNotBurnTokenMoreThanBalance(): Promise<void> {
        const account: SignerWithAddress = BurnMintTestUpgradeable.signers[1];
        expect(BurnMintTestUpgradeable.contract.connect(account).burn(account.address, 0, 30)).to.be
            .revertedWith("ERC1155: burn amount exceeds balance");
    }

    @test
    public async shouldBurnTokenByItsCreator(): Promise<void> {
        const account: SignerWithAddress = BurnMintTestUpgradeable.signers[1];
        const tx = await BurnMintTestUpgradeable.contract.connect(account).burn(account.address, 0, 1);
        await tx.wait();

        expect(await BurnMintTestUpgradeable.contract.balanceOf(account.address, 0)).to.equal(BigNumber.from(4));
    }

    @test
    public async shouldBurnTokenByOperator(): Promise<void> {
        const account: SignerWithAddress = BurnMintTestUpgradeable.signers[1];
        const operator: SignerWithAddress = BurnMintTestUpgradeable.signers[3];
        const tx = await BurnMintTestUpgradeable.contract.connect(operator).burn(account.address, 0, 2);
        await tx.wait();

        expect(await BurnMintTestUpgradeable.contract.balanceOf(account.address, 0)).to.equal(BigNumber.from(2));
    }

    @test
    public async shouldBurnTokenByContractOwner(): Promise<void> {
        const account: SignerWithAddress = BurnMintTestUpgradeable.signers[1];
        const operator: SignerWithAddress = BurnMintTestUpgradeable.signers[0];
        const tx = await BurnMintTestUpgradeable.contract.connect(operator).burn(account.address, 0, 1);
        await tx.wait();

        expect(await BurnMintTestUpgradeable.contract.balanceOf(account.address, 0)).to.equal(BigNumber.from(1));
    }

    @test
    public async shouldNotBurnTokenBySomeoneElse(): Promise<void> {
        const account: SignerWithAddress = BurnMintTestUpgradeable.signers[1];
        expect(BurnMintTestUpgradeable.contract.burn(account.address, 0, 1)).to.be
            .revertedWith("ERC1155: caller is not token owner nor approved");
    }

    @test
    public async shouldBatchBurnTokenByItsCreator(): Promise<void> {
        const account: SignerWithAddress = BurnMintTestUpgradeable.signers[2];
        const tx = await BurnMintTestUpgradeable.contract.connect(account).burnBatch(account.address, [1, 2], [1, 1]);
        await tx.wait()

        expect(await BurnMintTestUpgradeable.contract.balanceOfBatch(Array(2).fill(account.address), [1, 2]))
            .to.eql(Array(2).fill(BigNumber.from(4)));
    }

    @test
    public async shouldBatchBurnTokenByOperator(): Promise<void> {
        const account = BurnMintTestUpgradeable.signers[2];
        const operator = BurnMintTestUpgradeable.signers[3];

        const tx = await BurnMintTestUpgradeable.contract.connect(operator).burnBatch(account.address, [1, 2], [1, 1]);
        await tx.wait()

        expect(await BurnMintTestUpgradeable.contract.balanceOfBatch(Array(2).fill(account.address), [1, 2]))
            .to.eql(Array(2).fill(BigNumber.from(3)));
    }

    @test
    public async shouldBatchBurnTokenByContractOwner(): Promise<void> {
        const account = BurnMintTestUpgradeable.signers[2];
        const operator = BurnMintTestUpgradeable.signers[0];

        const tx = await BurnMintTestUpgradeable.contract.connect(operator).burnBatch(account.address, [1, 2], [1, 1]);
        await tx.wait()

        expect(await BurnMintTestUpgradeable.contract.balanceOfBatch(Array(2).fill(account.address), [1, 2]))
            .to.eql(Array(2).fill(BigNumber.from(2)));
    }

    @test
    public async shouldNotBatchBurnTokenBySomeoneElse(): Promise<void> {
        const account: SignerWithAddress = BurnMintTestUpgradeable.signers[2];
        const caller: SignerWithAddress = BurnMintTestUpgradeable.signers[1];
        expect(BurnMintTestUpgradeable.contract.connect(caller).burnBatch(account.address, [1, 1], [1, 1])).to.be
            .revertedWith("ERC1155: caller is not token owner nor approved")
    }

    @test
    public async shouldNotBatchBurnTokenMoreThanBalance(): Promise<void> {
        const account: SignerWithAddress = BurnMintTestUpgradeable.signers[2];
        expect(BurnMintTestUpgradeable.contract.connect(account).burnBatch(account.address, [1, 1], [1, 1])).to.be
            .revertedWith("ERC1155: burn amount exceeds balance")
    }
}