import { ILoginResponse, IUser } from "@/types/auth/response";

declare module "next-auth" {
  interface Session extends ILoginResponse {
    user: IUser;
  }

  interface User extends IUser {}
}

declare module "next-auth/jwt" {
  interface JWT extends ILoginResponse {}
}
