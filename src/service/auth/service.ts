import { LogInType,  RegisterAccountType } from '@/types/auth';
import http from '../http.service'

const UserService = {
  Login: async (data:LogInType) => {
    const response = await http.POST('auth/login', data);
    return response;
  },
  Register: async (data: RegisterAccountType) => {
    const response = await http.POST('auth/register', data);
    return response;
  },
}

export default UserService;
