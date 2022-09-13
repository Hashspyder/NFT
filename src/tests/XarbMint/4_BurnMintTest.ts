import {XarbMint} from "../../types";
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
class BurnMintTest {
    private static contract: XarbMint;
    private static signers: SignerWithAddress[];

    public static async before(): Promise<void> {
        BurnMintTest.signers = await ethers.getSigners();

        const deployer: Deployer = new Deployer("XarbMint", this.signers[0]);
        const contract: XarbMint = (await deployer.deploy(500)) as XarbMint;
        BurnMintTest.contract = await mintPrepare(contract, BurnMintTest.signers);
    }

    @test
    public async shouldNotBurnTokenMoreThanBalance(): Promise<void> {
        const account: SignerWithAddress = BurnMintTest.signers[1];
        expect(BurnMintTest.contract.connect(account).burn(account.address, 0, 30)).to.be
            .revertedWith("ERC1155: burn amount exceeds balance");
    }

    @test
    public async shouldBurnTokenByItsCreator(): Promise<void> {
        const account: SignerWithAddress = BurnMintTest.signers[1];
        const tx = await BurnMintTest.contract.connect(account).burn(account.address, 0, 1);
        await tx.wait();

        expect(await BurnMintTest.contract.balanceOf(account.address, 0)).to.equal(BigNumber.from(4));
    }

    @test
    public async shouldBurnTokenByOperator(): Promise<void> {
        const account: SignerWithAddress = BurnMintTest.signers[1];
        const operator: SignerWithAddress = BurnMintTest.signers[3];
        const tx = await BurnMintTest.contract.connect(operator).burn(account.address, 0, 2);
        await tx.wait();

        expect(await BurnMintTest.contract.balanceOf(account.address, 0)).to.equal(BigNumber.from(2));
    }

    @test
    public async shouldBurnTokenByContractOwner(): Promise<void> {
        const account: SignerWithAddress = BurnMintTest.signers[1];
        const operator: SignerWithAddress = BurnMintTest.signers[0];
        const tx = await BurnMintTest.contract.connect(operator).burn(account.address, 0, 1);
        await tx.wait();

        expect(await BurnMintTest.contract.balanceOf(account.address, 0)).to.equal(BigNumber.from(1));
    }

    @test
    public async shouldNotBurnTokenBySomeoneElse(): Promise<void> {
        const account: SignerWithAddress = BurnMintTest.signers[1];
        expect(BurnMintTest.contract.burn(account.address, 0, 1)).to.be
            .revertedWith("ERC1155: caller is not token owner nor approved");
    }

    @test
    public async shouldBatchBurnTokenByItsCreator(): Promise<void> {
        const account: SignerWithAddress = BurnMintTest.signers[2];
        const tx = await BurnMintTest.contract.connect(account).burnBatch(account.address, [1, 2], [1, 1]);
        await tx.wait()

        expect(await BurnMintTest.contract.balanceOfBatch(Array(2).fill(account.address), [1, 2]))
            .to.eql(Array(2).fill(BigNumber.from(4)));
    }

    @test
    public async shouldBatchBurnTokenByOperator(): Promise<void> {
        const account = BurnMintTest.signers[2];
        const operator = BurnMintTest.signers[3];

        const tx = await BurnMintTest.contract.connect(operator).burnBatch(account.address, [1, 2], [1, 1]);
        await tx.wait()

        expect(await BurnMintTest.contract.balanceOfBatch(Array(2).fill(account.address), [1, 2]))
            .to.eql(Array(2).fill(BigNumber.from(3)));
    }

    @test
    public async shouldBatchBurnTokenByContractOwner(): Promise<void> {
        const account = BurnMintTest.signers[2];
        const operator = BurnMintTest.signers[0];

        const tx = await BurnMintTest.contract.connect(operator).burnBatch(account.address, [1, 2], [1, 1]);
        await tx.wait()

        expect(await BurnMintTest.contract.balanceOfBatch(Array(2).fill(account.address), [1, 2]))
            .to.eql(Array(2).fill(BigNumber.from(2)));
    }

    @test
    public async shouldNotBatchBurnTokenBySomeoneElse(): Promise<void> {
        const account: SignerWithAddress = BurnMintTest.signers[2];
        const caller: SignerWithAddress = BurnMintTest.signers[1];
        expect(BurnMintTest.contract.connect(caller).burnBatch(account.address, [1, 1], [1, 1])).to.be
            .revertedWith("ERC1155: caller is not token owner nor approved")
    }

    @test
    public async shouldNotBatchBurnTokenMoreThanBalance(): Promise<void> {
        const account: SignerWithAddress = BurnMintTest.signers[2];
        expect(BurnMintTest.contract.connect(account).burnBatch(account.address, [1, 1], [1, 1])).to.be
            .revertedWith("ERC1155: burn amount exceeds balance")
    }
}