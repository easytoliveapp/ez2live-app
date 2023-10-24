import getDateDiffInDays from "@/utils/getDiffInDays";
import getDateDiffInHours from "@/utils/getDiffInHours";

const getExpirateTime = (expirateDate: string) => {
  const expirateInDay = getDateDiffInDays(expirateDate);
  const expirateInHour = getDateDiffInHours(expirateDate);
  if (expirateInDay > 1) {
    return "termina em " + expirateInDay + " dias";
  }
  if (expirateInDay === 1) {
    return "termina em " + expirateInDay + " dia";
  }
  if (expirateInDay <= 0) {
    if (expirateInHour === 1) {
      return "termina em " + expirateInHour + " hora";
    }
    if (expirateInHour >= 0) {
      return "termina em " + expirateInHour + " horas";
    }
    if (expirateInHour === -1) {
      return "expirou em " + -1 * expirateInHour + " hora";
    }
    if (expirateInDay === -1) {
      return "expirou em " + -1 * (expirateInDay - 1) + " dia";
    }
    if (expirateInHour <= -1) {
      if (expirateInHour < -48) {
        return "expirou em " + -1 * (expirateInDay - 1) + " dias";
      }
      if (expirateInHour < -24) {
        return "expirou em " + -1 * (expirateInDay - 1) + " dia";
      }
      return "expirou em " + -1 * expirateInHour + " horas";
    }
  }
};

export default getExpirateTime;
