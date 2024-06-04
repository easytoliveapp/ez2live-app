import { SUBSCRIPTION_STATUS } from "@/constants/payment";
import { ILoginResponse } from "@/types/auth/response";

const isTrialEndedUser = (session: ILoginResponse | null) => {
  return session?.user.subscriptionStatus === SUBSCRIPTION_STATUS.TRIAL_ENDED;
};

export default isTrialEndedUser;
