import React from "react";

interface PremiumBadgeProps {
  hasPremium: boolean;
  className?: string;
}

const PremiumBadge: React.FC<PremiumBadgeProps> = ({
  className,
  hasPremium,
}) => {
  return (
    <div
      className={` rounded-3xl text-center text-white px-4 py-1.5 text-md flex justify-center items-center ${
        hasPremium ? "bg-primary-main" : "bg-generic-grayDarker"
      } ${className}`}
    >
      {hasPremium ? "Premium" : "Free"}
    </div>
  );
};

export default PremiumBadge;
