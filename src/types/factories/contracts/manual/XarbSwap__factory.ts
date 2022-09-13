/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  BigNumberish,
  Overrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  XarbSwap,
  XarbSwapInterface,
} from "../../../contracts/manual/XarbSwap";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "mintAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "commission",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "editions",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "buyer",
        type: "address",
      },
    ],
    name: "Collected",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "fee",
        type: "uint256",
      },
    ],
    name: "ContractFeeChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "feeReceiver",
        type: "address",
      },
    ],
    name: "ContractFeeReceiverAddressChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "creator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "tokenOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "Listed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "ListingCanceled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "swapId",
        type: "uint256",
      },
    ],
    name: "cancelListing",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "mintAddress",
        type: "address",
      },
    ],
    name: "changeMintAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "swapId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "editions",
        type: "uint256",
      },
    ],
    name: "collect",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "getContractFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getContractFeeReceiverAddress",
    outputs: [
      {
        internalType: "address payable",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getMintAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "swapId",
        type: "uint256",
      },
    ],
    name: "getSwap",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "creator",
            type: "address",
          },
          {
            internalType: "address",
            name: "tokenOwner",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "amountLeft",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
          {
            internalType: "enum Listable.SwapState",
            name: "state",
            type: "uint8",
          },
        ],
        internalType: "struct Listable.Swap",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenOwner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "list",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_fee",
        type: "uint256",
      },
    ],
    name: "setContractFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "_feeReceiver",
        type: "address",
      },
    ],
    name: "setContractFeeReceiverAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "unpause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162003823380380620038238339818101604052810190620000379190620003ae565b80620000586200004c6200016560201b60201c565b6200016d60201b60201c565b806001819055506200006f6200016560201b60201c565b600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055507ff7823bf5c64a3b328298a4ccbee35e1e1001835cc78be82dfb49f9ba7b5d900d81604051620000e0919062000477565b60405180910390a17f5d700e8cb23224f26609028d6b2841628e3a71350dc4cb8dddf2083d696e57f2620001196200016560201b60201c565b60405162000128919062000438565b60405180910390a1506000600660006101000a81548160ff0219169083151502179055506200015d826200023160201b60201c565b505062000540565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b62000241620002c660201b60201c565b80600760006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600660016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b620002d66200016560201b60201c565b73ffffffffffffffffffffffffffffffffffffffff16620002fc6200035760201b60201c565b73ffffffffffffffffffffffffffffffffffffffff161462000355576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016200034c9062000455565b60405180910390fd5b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60008151905062000391816200050c565b92915050565b600081519050620003a88162000526565b92915050565b60008060408385031215620003c257600080fd5b6000620003d28582860162000380565b9250506020620003e58582860162000397565b9150509250929050565b620003fa81620004a5565b82525050565b60006200040f60208362000494565b91506200041c82620004e3565b602082019050919050565b6200043281620004d9565b82525050565b60006020820190506200044f6000830184620003ef565b92915050565b60006020820190508181036000830152620004708162000400565b9050919050565b60006020820190506200048e600083018462000427565b92915050565b600082825260208201905092915050565b6000620004b282620004b9565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b6200051781620004a5565b81146200052357600080fd5b50565b6200053181620004d9565b81146200053d57600080fd5b50565b6132d380620005506000396000f3fe6080604052600436106100f35760003560e01c8063715018a61161008a578063917c43c511610059578063917c43c5146102ca578063bb74a1c2146102f5578063cfa6f8271461031e578063f2fde38b1461033a576100f3565b8063715018a614610248578063722ddf701461025f5780638456cb59146102885780638da5cb5b1461029f576100f3565b80634a0d89ba116100c65780634a0d89ba1461018c5780634aa67d31146101c95780634e688973146101f25780635c975abb1461021d576100f3565b80631ea9fd8d146100f8578063236d3c9814610123578063305a67a81461014c5780633f4ba83a14610175575b600080fd5b34801561010457600080fd5b5061010d610363565b60405161011a9190612615565b60405180910390f35b34801561012f57600080fd5b5061014a6004803603810190610145919061207e565b61038d565b005b34801561015857600080fd5b50610173600480360381019061016e919061219d565b61041a565b005b34801561018157600080fd5b5061018a610675565b005b34801561019857600080fd5b506101b360048036038101906101ae919061219d565b610687565b6040516101c0919061294c565b60405180910390f35b3480156101d557600080fd5b506101f060048036038101906101eb919061219d565b610868565b005b3480156101fe57600080fd5b506102076108b1565b60405161021491906125df565b60405180910390f35b34801561022957600080fd5b506102326108db565b60405161023f9190612711565b60405180910390f35b34801561025457600080fd5b5061025d6108f2565b005b34801561026b57600080fd5b50610286600480360381019061028191906120a7565b610906565b005b34801561029457600080fd5b5061029d610989565b005b3480156102ab57600080fd5b506102b461099b565b6040516102c191906125df565b60405180910390f35b3480156102d657600080fd5b506102df6109c4565b6040516102ec9190612967565b60405180910390f35b34801561030157600080fd5b5061031c600480360381019061031791906120d0565b6109ce565b005b610338600480360381019061033391906121ef565b610d69565b005b34801561034657600080fd5b50610361600480360381019061035c919061207e565b6110d5565b005b6000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b610395611159565b80600760006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600660016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b6104226111d7565b600061042d82610687565b905060016002811115610469577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b8160c0015160028111156104a6577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b146104e6576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104dd9061290c565b60405180910390fd5b6000600660019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663e985e9c58360200151610533611221565b6040518363ffffffff1660e01b8152600401610550929190612630565b60206040518083038186803b15801561056857600080fd5b505afa15801561057c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105a09190612174565b905080806105e457506105b1611221565b73ffffffffffffffffffffffffffffffffffffffff16826020015173ffffffffffffffffffffffffffffffffffffffff16145b8061062857506105f261099b565b73ffffffffffffffffffffffffffffffffffffffff16610610611221565b73ffffffffffffffffffffffffffffffffffffffff16145b610667576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161065e9061280c565b60405180910390fd5b61067083611229565b505050565b61067d611159565b61068561147a565b565b61068f611e7d565b60006003600084815260200190815260200160002060030154116106e8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106df9061278c565b60405180910390fd5b600360008381526020019081526020016000206040518060e00160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001600282015481526020016003820154815260200160048201548152602001600582015481526020016006820160009054906101000a900460ff166002811115610825577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b600281111561085d577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b815250509050919050565b610870611159565b806001819055507ff7823bf5c64a3b328298a4ccbee35e1e1001835cc78be82dfb49f9ba7b5d900d816040516108a69190612967565b60405180910390a150565b6000600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6000600660009054906101000a900460ff16905090565b6108fa611159565b61090460006114dd565b565b61090e611159565b80600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055507f5d700e8cb23224f26609028d6b2841628e3a71350dc4cb8dddf2083d696e57f28160405161097e91906125fa565b60405180910390a150565b610991611159565b6109996115a1565b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6000600154905090565b6109d66111d7565b6000811180156109e65750600082115b610a25576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a1c9061288c565b60405180910390fd5b600660019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663e985e9c585306040518363ffffffff1660e01b8152600401610a82929190612630565b60206040518083038186803b158015610a9a57600080fd5b505afa158015610aae573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ad29190612174565b610b11576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b089061286c565b60405180910390fd5b6000600660019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663e985e9c586610b5a611221565b6040518363ffffffff1660e01b8152600401610b77929190612630565b60206040518083038186803b158015610b8f57600080fd5b505afa158015610ba3573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bc79190612174565b90508080610c075750610bd8611221565b73ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff16145b610c46576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c3d906127ec565b60405180910390fd5b6000600660019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1662fdd58e87876040518363ffffffff1660e01b8152600401610ca49291906126b1565b60206040518083038186803b158015610cbc57600080fd5b505afa158015610cd0573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610cf491906121c6565b905083610d018787611604565b82610d0c9190612ae1565b1015610d4d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d449061274c565b60405180910390fd5b610d61610d58611221565b8787878761165f565b505050505050565b610d716111d7565b6000610d7c83610687565b905060016002811115610db8577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b8160c001516002811115610df5577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b14610e35576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e2c906128ac565b60405180910390fd5b8181608001511015610e7c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e739061292c565b60405180910390fd5b610e84611221565b73ffffffffffffffffffffffffffffffffffffffff16816020015173ffffffffffffffffffffffffffffffffffffffff161415610ef6576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610eed906128ec565b60405180910390fd5b818160a00151610f069190612a87565b341015610f48576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f3f9061284c565b60405180910390fd5b6000600660019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb3bafd683604001516040518263ffffffff1660e01b8152600401610fa99190612967565b60006040518083038186803b158015610fc157600080fd5b505afa158015610fd5573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f82011682018060405250810190610ffe9190612133565b905061101b82848361100e610363565b6110166109c4565b6118fd565b600660019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663f242432a8360200151611066611221565b8560400151876040518563ffffffff1660e01b815260040161108b9493929190612659565b600060405180830381600087803b1580156110a557600080fd5b505af11580156110b9573d6000803e3d6000fd5b505050506110cf84846110ca611221565b611a8a565b50505050565b6110dd611159565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141561114d576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016111449061276c565b60405180910390fd5b611156816114dd565b50565b611161611221565b73ffffffffffffffffffffffffffffffffffffffff1661117f61099b565b73ffffffffffffffffffffffffffffffffffffffff16146111d5576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016111cc906128cc565b60405180910390fd5b565b6111df6108db565b1561121f576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016112169061282c565b60405180910390fd5b565b600033905090565b600061123482610687565b905060008160c001906002811115611275577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b908160028111156112af577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b81525050806080015160046000836040015181526020019081526020016000206000836020015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825461131f9190612ae1565b92505081905550806003600084815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060408201518160020155606082015181600301556080820151816004015560a0820151816005015560c08201518160060160006101000a81548160ff02191690836002811115611441577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b0217905550905050817f5d7a33421ffa4bc07eb8929c5ace6393d3aa5ec3775e4e2f442527876b7dbe8860405160405180910390a25050565b611482611d1c565b6000600660006101000a81548160ff0219169083151502179055507f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa6114c6611221565b6040516114d391906125df565b60405180910390a1565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b6115a96111d7565b6001600660006101000a81548160ff0219169083151502179055507f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a2586115ed611221565b6040516115fa91906125df565b60405180910390a1565b60006004600083815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b60006040518060e001604052808773ffffffffffffffffffffffffffffffffffffffff1681526020018673ffffffffffffffffffffffffffffffffffffffff168152602001858152602001848152602001848152602001838152602001600160028111156116f6577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b8152509050806003600061170a6005611d65565b815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060408201518160020155606082015181600301556080820151816004015560a0820151816005015560c08201518160060160006101000a81548160ff0219169083600281111561181f577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b0217905550905050826004600086815260200190815260200160002060008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546118879190612a00565b92505081905550838573ffffffffffffffffffffffffffffffffffffffff166118b06005611d65565b7f1d2286580411f12056775bf9e0fd10101148b09a6fca67c9f426fb113a28d1f88987876040516118e3939291906126da565b60405180910390a46118f56005611d73565b505050505050565b6000806103e8868860a00151856119149190612a87565b61191e9190612a87565b6119289190612a56565b90506119348482611d89565b80826119409190612a00565b915060005b8551811015611a2b576103e8878960a00151888481518110611990577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6020026020010151602001516119a69190612a87565b6119b09190612a87565b6119ba9190612a56565b9150611a0a8682815181106119f8577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200260200101516000015183611d89565b8183611a169190612a00565b92508080611a2390612bfb565b915050611945565b5081868860a00151611a3d9190612a87565b611a479190612ae1565b9050611a57876020015182611d89565b8082611a639190612a00565b9150611a81611a70611221565b8334611a7c9190612ae1565b611d89565b50505050505050565b6000611a9584610687565b90508281608001818151611aa99190612ae1565b91508181525050806080015160046000836040015181526020019081526020016000206000836020015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254611b1c9190612ae1565b92505081905550600081608001511415611bae5760028160c001906002811115611b6f577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b90816002811115611ba9577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b815250505b806003600086815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060408201518160020155606082015181600301556080820151816004015560a0820151816005015560c08201518160060160006101000a81548160ff02191690836002811115611cc9577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b02179055509050508173ffffffffffffffffffffffffffffffffffffffff1683857fb0de109099d11f8674e8f0213cf49c17049064e696cab228f29e213bbbf11ca160405160405180910390a450505050565b611d246108db565b611d63576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611d5a9061272c565b60405180910390fd5b565b600081600001549050919050565b6001816000016000828254019250508190555050565b80471015611dcc576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611dc3906127cc565b60405180910390fd5b60008273ffffffffffffffffffffffffffffffffffffffff1682604051611df2906125ca565b60006040518083038185875af1925050503d8060008114611e2f576040519150601f19603f3d011682016040523d82523d6000602084013e611e34565b606091505b5050905080611e78576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611e6f906127ac565b60405180910390fd5b505050565b6040518060e00160405280600073ffffffffffffffffffffffffffffffffffffffff168152602001600073ffffffffffffffffffffffffffffffffffffffff1681526020016000815260200160008152602001600081526020016000815260200160006002811115611f18577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b81525090565b6000611f31611f2c846129a7565b612982565b90508083825260208201905082856040860282011115611f5057600080fd5b60005b85811015611f805781611f668882612008565b845260208401935060408301925050600181019050611f53565b5050509392505050565b600081359050611f9981613241565b92915050565b600081359050611fae81613258565b92915050565b600081519050611fc381613258565b92915050565b600082601f830112611fda57600080fd5b8151611fea848260208601611f1e565b91505092915050565b6000815190506120028161326f565b92915050565b60006040828403121561201a57600080fd5b6120246040612982565b9050600061203484828501611fb4565b600083015250602061204884828501612069565b60208301525092915050565b60008135905061206381613286565b92915050565b60008151905061207881613286565b92915050565b60006020828403121561209057600080fd5b600061209e84828501611f8a565b91505092915050565b6000602082840312156120b957600080fd5b60006120c784828501611f9f565b91505092915050565b600080600080608085870312156120e657600080fd5b60006120f487828801611f8a565b945050602061210587828801612054565b935050604061211687828801612054565b925050606061212787828801612054565b91505092959194509250565b60006020828403121561214557600080fd5b600082015167ffffffffffffffff81111561215f57600080fd5b61216b84828501611fc9565b91505092915050565b60006020828403121561218657600080fd5b600061219484828501611ff3565b91505092915050565b6000602082840312156121af57600080fd5b60006121bd84828501612054565b91505092915050565b6000602082840312156121d857600080fd5b60006121e684828501612069565b91505092915050565b6000806040838503121561220257600080fd5b600061221085828601612054565b925050602061222185828601612054565b9150509250929050565b61223481612b82565b82525050565b61224381612b27565b82525050565b61225281612b15565b82525050565b61226181612b15565b82525050565b61227081612b39565b82525050565b61227f81612b94565b82525050565b60006122926014836129ef565b915061229d82612d11565b602082019050919050565b60006122b56030836129ef565b91506122c082612d3a565b604082019050919050565b60006122d86026836129ef565b91506122e382612d89565b604082019050919050565b60006122fb6022836129ef565b915061230682612dd8565b604082019050919050565b600061231e603a836129ef565b915061232982612e27565b604082019050919050565b6000612341601d836129ef565b915061234c82612e76565b602082019050919050565b60006123646030836129ef565b915061236f82612e9f565b604082019050919050565b60006123876030836129ef565b915061239282612eee565b604082019050919050565b60006123aa6010836129ef565b91506123b582612f3d565b602082019050919050565b60006123cd601d836129ef565b91506123d882612f66565b602082019050919050565b60006123f0604c836129ef565b91506123fb82612f8f565b606082019050919050565b60006124136034836129ef565b915061241e82613004565b604082019050919050565b60006124366047836129ef565b915061244182613053565b606082019050919050565b60006124596020836129ef565b9150612464826130c8565b602082019050919050565b600061247c6056836129ef565b9150612487826130f1565b606082019050919050565b600061249f6000836129d3565b91506124aa82613166565b600082019050919050565b60006124c26000836129e4565b91506124cd82613166565b600082019050919050565b60006124e56047836129ef565b91506124f082613169565b606082019050919050565b6000612508602c836129ef565b9150612513826131de565b604082019050919050565b60e0820160008201516125346000850182612249565b5060208201516125476020850182612249565b50604082015161255a60408501826125ac565b50606082015161256d60608501826125ac565b50608082015161258060808501826125ac565b5060a082015161259360a08501826125ac565b5060c08201516125a660c0850182612276565b50505050565b6125b581612b78565b82525050565b6125c481612b78565b82525050565b60006125d5826124b5565b9150819050919050565b60006020820190506125f46000830184612258565b92915050565b600060208201905061260f600083018461222b565b92915050565b600060208201905061262a600083018461223a565b92915050565b60006040820190506126456000830185612258565b6126526020830184612258565b9392505050565b600060a08201905061266e6000830187612258565b61267b6020830186612258565b61268860408301856125bb565b61269560608301846125bb565b81810360808301526126a681612492565b905095945050505050565b60006040820190506126c66000830185612258565b6126d360208301846125bb565b9392505050565b60006060820190506126ef6000830186612258565b6126fc60208301856125bb565b61270960408301846125bb565b949350505050565b60006020820190506127266000830184612267565b92915050565b6000602082019050818103600083015261274581612285565b9050919050565b60006020820190508181036000830152612765816122a8565b9050919050565b60006020820190508181036000830152612785816122cb565b9050919050565b600060208201905081810360008301526127a5816122ee565b9050919050565b600060208201905081810360008301526127c581612311565b9050919050565b600060208201905081810360008301526127e581612334565b9050919050565b6000602082019050818103600083015261280581612357565b9050919050565b600060208201905081810360008301526128258161237a565b9050919050565b600060208201905081810360008301526128458161239d565b9050919050565b60006020820190508181036000830152612865816123c0565b9050919050565b60006020820190508181036000830152612885816123e3565b9050919050565b600060208201905081810360008301526128a581612406565b9050919050565b600060208201905081810360008301526128c581612429565b9050919050565b600060208201905081810360008301526128e58161244c565b9050919050565b600060208201905081810360008301526129058161246f565b9050919050565b60006020820190508181036000830152612925816124d8565b9050919050565b60006020820190508181036000830152612945816124fb565b9050919050565b600060e082019050612961600083018461251e565b92915050565b600060208201905061297c60008301846125bb565b92915050565b600061298c61299d565b90506129988282612bca565b919050565b6000604051905090565b600067ffffffffffffffff8211156129c2576129c1612cd1565b5b602082029050602081019050919050565b600082825260208201905092915050565b600081905092915050565b600082825260208201905092915050565b6000612a0b82612b78565b9150612a1683612b78565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115612a4b57612a4a612c44565b5b828201905092915050565b6000612a6182612b78565b9150612a6c83612b78565b925082612a7c57612a7b612c73565b5b828204905092915050565b6000612a9282612b78565b9150612a9d83612b78565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0483118215151615612ad657612ad5612c44565b5b828202905092915050565b6000612aec82612b78565b9150612af783612b78565b925082821015612b0a57612b09612c44565b5b828203905092915050565b6000612b2082612b58565b9050919050565b6000612b3282612b58565b9050919050565b60008115159050919050565b6000819050612b538261322d565b919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b6000612b8d82612ba6565b9050919050565b6000612b9f82612b45565b9050919050565b6000612bb182612bb8565b9050919050565b6000612bc382612b58565b9050919050565b612bd382612d00565b810181811067ffffffffffffffff82111715612bf257612bf1612cd1565b5b80604052505050565b6000612c0682612b78565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff821415612c3957612c38612c44565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b7f5061757361626c653a206e6f7420706175736564000000000000000000000000600082015250565b7f58617262537761703a204c69737420616d6f756e742065786365656473206e6f60008201527f74206c69737465642062616c616e636500000000000000000000000000000000602082015250565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b7f4c69737461626c653a20546869732073776170206973206e6f7420657869737460008201527f6564000000000000000000000000000000000000000000000000000000000000602082015250565b7f416464726573733a20756e61626c6520746f2073656e642076616c75652c207260008201527f6563697069656e74206d61792068617665207265766572746564000000000000602082015250565b7f416464726573733a20696e73756666696369656e742062616c616e6365000000600082015250565b7f58617262537761703a2063616c6c6572206973206e6f7420746f6b656e206f7760008201527f6e6572206e6f7220617070726f76656400000000000000000000000000000000602082015250565b7f4c69737461626c653a2063616c6c6572206973206e6f7420746f6b656e206f7760008201527f6e6572206e6f7220617070726f76656400000000000000000000000000000000602082015250565b7f5061757361626c653a2070617573656400000000000000000000000000000000600082015250565b7f58617262537761703a20496e73756666696369656e7420637265646974000000600082015250565b7f58617262537761703a20436f6e7472616374206973206e6f7420617070726f7660008201527f656420666f72206d616e6167696e6720746f6b656e73206f776e65642062792060208201527f7468697320616464726573730000000000000000000000000000000000000000604082015250565b7f58617262537761703a20426f746820707269636520616e642073776170206d7560008201527f73742062652067726561746572207468616e2030000000000000000000000000602082015250565b7f58617262537761703a2053656c6563746564206c697374696e67206973206e6f60008201527f7420657869737465642c20616c72656164792063616e63656c6564206f72206660208201527f696e697368656400000000000000000000000000000000000000000000000000604082015250565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b7f58617262537761703a2043616e6e6f7420636f6c6c6563742066726f6d20612060008201527f737761702077686963682069732063726561746564206279207468652073616d60208201527f65206164647265737320617320636f6c6c6563746f7200000000000000000000604082015250565b50565b7f4c69737461626c653a2053656c6563746564206c697374696e67206973206e6f60008201527f7420657869737465642c20616c72656164792063616e63656c6564206f72206660208201527f696e697368656400000000000000000000000000000000000000000000000000604082015250565b7f58617262537761703a20436f6c6c65637420616d6f756e74206578636565647360008201527f20616d6f756e74206c6566740000000000000000000000000000000000000000602082015250565b6003811061323e5761323d612ca2565b5b50565b61324a81612b15565b811461325557600080fd5b50565b61326181612b27565b811461326c57600080fd5b50565b61327881612b39565b811461328357600080fd5b50565b61328f81612b78565b811461329a57600080fd5b5056fea26469706673582212201d3ff9a1633eb1afed97d8a220cee73a4a318e4738f15caba21a97e8cf46794b64736f6c63430008040033";

type XarbSwapConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: XarbSwapConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class XarbSwap__factory extends ContractFactory {
  constructor(...args: XarbSwapConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    mintAddress: PromiseOrValue<string>,
    commission: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<XarbSwap> {
    return super.deploy(
      mintAddress,
      commission,
      overrides || {}
    ) as Promise<XarbSwap>;
  }
  override getDeployTransaction(
    mintAddress: PromiseOrValue<string>,
    commission: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(mintAddress, commission, overrides || {});
  }
  override attach(address: string): XarbSwap {
    return super.attach(address) as XarbSwap;
  }
  override connect(signer: Signer): XarbSwap__factory {
    return super.connect(signer) as XarbSwap__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): XarbSwapInterface {
    return new utils.Interface(_abi) as XarbSwapInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): XarbSwap {
    return new Contract(address, _abi, signerOrProvider) as XarbSwap;
  }
}