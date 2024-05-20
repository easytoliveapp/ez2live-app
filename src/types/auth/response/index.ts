import { ISupplierInfo } from "@/types/supplier";

export interface IUser {
  id: string;
  image: string;
  subscriptionTrialEndDate: string;
  name?: string | null;
  email?: string | null;
  role: string;
  active: boolean;
  isSupplier: boolean;
  isVerified: boolean;
  supplierInfo?: ISupplierInfo;
  iuguCustomerId?: string;
  iuguPaymentMethodId?: string;
  iuguSubscriptionId?: string;
  subscriptionStatus?: string;
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
