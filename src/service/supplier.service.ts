import { ISupplier, IverifySupplier } from "@/types/supplier";
import { BaseService } from "./base.service";

const getSupplierList = async (data: ISupplier) => {
  return await BaseService.fetchData({
    url: `/supplier`,
    method: "get",
    params: data,
  });
};

const verifySupplier = async (
  accessToken: string,
  Supplier: IverifySupplier
) => {
  return await BaseService.fetchData({
    headers: { Authorization: `Bearer ${accessToken}` },
    url: `/supplier/${Supplier.Id}/verify`,
    method: "post",
    data: {
      verificationStatus: Supplier.verificationStatus,
    },
  });
};

export default { getSupplierList, verifySupplier };
