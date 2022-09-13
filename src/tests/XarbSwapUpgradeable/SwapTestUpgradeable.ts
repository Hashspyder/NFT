import {suite, test} from "@testdeck/mocha";
import {XarbMint, XarbMintUpgradeable, XarbSwap, XarbSwapUpgradeable, XarbSwapUpgradeableTestV2} from "../../types";
import Deployer from "../../services/Deployer";
import mintPrepare from "../utils/mintPrepare";
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers";
import {ethers} from "hardhat";
import {expect} from "chai";
import structToObject from "../utils/structToObject";
import {BigNumber, ContractFactory} from "ethers";

/**
 * Unit and integration test for all functionalities of XarbSwap contract beside XarbMint
 * @author Farbod Shams <farbodshams.2000@gmail.com>
 */

@suite
class SwapTestUpgradeable {
    private static mintContract: XarbMint;
    private static swapContract: XarbSwap;
    private static signers: SignerWithAddress[];

    public static async before() {
        const deployer = new Deployer("XarbMintUpgradeable");
        const mintContract = (await deployer.deployUpgradable(500)) as XarbMintUpgradeable;
        SwapTestUpgradeable.signers = await ethers.getSigners();

        SwapTestUpgradeable.mintContract = await mintPrepare(mintContract, SwapTestUpgradeable.signers);

        deployer.setFactoryName("XarbSwapUpgradeable");
        SwapTestUpgradeable.swapContract = (await deployer.deployUpgradable("0x" + "0".repeat(40), 125)) as XarbSwapUpgradeable;
    }

    @test
    public async shouldNotChangeMintAddressByNotOwner() {
        await expect(SwapTestUpgradeable.swapContract.connect(SwapTestUpgradeable.signers[1]).changeMintAddress(SwapTestUpgradeable.mintContract.address))
            .to.be.revertedWith("Ownable: caller is not the owner");
    }

    @test
    public async shouldChangeMintAddressByOwner() {
        const tx = await SwapTestUpgradeable.swapContract.changeMintAddress(SwapTestUpgradeable.mintContract.address);
        await tx.wait();

        expect(await SwapTestUpgradeable.swapContract.getMintAddress()).to.equal(SwapTestUpgradeable.mintContract.address);
    }

    @test
    public async shouldNotChangeContractFeeByNotOwner() {
        await expect(SwapTestUpgradeable.swapContract.connect(SwapTestUpgradeable.signers[1]).setContractFee(50))
            .to.be.revertedWith("Ownable: caller is not the owner");
    }

    @test
    public async shouldChangeContractFeeByOwner() {
        const tx = await SwapTestUpgradeable.swapContract.setContractFee(50);
        await tx.wait();

        expect(await SwapTestUpgradeable.swapContract.getContractFee()).to.equal(BigNumber.from(50));
    }

    @test
    public async shouldNotChangeFeeReceiverAddressByNotOwner() {
        await expect(SwapTestUpgradeable.swapContract.connect(SwapTestUpgradeable.signers[1]).setContractFeeReceiverAddress("0x" + "0".repeat(40)))
            .to.be.revertedWith("Ownable: caller is not the owner");
    }

    @test
    public async shouldChangeFeeReceiverAddressByOwner() {
        const tx = await SwapTestUpgradeable.swapContract.setContractFeeReceiverAddress(SwapTestUpgradeable.signers[5].address);
        await tx.wait();

        expect(await SwapTestUpgradeable.swapContract.getContractFeeReceiverAddress()).to.equal(SwapTestUpgradeable.signers[5].address);
    }

    @test
    public async shouldNotListTokensByNonApprovedAddress(): Promise<void> {
        await expect(SwapTestUpgradeable.swapContract.list(SwapTestUpgradeable.signers[1].address, 0, 2, 200))
            .to.be.revertedWith("XarbSwap: Contract is not approved for managing tokens owned by this address");
    }

    @test
    public async shouldNotListTokenOwnedBySomeoneElse(): Promise<void> {
        const tx = await SwapTestUpgradeable.mintContract.connect(SwapTestUpgradeable.signers[1])
            .setApprovalForAll(SwapTestUpgradeable.swapContract.address, true);
        await tx.wait();

        await expect(SwapTestUpgradeable.swapContract.connect(SwapTestUpgradeable.signers[2]).list(SwapTestUpgradeable.signers[1].address, 0, 2, 200))
            .to.be.revertedWith("XarbSwap: caller is not token owner nor approved");
    }

    @test
    public async shouldNotListNonExistedToken(): Promise<void> {
        await expect(SwapTestUpgradeable.swapContract.connect(SwapTestUpgradeable.signers[1]).list(SwapTestUpgradeable.signers[1].address, 10, 2, 200))
            .to.be.revertedWith("XarbSwap: List amount exceeds not listed balance");
    }

