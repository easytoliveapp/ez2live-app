import { BaseService } from "./base.service";
import {
  ICreateCoupon,
  IGetCouponById,
  ISupplierCouponsList,
  ICoupon,
} from "@/types/coupons";

const createCoupon = async (data: ICreateCoupon) => {
  return await BaseService.fetchData({
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

const getCouponById = async (couponId: string) => {
  return await BaseService.fetchData({
    url: `/coupon/${couponId}`,
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

const generateCouponCode = async (couponId: string) => {
  return await BaseService.fetchData({
    url: `/coupon/${couponId}/generate`,
    method: "post",
  });
};

const getCouponCodesByUser = async () => {
  return await BaseService.fetchData({
    url: "coupon/code",
    method: "get",
  });
};

const getCouponCodesByCode = async (couponCode: string) => {
  return await BaseService.fetchData({
    url: `/coupon/code/${couponCode}`,
    method: "get",
  });
};

const activeCouponCode = async (couponCode: string) => {
  return await BaseService.fetchData({
    url: `/coupon/code/${couponCode}/activate`,
    method: "put",
  });
};

export default {
  getSupplierCouponsList,
  createCoupon,
  getCouponById,
  updateCoupon,
  generateCouponCode,
  getCouponCodesByUser,
  getCouponCodesByCode,
  activeCouponCode,
};
