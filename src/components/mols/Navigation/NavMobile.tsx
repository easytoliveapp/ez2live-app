"use client";

import React from "react";
import { ButtonClose, SocialsList } from "@/components";
import { NavItemType } from "./NavigationItem";
import Image from "next/image";
import extendedLogoImage from "@/images/easytolive/logo/logocompleta-semfundoazulroxo.svg";

export interface NavMobileProps {
  data?: NavItemType[];
  onClickClose?: () => void;
}

const NavMobile: React.FC<NavMobileProps> = ({ onClickClose }) => {
  return (
    <div className="overflow-y-auto w-full h-screen py-2 transition transform shadow-lg ring-1  bg-white  divide-y-2 divide-neutral-100 ">
      <div className="py-6 px-5">
        <div className="flex flex-col mt-5 text-slate-600 text-sm">
          <Image className="w-1/2" src={extendedLogoImage} alt="EasyToLive" />
          <span></span>

          <div className="flex justify-between items-center mt-4">
            <SocialsList itemClass="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full text-xl" />
          </div>
        </div>
        <span className="absolute right-2 top-2 p-1">
          <ButtonClose onClick={onClickClose} />
        </span>
      </div>
    </div>
  );
};

export default NavMobile;
