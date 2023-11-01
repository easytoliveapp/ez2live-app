import getDateDiffInDays from "@/utils/getDiffInDays";
import getDateDiffInHours from "@/utils/getDiffInHours";

const formatExpirationString = (value: number, unit: string) => {
  const absValue = Math.abs(value);
  const pluralSuffix = absValue === 1 ? "" : "s";
  const prefix = value < 0 ? "expirou em" : "termina em";
  return `${prefix} ${absValue} ${unit}${pluralSuffix}`;
};
const getExpirateTime = (expirateDate: string) => {
  const expirateInDay = getDateDiffInDays(expirateDate);
  const expirateInHour = getDateDiffInHours(expirateDate);
  if (expirateInDay !== 0) {
    return formatExpirationString(expirateInDay, "dia");
  }
  return formatExpirationString(expirateInHour, "hora");
};

export default getExpirateTime;
