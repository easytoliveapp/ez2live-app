import dayjs from "dayjs";

export const getDateFormater = (date?: string) => {
  const dataFormated = dayjs(date).add(1, "day").format("DD/MM/YYYY");
  return dataFormated;
};
