export function getCouponsRemaining(unintsAmount: number) {
  if (unintsAmount > 20) {
    return "Restam poucas unidades";
  }
  if (unintsAmount === -1) {
    return "Quantidade ilimitada";
  }
  return unintsAmount === 1
    ? "Resta apenas 1 unidade"
    : `Restam ${unintsAmount} unidades`;
}
