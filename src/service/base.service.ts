import config from "@/config/config";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { HEADER_AUTH_KEY, BEARER } from "../constants/keywords.constants";
import { getSession } from "next-auth/react";
import { Session } from "next-auth";
import dayjs from "dayjs";

const { API_URL } = config;

const axiosInstance = axios.create({
  timeout: 60000,
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

let lastSession: Session | null = null;

const fetchData = async <T>(
  params: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  if (
    !lastSession ||
    dayjs().isAfter(dayjs(lastSession.tokens?.access?.expires))
  ) {
    lastSession = await getSession();
  }

  axiosInstance.interceptors.request.use(
    (config) => {
      if (lastSession) {
        const { access } = lastSession?.tokens;
        if (access && !config.headers[HEADER_AUTH_KEY]) {
          config.headers[HEADER_AUTH_KEY] = BEARER + access.token;
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
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
