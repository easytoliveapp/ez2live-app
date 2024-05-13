"use client";

import React, { InputHTMLAttributes } from "react";
import ReactInputMask from "react-input-mask";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  mask?: string;
  sizeClass?: string;
  fontClass?: string;
  rounded?: string;
  field?: any;
  invalid?: boolean;
}

// eslint-disable-next-line react/display-name
const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    mask = null,
    className = "",
    sizeClass = "h-11 px-4 py-3",
    fontClass = "text-base font-medium",
    rounded = "rounded-3xl",
    type = "text",
    field,
    invalid,
    ...rest
  } = props;

  const Component = mask ? ReactInputMask : "input";

  return (
    <Component
      mask={mask}
      ref={ref}
      type={type}
      className={` inputRangeThumb mb-9 block w-full border-black focus:border-primary-main focus:ring focus:ring-primary-main focus:ring-opacity-50 bg-generic-background disabled:bg-neutral-200
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
