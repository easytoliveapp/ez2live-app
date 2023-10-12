import { ISupplierList, IverifySupplier } from "@/types/supplier";
import { BaseService } from "./base.service";

const getSupplierList = async (data?: Partial<ISupplierList>) => {
  return await BaseService.fetchData({
    url: `/supplier`,
    method: "get",
    params: data,
  });
};

const getSupplierById = async (id: string) => {
  return await BaseService.fetchData({
    url: `/supplier/${id}`,
    method: "get",
  });
};

const verifySupplier = async (supplierId: string) => {
  return await BaseService.fetchData({
    url: `/supplier/${supplierId}/verify`,
    method: "post",
  });
};

const getSupplierCategories = async () => {
  return await BaseService.fetchData({
    url: `/supplier-category`,
    method: "get",
  });
};

export default {
  getSupplierList,
  verifySupplier,
  getSupplierCategories,
  getSupplierById,
};
