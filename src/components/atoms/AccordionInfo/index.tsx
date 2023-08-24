"use client";

import { Disclosure } from "@/app/headlessui";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import React, { FC } from "react";

const DEMO_DATA = [
  {
    name: "Lorem Ipsum",
    content:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus magni quam perspiciatis enim mollitia. Nemo voluptates quos, pariatur ipsa unde expedita exercitationem sapiente natus qui suscipit aspernatur ducimus, molestias laboriosam.",
  },
  {
    name: "FAQ",
    content:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus magni quam perspiciatis enim mollitia. Nemo voluptates quos, pariatur ipsa unde expedita exercitationem sapiente natus qui suscipit aspernatur ducimus, molestias laboriosam.",
  },
];

interface Props {
  panelClassName?: string;
  data?: typeof DEMO_DATA;
}

const AccordionInfo: FC<Props> = ({
  panelClassName = "p-4 pt-3 last:pb-0 text-slate-600 text-sm dark:text-slate-300 leading-6",
  data = DEMO_DATA,
}) => {
  return (
    <div className="w-full rounded-2xl space-y-2.5">
      {/* ============ */}
      {data.map((item, index) => {
        return (
          <Disclosure key={index} defaultOpen={index < 1}>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex items-center justify-between w-full px-4 py-2 font-medium text-left bg-primary-ez2livebg2 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-slate-500 focus-visible:ring-opacity-75 ">
                  <span>{item.name}</span>
                  {!open ? (
                    <PlusIcon className="w-4 h-4 text-black dark:text-slate-400" />
                  ) : (
                    <MinusIcon className="w-4 h-4 text-black dark:text-slate-400" />
                  )}
                </Disclosure.Button>
                <Disclosure.Panel
                  className={panelClassName}
                  as="div"
                  dangerouslySetInnerHTML={{ __html: item.content }}
                ></Disclosure.Panel>
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
