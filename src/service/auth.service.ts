import {
  IForgotPassword,
  ILogIn,
  IRegisterAccount,
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

const resetPassword = async (token: string, data: string) => {
  return await BaseService.fetchData({
    url: `/auth/reset-password/${token}`,
    method: "post",
    data,
  });
};

export default { login, register, forgotPassword, resetPassword };
