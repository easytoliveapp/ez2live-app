import React, { TextareaHTMLAttributes } from "react";

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

// eslint-disable-next-line react/display-name
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = "", children, rows = 4, ...args }, ref) => {
    return (
      <textarea
        ref={ref}
        className={`block w-full text-sm placeholder:text-black text-black rounded-2xl border-black focus:border-primary-ez2live bg-white ${className}`}
        rows={rows}
        {...args}
      >
        {children}
      </textarea>
    );
  }
);

export default Textarea;
