import { StaticImageData } from "next/image";
import { IAddress } from "../auth/request";
import { ICoupon } from "../coupons";

export interface iSupplierCategory {
  active: boolean;
  title: string;
  id: string;
}

export interface ISupplier {
  supplier: {
    name: string;
    active: boolean;
    document: string;
    numberOfCoupons: number;
    email: string;
    id: string;
    supplierInfo: {
      coupons: [];
      supplierCategory: iSupplierCategory;
      address: IAddress;
      isSupplier: boolean;
      isVerified: boolean;
    };
  };
  coupons: ICoupon[];
  name: string;
  role: string;
}

export interface ISuppliers {
  name: string;
  active: boolean;
  role: string;
  document: string;
  numberOfCoupons: number;
  email: string;
  id: string;
  supplierInfo: {
    id: string;
    coupons: [];
    supplierCategory: iSupplierCategory;
    address: IAddress;
    isSupplier: boolean;
    isVerified: boolean;
  };
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
  logo: string | StaticImageData;
  ilustration_image: string | StaticImageData;
  description: string;
}

export interface ISupplierLoginResponseProps {
  active: boolean;
  address: IAddress;
  coupons: ICoupon;
  email: string;
  id: string;
  isEmailVerified: boolean;
  isSupplier: boolean;
  isVerified: boolean;
  name: string;
  role: string;
}

export interface IDataResponse {
  page: number;
  name: string;
  sortBy: string;
  supplierInfo: {
    supplierCategory: string;
  };
}
