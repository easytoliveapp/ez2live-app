import NavBar from '@/components/atoms/NavBar';
import React, { FC } from "react";

export interface HeaderProps {}
const Header: FC<HeaderProps> = () => {
  return (
      <NavBar/>
  );
};

export default Header;
