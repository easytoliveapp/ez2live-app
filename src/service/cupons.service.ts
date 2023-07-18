import { BaseService } from "./base.service";
import {
  ICreateCoupons,
  IGetCouponsById,
  ISupplierCouponsList,
  IUpdateCoupon,
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

const getCouponById = async (couponId: IGetCouponsById) => {
  return await BaseService.fetchData({
    url: `/coupons/${couponId}`,
    method: "get",
  });
};

const updateCoupon = async (couponId: IUpdateCoupon) => {
  return await BaseService.fetchData({
    url: `/coupons/${couponId}`,
    method: "put",
  });
};

export default { createCoupons, getSupplierCouponsList, getCouponById, updateCoupon };
