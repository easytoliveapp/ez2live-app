import dayjs from "dayjs";

const getDateDiffInDays = (date: string) => {
  const today = dayjs();
  const validity = dayjs(date);

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
