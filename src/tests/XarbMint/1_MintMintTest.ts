import {XarbMint} from "../../types";
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers";
import {ethers} from "hardhat";
import Deployer from "../../services/Deployer";
import {suite, test} from "@testdeck/mocha";
import {expect} from "chai";
import {BigNumber} from "ethers";

/**
 * Unit test for mint functionality of XarbMint contract
 * @author Farbod Shams <farbodshams.2000@gmail.com>
 */

@suite
class MintMintTest {
    private static contract: XarbMint;
    private static signers: SignerWithAddress[];

    public static async before(): Promise<void> {
        MintMintTest.signers = await ethers.getSigners();

        const deployer: Deployer = new Deployer("XarbMint", this.signers[0]);
        MintMintTest.contract = (await deployer.deploy(500)) as XarbMint;
    }

    @test
    public async shouldMintByEveryone(): Promise<void> {
        const account: SignerWithAddress = MintMintTest.signers[1];
        const tx = await MintMintTest.contract.connect(account)
            .mint(5, "ipfs://QmYtMkhkUhwD7eeyCqBqZpumhyxbrmAnfjKfov64MEmGFv", [account.address], [200]);
        await tx.wait();

        expect(await MintMintTest.contract.balanceOf(account.address, 0)).to.equal(BigNumber.from(5));
    }

    @test
    public async shouldBatchMintByEveryone(): Promise<void> {
        const account: SignerWithAddress = MintMintTest.signers[2];
        const tx = await MintMintTest.contract.connect(account).mintBatch([1, 5, 10, 15], [
            "ipfs://QmeWoVX7icvpwAAugmiSyfJDVxE3Vpk3DF4bEXbXU1XYTe",
            "ipfs://Qmeb3W4ZLnHb4kbcZQ1f57ebR7w51fGi8mchX5T1fsoFbu",
            "ipfs://Qmf4BvgjPg55kWRhT5tBwR5X2q8kyCJh4tiTuwjHW4dXaw",
            "ipfs://QmfVATgMCuJBNB767FrmxMq3LYosweGbFnU9i6e49hBPx7"
        ], Array(4).fill([account.address]), [[100], [200], [300], [400]]);
        await tx.wait();

        const data = await MintMintTest.contract.balanceOfBatch(Array(4)
            .fill(account.address), [1, 2, 3, 4]);
        expect(data).to.eql([
            BigNumber.from(1),
            BigNumber.from(5),
            BigNumber.from(10),
            BigNumber.from(15)
        ]);
    }

    @test
    public async shouldReturnCreatorOfAMintedToken(): Promise<void> {
        const account: SignerWithAddress = MintMintTest.signers[1];
        expect(await MintMintTest.contract.creatorOf(0)).to.equal(account.address);
    }

    @test
    public async shouldReturnCreatorOfABatchMintedToken(): Promise<void> {
        const account: SignerWithAddress = MintMintTest.signers[2];
        expect(await MintMintTest.contract.creatorOf(2)).to.equal(account.address);
    }

    @test
    public async shouldNotReturnCreatorOfANonExistedToken(): Promise<void> {
        await expect(MintMintTest.contract.creatorOf(30)).to.be.revertedWith("XarbMint: This token is not existed");
    }

    @test
    public async shouldReturnMetadataUri(): Promise<void> {
        expect(await MintMintTest.contract.token(0)).to
            .equal("ipfs://QmYtMkhkUhwD7eeyCqBqZpumhyxbrmAnfjKfov64MEmGFv");
    }

    @test
    public async shouldNotReturnMetadataUriOfNotExistedToken(): Promise<void> {
        await expect(MintMintTest.contract.token(20)).to.be.revertedWith("XarbMint: This token is not existed");
    }
}