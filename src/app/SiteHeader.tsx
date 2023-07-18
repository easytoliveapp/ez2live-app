"use client";

import React from "react";
import { usePathname } from "next/navigation";
import HeaderLogged from "@/components_old/Header/HeaderLogged";
import Header from "@/components_old/Header/Header";
import { useThemeMode } from "@/hooks/useThemeMode";

const SiteHeader = () => {
  useThemeMode();

  const pathname = usePathname();

  return pathname === "/home-2" ? <Header /> : <HeaderLogged />;
};

export default SiteHeader;
