import dayjs from "dayjs";
import "dayjs/locale/pt-br";

const getDateDiffInDays = (date: string) => {
  const today = dayjs().locale("pt-br");
  const validity = dayjs(date).locale("pt-br").add(3, "hours");

  const dateDiff = validity.diff(today, "day");
  const res = dateDiff + 1;
  return res;
};

export default getDateDiffInDays;
