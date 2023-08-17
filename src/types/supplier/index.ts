import { IAddress } from '../auth';

export interface iSupplierCategory {
  active: boolean;
  title: string;
  id: string;
}

export interface ISupplier { 
  active: boolean;
  address: IAddress;
  document: string;
  email: string;
  id: string;
  supplierCategory: iSupplierCategory
  isSupplier: boolean;
  isVerified: boolean;
  name: string;
  role: string;
}

export interface ISupplierList {
  name: string;
  isVerified: string;
  sortBy: string;
  limit: number;
  page: number;
}

export interface IverifySupplier {
  Id: string;
  verificationStatus?: string;
}

