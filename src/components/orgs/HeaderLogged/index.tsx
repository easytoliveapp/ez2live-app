import NavBarLogged from "@/components/atoms/NavBarLogged";
import React, { FC } from "react";

export interface HeaderLoggedProps {}

const HeaderLogged: FC<HeaderLoggedProps> = () => {
  return (
    <>
      <NavBarLogged />
      <div className="bg-white h-0.5 w-auto m-auto mx-4" />
    </>
  );
};

export default HeaderLogged;
