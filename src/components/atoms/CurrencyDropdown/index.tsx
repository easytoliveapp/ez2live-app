import { Popover, Transition } from "@/app/headlessui";
import React, { Fragment } from "react";

interface CurrencyDropdownProps {
  children: React.ReactNode;
}

const CurrencyDropdown: React.FC<CurrencyDropdownProps> = ({ children }) => {
  return (
    <div className="CurrencyDropdown">
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`
                ${!open && "text-opacity-100"}
                group px-3 py-1.5  border-neutral-300 hover:border-neutral-400  rounded-full inline-flex items-center text-sm text-black  font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <span className=" text-2xl rotate-90">...</span>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 w-screen max-w-[240px] px-2 mt-1 right-0 sm:px-0">
                <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black ring-opacity-5">
                  <div
                    className="relative grid gap-7 bg-white p-7"
                    onClick={() => close()}
                  >
                    {children}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
};

export default CurrencyDropdown;
