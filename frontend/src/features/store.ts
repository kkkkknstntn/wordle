import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import userSlice from './userSlice'
import gameSlice from './gameSlice';
import appSlice from './appSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    game: gameSlice,
    app: appSlice
  },
});

export type AppDispatch = typeof store.dispatch;