"use client";

import { ReactNode } from "react";
import { Disclosure } from "@/app/headlessui";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import React, { FC } from "react";

type DataProps = {
  name: string | ReactNode;
  content: string | ReactNode;
};

interface IAccordionInfoProps {
  panelClassName?: string;
  data?: DataProps[];
}

const DEMO_DATA = [
  {
    name: "Regras de uso",
    content: "",
  },
];

const AccordionInfo: FC<IAccordionInfoProps> = ({
  panelClassName = "p-4 pt-3 last:pb-0 h-max text-slate-600 text-sm max-h-[120px] overflow-y-scroll leading-6",
  data = DEMO_DATA,
}) => {
  return (
    <div className="w-full rounded-2xl space-y-2.5">
      {/* ============ */}
      {data.map((item, index) => {
        return (
          <Disclosure key={index}>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex items-center justify-between w-full px-4 py-2 font-medium text-left bg-slate-100/80 hover:bg-slate-200/60 rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-slate-500 focus-visible:ring-opacity-75 ">
                  <div>{item.name}</div>
                  {!open ? (
                    <PlusIcon className="w-4 h-4 text-slate-600 " />
                  ) : (
                    <MinusIcon className="w-4 h-4 text-slate-600 " />
                  )}
                </Disclosure.Button>
                <Disclosure.Panel className={panelClassName} as="div">
                  {item.content}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        );
      })}

      {/* ============ */}
    </div>
  );
};

export default AccordionInfo;
