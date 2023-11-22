"use client";

import { Header, HeaderLogged } from "@/components";
import React from "react";
import { useSession } from "next-auth/react";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();

  return (
    <div>
      {session?.user ? <HeaderLogged /> : <Header />}
      <div className="app-layout__container">{children}</div>
    </div>
  );
};

export default AppLayout;
