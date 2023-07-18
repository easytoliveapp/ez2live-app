export interface ICreateCoupons {
  title: string;
  discount: string;
  supplier: string;
}

export interface ISupplierCouponsList {
  supplierId: string;
}

export interface IGetCouponById {
  couponld: string;
}

export interface ICoupon {
  title: string;
  discount: string;
}
