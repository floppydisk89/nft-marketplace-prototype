import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { mintNft } from '../../services/web3.service';
import { setOwnedNfts } from '../../store/sessionStateSlice';

import './index.scss';
import data from '../../data/content.json';

export default function NftGrid() {
  const dispatch = useDispatch();
  const sessionState = useSelector((state) => state.sessionState);
  const content = data.marketplace.nft_grid;

  async function mintSelectedNft(nftId) {
    if (sessionState.ownedNfts.includes(nftId)) return;

    if (sessionState.walletAddress) {
      const newMintedNft = await mintNft(
        sessionState.ethereumContract,
        sessionState.walletAddress,
        nftId
      );
      dispatch(setOwnedNfts([...sessionState.ownedNfts, newMintedNft]));
    } else {
      alert('no wallet connected to mint this nft.');
    }
  }

  return (
    <div className='nft-grid-container'>
      <div className='grid'>
        {content.map((nft) => {
          return (
            <div className='card' key={nft.id}>
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
                  {sessionState.ownedNfts.includes(nft.title)
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
