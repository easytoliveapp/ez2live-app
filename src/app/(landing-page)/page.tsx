"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import SectionHero3 from "./components/SectionHero";
import SectionPromo2 from "./components/SectionPromo2";
import SectionPromo3 from "./components/SectionPromo3";
import { SocialsList1 } from "@/components";
import PartnersSlider from "./components/PartnersSlider";
import LogoImage from "@/images/easytolive/logo/logotipo-fundoazulroxo.svg";

export interface CustomLink {
  label: string;
  href: string;
  targetBlank?: boolean;
}
export interface WidgetFooterMenu {
  id: string;
  title: string;
  submenus: CustomLink[];
}
const widgetMenus: WidgetFooterMenu[] = [
  {
    id: "5",
    title: "Nossos links",
    submenus: [
      { href: "#", label: "Sobre a Easy" },
      { href: "#", label: "Criar uma conta" },
      { href: "#", label: "Entrar em contato" },
    ],
  },
  {
    id: "1",
    title: "Descubra categorias",
    submenus: [
      {
        href: "/app?supplierCategory=6583288ca8101b0027ecd823",
        label: "Restaurantes",
      },
      {
        href: "/app?supplierCategory=6583296aa8101b0027ecd833",
        label: "Suplementos",
      },
      {
        href: "/app?supplierCategory=6583289aa8101b0027ecd826",
        label: "Estética",
      },
      {
        href: "#",
        label: "Nutrição",
      },
    ],
  },
];
const renderWidgetMenuItem = (menu: WidgetFooterMenu, index: number) => {
  return (
    <div key={index} className="text-sm">
      <h2 className="font-semibold text-neutral-700 dark:text-neutral-200">
        {menu.title}
      </h2>
      <ul className="mt-5 space-y-4">
        {menu.submenus.map((item, index) => (
          <li key={index}>
            <Link
              key={index}
              className="text-neutral-6000 dark:text-neutral-300 hover:text-black dark:hover:text-white"
              href={item.href as any}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
function LandingPage() {
  return (
    <div className="nc-LandingPage relative overflow-hidden">
      {/* SECTION HERO */}
      <SectionHero3 />

      <div className="container relative space-y-24 my-24 lg:space-y-32 lg:my-32">
        {/*  */}
        {/* sliders parceiros */}
        <PartnersSlider />

        {/*  */}
        <SectionPromo2 />

        {/* SECTION */}
        <SectionPromo3 />
      </div>

      <div className="nc-Footer relative py-20 lg:pt-28 lg:pb-24 border-t border-neutral-200 dark:border-neutral-700">
        <div className="container grid grid-cols-2 gap-y-10 gap-x-5 sm:gap-x-8 md:grid-cols-3 lg:grid-cols-3 lg:gap-x-10 ">
          <div className="grid grid-cols-4 gap-5 col-span-2 md:col-span-4 lg:md:col-span-1 lg:flex lg:flex-col">
            <div className="col-span-2 md:col-span-1">
              <Image src={LogoImage} className="w-28" alt="logo" />
            </div>
            <div className="col-span-2 flex items-center md:col-span-3">
              <SocialsList1 className="flex items-center space-x-2 lg:space-x-0 lg:flex-col lg:space-y-3 lg:items-start" />
            </div>
          </div>
          {widgetMenus.map(renderWidgetMenuItem)}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
