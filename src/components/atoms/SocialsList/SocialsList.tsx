import React, { FC } from "react";
import facebook from "@/images/socials/facebook.svg";
import instagram from "@/images/socials/instagram.svg"
import Image from "next/image";

export interface SocialsListProps {
  className?: string;
  itemClass?: string;
}

const socialsDemo = [
  { name: "Facebook", icon: facebook, href: "#" },
  { name: "Instagram", icon: instagram, href: "#" },
];

const SocialsList: FC<SocialsListProps> = ({
  className = "",
  itemClass = "block w-6 h-6",
}) => {
  return (
    <nav
      className={`nc-SocialsList flex space-x-7 text-2xl text-neutral-6000 dark:text-neutral-300 ${className}`}
    >
      {socialsDemo.map((item, i) => (
        <a
          key={i}
          className={`${itemClass}`}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          title={item.name}
        >
          <Image sizes="40px" src={item.icon} alt="" />
        </a>
      ))}
    </nav>
  );
};

export default SocialsList;
