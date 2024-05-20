import { BaseService } from "./base.service";

const getSubscriptionInfo = async () => {
  return await BaseService.fetchData({
    url: "/subscription",
    method: "get",
  });
};

const createSubscription = async (data: any) => {
  return await BaseService.fetchData({
    url: "/subscription",
    method: "post",
    data: data,
  });
};

const suspendSubscription = async () => {
  return await BaseService.fetchData({
    url: "/subscription",
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

const getInvoiceById = async (invoiceId: string) => {
  return await BaseService.fetchData({
    url: `/subscription/invoices/${invoiceId}`,
    method: "get",
  });
};

const getInvoices = async () => {
  return await BaseService.fetchData({
    url: "/subscription/invoices",
    method: "get",
  });
};

const subscriptionService = {
  getSubscriptionInfo,
  suspendSubscription,
  createSubscription,
  createIuguCostumer,
  deleteIuguCostumer,
  getInvoiceById,
  getInvoices,
};

export default subscriptionService;
