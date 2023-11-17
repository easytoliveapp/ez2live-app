import Button, { ButtonProps } from "@/components/atoms/Button/Button";
import React from "react";

export interface ButtonBasic extends ButtonProps {}

const ButtonBasic: React.FC<ButtonBasic> = ({ className = "", ...args }) => {
  return (
    <Button className={`!text-sm !font-semibold ${className}`} {...args} />
  );
};

export default ButtonBasic;
