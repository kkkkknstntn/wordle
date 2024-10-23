import { useEffect } from 'react';
import Cookies from 'js-cookie';

export const useCookie = () => {
  const setAccessToken = (token: string) => {
    Cookies.set('accessToken', token);
  };

  const getAccessToken = (): string | undefined => {
    return Cookies.get('accessToken');
  };

  const setRefreshToken = (token: string) => {
    Cookies.set('refreshToken', token);
  };

  const getRefreshToken = (): string | undefined => {
    return Cookies.get('refreshToken');
  };

  return { setAccessToken, getAccessToken, setRefreshToken, getRefreshToken };
};