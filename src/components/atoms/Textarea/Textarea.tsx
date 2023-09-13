import React, { TextareaHTMLAttributes } from "react";

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> { }

// eslint-disable-next-line react/display-name
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = "", children, rows = 4, ...args }, ref) => {
    return (
      <textarea
        ref={ref}
        className={`block w-full text-sm rounded-2xl border-neutral-200 focus:border-primary-lighter focus:ring focus:ring-generic-backgroundLigther focus:ring-opacity-50 bg-white${className}`}
        rows={rows}
        {...args}
      >
        {children}
      </textarea>
    );
  }
);

export default Textarea;
