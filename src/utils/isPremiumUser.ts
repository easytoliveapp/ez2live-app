import { SUBSCRIPTION_STATUS } from "@/constants/payment";
import { ILoginResponse } from "@/types/auth/response";

const isPremiumUser = (session: ILoginResponse | null) => {
  return session?.user.subscriptionStatus === SUBSCRIPTION_STATUS.PREMIUM;
};

export default isPremiumUser;