    @test
    public async shouldNotListZeroPrice(): Promise<void> {
        await expect(SwapTestUpgradeable.swapContract.connect(SwapTestUpgradeable.signers[1]).list(SwapTestUpgradeable.signers[1].address, 0, 2, 0))
            .to.be.revertedWith("XarbSwap: Both price and swap must be greater than 0");
    }

    @test
    public async shouldNotListZeroEditions(): Promise<void> {
        await expect(SwapTestUpgradeable.swapContract.connect(SwapTestUpgradeable.signers[1]).list(SwapTestUpgradeable.signers[1].address, 0, 0, 200))
            .to.be.revertedWith("XarbSwap: Both price and swap must be greater than 0");
    }

    @test
    public async shouldListTokenByOwner(): Promise<void> {
        const account = SwapTestUpgradeable.signers[1];
        const price = BigInt(1e18)

        const tx = await SwapTestUpgradeable.swapContract.connect(account).list(account.address, 0, 2, price)
        await tx.wait();

        const swap = await SwapTestUpgradeable.swapContract.getSwap(0);
        expect(structToObject(swap))
            .to.eql(
            {
                creator: account.address,
                tokenOwner: account.address,
                tokenId: BigNumber.from(0),
                amount: BigNumber.from(2),
                amountLeft: BigNumber.from(2),
                price: BigNumber.from(price),
                state: 1
            }
        );
    }

    @test
    public async shouldListTokenByOperator(): Promise<void> {
        const account = SwapTestUpgradeable.signers[1];
        const operator = SwapTestUpgradeable.signers[3];
        const price = BigInt(1.5e18)

        const tx = await SwapTestUpgradeable.swapContract.connect(operator).list(account.address, 0, 2, price)
        await tx.wait();

        const swap = await SwapTestUpgradeable.swapContract.getSwap(1);
        expect(structToObject(swap))
            .to.eql(
            {
                creator: operator.address,
                tokenOwner: account.address,
                tokenId: BigNumber.from(0),
                amount: BigNumber.from(2),
                amountLeft: BigNumber.from(2),
                price: BigNumber.from(price),
                state: 1
            }
        );
    }

    @test
    public async shouldNotListTokenMoreThanBalance(): Promise<void> {
        await expect(SwapTestUpgradeable.swapContract.connect(SwapTestUpgradeable.signers[1]).list(SwapTestUpgradeable.signers[1].address, 0, 2, 200))
            .to.be.revertedWith("XarbSwap: List amount exceeds not listed balance");
    }

    @test
    public async shouldNotGetNonExistedSwap(): Promise<void> {
        await expect(SwapTestUpgradeable.swapContract.getSwap(10))
            .to.be.revertedWith("Listable: This swap is not existed");
    }

    @test
    public async shouldNotCancelNonExistedSwap(): Promise<void> {
        await expect(SwapTestUpgradeable.swapContract.cancelListing(10))
            .to.be.revertedWith("Listable: This swap is not existed");
    }

    @test
    public async shouldNotCancelSwapBySomeoneElse(): Promise<void> {
        await expect(SwapTestUpgradeable.swapContract.connect(SwapTestUpgradeable.signers[2]).cancelListing(0))
            .to.be.revertedWith("Listable: caller is not token owner nor approved");
    }

    @test
    public async shouldCancelSwapByOwner(): Promise<void> {
        const tx = await SwapTestUpgradeable.swapContract.connect(SwapTestUpgradeable.signers[1]).cancelListing(1);
        await tx.wait();

        expect((await SwapTestUpgradeable.swapContract.getSwap(1)).state)
            .to.equal(0);
    }

    @test
    public async shouldCancelSwapByOperator(): Promise<void> {
        const tx = await SwapTestUpgradeable.swapContract.connect(SwapTestUpgradeable.signers[3]).cancelListing(0);
        await tx.wait();

        expect((await SwapTestUpgradeable.swapContract.getSwap(0)).state)
            .to.equal(0);
    }

    @test
    public async shouldNotCancelAlreadyCanceledSwap(): Promise<void> {
        await expect(SwapTestUpgradeable.swapContract.connect(SwapTestUpgradeable.signers[3]).cancelListing(0))
            .to.be.revertedWith("Listable: Selected listing is not existed, already canceled or finished")
    }

    @test
    public async shouldNotCollectNonExistedSwap(): Promise<void> {
        await expect(SwapTestUpgradeable.swapContract.collect(10, 1))
            .to.be.revertedWith("Listable: This swap is not existed");
    }

