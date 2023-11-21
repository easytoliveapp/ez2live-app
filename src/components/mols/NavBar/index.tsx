import React from "react";
import Image from "next/image";
import extendedLogoImage from "@/images/easytolive/logo/logocompleta-semfundoazulroxo.svg";
import Link from "next/link";
import { ButtonBasic } from "@/components";

interface NavBarProps {
  hasLogoImage?: boolean;
}

const NavBar: React.FC<NavBarProps> = ({ hasLogoImage = true }) => {
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
          <Link href="/conta/acessar">
            <ButtonBasic className="text-primary-lighter">Entrar</ButtonBasic>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
