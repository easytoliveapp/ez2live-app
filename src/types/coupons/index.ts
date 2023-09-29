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
  expirationGenerationDate: number;
  expirationUseDate: number;
}

export interface ICoupon {
  active: boolean;
  title: string;
  discount: string;
  supplier: string;
  id: string;
}
