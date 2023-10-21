import { BaseService } from "./base.service";
import {
  ICreateCoupon,
  ISupplierCouponsList,
  IUpdateCoupon,
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

const updateCoupon = async (data: Partial<IUpdateCoupon>, couponId: string) => {
  return await BaseService.fetchData({
    url: `/coupon/${couponId}`,
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
    url: "/coupon/code",
    method: "get",
  });
};

const deleteCoupon = async (id: string) => {
  return await BaseService.fetchData({
    url: `/coupon/${id}`,
    method: "delete",
  });
};

const couponsService = {
  createCoupon,
  getSupplierCouponsList,
  getCouponById,
  updateCoupon,
  generateCouponCode,
  getCouponCodesByUser,
  deleteCoupon,
};

export default couponsService;
