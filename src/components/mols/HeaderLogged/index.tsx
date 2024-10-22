import { NavBarLogged } from "@/components";
import React, { FC } from "react";

export interface HeaderLoggedProps {
  hasLogoImage?: boolean;
}

const HeaderLogged: FC<HeaderLoggedProps> = ({ hasLogoImage }) => {
  return (
    <>
      <div className="bg-white h-0.5 w-auto m-auto mx-4" />
    </>
  );
};

export default HeaderLogged;
