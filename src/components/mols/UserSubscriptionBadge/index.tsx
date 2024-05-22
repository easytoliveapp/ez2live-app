import React from "react";
import { SUBSCRIPTION_STATUS } from "@/constants/payment";

interface IUserSubscriptionBadgeProps {
  label: string;
}

const UserSubscriptionBadge: React.FC<IUserSubscriptionBadgeProps> = ({
  label,
}) => {
  const hasPremium =
    label === SUBSCRIPTION_STATUS.PREMIUM ||
    label === SUBSCRIPTION_STATUS.TRIAL;

  return (
    <div
      className={` rounded-3xl text-center text-white px-4 py-1.5 text-md flex justify-center items-center ${
        hasPremium ? "bg-primary-main" : "bg-generic-grayDarker"
      }`}
    >
      {label}
    </div>
  );
};

export default UserSubscriptionBadge;
