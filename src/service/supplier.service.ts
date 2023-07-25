import { ISupplier, IverifySupplier } from "@/types/supplier";
import { BaseService } from "./base.service";

const getSupplierList = async (data: ISupplier) => {
  return await BaseService.fetchData({
    url: `/supplier`,
    method: "get",
    params: data,
  });
};

const verifySupplier = async (supplier: IverifySupplier) => {
  return await BaseService.fetchData({
    url: `/supplier/${supplier.Id}/verify`,
    method: "post",
    data: {
      verificationStatus: supplier.verificationStatus,
    },
  });
};

export default { getSupplierList, verifySupplier };
