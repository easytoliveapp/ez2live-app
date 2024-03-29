import dayjs from "dayjs";
import "dayjs/locale/pt-br";

const getDateDiffInDays = (date: string) => {
  const today = dayjs().locale("pt-br");
  const validity = dayjs(date).locale("pt-br");

  const dateDiff = validity.diff(today, "day");
  const res = dateDiff;
  return res;
};

export default getDateDiffInDays;
