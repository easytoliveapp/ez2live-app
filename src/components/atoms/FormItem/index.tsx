import React from "react";
import cx from "classnames";
export interface IFormItemProps {
  errorMessage?: any;
  label?: string | number;
  invalid?: boolean;
  children: React.ReactNode;
  className?: string;
  htmlFor?: string;
  hasErrorSpacement?: boolean;
}

const FormItem: React.FC<IFormItemProps> = ({
  label,
  invalid,
  htmlFor,
  errorMessage,
  className,
  children,
  hasErrorSpacement = true,
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
      {errorMessage && invalid ? (
        <span
          className={`text-sx min-h-8 px-2 py-1 text-rose-500 text-xs italic`}
        >
          {errorMessage}
        </span>
      ) : (
        <span className={cx(hasErrorSpacement && "h-8")}></span>
      )}
    </div>
  );
};

export default FormItem;
