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
  title: string;
  discount: string;
  maxTotal: number;
  maxPerUser: number;
  expirationGenerationDate: number;
  expirationUseDate: number;
  supplier: string;
  id: string;
}
