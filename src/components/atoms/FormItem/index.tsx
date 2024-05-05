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
    <div className="flex flex-col relative">
      <label
        className={`text-sm text-black font-semibold ${className}`}
        htmlFor={htmlFor}
      >
        {label}
      </label>
      {children}
      {errorMessage && invalid && (
        <span
          className={`text-sx absolute bottom-4 left-[18px] text-rose-500 text-xs italic`}
        >
          {errorMessage}
        </span>
      )}
    </div>
  );
};

export default FormItem;
