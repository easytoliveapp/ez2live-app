import {
  IForgotPassword,
  ILogIn,
  IRegisterAccount,
  IResetPassword,
} from "@/types/auth";
import { BaseService } from "./base.service";

const login = async (data: ILogIn) => {
  return await BaseService.fetchData({
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

const resetPassword = async (data: IResetPassword) => {
  return await BaseService.fetchData({
    url: `/auth/reset-password`,
    method: "post",
    data,
  });
};

export default { login, register, forgotPassword, resetPassword };
