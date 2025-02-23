import axios from 'axios';
import { BASEURL } from '../utils/constant';

let token = localStorage.getItem("token");
export const setToken = (authToken) => {
  token = authToken;
};

const client = axios.create({});
client.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const errorResponse = JSON.parse(JSON.stringify(error));
    return Promise.reject(error);
  }
);

export const axiosClient = (
  endpoint,
  payload = {},
  method = 'get',
  headers = {
    Authorization: token,
  }
) => {
  let axiosConfig = {
    method: method.toLowerCase(),
  };
  if (endpoint !== 'login') {
    axiosConfig.headers = headers;
  }
  if (method === 'get') {
    axiosConfig.params = payload;
  } else {
    axiosConfig.data = payload;
  }
  return client(`${BASEURL}${endpoint}`, axiosConfig);
};
