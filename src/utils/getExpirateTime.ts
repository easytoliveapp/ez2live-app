import date from "@/utils/date";

const formatExpirationString = (value: number, unit: string) => {
  const absValue = Math.abs(value);
  const pluralSuffix = absValue === 1 ? "" : "s";
  const prefix = value < 0 ? "Expirou a" : "Termina em";

  const lessThenOneHour = absValue < 1 ? "menos de" : "";
  return `${prefix} ${lessThenOneHour} ${absValue} ${unit}${pluralSuffix}`;
};

const getExpirateTime = (expirateDate: string) => {
  const expirateInDay = date.getDateDiffInDays(expirateDate);
  const expirateInHour = date.getDateDiffInHours(expirateDate);
  if (expirateInDay !== 0) {
    return formatExpirationString(expirateInDay, "dia");
  }
  return formatExpirationString(expirateInHour, "hora");
};

export default getExpirateTime;
