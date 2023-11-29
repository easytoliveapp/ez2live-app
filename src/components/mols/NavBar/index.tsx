"use client";

import React from "react";
import Image from "next/image";
import extendedLogoImage from "@/images/easytolive/logo/logocompleta-semfundoazulroxo.svg";
import Link from "next/link";
import { ButtonBasic } from "@/components";
import { usePathname } from "next/navigation";
import { Route } from "next";

interface NavBarProps {
  hasLogoImage?: boolean;
}

const NavBar: React.FC<NavBarProps> = ({ hasLogoImage = true }) => {
  const pathname = usePathname();
  let destination = "/";
  if (pathname.startsWith("/conta") || pathname === "/") {
    destination = "";
  } else {
    destination = `?callbackUrl=${encodeURIComponent(pathname)}`;
  }
  return (
    <div>
      <div className="relative w-full p-4 flex justify-center items-center bg-generic-background">
        {hasLogoImage && (
          <Link href="/">
            <Image
              className="w-auto h-8"
              src={extendedLogoImage}
              alt="EasyToLive"
            />
          </Link>
        )}
        <div className="absolute right-2">
          <Link href={`/conta/acessar${destination}` as Route}>
            <ButtonBasic className="text-primary-lighter">Entrar</ButtonBasic>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
