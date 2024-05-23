import React from "react";
import { getAccountType } from "@/utils/getAccountType";

interface IUserSubscriptionBadgeProps {
  hasPremium: boolean;
  hasTrial: boolean;
}

const UserSubscriptionBadge: React.FC<IUserSubscriptionBadgeProps> = ({
  hasPremium,
  hasTrial,
}) => {
  return (
    <div
      className={` rounded-3xl text-center text-white px-4 py-1.5 text-md flex justify-center items-center ${
        hasPremium ? "bg-primary-main" : "bg-generic-grayDarker"
      }`}
    >
      {getAccountType(hasPremium, hasTrial)}
    </div>
  );
};

export default UserSubscriptionBadge;
