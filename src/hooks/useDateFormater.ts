import dayjs from "dayjs";

const useDateFormater = (date: string) => {
  const dataFormated = dayjs(date).format("DD/MM/YYYY");
  return dataFormated;
};
export default useDateFormater;
