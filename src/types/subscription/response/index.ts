export interface IGetSubscriptionResponse {
  id: string;
  customerId: string;
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

export interface IGetPaymentMethodResponse {
  id: string;
  description: string;
  itemType: string;
  customerId: string;
  data: {
    brand: string;
    holderName: string;
    displayNumber: string;
    bin: string;
    year: number;
    month: number;
    lastDigits: string;
    firstDigits: string;
    maskedNumber: string;
  };
}
