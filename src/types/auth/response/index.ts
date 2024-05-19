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

interface Invoice {
  id: string;
  dueDate: string;
  status: "paid" | "unpaid"; // ou qualquer outro status possível
  total: string;
  secureUrl: string;
}

interface Log {
  id: string;
  description: string;
  notes: string;
  subscriptionChanges: string;
  createdAt: string;
}

export interface IGetSubscriptionResponse {
  id: string;
  suspended: boolean;
  planIdentifier: string;
  priceCents: number;
  currency: string;
  features: Record<string, unknown>; // ou outro tipo específico
  customerName: string;
  customerEmail: string;
  cycledAt: string;
  creditsMin: number;
  creditsCycle: number | null;
  payableWith: string;
  ignoreDueEmail: null | unknown; // ou outro tipo específico
  maxCycles: number;
  cyclesCount: number;
  recentInvoices: Invoice[];
  subitems: unknown[]; // ou outro tipo específico
  logs: Log[];
  customVariables: unknown[]; // ou outro tipo específico
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
  customerId: string;
  planName: string;
  customerRef: string;
  planRef: string;
  active: boolean;
  twoStep: boolean;
  suspendOnInvoiceExpired: boolean;
  inTrial: null | unknown; // ou outro tipo específico
  credits: number;
  creditsBased: boolean;
}
