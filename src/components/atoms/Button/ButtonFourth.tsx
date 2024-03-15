import Button, { ButtonProps } from "@/components/atoms/Button/Button";
import React from "react";

export interface ButtonFourthProps extends ButtonProps {}

const ButtonFourth: React.FC<ButtonFourthProps> = ({
  className = "",
  ...args
}) => {
  return (
    <Button
      className={`ttnc-ButtonPrimary disabled:bg-opacity-90 hover:scale-105 bg-transparent border-2 border-secondary-main disabled:bg-primary-lighter text-secondary-main shadow-xl ${className}`}
      {...args}
    />
  );
};

export default ButtonFourth;
