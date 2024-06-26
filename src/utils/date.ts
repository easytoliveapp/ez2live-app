import dayjs from "dayjs";
import "dayjs/locale/pt-br";

const isDateBeforeToday = (date: string | undefined) => {
  if (!date) {
    return false;
  }
  const today = dayjs().locale("pt-br");
  const validity = dayjs(date).locale("pt-br").add(3, "hours");
  return dayjs(today).isBefore(validity);
};

const getDateFormater = (date?: string) => {
  const dataFormated = dayjs(date).format("DD/MM/YYYY");
  return dataFormated;
};

const getDateDiffInDays = (date: string) => {
  const today = dayjs().locale("pt-br");
  const validity = dayjs(date).locale("pt-br");

  const dateDiff = validity.diff(today, "day");
  const res = dateDiff;
  return res;
};

const getDateDiffInHours = (date: string) => {
  const today = dayjs().locale("pt-br");
  const validity = dayjs(date).locale("pt-br").add(3, "hours");

  const HoursDiff = validity.diff(today, "hour");
  const res = HoursDiff;
  return res;
};

const getEndOfDayByDate = (date: Date) => {
  return dayjs(date).endOf("day").subtract(3, "hours").toDate();
};

const date = {
  isDateBeforeToday,
  getDateFormater,
  getDateDiffInDays,
  getDateDiffInHours,
  getEndOfDayByDate,
};

export default date;
