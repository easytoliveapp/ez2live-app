"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import NewSection2 from "./components/NewSection2";
import SectionHero3 from "./components/SectionHero";
import NewSection5 from "./components/NewSection5";
import NewSection6 from "./components/NewSection6";
import { SocialsList1 } from "@/components";
import LogoImage from "@/images/easytolive/logo/logotipo-fundoazulroxo.svg";
import NewSection3 from "./components/NewSection3";
import NewSection4 from "./components/NewSection4";

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
      // { href: "#", label: "Sobre a Easy" },
      { href: "/app/conta/acessar", label: "Criar uma conta" },
      { href: "mailto:contato@easytolive.com.br", label: "Entrar em contato" },
    ],
  },
  {
    id: "1",
    title: "Descubra categorias",
    submenus: [
      {
        href: "/app?supplierCategory=6583288ca8101b0027ecd823",
        label: "Comida Saudável",
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
        href: "/app?supplierCategory=658328a9a8101b0027ecd829",
        label: "Nutrição",
      },
    ],
  },
];
const renderWidgetMenuItem = (menu: WidgetFooterMenu, index: number) => {
  return (
    <div key={index} className="text-sm text-white">
      <h2 className="font-semibold text-white">{menu.title}</h2>
      <ul className="mt-5 space-y-4">
        {menu.submenus.map((item, index) => (
          <li key={index}>
            <Link
              key={index}
              className="text-neutral-6000 dark:text-neutral-300 hover:text-primary-main dark:hover:text-white"
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
    <div className="nc-LandingPage relative  overflow-hidden bg-generic-dark2">
      <span className="flex p-4 min-h-14 justify-center items-center bg-primary-main text-white w-full sm:text-lg md:text-xl font-semibold">
        Cadastre-se agora e ganhe um mês gratuito de cupons!
      </span>
      {/* SECTION HERO */}
      <SectionHero3 />

      <div className="relative space-y-24 my-24 lg:space-y-64">
        {/*  */}

        <NewSection2 />
        {/* */}
        <NewSection3 />
        {/* */}
        <NewSection4 />
        {/*  */}
        <NewSection5 />
        {/*  */}
        <NewSection6 />
      </div>

      <div className="nc-Footer relative py-20 lg:pt-28 lg:pb-24 dark:border-neutral-700 text-white">
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
