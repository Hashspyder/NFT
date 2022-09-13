/**
 * A simple facade for deploying smart contracts using ethers.
 * @author Farbod Shams <farbodshams.2000@gmail.com>
 */

import {ethers, upgrades} from "hardhat";
import {Contract, ContractFactory} from "ethers";
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers";

class Deployer {
    private factory_name: string;
    private signer: SignerWithAddress | undefined;
    private timeout: number;
    private pollingInterval: number;

    public constructor(factory: string, signer?: SignerWithAddress) {
        this.factory_name = factory;
        this.signer = signer;
        this.timeout = 60 * 1e3;
        this.pollingInterval = 5 * 1e3;
    }

    public setSigner(signer: SignerWithAddress): void {
        this.signer = signer;
    }

    public setFactoryName(name: string): void {
        this.factory_name = name;
    }

    public setTimeout(ms: number): void {
        this.timeout = ms;
    }

    public setPollingInterval(ms: number): void {
        this.pollingInterval = ms;
    }

    public async getContractFactory(): Promise<ContractFactory> {
        const factory: ContractFactory = await ethers.getContractFactory(this.factory_name);
        if(this.signer)
            factory.connect(this.signer);
        return factory;
    }

    public async deploy(...args: any[]): Promise<Contract> {
        const factory: ContractFactory = await this.getContractFactory();
        const contract: Contract = await factory.deploy(...args);
        await contract.deployed();
        return contract;
    }

    public async deployUpgradable(...args: any[]): Promise<Contract> {
        const factory: ContractFactory = await this.getContractFactory();
        const contract: Contract = await upgrades.deployProxy(factory, args, {
            timeout: this.timeout,
            pollingInterval: this.pollingInterval
        });
        await contract.deployed();
        return contract;
    }

    public async upgradeContract(currentAddress: string): Promise<boolean> {
        const factory: ContractFactory = await this.getContractFactory();
        const contract = await upgrades.upgradeProxy(currentAddress, factory);
        await contract.deployed();
        return true;
    }
}

export default Deployer;