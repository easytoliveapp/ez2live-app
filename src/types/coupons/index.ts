export interface ICreateCoupons {
  title: string,
  discount: string,
  supplier: string
}

export interface ISupplierCouponsList {
  supplierId: string,
}

export interface IGetCouponsById {
  couponld: string,
}

export interface IUpdateCoupon {
  title: string,
  discount: string,
}