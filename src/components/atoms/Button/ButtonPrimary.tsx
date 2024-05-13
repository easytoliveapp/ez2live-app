import Button, { ButtonProps } from "@/components/atoms/Button/Button";
import React from "react";

export interface ButtonPrimaryProps extends ButtonProps {}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
  className = "",
  ...args
}) => {
  return (
    <Button
      className={`ttnc-ButtonPrimary hover:opacity-95 active:scale-100 hover:scale-[1.01] disabled:bg-opacity-90 bg-primary-main dark:bg-slate-100 disabled:bg-primary-lighter text-slate-50 shadow-xl ${className}`}
      {...args}
    />
  );
};

export default ButtonPrimary;
