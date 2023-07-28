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
    <form>
      {children}
      <label htmlFor={htmlFor}>{label}</label>
      <span className={`text-xs text-red-600 ${className}`}>{invalid}{errorMessage && invalid ? errorMessage : ''}</span>
    </form>
  );
};

export default FormItem;
