import { Route } from "next";

export default function getSubscriptionPageURL(
  supplierId: string,
  couponId: string,
) {
  return `/app/pagamento?callbackUrl=${encodeURIComponent(
    `/app/parceiro/${supplierId}/?coupon=${couponId}`,
  )}` as Route;
}
