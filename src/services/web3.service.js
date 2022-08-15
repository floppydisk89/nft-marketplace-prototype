import Web3 from 'web3/dist/web3.min.js';
import detectEthereumProvider from '@metamask/detect-provider';

async function loadWeb3() {
  const ethereumProvider = await detectEthereumProvider();
  if (ethereumProvider) {
    console.log('#[Web Client connected to Ethereum Network.]#');
    // returns web3Provider
    return new Web3(ethereumProvider);
  } else {
    console.error('No Ethereum wallet detected.');
  }
}

async function connectAndLoadEthereumWallet(web3Provider) {
  const accounts = await web3Provider.eth.requestAccounts();
  if (accounts.length > 0) {
    return accounts[0];
  } else {
    alert('Unable to connect to Ethereum Wallet');
  }
}

async function getNetworkId(web3Provider) {
  return await web3Provider.eth.net.getId();
}

async function getNetworkType(web3Provider) {
  return await web3Provider.eth.net.getNetworkType();
}

async function getContract(web3Provider, abiContract, networkId) {
  // What is an Abi? https://www.quicknode.com/guides/solidity/what-is-an-abi
  const contractNetwork = abiContract.networks[networkId];

  if (contractNetwork) {
    const abi = abiContract.abi;
    const contractAddress = contractNetwork.address;
    const contract = new web3Provider.eth.Contract(abi, contractAddress);

    if (contract) {
      return contract;
    } else {
      console.error('There was a problem retrieving your contract.');
    }
  } else {
    console.error('Network ID does not match contract network.');
  }
}

async function getTotalSupply(contract) {
  return await contract.methods.totalSupply().call();
}

async function getNfts(contract) {
  const nftList = [];
  const totalSupply = Number(await getTotalSupply(contract));

  if (totalSupply > 0) {
    for (let index = 1; index <= totalSupply; index++) {
      nftList.push(await contract.methods.kryptoBirdz(index - 1).call());
    }
  } else {
    console.error('There are no NFTs available.');
  }

  return nftList;
}

async function mintNft(contract, userWalletAddress, nftId) {
  try {
    await contract.methods
      .mint(nftId)
      .send({ from: userWalletAddress })
      .once('receipt', (receipt) => {
        console.log(receipt);
        alert(`NFT ${nftId} was minted by ${userWalletAddress}`);
      });
  } catch (error) {
    console.error('Unable to mint a token that was already minted.');
  }
}

export {
  loadWeb3,
  connectAndLoadEthereumWallet,
  getNetworkId,
  getNetworkType,
  getContract,
  getTotalSupply,
  getNfts,
  mintNft,
};
