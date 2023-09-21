export interface ISupplierCouponsList {
  supplierId: string;
}

export interface IGetCouponById {
  couponld: string;
}
export interface ICreateCoupon {
  title: string,
  discount: number,
  coupon_limit: string,
  user_limit: string,
  expiration_date: string,
  validation_date: string,
}

export interface ICoupon {
  active: boolean;
  title: string;
  discount: string;
  supplier: string;
  id: string;
}
