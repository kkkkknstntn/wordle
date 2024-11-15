// src/utils/index.ts
import axios from 'axios'
import { store } from '../features/store';

export const axiosPublic = axios.create({ 
  baseURL: 'http://v183683.hosted-by-vdsina.com:80'
})
export const axiosPrivate = axios.create({ baseURL: 'http://v183683.hosted-by-vdsina.com:80' })
export const axiosRefresh = axios.create({ 
  baseURL: 'http://v183683.hosted-by-vdsina.com:80',
  //withCredentials: true,
})