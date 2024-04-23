import Button, { ButtonProps } from "@/components/atoms/Button/Button";
import React from "react";

export interface ButtonFourthProps extends ButtonProps {
  className: string;
}

const ButtonFourth: React.FC<ButtonFourthProps> = ({
  className = "border-secondary-main text-secondary-main",
  ...args
}) => {
  return (
    <Button
      className={`ttnc-ButtonPrimary disabled:bg-opacity-90 hover:scale-105 bg-transparent border-2 border-secondary-main text-secondary-main disabled:bg-primary-lighter shadow-md ${className}`}
      {...args}
    />
  );
};

export default ButtonFourth;
