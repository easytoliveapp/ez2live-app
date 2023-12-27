import { ISupplierInfo } from "@/types/supplier";

export interface IUser {
  id: string;
  image: string;
  subscriptionEndDate: string;
  name?: string | null;
  email?: string | null;
  role: string;
  active: boolean;
  isSupplier: boolean;
  isVerified: boolean;
  supplierInfo?: ISupplierInfo;
}

export interface ITokens {
  access: IToken;
  refresh: IToken;
}

export interface IToken {
  token: string;
  expires: string;
}
export interface ILoginResponse {
  user: IUser;
  tokens: ITokens;
}
