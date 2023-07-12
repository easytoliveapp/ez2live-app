import { ILogIn,  IRegisterAccount } from '@/types/auth';
import http from '../http.service'

 const Login = async (data:ILogIn) => {
    const response = await http.POST('auth/login', data);
    return response;
  };

const Register = async (data: IRegisterAccount) => {
    const response = await http.POST('auth/register', data);
    return response;
  };

  export default {Login, Register};
