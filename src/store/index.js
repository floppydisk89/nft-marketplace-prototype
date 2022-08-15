import { configureStore } from '@reduxjs/toolkit';
import sessionStateReducer from './sessionStateSlice';

const store = configureStore({
  reducer: {
    sessionState: sessionStateReducer,
  },
});

export default store;
