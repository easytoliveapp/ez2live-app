"use client";

import React from "react";
import { usePathname } from "next/navigation";
import {Header, HeaderLogged } from "@/components";
import { useThemeMode } from "@/hooks/useThemeMode";

const SiteHeader = () => {
  useThemeMode();

  const pathname = usePathname();
  

  // Until we dont use middleware to redirect if user are not authenticated
  return pathname === "/login" || pathname === "/register/user" || pathname === "/register/supplier" || pathname === "/forgot-password" ? <Header/> : <HeaderLogged/>;
};

export default SiteHeader;
