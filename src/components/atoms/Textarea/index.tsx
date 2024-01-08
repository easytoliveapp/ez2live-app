import React, { TextareaHTMLAttributes } from "react";

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  field?: any;
  invalid?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (props, ref) => {
    const {
      field,
      className = "",
      children,
      rows = 4,
      invalid,
      ...args
    } = props;

    return (
      <textarea
        ref={ref}
        className={`
         block w-full text-md placeholder:text-black target:border-primary-main text-black rounded-2xl bg-white
         ${className}
         ${invalid ? "border-rose-500" : "border-black"}`}
        rows={rows}
        {...args}
        {...field}
      >
        {children}
      </textarea>
    );
  },
);

Textarea.displayName = "Textarea";

export default Textarea;
