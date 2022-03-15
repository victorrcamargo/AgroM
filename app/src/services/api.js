/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/* eslint-disable no-param-reassign */
import axios from 'axios';
import {AsyncStorage} from 'react-native';


const api = axios.create({
  baseURL: 'http://192.168.1.140:8080/api/v1',
});

api.interceptors.request.use(async(config) => {
  const token = await AsyncStorage.getItem('TOKEN');

    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    } else {
      config.headers.authorization = ``;
    }
    return config;
});

export default api;
