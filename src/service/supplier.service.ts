import { ISupplierCompleteRegister, ISupplierList } from "@/types/supplier";
import { BaseService } from "./base.service";

const getSupplierList = async (data?: Partial<ISupplierList>) => {
  return await BaseService.fetchData({
    url: `/supplier`,
    method: "get",
    params: data,
  });
};

const updateSupplierImages = async (
  supplerId: string,
  data: ISupplierCompleteRegister,
) => {
  return await BaseService.fetchData({
    url: `/supplier/${supplerId}/updateSupplierImages`,
    method: "post",
    data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
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

const supplierService = {
  getSupplierList,
  updateSupplierImages,
  verifySupplier,
  getSupplierCategories,
  getSupplierById,
};

export default supplierService;
