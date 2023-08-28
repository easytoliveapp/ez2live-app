"use client";

import { Route } from "@/routers/types";
import { userLoginResponseProps } from '@/types/user';
import { getItemByLocalStorage } from '@/utils/localStorageHelper';
import Link from "next/link";
import { usePathname } from "next/navigation";
import React , { useEffect, useState } from "react";
import { FC } from "react";

export interface CommonLayoutProps {
  children?: React.ReactNode;
}

const pages: {
  name: string;
  link: Route;
}[] = [
  {
    name: "conta",
    link: "/account",
  },
  {
    name: "segurança",
    link: "/account-security",
  },
];

const CommonLayout: FC<CommonLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const [user, setUser] = useState<userLoginResponseProps>();

  useEffect(() => {
    setUser(getItemByLocalStorage('user'))
  }, []);

  return (
    <div className="nc-AccountCommonLayout container">
        <div className='mt-8 mb-16 flex items-center justify-between'>
          <h2 className=" pl-6 flex flex-wrap items-center text-2xl leading-[115%] md:leading-[115%] font-bold text-black justify-center">
          {user?.name}
          </h2>
        <div>
        <div className='relative rounded-full w-40 h-16 bg-gradient-to-r from-secondary-ez2live to-secondary-ez2livebg'>
            <div className='absolute top-8 right-0 rounded-full w-16 h-16 bg-gradient-to-r from-secondary-ez2live to-secondary-ez2livebg'>
            </div>
          </div>
        </div>          
        </div>
      <div className="mt-14 sm:mt-20">
        <div className="max-w-4xl mx-auto">
          <hr className="mt-10 border-slate-200 "></hr>
          <div className="flex mx-4 space-x-8 md:space-x-14 overflow-x-auto hiddenScrollbar">
            {pages.map((item, index) => {
              return (
                <Link
                  key={index}
                  href={item.link}
                  className={`block py-5 md:py-8 border-b-2 flex-shrink-0 text-sm sm:text-base ${
                    pathname === item.link
                      ? "border-primary-ez2live font-semibold text-slate-900"
                      : "border-transparent text-slate-500  hover:text-slate-800"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
          <hr className="border-slate-200 dark:border-slate-700"></hr>
        </div>
      </div>
      <div className="max-w-4xl h-full mx-auto pt-14 sm:pt-26 pb-12 lg:pb-12">
        {children}
      </div>
    </div>
  );
};

export default CommonLayout;