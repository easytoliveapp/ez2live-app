import Button, { ButtonProps } from "@/components/atoms/Button/Button";
import React from "react";

export interface ButtonSecondaryProps extends ButtonProps {}

const ButtonSecondary: React.FC<ButtonSecondaryProps> = ({
  className = "",
  ...args
}) => {
  return (
    <Button
      className={`ttnc-ButtonSecondary bg-secondary-ez2live text-black !text-bold dark:bg-slate-900 dark:text-slate-300 hover:bg-secondary-ez2live_600 dark:hover:bg-slate-800 ${className}`}
      {...args}
    />
  );
};

export default ButtonSecondary;
