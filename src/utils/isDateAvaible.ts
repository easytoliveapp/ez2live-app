import dayjs from "dayjs";
import "dayjs/locale/pt-br";

const isDateAvaible = (date: string) => {
  const today = dayjs().locale("pt-br");
  const validity = dayjs(date).locale("pt-br").add(3, "hours");
  return dayjs(today).isBefore(validity);
};

export default isDateAvaible;
