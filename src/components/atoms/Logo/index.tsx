import React from "react";
import Link from "next/link";
import Image from "next/image";

export interface LogoProps {
  img?: string;
  imgLight?: string;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({
  img,
  imgLight,
  className = "flex-shrink-0",
}) => {
  return (
    <Link
<<<<<<< HEAD
<<<<<<< Updated upstream
      href="/"
=======
      href="/app"
>>>>>>> Stashed changes
=======
      href="/app/"
>>>>>>> 5b7cfa46f47cdbe78d6dea0e12e4f5384af5753b
      className={`ttnc-logo inline-block text-slate-600 ${className}`}
    >
      {/* THIS USE FOR MY CLIENT */}
      {/* PLEASE UN COMMENT BELLOW CODE AND USE IT */}
      {img ? (
        <Image
          className={`block h-8 sm:h-10 w-auto`}
          src={img}
          alt="Logo"
          sizes="200px"
          priority
        />
      ) : (
        "Logo Here"
      )}
      {imgLight && (
        <Image
          className="hidden h-8 sm:h-10 w-auto"
          src={imgLight}
          alt="Logo-Light"
          sizes="200px"
          priority
        />
      )}
    </Link>
  );
};

export default Logo;
