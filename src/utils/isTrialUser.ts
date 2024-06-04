import { SUBSCRIPTION_STATUS } from "@/constants/payment";
import { ILoginResponse } from "@/types/auth/response";

const isTrialUser = (session: ILoginResponse | null) => {
  return session?.user.subscriptionStatus === SUBSCRIPTION_STATUS.TRIAL;
};

export default isTrialUser;
