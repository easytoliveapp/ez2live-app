import { IAddress } from "../auth/request";
import { ICoupon } from "../coupons";
import { iSupplierCategory } from "../supplier";

export interface userLoginResponseProps {
  active: boolean;
  address: IAddress;
  coupons: ICoupon;
  subscriptionEndDate: string;
  email: string;
  id: string;
  isEmailVerified: boolean;
  isSupplier: boolean;
  isVerified: boolean;
  name: string;
  role: string;
  supplierInfo?: {
    id: string;
    coupons: [];
    supplierCategory: iSupplierCategory;
    address: IAddress;
    isSupplier: boolean;
    isVerified: boolean;
    supplierBanner: string;
    supplierLogo: string;
    supplierDescription: string;
  };
}
export interface IDeleteUSer {
  password: string;
}
