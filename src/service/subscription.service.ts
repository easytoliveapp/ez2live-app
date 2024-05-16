import { BaseService } from "./base.service";

const createSubscription = async (data: any) => {
  return await BaseService.fetchData({
    url: "/subscription",
    method: "post",
    data: data,
  });
};
const deleteSubscription = async (email: string) => {
  return await BaseService.fetchData({
    url: `/subscription/${email}`,
    method: "delete",
  });
};

const createIuguCostumer = async () => {
  return await BaseService.fetchData({
    url: "/subscription/customer",
    method: "post",
  });
};

const deleteIuguCostumer = async (email: string) => {
  return await BaseService.fetchData({
    url: `/subscription/customer/${email}`,
    method: "delete",
  });
};

const subscriptionService = {
  createSubscription,
  deleteSubscription,
  createIuguCostumer,
  deleteIuguCostumer,
};

export default subscriptionService;
