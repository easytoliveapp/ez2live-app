"use client";
import React, { FC } from "react";
import Image from "next/image";
import extendedLogoImage from "@/images/easytolive/logo/logocompleta-semfundoazulroxo.svg";
import AvatarDropdown from "@/components/atoms/AvatarDropdown";
import MenuBar from "../MenuBar/MenuBar";
import Link from "next/link";
import { useSession } from "next-auth/react";

interface NavBarLoggedProps {}

const NavBarLogged: FC<NavBarLoggedProps> = () => {
  const { data: session } = useSession();

  return (
    <div className="relative w-full p-2 flex justify-between items-center">
      <MenuBar />
      <Link href="/">
        <Image
          className="w-auto h-8 rounded-full cursor-pointer"
          src={session?.user?.image ?? extendedLogoImage}
          alt="Logo Extentida"
        />
      </Link>
      <AvatarDropdown />
    </div>
  );
};

export default NavBarLogged;
