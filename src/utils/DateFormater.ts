import dayjs from "dayjs";

const DateFormater = (date?: string) => {
  const dataFormated = dayjs(date).format("DD/MM/YYYY");
  return dataFormated;
};
export default DateFormater;
