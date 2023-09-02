import { IUser } from "@/types/auth/response";

declare module "next-auth" {
  interface Session extends IUser {}

  interface User extends IUser {}
}

declare module "next-auth/jwt" {
  interface JWT extends IUser {}
}
