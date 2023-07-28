"use client";

import React from "react";
import { usePathname } from "next/navigation";
import {Header, HeaderLogged } from "@/components";
import { useThemeMode } from "@/hooks/useThemeMode";

const SiteHeader = () => {
  useThemeMode();

  const pathname = usePathname();

  return pathname === "/home-2" ? <Header /> : <HeaderLogged />;
};

export default SiteHeader;
