export function getUnintsAmount(unintsAmount: number) {
  if (unintsAmount > 20) {
    return "poucas";
  }
  if (unintsAmount === 1) {
    return "somente mais 1 unidade";
  } else {
    return "faltam " + unintsAmount + " unidades";
  }
}
