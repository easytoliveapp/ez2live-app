import dayjs from "dayjs";

export const getDateFormater = (date?: string) => {
  const dataFormated = dayjs(date).format("DD/MM/YYYY");
  return dataFormated;
};
