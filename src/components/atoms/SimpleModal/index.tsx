import React, { ReactNode } from "react";

interface SimpleModalProps {
  children: ReactNode;
}

const SimpleModal: React.FC<SimpleModalProps> = ({ children }) => {
  return (
    <div className="bg-white rounded-xl w-full max-w-sm m-2 p-3">
      {children}
    </div>
  );
};

export default SimpleModal;
