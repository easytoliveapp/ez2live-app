"use client";
import React, { FC } from "react";
import Image from "next/image";
import LogoExtendida from "@/images/easytolive/logo/logocompleta-semfundoazulroxo.png";
import AvatarDropdown from "@/components/atoms/AvatarDropdown";

interface NavBarLoggedProps {}

const NavBarLogged: FC<NavBarLoggedProps> = () => {
  return (
    <div className="relative w-full p-2 flex justify-between items-center">
      <span className="invisible"></span>
      <Image className="w-auto h-8" src={LogoExtendida} alt="Logo Extentida" />
      <AvatarDropdown />
    </div>
  );
};

export default NavBarLogged;
