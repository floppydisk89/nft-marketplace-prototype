import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setWalletAddress,
  setNetworkId,
  setOwnedNfts,
  setEthereumContract,
  clearState,
} from '../../store/sessionStateSlice';
import { loadWeb3, getNetworkType } from '../../services/web3.service';
import { walletConnector } from '../../services/walletConnector.service';

import './index.scss';

import metamaskIcon from '../../assets/icons/metamask.png';
import wifiIcon from '../../assets/icons/wifi.svg';

export default function Navigation() {
  const [web3Provider, setWeb3Provider] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [networkType, setNetworkType] = useState('Offline');

  const dispatch = useDispatch();
  const sessionState = useSelector((state) => state.sessionState);

  useEffect(() => {
    loadWeb3().then((provider) => {
      setWeb3Provider(provider);
    });
  }, [sessionState]);

  setTimeout(async () => {
    if (web3Provider) {
      const networkType = await getNetworkType(web3Provider);
      setNetworkType(networkType);
    }
  }, 500);

  async function connectWallet() {
    if (networkType === 'Offline') return;

    if (isConnected) {
      setIsConnected(false);
      dispatch(clearState());
      return;
    }

    setIsConnected(true);

    walletConnector(web3Provider).then((result) => {
      dispatchSessionStateToStore(result);
    });
  }

  async function dispatchSessionStateToStore(sessionState) {
    dispatch(setWalletAddress(sessionState.userWalletAddress));
    dispatch(setEthereumContract(sessionState.ethereumContract));
    dispatch(setNetworkId(sessionState.EthereumNetworkId));
    dispatch(setOwnedNfts(sessionState.userOwnedNfts));
  }

  return (
    <div className='navigation'>
      <div className='inner-container'>
        <h1 className='title'>NFT Marketplace</h1>
        <input className='search-bar' placeholder="Search NFT's" disabled />
        <ul className='menu'>
          <li className='menu-item'>Collections</li>
          <li className='menu-item'>Features</li>
          <li className='menu-item'>FAQ</li>
          <li className='menu-item'>
            <span className='button' onClick={() => connectWallet()}>
              {isConnected && <span className='status-online' />}
              {isConnected ? 'Disconnect' : 'Connect Wallet'}
            </span>
          </li>
        </ul>
      </div>
      <div className='top-bar'>
        <div className='top-bar-inner-container'>
          {isConnected && (
            <div className='user-connection'>
              <div className='wallet-icon'>
                <img className='image' src={metamaskIcon} alt='' />
              </div>
              <span className='wallet-address'>
                {sessionState.walletAddress}
              </span>
            </div>
          )}
          <div className='network-connection'>
            <img className='connection-icon' src={wifiIcon} alt='' />
            <span className='connection-name'>{networkType}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
