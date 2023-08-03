import config from "@/config/config";
import axios, { AxiosRequestConfig } from "axios";
import {
  TOKENS,
  HEADER_AUTH_KEY,
  BEARER,
} from "../constants/keywords.constants";
import { getItemByLocalStorage } from "../utils/localStorageHelper";

const { API_URL } = config;

const axiosInstance = axios.create({
  timeout: 30000,
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

const fetchData = (params: AxiosRequestConfig) => {
  const userTokens = getItemByLocalStorage(TOKENS);

  axiosInstance.interceptors.request.use(
    (config) => {
      if (userTokens) {
        const { accessToken } = userTokens;
        if (accessToken && !config.headers[HEADER_AUTH_KEY]) {
          config.headers[HEADER_AUTH_KEY] = BEARER + accessToken.token;
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return new Promise((resolve, reject) => {
    axiosInstance(params)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const BaseService = { fetchData };
