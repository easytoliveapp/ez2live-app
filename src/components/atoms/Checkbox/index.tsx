import React, { FC } from "react";

export interface CheckboxProps {
  label?: string;
  subLabel?: string;
  className?: string;
  sizeClassName?: string;
  labelClassName?: string;
  name: string;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
}

const Checkbox: FC<CheckboxProps> = ({
  subLabel = "",
  label = "",
  name,
  className = "",
  sizeClassName = "w-4 h-4",
  labelClassName = "",
  defaultChecked,
  onChange,
}) => {
  return (
    <div className={`flex text-sm sm:text-base ${className}`}>
      <input
        id={name}
        name={name}
        type="checkbox"
        className={`cursor-pointer focus:ring-action-primary-main text-primary-500 rounded border-primary-main hover:border-primary-main bg-transparent accent-primary-main  focus:ring-primary-main ${sizeClassName}`}
        defaultChecked={defaultChecked}
        onChange={(e) => onChange && onChange(e.target.checked)}
      />
      {label && (
        <label
          htmlFor={name}
          className="pl-2.5 sm:pl-3.5 flex flex-col flex-1 justify-center select-none"
        >
          <span
            className={`text-primary-main   ${labelClassName} ${
              subLabel ? "-mt-0.5" : ""
            }`}
          >
            {label}
          </span>
          {subLabel && (
            <p className="mt-0.5 text-primary-main  text-sm font-light">
              {subLabel}
            </p>
          )}
        </label>
      )}
    </div>
  );
};

export default Checkbox;
