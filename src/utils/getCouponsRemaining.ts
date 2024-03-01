export function getRemainingUnitsAmount(couponData: {
  remainingCouponsByUser?: number;
  remainingCoupons?: number;
}) {
  const { remainingCouponsByUser = -1, remainingCoupons = -1 } =
    couponData ?? {};

  if (remainingCouponsByUser === 0 || remainingCoupons === 0) return 0;
  if (remainingCouponsByUser === -1) return remainingCoupons;
  if (remainingCoupons === -1 && remainingCouponsByUser > 0)
    return remainingCouponsByUser;
  if (remainingCouponsByUser > 0 && remainingCoupons > 0) {
    return remainingCouponsByUser < remainingCoupons
      ? remainingCouponsByUser
      : remainingCoupons;
  }

  return -1;
}

export function getCouponsRemaining(
  unintsAmount: number,
  isOwnSupplier?: boolean,
) {
  if (isOwnSupplier) {
    if (unintsAmount === -1) return "quantidade ilimitada";
    if (unintsAmount > 0)
      return `resta${unintsAmount === 1 ? " " : "m "}${unintsAmount} unidade${
        unintsAmount === 1 ? "" : "s"
      }`;
    return "esgotado";
  }
  if (unintsAmount > 20) {
    return "restam poucas unidades";
  }
  if (unintsAmount === -1) {
    return "quantidade ilimitada";
  }
  return unintsAmount === 1
    ? "resta apenas 1 unidade"
    : `restam ${unintsAmount} unidades`;
}
