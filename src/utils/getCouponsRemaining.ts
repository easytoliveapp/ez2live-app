export function getCouponsRemaining(unintsAmount: number) {
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
