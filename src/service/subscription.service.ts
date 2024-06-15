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
    data: { payerDocument },
  });
};

const suspendSubscription = async () => {
  return await BaseService.fetchData({
    url: "/subscription",
    method: "delete",
  });
};

const createSubscriptionCreditCard = async (cardToken: string) => {
  return await BaseService.fetchData({
    url: "/subscription/credit-card",
    method: "post",
    data: { token: cardToken },
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

const getPaymentMethod = async () => {
  return await BaseService.fetchData({
    url: "/subscription/payment-method",
    method: "get",
  });
};

const createPaymentMethod = async (token: string) => {
  return await BaseService.fetchData({
    url: "/subscription/payment-method",
    method: "post",
    data: { token },
  });
};

const deletePaymentMethod = async () => {
  return await BaseService.fetchData({
    url: "/subscription/payment-method",
    method: "delete",
  });
};

const getLastInvoice = async () => {
  return await BaseService.fetchData({
    url: "/subscription/invoices/last-invoice",
    method: "get",
  });
};

const subscriptionService = {
  getSubscriptionInfo,
  suspendSubscription,
  createSubscriptionPix,
  createSubscriptionCreditCard,
  getInvoiceById,
  getInvoices,
  getPaymentMethod,
  createPaymentMethod,
  deletePaymentMethod,
  getLastInvoice,
};

export default subscriptionService;
