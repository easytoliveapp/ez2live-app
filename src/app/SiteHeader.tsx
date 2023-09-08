"use client";

import React from "react";
import { Header, HeaderLogged } from "@/components";
import { useThemeMode } from "@/hooks/useThemeMode";
import { useSession } from "next-auth/react";

const SiteHeader = () => {
  const { data: session } = useSession();
  useThemeMode();

  return session?.user ? <HeaderLogged /> : <Header />;
};

export default SiteHeader;
