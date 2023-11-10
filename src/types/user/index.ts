import { IAddress } from "../auth/request";
import { ICoupon } from "../coupons";

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
}
export interface IDeleteUSer {
  password: string;
}
