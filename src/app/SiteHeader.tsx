"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Header, HeaderLogged } from "@/components";
import { useThemeMode } from "@/hooks/useThemeMode";

const SiteHeader = () => {
  useThemeMode();

  const pathname = usePathname();

  return pathname === "/" ? <HeaderLogged /> : <Header />;
};

export default SiteHeader;
