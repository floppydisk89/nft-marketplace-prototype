import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  walletAddress: null,
  networkId: null,
  ownedNfts: [],
  ethereumContract: {},
};

export const sessionStateSlice = createSlice({
  name: 'sessionState',
  initialState,
  reducers: {
    setWalletAddress: (state, action) => {
      state.walletAddress = action.payload;
    },
    setNetworkId: (state, action) => {
      state.networkId = action.payload;
    },
    setOwnedNfts: (state, action) => {
      state.ownedNfts = action.payload;
    },
    setEthereumContract: (state, action) => {
      state.ethereumContract = action.payload;
    },
    clearState: (state) => {
      state.walletAddress = null;
      state.networkId = null;
      state.ownedNfts = [];
      state.ethereumContract = {};
    },
  },
});

export const {
  setWalletAddress,
  setNetworkId,
  setOwnedNfts,
  setEthereumContract,
  clearState,
} = sessionStateSlice.actions;

export default sessionStateSlice.reducer;
