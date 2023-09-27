import React, { InputHTMLAttributes } from "react";
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  sizeClass?: string;
  fontClass?: string;
  rounded?: string;
  field?: any;
  invalid?: boolean;
}

// eslint-disable-next-line react/display-name
const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    className = "",
    sizeClass = "h-11 px-4 py-3",
    fontClass = "text-sm font-medium",
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
      className={` inputRangeThumb block w-full border-black focus:border-primary-main focus:ring focus:ring-primary-main focus:ring-opacity-50 bg-generic-background disabled:bg-neutral-200
      ${rounded}
      ${fontClass}
      ${sizeClass}
      ${className}
      ${invalid ? "border-rose-500" : "border-black"}`}
      {...field}
      {...rest}
    />
  );
});
export default Input;