    @test
    public async shouldNotCollectCanceledSwap(): Promise<void> {
        await expect(SwapTestUpgradeable.swapContract.collect(0, 1))
            .to.be.revertedWith("XarbSwap: Selected listing is not existed, already canceled or finished");
    }

    @test
    public async shouldNotCollectEditionsMoreThanListed(): Promise<void> {
        const account = SwapTestUpgradeable.signers[1];
        const price = BigInt(1e18)

        const tx = await SwapTestUpgradeable.swapContract.connect(account).list(account.address, 0, 3, price)
        await tx.wait();

        await expect(SwapTestUpgradeable.swapContract.collect(2, 4))
            .to.be.revertedWith("XarbSwap: Collect amount exceeds amount left");
    }

    @test
    public async shouldNotCollectFromASwapWhichIsCreatedByTheSameAddress(): Promise<void> {
        const account = SwapTestUpgradeable.signers[1];

        await expect(SwapTestUpgradeable.swapContract.connect(account).collect(2, 1))
            .to.be.revertedWith("XarbSwap: Cannot collect from a swap which is created by the same address as collector");
    }

    @test
    public async shouldNotCollectFromASwapWithInsufficientCredit(): Promise<void> {
        await expect(SwapTestUpgradeable.swapContract.collect(2, 1))
            .to.be.revertedWith("XarbSwap: Insufficient credit");
    }

    @test
    public async shouldCollectASwap(): Promise<void> {
        const addressBalances = {
            [SwapTestUpgradeable.signers[1].address]: await SwapTestUpgradeable.signers[1].getBalance(),
            [SwapTestUpgradeable.signers[2].address]: await SwapTestUpgradeable.signers[2].getBalance(),
            [SwapTestUpgradeable.signers[3].address]: await SwapTestUpgradeable.signers[3].getBalance(),
            [SwapTestUpgradeable.signers[4].address]: await SwapTestUpgradeable.signers[4].getBalance(),
            [SwapTestUpgradeable.signers[5].address]: await SwapTestUpgradeable.signers[5].getBalance()
        };

        const tx = await SwapTestUpgradeable.swapContract.connect(SwapTestUpgradeable.signers[4])
            .collect(2, 2, {value: BigInt(2 * 1e18)});
        await tx.wait();

        expect(await SwapTestUpgradeable.signers[5].getBalance())
            .to.equal(addressBalances[SwapTestUpgradeable.signers[5].address].toBigInt() + BigInt(2 * 1e18 * 5 / 100));
        expect(await SwapTestUpgradeable.signers[2].getBalance())
            .to.equal(addressBalances[SwapTestUpgradeable.signers[2].address].toBigInt() + BigInt(2 * 1e18 * 15 / 100));
        expect(await SwapTestUpgradeable.signers[3].getBalance())
            .to.equal(addressBalances[SwapTestUpgradeable.signers[3].address].toBigInt() + BigInt(2 * 1e18 * 20 / 100));
        expect(await SwapTestUpgradeable.signers[1].getBalance())
            .to.equal(addressBalances[SwapTestUpgradeable.signers[1].address].toBigInt() + BigInt(2 * 1e18 * (100 - 15 - 20 - 5) / 100));
        expect(await SwapTestUpgradeable.signers[4].getBalance())
            .to.gte(addressBalances[SwapTestUpgradeable.signers[4].address].toBigInt() - BigInt(2 * 1e18 + 2e14));
        expect(await SwapTestUpgradeable.mintContract.balanceOf(SwapTestUpgradeable.signers[4].address, 0)).to.equal(BigNumber.from(2));
        expect(structToObject(await SwapTestUpgradeable.swapContract.getSwap(2))).to.eql({
            creator: SwapTestUpgradeable.signers[1].address,
            tokenOwner: SwapTestUpgradeable.signers[1].address,
            tokenId: BigNumber.from(0),
            amount: BigNumber.from(3),
            amountLeft: BigNumber.from(1),
            price: BigNumber.from(BigInt(1e18)),
            state: 1
        });
    }

    @test
    public async shouldSoldOutAFullyCollectedSwap(): Promise<void> {
        const tx = await SwapTestUpgradeable.swapContract.connect(SwapTestUpgradeable.signers[4])
            .collect(2, 1, {value: BigInt(2 * 1e18)});
        await tx.wait();

        expect(structToObject(await SwapTestUpgradeable.swapContract.getSwap(2))).to.eql({
            creator: SwapTestUpgradeable.signers[1].address,
            tokenOwner: SwapTestUpgradeable.signers[1].address,
            tokenId: BigNumber.from(0),
            amount: BigNumber.from(3),
            amountLeft: BigNumber.from(0),
            price: BigNumber.from(BigInt(1e18)),
            state: 2
        });
    }

