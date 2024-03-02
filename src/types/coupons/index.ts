import { ISupplierInfo } from "../supplier";

export interface ISupplierCouponsList {
  supplierId: string;
}

export interface IGetCouponById {
  couponld: string;
}
export interface ICreateCoupon {
  title: string;
  discount: string;
  couponRules: string;
  maxTotal: number;
  maxPerUser: number;
  expirationGenerationDate: Date;
  expirationUseDate: Date;
}

export interface IUpdateCoupon {
  title: string;
  discount: string;
  maxTotal: number;
  maxPerUser: number;
}

export interface IGetCouponInfo {
  title: string;
  discount: string;
  couponRules: string;
  maxTotal: number;
  maxPerUser: number;
  expirationGenerationDate: string;
  expirationUseDate: string;
}

export interface ICoupon {
  active: string;
  couponStatus: "ACTIVE" | "USED" | "EXPIRED";
  title: string;
  discount: string;
  maxTotal: number;
  maxPerUser: number;
  expirationGenerationDate: string;
  expirationUseDate: string;
  supplier: string;
  id: string;
  status: "ACTIVE" | "USED" | "EXPIRED";
  couponCodesActivated: number;
  couponCodesGenerated: number;
  remainingCouponsTotal?: number;
  remainingCouponsByUser?: number;
}

export interface ICouponCodesByUser {
  active: boolean;
  activationDate?: string;
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
    remainingCoupons?: number;
    remainingCouponsByUser?: number;
    supplier: {
      name: string;
      phoneNumber: string;
      active: boolean;
      document: string;
      numberOfCoupons: number;
      email: string;
      id: string;
      supplierInfo: ISupplierInfo;
    };
  };
  status: "ACTIVE" | "USED" | "EXPIRED";
  user: string;
}
