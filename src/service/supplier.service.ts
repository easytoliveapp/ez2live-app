import { ISupplier, ISupplierId } from "@/types/supplier";
import { BaseService } from "./base.service";

const getSupplierList = async (data: ISupplier) => {
  return await BaseService.fetchData({
    url: `/supplier`,
    method: "get",
    params: {
      name: data.name,
      isVerified: data.isVerified,
      sortBy: data.sortBy,
      limit: data.limit,
      page: data.page,
    },
  });
};

const verifySupplier = async (data: string, supplierId: ISupplierId) => {
  return await BaseService.fetchData({
    url: `/supplier/${supplierId}/verify`,
    method: "post",
    data,
  });
};

export default { getSupplierList, verifySupplier };
