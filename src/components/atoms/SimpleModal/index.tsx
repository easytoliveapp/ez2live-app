import classNames from "@/utils/classNames";
import React, { ReactNode } from "react";

interface SimpleModalProps {
  children: ReactNode;
  className?: string;
}

const SimpleModal: React.FC<SimpleModalProps> = ({ children, className }) => {
  return (
    <div
      className={classNames(
        "bg-white rounded-xl shadow-md w-full md:max-w-sm px-4 py-5 flex flex-col items-center justify-center gap-2 my-3 md:mx-0",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default SimpleModal;
