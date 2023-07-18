import { ILogIn, IRegisterAccount } from "@/types/auth";
import { BaseService } from "./base.service";

const login = async (data: ILogIn) => {
  return await BaseService.fetchData({
    url: "auth/login",
    method: "post",
    data,
  });
};

const register = async (data: IRegisterAccount) => {
  return await BaseService.fetchData({
    url: "auth/register",
    method: "post",
    data,
  });
};

export default { login, register };
