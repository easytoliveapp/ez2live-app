import dayjs from "dayjs";

const getDateDiffInDays = (date: string) => {
  const today = dayjs();
  const validity = dayjs(date);

  const dateDiff = validity.diff(today, "day");
  return dateDiff + 1;
};

export default getDateDiffInDays;
