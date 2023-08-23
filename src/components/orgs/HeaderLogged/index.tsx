import NavBarLogged from '@/components/atoms/NavBarLogged';
import React, { FC } from "react";

export interface HeaderLoggedProps {}

const HeaderLogged: FC<HeaderLoggedProps> = () => {
  return (
    <>
    <NavBarLogged/>
    <div className='bg-white h-1 w-auto m-auto mx-4'></div>
    </>
  );
};

export default HeaderLogged;
