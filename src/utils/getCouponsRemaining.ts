export function getRemainingUnitsAmount(couponData: {
  remainingCouponsByUser?: number;
  remainingCouponsTotal?: number;
}) {
  const { remainingCouponsByUser = -1, remainingCouponsTotal = -1 } =
    couponData ?? {};

  if (remainingCouponsByUser === 0 || remainingCouponsTotal === 0) return 0;
  if (remainingCouponsByUser === -1) return remainingCouponsTotal;
  if (remainingCouponsTotal === -1 && remainingCouponsByUser > 0)
    return remainingCouponsByUser;
  if (remainingCouponsByUser > 0 && remainingCouponsTotal > 0) {
    return remainingCouponsByUser < remainingCouponsTotal
      ? remainingCouponsByUser
      : remainingCouponsTotal;
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
