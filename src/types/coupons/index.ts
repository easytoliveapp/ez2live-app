export interface ICreateCoupon {
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
  active: boolean;
  title: string;
  discount: string;
  supplier: string;
  id: string;
}
