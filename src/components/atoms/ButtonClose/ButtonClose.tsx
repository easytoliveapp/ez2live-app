import React from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import twFocusClass from "@/utils/twFocusClass";

export interface ButtonCloseProps {
  className?: string;
  iconClassName?: string;
  onClick?: () => void;
}

const ButtonClose: React.FC<ButtonCloseProps> = ({
  className = "",
  iconClassName = "w-6 h-6",
  onClick = () => {},
}) => {
  return (
    <button
      className={
        `w-8 h-8 flex items-center justify-center rounded-full text-black hover:bg-neutral-100  ${className} ` +
        twFocusClass()
      }
      onClick={onClick}
    >
      <span className="sr-only">Close</span>
      <XMarkIcon className={iconClassName} />
    </button>
  );
};

export default ButtonClose;
