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