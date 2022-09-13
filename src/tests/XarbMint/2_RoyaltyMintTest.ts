import {suite, test} from "@testdeck/mocha";
import {expect} from "chai";
import {BigNumber} from "ethers";
import {XarbMint} from "../../types";
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers";
import {ethers} from "hardhat";
import Deployer from "../../services/Deployer";
import mintPrepare from "../utils/mintPrepare";
import {RoyaltyStruct} from "../../types/contracts/manual/Royalties";
import structToObject from "../utils/structToObject";

/**
 * Unit test for royalty functionality of XarbMint contract
 * @author Farbod Shams <farbodshams.2000@gmail.com>
 */

@suite
class RoyaltyMintTest {
    private static contract: XarbMint;
    private static signers: SignerWithAddress[];

    public static async before(): Promise<void> {
        RoyaltyMintTest.signers = await ethers.getSigners();

        const deployer: Deployer = new Deployer("XarbMint", this.signers[0]);
        const contract = (await deployer.deploy(500)) as XarbMint;
        RoyaltyMintTest.contract = await mintPrepare(contract, RoyaltyMintTest.signers);
    }

    @test
    public async shouldReturnDefaultMaxPossibleRoyalty() {
        expect(await RoyaltyMintTest.contract.maxPossibleRoyalty()).to.equal(BigNumber.from(500));
    }

    @test
    public async shouldSetMaxPossibleRoyaltyByOwner() {
        const tx = await RoyaltyMintTest.contract.setMaxPossibleRoyalty(600);
        await tx.wait();

        expect(await RoyaltyMintTest.contract.maxPossibleRoyalty()).to.equal(BigNumber.from(600));
    }

    @test
    public async shouldNotSetMaxPossibleRoyaltyByNotOwner() {
        await expect(RoyaltyMintTest.contract.connect(RoyaltyMintTest.signers[1]).setMaxPossibleRoyalty(600))
            .to.be.revertedWith("Ownable: caller is not the owner");
    }

    @test
    public async shouldReturnRoyaltiesOfAMintedToken(): Promise<void> {
        const royalties = await RoyaltyMintTest.contract.getRoyalties(0);
        expect(structToObject(royalties, true))
            .to.eql(([{
            receiver: RoyaltyMintTest.signers[1].address,
            amount: BigNumber.from(100)
        }, {
            receiver: RoyaltyMintTest.signers[2].address,
            amount: BigNumber.from(150)
        }, {
            receiver: RoyaltyMintTest.signers[3].address,
            amount: BigNumber.from(200)
        }]) as RoyaltyStruct.RoyaltyStruct[]);
    }

    @test
    public async shouldReturnRoyaltiesOfANonExistedToken(): Promise<void> {
        expect(await RoyaltyMintTest.contract.getRoyalties(30))
            .to.eql([]);
    }

    @test
    public async shouldReturnRoyaltyOfABatchMintedToken(): Promise<void> {
        const token2Royalties = await RoyaltyMintTest.contract.getRoyalties(2);
        expect(token2Royalties.find(item => item.receiver === RoyaltyMintTest.signers[2].address)?.amount)
            .to.equal(BigNumber.from(200));
    }

    @test
    public async shouldNotMintWithHigherThanMaximumAmountOfRoyalty(): Promise<void> {
        await expect(RoyaltyMintTest.contract.mint(5, "ipfs://QmYtMkhkUhwD7eeyCqBqZpumhyxbrmAnfjKfov64MEmGFv", [
            RoyaltyMintTest.signers[1].address,
            RoyaltyMintTest.signers[2].address,
            RoyaltyMintTest.signers[3].address,
        ], [200, 200, 300]))
            .to.be.revertedWith("Royalties: Entered royalties exceeds maximum amount of royalty");
    }

    @test
    public async shouldNotMintWithMoreThan10RoyaltyReceiverAddresses(): Promise<void> {
        await expect(RoyaltyMintTest.contract.mint(5, "ipfs://QmYtMkhkUhwD7eeyCqBqZpumhyxbrmAnfjKfov64MEmGFv", [
            RoyaltyMintTest.signers[1].address,
            RoyaltyMintTest.signers[2].address,
            RoyaltyMintTest.signers[3].address,
            RoyaltyMintTest.signers[4].address,
            RoyaltyMintTest.signers[5].address,
            RoyaltyMintTest.signers[6].address,
            RoyaltyMintTest.signers[7].address,
            RoyaltyMintTest.signers[8].address,
            RoyaltyMintTest.signers[9].address,
            RoyaltyMintTest.signers[10].address,
            RoyaltyMintTest.signers[11].address,
        ], [200, 200, 300, 200, 200, 300, 200, 200, 300, 100, 200]))
            .to.be.revertedWith("Royalties: Only 10 separate addresses could be entered as royalty receiver");
    }

    @test
    public async shouldNotBatchMintWithHigherThanMaximumAmountOfRoyalty(): Promise<void> {
        await expect(RoyaltyMintTest.contract.mintBatch([5, 5], [
            "ipfs://QmeWoVX7icvpwAAugmiSyfJDVxE3Vpk3DF4bEXbXU1XYTe",
            "ipfs://Qmeb3W4ZLnHb4kbcZQ1f57ebR7w51fGi8mchX5T1fsoFbu"
        ], [[
            RoyaltyMintTest.signers[1].address,
            RoyaltyMintTest.signers[2].address
        ], [
            RoyaltyMintTest.signers[2].address,
            RoyaltyMintTest.signers[3].address
        ]], [[100, 200], [500, 400]]))
            .to.be.revertedWith("Royalties: Entered royalties exceeds maximum amount of royalty");
    }
}