import NavBar from '@/components/atoms/NavBar';
import React, { FC } from "react";

export interface HeaderProps {}
const Header: FC<HeaderProps> = () => {
  return (
    <>
      <NavBar/>
      <div className='bg-white h-1 w-auto m-auto mx-4'></div>
    </>
  );
};

export default Header;
