import { IAddress } from "../auth/request";
import { iSupplierCategory } from "../supplier";

export interface ISupplierCouponsList {
  supplierId: string;
}

export interface IGetCouponById {
  couponld: string;
}
export interface ICreateCoupon {
  title: string;
  discount: string;
  maxTotal: number | string;
  maxPerUser: number | string;
  expirationGenerationDate: Date;
  expirationUseDate: Date;
}

export interface ICoupon {
  title: string;
  discount: string;
  maxTotal: number;
  maxPerUser: number;
  expirationGenerationDate: string;
  expirationUseDate: string;
  supplier: string;
  id: string;
}

export interface ICouponCodesByUser {
  active: boolean;
  id: string;
  code: string;
  coupon: {
    title: string;
    discount: string;
    maxTotal: number;
    maxPerUser: number;
    expirationGenerationDate: string;
    expirationUseDate: string;
    id: string;
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
  };
  status: "ACTIVE" | "USED" | "EXPIRED";
  user: string;
}
