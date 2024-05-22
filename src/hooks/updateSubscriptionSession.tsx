import { useSession } from "next-auth/react";

const useUpdateSubscriptionSession = async (data: any) => {
  const { data: session, update } = useSession();

  const {
    subscriptionStatus,
    iuguCustomerId,
    iuguPaymentMethodId,
    iuguSubscriptionId,
  } = data;

  const updatedUser = {
    ...session?.user,
    ...(subscriptionStatus && { subscriptionStatus }),
    ...(iuguCustomerId && { iuguCustomerId }),
    ...(iuguPaymentMethodId && { iuguPaymentMethodId }),
    ...(iuguSubscriptionId && { iuguSubscriptionId }),
  };

  return await update({
    ...session,
    user: updatedUser,
  });
};

export default useUpdateSubscriptionSession;
