import React, { TextareaHTMLAttributes } from "react";

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  field?: any;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ field, className = "", children, rows = 4, ...args }, ref) => {
    return (
      <textarea
        ref={ref}
        className={`block w-full text-sm placeholder:text-black target:border-primary-main text-black rounded-2xl border-black bg-white ${className}`}
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
