import {
  IForgotPassword,
  ILogIn,
  IRegisterAccount,
  IResetPassword,
} from "@/types/auth/request";
import { BaseService } from "./base.service";
import { ILoginResponse } from "@/types/auth/response";

const login = async (data: ILogIn) => {
  return await BaseService.fetchData<ILoginResponse>({
    url: "/auth/login",
    method: "post",
    data,
  });
};

const loginSocial = async (data: any) => {
  return await BaseService.fetchData<ILoginResponse>({
    url: "/auth/login/social",
    method: "post",
    data,
  });
};

const register = async (data: Partial<IRegisterAccount>) => {
  return await BaseService.fetchData({
    url: "/auth/register",
    method: "post",
    data,
  });
};

const forgotPassword = async (data: IForgotPassword) => {
  return await BaseService.fetchData({
    url: "/auth/forgot-password",
    method: "post",
    data,
  });
};

const resetPassword = async (data: IResetPassword) => {
  return await BaseService.fetchData({
    url: `/auth/reset-password`,
    method: "post",
    data,
  });
};

const refreshToken = async (data: any) => {
  return await BaseService.fetchData({
    url: "/auth/refresh-token",
    data,
    method: "post",
  });
};

export default {
  login,
  loginSocial,
  register,
  forgotPassword,
  resetPassword,
  refreshToken,
};
