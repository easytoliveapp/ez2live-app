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
