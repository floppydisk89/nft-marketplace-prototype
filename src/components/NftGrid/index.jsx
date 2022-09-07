import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setWalletAddress,
  setNetworkId,
  setOwnedNfts,
  setEthereumContract,
} from '../../store/sessionStateSlice';
import { loadWeb3 } from '../../services/web3.service';
import { mintNft } from '../../services/web3.service';
import { walletConnector } from '../../services/walletConnector.service';

import './index.scss';
import data from '../../data/content.json';

export default function NftGrid() {
  const [content, setContent] = useState({});
  const [web3Provider, setWeb3Provider] = useState(null);

  const dispatch = useDispatch();
  const sessionState = useSelector((state) => state.sessionState);

  useEffect(() => {
    setContent(data.marketplace.nft_grid);

    loadWeb3().then((provider) => {
      setWeb3Provider(provider);
    });

    console.log('render', sessionState);
  }, []);

  function mintSelectedNft(nftId) {
    if (sessionState.ownedNfts.indexOf(nftId) > -1 === true) return;

    if (sessionState.walletAddress) {
      mintNft(sessionState.ethereumContract, sessionState.walletAddress, nftId);
    } else {
      alert('no wallet connected to mint this nft.');
    }
  }

  return (
    <div className='nft-grid-container'>
      <div className='grid'>
        {content.length &&
          content.map((nft, key) => {
            return (
              <div className='card' key={key}>
                <img className='nft-image' src={nft.image} alt='' />
                <div className='nft-about'>
                  <div className='about'>
                    <h2 className='title'>#{nft.title}</h2>
                    <p className='author'>{nft.author}</p>
                  </div>
                  <span
                    className='button'
                    onClick={() => mintSelectedNft(nft.title)}
                  >
                    {sessionState.ownedNfts.indexOf(nft.title) > -1
                      ? 'Minted'
                      : 'Mint'}
                  </span>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
