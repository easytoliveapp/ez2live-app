import { IUser } from "@/types/auth/response";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";

const isPremiumUser = (user: IUser) => {
  const today = dayjs().locale("pt-br");
  const premiumExpires = dayjs(user.subscriptionEndDate).locale("pt-br");
  return dayjs(today).isBefore(premiumExpires);
};

export default isPremiumUser;
