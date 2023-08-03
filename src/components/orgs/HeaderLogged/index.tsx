import NavBarLogged from '@/components/atoms/NavBarLogged';
import React, { FC } from "react";

export interface HeaderLoggedProps {}

const HeaderLogged: FC<HeaderLoggedProps> = () => {
  return (
    <NavBarLogged/>
  );
};

export default HeaderLogged;
