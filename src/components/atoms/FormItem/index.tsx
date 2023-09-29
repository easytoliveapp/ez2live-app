import React from "react";

export interface IFormItemProps {
  errorMessage?: any;
  label?: string | number;
  invalid?: boolean;
  children: React.ReactNode;
  className?: string;
  htmlFor?: string;
}

const FormItem: React.FC<IFormItemProps> = ({
  label,
  invalid,
  htmlFor,
  errorMessage,
  className,
  children,
}) => {
  return (
    <div className="flex flex-col gap-1 m-1">
      <label
        className={`text-sm text-black font-semibold ${className}`}
        htmlFor={htmlFor}
      >
        {label}
      </label>
      {children}
      {errorMessage && invalid ? (
        <span className={`text-sx text-rose-500`}>{errorMessage}</span>
      ) : null}
    </div>
  );
};

export default FormItem;
