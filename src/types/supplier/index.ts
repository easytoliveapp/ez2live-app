export interface ISupplier {
  name?: string;
  isVerified?: string;
  sortBy?: string;
  limit?: number;
  page?: number;
}

export interface IverifySupplier {
  Id: string;
  verificationStatus?: string;
}

