import { Switch } from "@/app/headlessui";
import React from "react";

export interface ToggleButtonProps {
  toggle: boolean;
  onClick: (e: any) => void;
  label?: string;
}
const ToggleButton: React.FC<ToggleButtonProps> = ({ toggle, onClick, label}) => {

  return (
    <div className="inline-flex m-2" onClick={onClick}>
      <Switch
        checked={toggle}
        className={`${toggle ? "bg-primary-main" : "bg-white"}
          relative inline-flex h-[22px] w-[42px] shrink-0 cursor-pointer rounded-full p-[2.5px] border-[1px] border-primary-main transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span
          aria-hidden="true"
          className={`${toggle ? "translate-x-5 bg-white" : "translate-x-0 bg-primary-main"}
            pointer-events-none inline-block h-[14px] w-[14px] transform rounded-full shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
      <span className=" flex items-center ml-2 text-xs font-semibold">{label}</span>
    </div>
  );
};

export default ToggleButton;
