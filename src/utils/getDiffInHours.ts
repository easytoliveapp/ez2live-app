import dayjs from "dayjs";
import "dayjs/locale/pt-br";

const getDateDiffInHours = (date: string) => {
  const today = dayjs().locale("pt-br");
  const validity = dayjs(date).locale("pt-br").add(3, "hours");

  const HoursDiff = validity.diff(today, "hour");
  const res = HoursDiff;
  return res;
};

export default getDateDiffInHours;
