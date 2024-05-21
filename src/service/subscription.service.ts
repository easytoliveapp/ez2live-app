import { BaseService } from "./base.service";

const getSubscriptionInfo = async () => {
  return await BaseService.fetchData({
    url: "/subscription",
    method: "get",
  });
};

const createSubscriptionPix = async (payerDocument: string) => {
  return await BaseService.fetchData({
    url: "/subscription/pix",
    method: "post",
    data: payerDocument,
  });
};

const createSubscriptionCreditCard = async (cardToken: string) => {
  return await BaseService.fetchData({
    url: "/subscription/credit-card",
    method: "post",
    data: cardToken,
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
  createSubscriptionPix,
  createSubscriptionCreditCard,
  deleteSubscription,
  createIuguCostumer,
  deleteIuguCostumer,
  getInvoiceById,
  getInvoices,
};

export default subscriptionService;
