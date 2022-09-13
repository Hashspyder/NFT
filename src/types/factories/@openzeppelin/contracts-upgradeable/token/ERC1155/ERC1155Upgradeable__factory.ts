/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../common";
import type {
  ERC1155Upgradeable,
  ERC1155UpgradeableInterface,
} from "../../../../../@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]",
      },
    ],
    name: "TransferBatch",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "TransferSingle",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "value",
        type: "string",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "URI",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "balanceOf",
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
    inputs: [
      {
        internalType: "address[]",
        name: "accounts",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
    ],
    name: "balanceOfBatch",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
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
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeBatchTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
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
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "uri",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506125f7806100206000396000f3fe608060405234801561001057600080fd5b50600436106100875760003560e01c80634e1273f41161005b5780634e1273f414610138578063a22cb46514610168578063e985e9c514610184578063f242432a146101b457610087565b8062fdd58e1461008c57806301ffc9a7146100bc5780630e89341c146100ec5780632eb2c2d61461011c575b600080fd5b6100a660048036038101906100a19190611826565b6101d0565b6040516100b39190611e20565b60405180910390f35b6100d660048036038101906100d191906118ce565b61029a565b6040516100e39190611cc3565b60405180910390f35b61010660048036038101906101019190611920565b61037c565b6040516101139190611cde565b60405180910390f35b6101366004803603810190610131919061169c565b610410565b005b610152600480360381019061014d9190611862565b6104b1565b60405161015f9190611c6a565b60405180910390f35b610182600480360381019061017d91906117ea565b610662565b005b61019e60048036038101906101999190611660565b610678565b6040516101ab9190611cc3565b60405180910390f35b6101ce60048036038101906101c9919061175b565b61070c565b005b60008073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415610241576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161023890611d60565b60405180910390fd5b6065600083815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b60007fd9b67a26000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916148061036557507f0e89341c000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b806103755750610374826107ad565b5b9050919050565b60606067805461038b9061208f565b80601f01602080910402602001604051908101604052809291908181526020018280546103b79061208f565b80156104045780601f106103d957610100808354040283529160200191610404565b820191906000526020600020905b8154815290600101906020018083116103e757829003601f168201915b50505050509050919050565b610418610817565b73ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff16148061045e575061045d85610458610817565b610678565b5b61049d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161049490611d20565b60405180910390fd5b6104aa858585858561081f565b5050505050565b606081518351146104f7576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104ee90611de0565b60405180910390fd5b6000835167ffffffffffffffff81111561053a577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040519080825280602002602001820160405280156105685781602001602082028036833780820191505090505b50905060005b8451811015610657576106018582815181106105b3577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200260200101518583815181106105f4577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200260200101516101d0565b82828151811061063a577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200260200101818152505080610650906120f2565b905061056e565b508091505092915050565b61067461066d610817565b8383610b90565b5050565b6000606660008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b610714610817565b73ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff16148061075a575061075985610754610817565b610678565b5b610799576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161079090611d20565b60405180910390fd5b6107a68585858585610cfd565b5050505050565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b600033905090565b8151835114610863576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161085a90611e00565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1614156108d3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108ca90611d80565b60405180910390fd5b60006108dd610817565b90506108ed818787878787610f9c565b60005b8451811015610aed576000858281518110610934577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b602002602001015190506000858381518110610979577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6020026020010151905060006065600084815260200190815260200160002060008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015610a1b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a1290611da0565b60405180910390fd5b8181036065600085815260200190815260200160002060008c73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550816065600085815260200190815260200160002060008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610ad29190611f83565b9250508190555050505080610ae6906120f2565b90506108f0565b508473ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167f4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb8787604051610b64929190611c8c565b60405180910390a4610b7a818787878787610fa4565b610b88818787878787610fac565b505050505050565b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415610bff576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610bf690611dc0565b60405180910390fd5b80606660008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c3183604051610cf09190611cc3565b60405180910390a3505050565b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161415610d6d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d6490611d80565b60405180910390fd5b6000610d77610817565b90506000610d8485611193565b90506000610d9185611193565b9050610da1838989858589610f9c565b60006065600088815260200190815260200160002060008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905085811015610e39576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e3090611da0565b60405180910390fd5b8581036065600089815260200190815260200160002060008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550856065600089815260200190815260200160002060008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610ef09190611f83565b925050819055508773ffffffffffffffffffffffffffffffffffffffff168973ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff167fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f628a8a604051610f6d929190611e3b565b60405180910390a4610f83848a8a86868a610fa4565b610f91848a8a8a8a8a611259565b505050505050505050565b505050505050565b505050505050565b610fcb8473ffffffffffffffffffffffffffffffffffffffff16611440565b1561118b578373ffffffffffffffffffffffffffffffffffffffff1663bc197c8187878686866040518663ffffffff1660e01b8152600401611011959493929190611ba8565b602060405180830381600087803b15801561102b57600080fd5b505af192505050801561105c57506040513d601f19601f8201168201806040525081019061105991906118f7565b60015b611102576110686121c8565b806308c379a014156110c5575061107d6124cf565b8061108857506110c7565b806040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016110bc9190611cde565b60405180910390fd5b505b6040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016110f990611d00565b60405180910390fd5b63bc197c8160e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614611189576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161118090611d40565b60405180910390fd5b505b505050505050565b60606000600167ffffffffffffffff8111156111d8577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040519080825280602002602001820160405280156112065781602001602082028036833780820191505090505b5090508281600081518110611244577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200260200101818152505080915050919050565b6112788473ffffffffffffffffffffffffffffffffffffffff16611440565b15611438578373ffffffffffffffffffffffffffffffffffffffff1663f23a6e6187878686866040518663ffffffff1660e01b81526004016112be959493929190611c10565b602060405180830381600087803b1580156112d857600080fd5b505af192505050801561130957506040513d601f19601f8201168201806040525081019061130691906118f7565b60015b6113af576113156121c8565b806308c379a01415611372575061132a6124cf565b806113355750611374565b806040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016113699190611cde565b60405180910390fd5b505b6040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016113a690611d00565b60405180910390fd5b63f23a6e6160e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614611436576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161142d90611d40565b60405180910390fd5b505b505050505050565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b600061147661147184611e89565b611e64565b9050808382526020820190508285602086028201111561149557600080fd5b60005b858110156114c557816114ab8882611579565b845260208401935060208301925050600181019050611498565b5050509392505050565b60006114e26114dd84611eb5565b611e64565b9050808382526020820190508285602086028201111561150157600080fd5b60005b858110156115315781611517888261164b565b845260208401935060208301925050600181019050611504565b5050509392505050565b600061154e61154984611ee1565b611e64565b90508281526020810184848401111561156657600080fd5b61157184828561204d565b509392505050565b60008135905061158881612565565b92915050565b600082601f83011261159f57600080fd5b81356115af848260208601611463565b91505092915050565b600082601f8301126115c957600080fd5b81356115d98482602086016114cf565b91505092915050565b6000813590506115f18161257c565b92915050565b60008135905061160681612593565b92915050565b60008151905061161b81612593565b92915050565b600082601f83011261163257600080fd5b813561164284826020860161153b565b91505092915050565b60008135905061165a816125aa565b92915050565b6000806040838503121561167357600080fd5b600061168185828601611579565b925050602061169285828601611579565b9150509250929050565b600080600080600060a086880312156116b457600080fd5b60006116c288828901611579565b95505060206116d388828901611579565b945050604086013567ffffffffffffffff8111156116f057600080fd5b6116fc888289016115b8565b935050606086013567ffffffffffffffff81111561171957600080fd5b611725888289016115b8565b925050608086013567ffffffffffffffff81111561174257600080fd5b61174e88828901611621565b9150509295509295909350565b600080600080600060a0868803121561177357600080fd5b600061178188828901611579565b955050602061179288828901611579565b94505060406117a38882890161164b565b93505060606117b48882890161164b565b925050608086013567ffffffffffffffff8111156117d157600080fd5b6117dd88828901611621565b9150509295509295909350565b600080604083850312156117fd57600080fd5b600061180b85828601611579565b925050602061181c858286016115e2565b9150509250929050565b6000806040838503121561183957600080fd5b600061184785828601611579565b92505060206118588582860161164b565b9150509250929050565b6000806040838503121561187557600080fd5b600083013567ffffffffffffffff81111561188f57600080fd5b61189b8582860161158e565b925050602083013567ffffffffffffffff8111156118b857600080fd5b6118c4858286016115b8565b9150509250929050565b6000602082840312156118e057600080fd5b60006118ee848285016115f7565b91505092915050565b60006020828403121561190957600080fd5b60006119178482850161160c565b91505092915050565b60006020828403121561193257600080fd5b60006119408482850161164b565b91505092915050565b60006119558383611b8a565b60208301905092915050565b61196a81611fd9565b82525050565b600061197b82611f22565b6119858185611f50565b935061199083611f12565b8060005b838110156119c15781516119a88882611949565b97506119b383611f43565b925050600181019050611994565b5085935050505092915050565b6119d781611feb565b82525050565b60006119e882611f2d565b6119f28185611f61565b9350611a0281856020860161205c565b611a0b816121ea565b840191505092915050565b6000611a2182611f38565b611a2b8185611f72565b9350611a3b81856020860161205c565b611a44816121ea565b840191505092915050565b6000611a5c603483611f72565b9150611a6782612208565b604082019050919050565b6000611a7f602f83611f72565b9150611a8a82612257565b604082019050919050565b6000611aa2602883611f72565b9150611aad826122a6565b604082019050919050565b6000611ac5602a83611f72565b9150611ad0826122f5565b604082019050919050565b6000611ae8602583611f72565b9150611af382612344565b604082019050919050565b6000611b0b602a83611f72565b9150611b1682612393565b604082019050919050565b6000611b2e602983611f72565b9150611b39826123e2565b604082019050919050565b6000611b51602983611f72565b9150611b5c82612431565b604082019050919050565b6000611b74602883611f72565b9150611b7f82612480565b604082019050919050565b611b9381612043565b82525050565b611ba281612043565b82525050565b600060a082019050611bbd6000830188611961565b611bca6020830187611961565b8181036040830152611bdc8186611970565b90508181036060830152611bf08185611970565b90508181036080830152611c0481846119dd565b90509695505050505050565b600060a082019050611c256000830188611961565b611c326020830187611961565b611c3f6040830186611b99565b611c4c6060830185611b99565b8181036080830152611c5e81846119dd565b90509695505050505050565b60006020820190508181036000830152611c848184611970565b905092915050565b60006040820190508181036000830152611ca68185611970565b90508181036020830152611cba8184611970565b90509392505050565b6000602082019050611cd860008301846119ce565b92915050565b60006020820190508181036000830152611cf88184611a16565b905092915050565b60006020820190508181036000830152611d1981611a4f565b9050919050565b60006020820190508181036000830152611d3981611a72565b9050919050565b60006020820190508181036000830152611d5981611a95565b9050919050565b60006020820190508181036000830152611d7981611ab8565b9050919050565b60006020820190508181036000830152611d9981611adb565b9050919050565b60006020820190508181036000830152611db981611afe565b9050919050565b60006020820190508181036000830152611dd981611b21565b9050919050565b60006020820190508181036000830152611df981611b44565b9050919050565b60006020820190508181036000830152611e1981611b67565b9050919050565b6000602082019050611e356000830184611b99565b92915050565b6000604082019050611e506000830185611b99565b611e5d6020830184611b99565b9392505050565b6000611e6e611e7f565b9050611e7a82826120c1565b919050565b6000604051905090565b600067ffffffffffffffff821115611ea457611ea3612199565b5b602082029050602081019050919050565b600067ffffffffffffffff821115611ed057611ecf612199565b5b602082029050602081019050919050565b600067ffffffffffffffff821115611efc57611efb612199565b5b611f05826121ea565b9050602081019050919050565b6000819050602082019050919050565b600081519050919050565b600081519050919050565b600081519050919050565b6000602082019050919050565b600082825260208201905092915050565b600082825260208201905092915050565b600082825260208201905092915050565b6000611f8e82612043565b9150611f9983612043565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115611fce57611fcd61213b565b5b828201905092915050565b6000611fe482612023565b9050919050565b60008115159050919050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b82818337600083830152505050565b60005b8381101561207a57808201518184015260208101905061205f565b83811115612089576000848401525b50505050565b600060028204905060018216806120a757607f821691505b602082108114156120bb576120ba61216a565b5b50919050565b6120ca826121ea565b810181811067ffffffffffffffff821117156120e9576120e8612199565b5b80604052505050565b60006120fd82612043565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8214156121305761212f61213b565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600060033d11156121e75760046000803e6121e46000516121fb565b90505b90565b6000601f19601f8301169050919050565b60008160e01c9050919050565b7f455243313135353a207472616e7366657220746f206e6f6e204552433131353560008201527f526563656976657220696d706c656d656e746572000000000000000000000000602082015250565b7f455243313135353a2063616c6c6572206973206e6f7420746f6b656e206f776e60008201527f6572206e6f7220617070726f7665640000000000000000000000000000000000602082015250565b7f455243313135353a204552433131353552656365697665722072656a6563746560008201527f6420746f6b656e73000000000000000000000000000000000000000000000000602082015250565b7f455243313135353a2061646472657373207a65726f206973206e6f742061207660008201527f616c6964206f776e657200000000000000000000000000000000000000000000602082015250565b7f455243313135353a207472616e7366657220746f20746865207a65726f20616460008201527f6472657373000000000000000000000000000000000000000000000000000000602082015250565b7f455243313135353a20696e73756666696369656e742062616c616e636520666f60008201527f72207472616e7366657200000000000000000000000000000000000000000000602082015250565b7f455243313135353a2073657474696e6720617070726f76616c2073746174757360008201527f20666f722073656c660000000000000000000000000000000000000000000000602082015250565b7f455243313135353a206163636f756e747320616e6420696473206c656e67746860008201527f206d69736d617463680000000000000000000000000000000000000000000000602082015250565b7f455243313135353a2069647320616e6420616d6f756e7473206c656e6774682060008201527f6d69736d61746368000000000000000000000000000000000000000000000000602082015250565b600060443d10156124df57612562565b6124e7611e7f565b60043d036004823e80513d602482011167ffffffffffffffff8211171561250f575050612562565b808201805167ffffffffffffffff81111561252d5750505050612562565b80602083010160043d03850181111561254a575050505050612562565b612559826020018501866120c1565b82955050505050505b90565b61256e81611fd9565b811461257957600080fd5b50565b61258581611feb565b811461259057600080fd5b50565b61259c81611ff7565b81146125a757600080fd5b50565b6125b381612043565b81146125be57600080fd5b5056fea2646970667358221220b6e1f5f80bc849a494c3a46228b609911fda63b35386fb6012b4c1c6d7d9c15a64736f6c63430008040033";

type ERC1155UpgradeableConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ERC1155UpgradeableConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ERC1155Upgradeable__factory extends ContractFactory {
  constructor(...args: ERC1155UpgradeableConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ERC1155Upgradeable> {
    return super.deploy(overrides || {}) as Promise<ERC1155Upgradeable>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): ERC1155Upgradeable {
    return super.attach(address) as ERC1155Upgradeable;
  }
  override connect(signer: Signer): ERC1155Upgradeable__factory {
    return super.connect(signer) as ERC1155Upgradeable__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC1155UpgradeableInterface {
    return new utils.Interface(_abi) as ERC1155UpgradeableInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ERC1155Upgradeable {
    return new Contract(address, _abi, signerOrProvider) as ERC1155Upgradeable;
  }
}
