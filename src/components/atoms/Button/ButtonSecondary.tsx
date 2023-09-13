import Button, { ButtonProps } from "@/components/atoms/Button/Button";
import React from "react";

export interface ButtonSecondaryProps extends ButtonProps { }

const ButtonSecondary: React.FC<ButtonSecondaryProps> = ({
  className = "",
  ...args
}) => {
  return (
    <Button
      className={`ttnc-ButtonSecondary bg-secondary-500 text-primary-600 text-bold hover:bg-secondary-600 ${className}`}
      {...args}
    />
  );
};

export default ButtonSecondary;
