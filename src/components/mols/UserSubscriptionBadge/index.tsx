import React from "react";
import isPremiumUser from "@/utils/isPremiumUser";
import { useSession } from "next-auth/react";

const UserSubscriptionBadge = () => {
  const { data: session } = useSession();
  const hasPremium = session && isPremiumUser();

  return (
    <div
      className={` rounded-3xl text-center text-white px-4 py-1.5 text-md flex justify-center items-center ${
        hasPremium ? "bg-primary-main" : "bg-generic-grayDarker"
      }`}
    >
      {hasPremium ? "Premium" : "Free"}
    </div>
  );
};

export default UserSubscriptionBadge;
