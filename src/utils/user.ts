import { SUBSCRIPTION_STATUS } from "@/constants/payment";
import { ILoginResponse } from "@/types/auth/response";
import { NextRequest } from "next/server";

const isAuthenticated = (request: NextRequest): boolean => {
  const tokenKey =
    process.env.NODE_ENV === "production"
      ? "__Secure-next-auth.session-token"
      : "next-auth.session-token";

  const hasActiveSession = request.cookies.get(tokenKey);

  if (!hasActiveSession) {
    return false;
  }

  return true;
};

const isCommon = (session: ILoginResponse | null) => {
  return session?.user.subscriptionStatus === SUBSCRIPTION_STATUS.COMMON;
};

const isPremium = (session: ILoginResponse | null) => {
  return session?.user.subscriptionStatus === SUBSCRIPTION_STATUS.PREMIUM;
};

const isTrialEnded = (session: ILoginResponse | null) => {
  return session?.user.subscriptionStatus === SUBSCRIPTION_STATUS.TRIAL_ENDED;
};

const isTrial = (session: ILoginResponse | null) => {
  return session?.user.subscriptionStatus === SUBSCRIPTION_STATUS.TRIAL;
};
const getAccountType = (hasPremium?: boolean, hasTrial?: boolean) => {
  if (hasPremium) {
    return "Conta Premium";
  } else if (hasTrial) {
    return "Teste Premium";
  } else {
    return "Conta Gratuita";
  }
};

const user = {
  isCommon,
  isAuthenticated,
  isPremium,
  isTrialEnded,
  isTrial,
  getAccountType,
};

export default user;
