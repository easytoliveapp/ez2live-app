"use client";
import React from "react";
import Image from "next/image";
import extendedLogoImage from "@/images/easytolive/logo/logocompleta-semfundoazulroxo.svg";
import Link from "next/link";

interface NavBarProps {
  hasLogoImage?: boolean;
}

const NavBar: React.FC<NavBarProps> = ({ hasLogoImage = true }) => {
  return (
    <div>
      <div className="relative w-full p-4 flex justify-center items-center bg-generic-background">
        {hasLogoImage && (
          <Link href="/auth/login">
            <Image
              className="w-auto h-8"
              src={extendedLogoImage}
              alt="EasyToLive"
            />
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
