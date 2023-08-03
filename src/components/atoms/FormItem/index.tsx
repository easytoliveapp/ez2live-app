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
    <div className='flex flex-col gap-1 m-1'>
      <label className=' text-sm font-medium' htmlFor={htmlFor}>{label}</label>
      {children}
      {errorMessage && invalid ? (
        <span className={`text-sx text-rose-500 ${className}`}>
          {errorMessage}
        </span>
      ) : null}
    </div>
  );
};

export default FormItem;
