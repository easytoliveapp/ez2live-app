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
  iuguCustomerId?: string;
  iuguPaymentMethodId?: string;
  iuguSubscriptionId?: string;
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

export interface IGetSubscriptionResponse {
  id: string;
  suspended: boolean;
  planIdentifier: string;
  priceCents: number;
  currency: string;
  customerName: string;
  customerEmail: string;
  cycledAt: string;
  payableWith: string;
  maxCycles: number;
  cyclesCount: number;
  recentInvoices: string;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
  planName: string;
  active: boolean;
  suspendOnInvoiceExpired: boolean;
}
