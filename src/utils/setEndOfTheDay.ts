import dayjs from "dayjs";

export default function setFinalOfTheDay(date: Date) {
  return dayjs(date).endOf("day").toDate();
}
