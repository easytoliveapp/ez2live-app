import React, { FC, SelectHTMLAttributes } from "react";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
  sizeClass?: string;
  field?: any
}

const Select: FC<SelectProps> = ({
  className = "",
  sizeClass = "h-11",
  children,
  field,
  ...args
}) => {
  return (
    <select
      className={`nc-Select ${sizeClass} ${className} block w-full p-3 text-sm font-semibold rounded-full border-black focus:border-primary-ez2live focus:ring focus:ring-border-primary-ez2live focus:ring-opacity-50 bg-primary-ez2livebg`}
      {...args}
      {...field}
    >
      {children}
    </select>
  );
};

export default Select;
