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
      className={`nc-Select ${sizeClass} ${className} block w-full p-3 text-sm font-semibold rounded-full border-black focus:border-primary-600 focus:ring focus:ring-border-primary-600 focus:ring-opacity-50 bg-primary-100 dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900`}
      {...args}
      {...field}
    >
      {children}
    </select>
  );
};

export default Select;
