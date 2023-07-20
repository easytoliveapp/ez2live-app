import { BaseService } from "./base.service";
import {
  ICreateCoupon,
  IGetCouponById,
  ISupplierCouponsList,
  ICoupon,
} from "@/types/coupons";

const createCoupon = async (accessToken: string, data: ICreateCoupon) => {
  return await BaseService.fetchData({
    headers: { Authorization: `Bearer ${accessToken}` },
    url: "/coupon",
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

const getCouponById = async (accessToken: string, couponId: IGetCouponById) => {
  return await BaseService.fetchData({
    headers: { Authorization: `Bearer ${accessToken}` },
    url: `/coupons/${couponId}`,
    method: "get",
  });
};

const updateCoupon = async (
  accessToken: string,
  data: ICoupon,
  couponId: IGetCouponById
) => {
  return await BaseService.fetchData({
    headers: { Authorization: `Bearer ${accessToken}` },
    url: `/coupons/${couponId}`,
    method: "put",
    data,
  });
};

export default {
  createCoupon,
  getSupplierCouponsList,
  getCouponById,
  updateCoupon,
};
