import dayjs from "dayjs";

export default function getEndOfDayByDate(date: Date) {
  return dayjs(date).endOf("day").subtract(3, "hours").toDate();
}
