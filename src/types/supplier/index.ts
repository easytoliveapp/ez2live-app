import { StaticImageData } from 'next/image';
import { IAddress } from '../auth';
import { ICoupon } from '../coupons';

export interface iSupplierCategory {
  active: boolean;
  title: string;
  id: string;
}

export interface ISupplier { 
  active: boolean;
  address: IAddress;
  document: string;
  numberOfCoupons: number;
  coupons: ICoupon[];
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
  supplierCategory: string;
  limit: number;
  page: number;
}

export interface IverifySupplier {
  Id: string;
  verificationStatus?: string;
}

export interface ICategoryProps {
  active: boolean;
  title: string;
  id: string;
}

export interface ISupplierCompleteRegister {
  logo : string | StaticImageData;
  ilustration_image : string | StaticImageData;
  description: string;
}

export interface ISupplierLoginResponseProps {
  active: boolean,
  address: IAddress,
  coupons: ICoupon,
  email: string,
  id: string,
  isEmailVerified: boolean,
  isSupplier: boolean,
  isVerified: boolean,
  name: string,
  role: string,
}