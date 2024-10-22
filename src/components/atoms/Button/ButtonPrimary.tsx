import Button, { ButtonProps } from "@/components/atoms/Button/Button";
import classNames from "@/utils/classNames";
import React from "react";

export interface ButtonPrimaryProps extends ButtonProps {
  rounded?: string;
}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
  className = "",
  rounded = "",
  ...args
}) => {
  return (
    <Button
      className={classNames(
        "disabled:bg-opacity-90 disabled:bg-primary-lighter",
        "hover:opacity-95 hover:shadow-xl active:scale-100",
        "ttnc-ButtonPrimary bg-primary-main dark:bg-slate-100 text-slate-50 shadow-md transition-all",
        rounded,
        className,
      )}
      {...args}
    />
  );
};

export default ButtonPrimary;
