/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../common";

export declare namespace ListableUpgradeable {
  export type SwapStruct = {
    creator: PromiseOrValue<string>;
    tokenOwner: PromiseOrValue<string>;
    tokenId: PromiseOrValue<BigNumberish>;
    amount: PromiseOrValue<BigNumberish>;
    amountLeft: PromiseOrValue<BigNumberish>;
    price: PromiseOrValue<BigNumberish>;
    state: PromiseOrValue<BigNumberish>;
  };

  export type SwapStructOutput = [
    string,
    string,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    number
  ] & {
    creator: string;
    tokenOwner: string;
    tokenId: BigNumber;
    amount: BigNumber;
    amountLeft: BigNumber;
    price: BigNumber;
    state: number;
  };
}

export interface XarbSwapUpgradeableInterface extends utils.Interface {
  functions: {
    "cancelListing(uint256)": FunctionFragment;
    "changeMintAddress(address)": FunctionFragment;
    "collect(uint256,uint256)": FunctionFragment;
    "getContractFee()": FunctionFragment;
    "getContractFeeReceiverAddress()": FunctionFragment;
    "getMintAddress()": FunctionFragment;
    "getSwap(uint256)": FunctionFragment;
    "initialize(address,uint256)": FunctionFragment;
    "list(address,uint256,uint256,uint256)": FunctionFragment;
    "owner()": FunctionFragment;
    "pause()": FunctionFragment;
    "paused()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "setContractFee(uint256)": FunctionFragment;
    "setContractFeeReceiverAddress(address)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "unpause()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "cancelListing"
      | "changeMintAddress"
      | "collect"
      | "getContractFee"
      | "getContractFeeReceiverAddress"
      | "getMintAddress"
      | "getSwap"
      | "initialize"
      | "list"
      | "owner"
      | "pause"
      | "paused"
      | "renounceOwnership"
      | "setContractFee"
      | "setContractFeeReceiverAddress"
      | "transferOwnership"
      | "unpause"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "cancelListing",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "changeMintAddress",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "collect",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getContractFee",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getContractFeeReceiverAddress",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getMintAddress",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getSwap",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "list",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(functionFragment: "pause", values?: undefined): string;
  encodeFunctionData(functionFragment: "paused", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setContractFee",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "setContractFeeReceiverAddress",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "unpause", values?: undefined): string;

  decodeFunctionResult(
    functionFragment: "cancelListing",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "changeMintAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "collect", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getContractFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getContractFeeReceiverAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getMintAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getSwap", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "list", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "pause", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "paused", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setContractFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setContractFeeReceiverAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "unpause", data: BytesLike): Result;

  events: {
    "Collected(uint256,uint256,address)": EventFragment;
    "ContractFeeChanged(uint256)": EventFragment;
    "ContractFeeReceiverAddressChanged(address)": EventFragment;
    "Initialized(uint8)": EventFragment;
    "Listed(uint256,address,address,uint256,uint256,uint256)": EventFragment;
    "ListingCanceled(uint256)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "Paused(address)": EventFragment;
    "Unpaused(address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Collected"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ContractFeeChanged"): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "ContractFeeReceiverAddressChanged"
  ): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Initialized"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Listed"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ListingCanceled"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Paused"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Unpaused"): EventFragment;
}

export interface CollectedEventObject {
  id: BigNumber;
  editions: BigNumber;
  buyer: string;
}
export type CollectedEvent = TypedEvent<
  [BigNumber, BigNumber, string],
  CollectedEventObject
>;

export type CollectedEventFilter = TypedEventFilter<CollectedEvent>;

export interface ContractFeeChangedEventObject {
  fee: BigNumber;
}
export type ContractFeeChangedEvent = TypedEvent<
  [BigNumber],
  ContractFeeChangedEventObject
>;

export type ContractFeeChangedEventFilter =
  TypedEventFilter<ContractFeeChangedEvent>;

export interface ContractFeeReceiverAddressChangedEventObject {
  feeReceiver: string;
}
export type ContractFeeReceiverAddressChangedEvent = TypedEvent<
  [string],
  ContractFeeReceiverAddressChangedEventObject
>;

export type ContractFeeReceiverAddressChangedEventFilter =
  TypedEventFilter<ContractFeeReceiverAddressChangedEvent>;

export interface InitializedEventObject {
  version: number;
}
export type InitializedEvent = TypedEvent<[number], InitializedEventObject>;

export type InitializedEventFilter = TypedEventFilter<InitializedEvent>;

export interface ListedEventObject {
  id: BigNumber;
  creator: string;
  tokenOwner: string;
  tokenId: BigNumber;
  amount: BigNumber;
  price: BigNumber;
}
export type ListedEvent = TypedEvent<
  [BigNumber, string, string, BigNumber, BigNumber, BigNumber],
  ListedEventObject
>;

export type ListedEventFilter = TypedEventFilter<ListedEvent>;

export interface ListingCanceledEventObject {
  id: BigNumber;
}
export type ListingCanceledEvent = TypedEvent<
  [BigNumber],
  ListingCanceledEventObject
>;

export type ListingCanceledEventFilter = TypedEventFilter<ListingCanceledEvent>;

export interface OwnershipTransferredEventObject {
  previousOwner: string;
  newOwner: string;
}
export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  OwnershipTransferredEventObject
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export interface PausedEventObject {
  account: string;
}
export type PausedEvent = TypedEvent<[string], PausedEventObject>;

export type PausedEventFilter = TypedEventFilter<PausedEvent>;

export interface UnpausedEventObject {
  account: string;
}
export type UnpausedEvent = TypedEvent<[string], UnpausedEventObject>;

export type UnpausedEventFilter = TypedEventFilter<UnpausedEvent>;

export interface XarbSwapUpgradeable extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: XarbSwapUpgradeableInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    cancelListing(
      swapId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    changeMintAddress(
      mintAddress: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    collect(
      swapId: PromiseOrValue<BigNumberish>,
      editions: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getContractFee(overrides?: CallOverrides): Promise<[BigNumber]>;

    getContractFeeReceiverAddress(overrides?: CallOverrides): Promise<[string]>;

    getMintAddress(overrides?: CallOverrides): Promise<[string]>;

    getSwap(
      swapId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[ListableUpgradeable.SwapStructOutput]>;

    initialize(
      mintAddress: PromiseOrValue<string>,
      commission: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    list(
      tokenOwner: PromiseOrValue<string>,
      tokenId: PromiseOrValue<BigNumberish>,
      amount: PromiseOrValue<BigNumberish>,
      price: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    pause(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    paused(overrides?: CallOverrides): Promise<[boolean]>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setContractFee(
      _fee: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setContractFeeReceiverAddress(
      _feeReceiver: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    unpause(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  cancelListing(
    swapId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  changeMintAddress(
    mintAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  collect(
    swapId: PromiseOrValue<BigNumberish>,
    editions: PromiseOrValue<BigNumberish>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getContractFee(overrides?: CallOverrides): Promise<BigNumber>;

  getContractFeeReceiverAddress(overrides?: CallOverrides): Promise<string>;

  getMintAddress(overrides?: CallOverrides): Promise<string>;

  getSwap(
    swapId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<ListableUpgradeable.SwapStructOutput>;

  initialize(
    mintAddress: PromiseOrValue<string>,
    commission: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  list(
    tokenOwner: PromiseOrValue<string>,
    tokenId: PromiseOrValue<BigNumberish>,
    amount: PromiseOrValue<BigNumberish>,
    price: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  owner(overrides?: CallOverrides): Promise<string>;

  pause(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  paused(overrides?: CallOverrides): Promise<boolean>;

  renounceOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setContractFee(
    _fee: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setContractFeeReceiverAddress(
    _feeReceiver: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  unpause(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    cancelListing(
      swapId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    changeMintAddress(
      mintAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    collect(
      swapId: PromiseOrValue<BigNumberish>,
      editions: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    getContractFee(overrides?: CallOverrides): Promise<BigNumber>;

    getContractFeeReceiverAddress(overrides?: CallOverrides): Promise<string>;

    getMintAddress(overrides?: CallOverrides): Promise<string>;

    getSwap(
      swapId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<ListableUpgradeable.SwapStructOutput>;

    initialize(
      mintAddress: PromiseOrValue<string>,
      commission: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    list(
      tokenOwner: PromiseOrValue<string>,
      tokenId: PromiseOrValue<BigNumberish>,
      amount: PromiseOrValue<BigNumberish>,
      price: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    owner(overrides?: CallOverrides): Promise<string>;

    pause(overrides?: CallOverrides): Promise<void>;

    paused(overrides?: CallOverrides): Promise<boolean>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    setContractFee(
      _fee: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    setContractFeeReceiverAddress(
      _feeReceiver: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    unpause(overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    "Collected(uint256,uint256,address)"(
      id?: PromiseOrValue<BigNumberish> | null,
      editions?: PromiseOrValue<BigNumberish> | null,
      buyer?: PromiseOrValue<string> | null
    ): CollectedEventFilter;
    Collected(
      id?: PromiseOrValue<BigNumberish> | null,
      editions?: PromiseOrValue<BigNumberish> | null,
      buyer?: PromiseOrValue<string> | null
    ): CollectedEventFilter;

    "ContractFeeChanged(uint256)"(fee?: null): ContractFeeChangedEventFilter;
    ContractFeeChanged(fee?: null): ContractFeeChangedEventFilter;

    "ContractFeeReceiverAddressChanged(address)"(
      feeReceiver?: null
    ): ContractFeeReceiverAddressChangedEventFilter;
    ContractFeeReceiverAddressChanged(
      feeReceiver?: null
    ): ContractFeeReceiverAddressChangedEventFilter;

    "Initialized(uint8)"(version?: null): InitializedEventFilter;
    Initialized(version?: null): InitializedEventFilter;

    "Listed(uint256,address,address,uint256,uint256,uint256)"(
      id?: PromiseOrValue<BigNumberish> | null,
      creator?: null,
      tokenOwner?: PromiseOrValue<string> | null,
      tokenId?: PromiseOrValue<BigNumberish> | null,
      amount?: null,
      price?: null
    ): ListedEventFilter;
    Listed(
      id?: PromiseOrValue<BigNumberish> | null,
      creator?: null,
      tokenOwner?: PromiseOrValue<string> | null,
      tokenId?: PromiseOrValue<BigNumberish> | null,
      amount?: null,
      price?: null
    ): ListedEventFilter;

    "ListingCanceled(uint256)"(
      id?: PromiseOrValue<BigNumberish> | null
    ): ListingCanceledEventFilter;
    ListingCanceled(
      id?: PromiseOrValue<BigNumberish> | null
    ): ListingCanceledEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;

    "Paused(address)"(account?: null): PausedEventFilter;
    Paused(account?: null): PausedEventFilter;

    "Unpaused(address)"(account?: null): UnpausedEventFilter;
    Unpaused(account?: null): UnpausedEventFilter;
  };

  estimateGas: {
    cancelListing(
      swapId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    changeMintAddress(
      mintAddress: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    collect(
      swapId: PromiseOrValue<BigNumberish>,
      editions: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getContractFee(overrides?: CallOverrides): Promise<BigNumber>;

    getContractFeeReceiverAddress(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getMintAddress(overrides?: CallOverrides): Promise<BigNumber>;

    getSwap(
      swapId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    initialize(
      mintAddress: PromiseOrValue<string>,
      commission: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    list(
      tokenOwner: PromiseOrValue<string>,
      tokenId: PromiseOrValue<BigNumberish>,
      amount: PromiseOrValue<BigNumberish>,
      price: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    pause(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    paused(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setContractFee(
      _fee: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setContractFeeReceiverAddress(
      _feeReceiver: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    unpause(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    cancelListing(
      swapId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    changeMintAddress(
      mintAddress: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    collect(
      swapId: PromiseOrValue<BigNumberish>,
      editions: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getContractFee(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getContractFeeReceiverAddress(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getMintAddress(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getSwap(
      swapId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    initialize(
      mintAddress: PromiseOrValue<string>,
      commission: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    list(
      tokenOwner: PromiseOrValue<string>,
      tokenId: PromiseOrValue<BigNumberish>,
      amount: PromiseOrValue<BigNumberish>,
      price: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    pause(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    paused(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setContractFee(
      _fee: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setContractFeeReceiverAddress(
      _feeReceiver: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    unpause(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}