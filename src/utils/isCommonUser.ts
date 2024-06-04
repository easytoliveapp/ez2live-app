import { SUBSCRIPTION_STATUS } from "@/constants/payment";
import { ILoginResponse } from "@/types/auth/response";

const isCommonUser = (session: ILoginResponse | null) => {
  return session?.user.subscriptionStatus === SUBSCRIPTION_STATUS.COMMON;
};

export default isCommonUser;
