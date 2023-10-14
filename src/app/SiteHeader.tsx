"use client";

import React from "react";
import { Header, HeaderLogged } from "@/components";
import { useThemeMode } from "@/hooks/useThemeMode";
import { useSession } from "next-auth/react";

interface SiteHeaderProps {
  hasLogoImage?: boolean;
}

const SiteHeader: React.FC<SiteHeaderProps> = ({ hasLogoImage }) => {
  const { data: session } = useSession();
  useThemeMode();

  const HeaderComponent = session?.user ? HeaderLogged : Header;

  return <HeaderComponent hasLogoImage={hasLogoImage} />;
};

export default SiteHeader;
