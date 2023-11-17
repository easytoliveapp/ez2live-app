import NavBar from "@/components/mols/NavBar";
import React, { FC } from "react";

export interface HeaderProps {
  hasLogoImage?: boolean;
}
const Header: FC<HeaderProps> = ({ hasLogoImage }) => {
  return (
    <>
      <NavBar hasLogoImage={hasLogoImage} />
      <div className="bg-white h-0.5 w-auto m-auto mx-4"></div>
    </>
  );
};

export default Header;
