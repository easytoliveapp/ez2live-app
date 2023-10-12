import dayjs from "dayjs";

const getDateFormater = (date: string) => {
  const dataFormated = dayjs(date).format("DD/MM/YYYY");
  return dataFormated;
};

export default getDateFormater;
