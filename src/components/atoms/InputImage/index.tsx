import React, { InputHTMLAttributes } from "react";
import { ItemTypeImage } from '@/components/atoms/index'
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  sizeClass?: string;
  fontClass?: string;
  rounded?: string;
  field?: any;
  invalid?: boolean
  placeHolder?: string;
}

// eslint-disable-next-line react/display-name
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    props,
    ref,
  ) => {
    const {
      className = "",
      sizeClass = "h-11 px-4 py-3",
      fontClass = "text-sm font-medium",
      rounded = "rounded-3xl",
      type = "file",
      field,
      invalid,
      placeHolder,
      ...rest
    } = props;

    return (
        <label
        htmlFor="upload-photo"
        className={`flex justify-between cursor-pointer focus:border-primary-ez2live items-center w-full border-black border-[1px] ${rounded} ${fontClass} ${sizeClass} ${className} ${invalid ? 'border-rose-500' : 'border-black'}`}
        {...field}
        {...rest}>
        <p>{placeHolder}</p>
        <span>
          <ItemTypeImage className='w-8 h-8 bg-white' />
        </span>
        <input
          className='hidden'
          id='upload-photo'
          ref={ref}
          type={type} 
        />
        </label>
    );
  }
);
export default Input;
