import { ILogIn, IRegisterAccount } from "@/types/auth";
import { BaseService } from "./base.service";

const Login = async (data: ILogIn) => {
  return await BaseService.fetchData({
    url: "auth/login",
    method: "post",
    data,
  });
};

const Register = async (data: IRegisterAccount) => {
  return await BaseService.fetchData({
    url: "auth/register",
    method: "post",
    data,
  });
};

export default { Login, Register };
