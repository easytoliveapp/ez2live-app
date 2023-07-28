import React from "react";

export interface formItemProps {
  errorMessage?: string;
  label?: string;
  invalid?: boolean;
  children: React.ReactNode;
  className?: string;
  htmlFor?: string;
}

const FormItem: React.FC<formItemProps> = ({
  label,
  invalid,
  htmlFor,
  errorMessage,
  className,
  children,
}) => {
  return (
    <div>
      {children}
      <label htmlFor={htmlFor}>{label}</label>
      {errorMessage && invalid ? (
        <span className={`text-sx text-rose-500 ${className}`}>
          {errorMessage}
        </span>
      ) : null}
    </div>
  );
};

export default FormItem;
