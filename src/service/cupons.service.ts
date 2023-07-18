import { BaseService } from "./base.service";
import {
  ICreateCoupons,
  IGetCouponById,
  ISupplierCouponsList,
  ICoupon,
} from "@/types/coupons";

const createCoupons = async (data: ICreateCoupons) => {
  return await BaseService.fetchData({
    url: "/coupons",
    method: "post",
    data,
  });
};

const getSupplierCouponsList = async (supplierID: ISupplierCouponsList) => {
  return await BaseService.fetchData({
    url: `/coupons/list/${supplierID}`,
    method: "get",
  });
};

const getCouponById = async (couponId: IGetCouponById) => {
  return await BaseService.fetchData({
    url: `/coupons/${couponId}`,
    method: "get",
  });
};

const updateCoupon = async (data: ICoupon, couponId: IGetCouponById) => {
  return await BaseService.fetchData({
    url: `/coupons/${couponId}`,
    method: "put",
    data,
  });
};

export default {
  createCoupons,
  getSupplierCouponsList,
  getCouponById,
  updateCoupon,
};
