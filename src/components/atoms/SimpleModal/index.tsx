import React, { ReactNode } from "react";

interface SimpleModalProps {
  children: ReactNode;
}

const SimpleModal: React.FC<SimpleModalProps> = ({ children }) => {
  return (
    <div className="bg-white rounded-xl w-full max-w-sm m-2 p-3 flex flex-col items-center justify-center gap-2 my-4">
      {children}
    </div>
  );
};

export default SimpleModal;
