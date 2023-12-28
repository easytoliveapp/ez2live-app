"use client";
import React, { FC } from "react";
import Image from "next/image";
import LogoImage from "@/images/easytolive/logo/logotipo-semfundoazulroxo.svg";
import { AvatarDropdown } from "@/components";
import MenuBar from "../MenuBar";
import Link from "next/link";
import { useSession } from "next-auth/react";

interface NavBarLoggedProps {
  hasLogoImage?: boolean;
}

const NavBarLogged: FC<NavBarLoggedProps> = ({ hasLogoImage = true }) => {
  const { data: session } = useSession();

  return (
    <div className="relative w-full p-2 flex justify-between items-center">
      <MenuBar />
      {hasLogoImage && (
<<<<<<< HEAD
<<<<<<< Updated upstream
        <Link href={session?.user.isSupplier ? "/dashboard" : "/"}>
=======
        <Link href={session?.user.isSupplier ? "/app/dashboard" : "/app"}>
>>>>>>> Stashed changes
=======
        <Link href={session?.user.isSupplier ? "/app/dashboard" : "/app/"}>
>>>>>>> 5b7cfa46f47cdbe78d6dea0e12e4f5384af5753b
          <Image
            className="w-auto h-8 rounded-full cursor-pointer"
            src={session?.user?.image ?? LogoImage}
            alt="Logo Extentida"
          />
        </Link>
      )}

      <AvatarDropdown />
    </div>
  );
};

export default NavBarLogged;
