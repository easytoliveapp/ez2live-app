import React, { ReactNode } from "react";

interface SimpleModalProps {
  children: ReactNode;
  className?: string;
}

const SimpleModal: React.FC<SimpleModalProps> = ({ children, className }) => {
  return (
    <div
      className={`bg-white rounded-xl shadow-md w-full max-w-xs md:max-w-sm m-2 px-4 py-5 flex flex-col items-center justify-center gap-2 my-4 ${className}`}
    >
      {children}
    </div>
  );
};

export default SimpleModal;
