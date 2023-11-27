import Button, { ButtonProps } from "@/components/atoms/Button/Button";
import React from "react";
export interface ButtonThirdProps extends ButtonProps {}

const ButtonThird: React.FC<ButtonThirdProps> = ({
  className = "text-generic-alertRed",
  ...args
}) => {
  return (
    <Button
      className={`ttnc-ButtonThird text-generic-alertRed font ${className}`}
      {...args}
    />
  );
};
export default ButtonThird;
