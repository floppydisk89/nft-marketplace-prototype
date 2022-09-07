import {
  connectAndLoadEthereumWallet,
  getNetworkId,
  getContract,
  getNfts,
} from './web3.service';

// Contract Abi
import KryptoBirdAbiContract from '../abis/KryptoBird.json';

export async function walletConnector(web3Provider) {
  const userWalletAddress = await connectAndLoadEthereumWallet(web3Provider);
  const ethereumNetworkId = await getNetworkId(web3Provider);
  const ethereumContract = await getContract(
    web3Provider,
    KryptoBirdAbiContract,
    ethereumNetworkId
  );

  const userOwnedNfts = await getNfts(ethereumContract);

  return {
    userWalletAddress,
    ethereumNetworkId,
    ethereumContract,
    userOwnedNfts,
  };
}
