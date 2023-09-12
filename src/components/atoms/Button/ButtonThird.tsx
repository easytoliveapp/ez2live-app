import Button, { ButtonProps } from "@/components/atoms/Button/Button";
import React from "react";

export interface ButtonThirdProps extends ButtonProps {}

const ButtonThird: React.FC<ButtonThirdProps> = ({
  className = "text-secondary-ez2livered ",
  ...args
}) => {
  return <Button className={`ttnc-ButtonThird ${className}`} {...args} />;
};

export default ButtonThird;
