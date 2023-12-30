"use client";

import React from "react";
import Image from "next/image";
import LogoImage from "@/images/easytolive/logo/logotipo-semfundoazulroxo.svg";
import Link from "next/link";
import { ButtonBasic } from "@/components";
import { Route } from "next";
import { useCallbackUrl } from "@/hooks/useGenerateCallbackUrl";

interface NavBarProps {
  hasLogoImage?: boolean;
}

const NavBar: React.FC<NavBarProps> = ({ hasLogoImage = true }) => {
  const { generateCallbackUrl } = useCallbackUrl();

  return (
    <div>
      <div className="relative w-full p-4 flex justify-center items-center bg-generic-background">
        {hasLogoImage && (
          <Link href="/app">
            <Image className="w-auto h-8" src={LogoImage} alt="EasyToLive" />
          </Link>
        )}
        <div className="absolute right-2">
          <Link href={`/app/conta/acessar${generateCallbackUrl()}` as Route}>
            <ButtonBasic className="text-primary-lighter">Entrar</ButtonBasic>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
