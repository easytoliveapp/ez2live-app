import dayjs from "dayjs";
import "dayjs/locale/pt-br";

const getDateDiffInDays = (date: string) => {
  const today = dayjs().locale("pt-br");
  const validity = dayjs(date).locale("pt-br").add(3, "hours");

  const dateDiff = validity.diff(today, "day");
  if (dateDiff > 0) {
    const res = dateDiff + 1 + " dias";
    return res;
  }
  if (dateDiff >= 0) {
    const res = validity.diff(today, "hour");
    return res + " horas";
  } else {
    return 0;
  }
};

export default getDateDiffInDays;