    @test
    public async shouldNotCollectASoldOutSwap(): Promise<void> {
        await expect(SwapTestUpgradeable.swapContract.connect(SwapTestUpgradeable.signers[4])
            .collect(2, 1, {value: BigInt(2 * 1e18)}))
            .to.be.revertedWith("XarbSwap: Selected listing is not existed, already canceled or finished")
    }

    @test
    public async shouldCancelSwapByContractOwner(): Promise<void> {
        const account = SwapTestUpgradeable.signers[4];
        const price = BigInt(3e18)

        const tx0 = await SwapTestUpgradeable.mintContract.connect(account).setApprovalForAll(SwapTestUpgradeable.swapContract.address, true);
        await tx0.wait();

        const tx1 = await SwapTestUpgradeable.swapContract.connect(account).list(account.address, 0, 3, price)
        await tx1.wait();

        const tx2 = await SwapTestUpgradeable.swapContract.connect(SwapTestUpgradeable.signers[0]).cancelListing(3);
        await tx2.wait();

        expect((await SwapTestUpgradeable.swapContract.getSwap(3)).state)
            .to.equal(0);
    }

    @test
    public async shouldNotPauseContractByNotOwner(): Promise<void> {
        await expect(SwapTestUpgradeable.swapContract.connect(SwapTestUpgradeable.signers[1]).pause()).to.be.revertedWith("Ownable: caller is not the owner")
    }

    @test
    public async shouldPauseContractByOwner(): Promise<void> {
        const tx = await SwapTestUpgradeable.swapContract.pause();
        await tx.wait();

        expect(await SwapTestUpgradeable.swapContract.paused()).to.be.true;
    }

    @test
    public async shouldNotListOnPausedContract(): Promise<void> {
        await expect(SwapTestUpgradeable.swapContract.list(SwapTestUpgradeable.signers[1].address, 0, 2, 200))
            .to.be.revertedWith("Pausable: paused");
    }

    @test
    public async shouldNotCancelListingOnPausedContract(): Promise<void> {
        await expect(SwapTestUpgradeable.swapContract.cancelListing(2))
            .to.be.revertedWith("Pausable: paused");
    }

    @test
    public async shouldNotCollectOnPausedContract(): Promise<void> {
        await expect(SwapTestUpgradeable.swapContract.collect(2, 1))
            .to.be.revertedWith("Pausable: paused");
    }

    @test
    public async shouldNotUnPauseContractByNotOwner(): Promise<void> {
        await expect(SwapTestUpgradeable.swapContract.connect(SwapTestUpgradeable.signers[1]).unpause()).to.be.revertedWith("Ownable: caller is not the owner")
    }

    @test
    public async shouldUnPauseContractByOwner(): Promise<void> {
        const tx = await SwapTestUpgradeable.swapContract.unpause();
        await tx.wait();

        expect(await SwapTestUpgradeable.swapContract.paused()).to.be.false;
    }

    @test
    public async shouldNotTransferOwnershipByNotOwner(): Promise<void> {
        await expect(SwapTestUpgradeable.swapContract.connect(SwapTestUpgradeable.signers[1]).transferOwnership(SwapTestUpgradeable.signers[1].address))
            .to.be.revertedWith("Ownable: caller is not the owner")
    }

    @test
    public async shouldTransferOwnershipByOwner(): Promise<void> {
        const tx = await SwapTestUpgradeable.swapContract.transferOwnership(SwapTestUpgradeable.signers[5].address);
        await tx.wait();

        expect(await SwapTestUpgradeable.swapContract.owner()).to.equal(SwapTestUpgradeable.signers[5].address);
    }

    @test
    public async shouldNotRenounceOwnershipByNotOwner(): Promise<void> {
        await expect(SwapTestUpgradeable.swapContract.renounceOwnership())
            .to.be.revertedWith("Ownable: caller is not the owner")
    }

    @test
    public async shouldRenounceOwnershipByOwner(): Promise<void> {
        const tx = await SwapTestUpgradeable.swapContract.connect(SwapTestUpgradeable.signers[5]).renounceOwnership();
        await tx.wait();

        expect(await SwapTestUpgradeable.swapContract.owner()).to.equal("0x" + "0".repeat(40));
    }

    @test
    public async shouldBeUpgraded(): Promise<void> {
        const deployer: Deployer = new Deployer("XarbSwapUpgradeableTestV2");
        await deployer.upgradeContract(SwapTestUpgradeable.swapContract.address);
        const factory: ContractFactory = await deployer.getContractFactory();
        const contract: XarbSwapUpgradeableTestV2 = factory.attach(SwapTestUpgradeable.swapContract.address) as XarbSwapUpgradeableTestV2;

        expect(await contract.getSwapVersion()).to.equal(BigNumber.from(2));
    }
}