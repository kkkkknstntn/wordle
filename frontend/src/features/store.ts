import { configureStore } from '@reduxjs/toolkit';

import userSlice, { refresh_token } from './userSlice'
import gameSlice from './gameSlice';
import appSlice from './appSlice';
import { axiosPrivate } from '../api';

export const store = configureStore({
  reducer: {
    user: userSlice,
    game: gameSlice,
    app: appSlice
  },
});

axiosPrivate.interceptors.request.use(
  async (config) => {
    const state = store.getState();
    const user = state.user
    const accessToken = localStorage.getItem("access_token")
    let currentDate = new Date()
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;

      const decodedToken: number = user.access_expires_at
      if (decodedToken * 1000 < currentDate.getTime() - 12500) {
        await store.dispatch(refresh_token())
        if (config?.headers) {
          config.headers['authorization'] = `Bearer ${
            accessToken
          }`
        }
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export type AppDispatch = typeof store.dispatch;