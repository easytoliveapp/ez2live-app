import React, { InputHTMLAttributes } from "react";
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  sizeClass?: string;
  fontClass?: string;
  rounded?: string;
  field?: any;
  invalid?: boolean
}

// eslint-disable-next-line react/display-name
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    props,
    ref
  ) => {
   const {
      className = "",
      sizeClass = "h-11 px-4 py-3",
      fontClass = "text-base font-medium",
      rounded = "rounded-3xl",
      type = "text",
      field,
      invalid,
      ...rest
    } = props;

    return (
      <input
        ref={ref}
        type={type}
        className={`block w-full border-black focus:border-primary-ez2live focus:ring focus:ring-primary-ez2live focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-ez2live dark:focus:ring-opacity-25 dark:bg-neutral-900 disabled:bg-neutral-200 dark:disabled:bg-neutral-800 ${rounded} ${fontClass} ${sizeClass} ${className} ${invalid? 'border-rose-500': 'border-black'}`}
        {...field}
        {...rest}
      />
    );
  }
);
export default Input;