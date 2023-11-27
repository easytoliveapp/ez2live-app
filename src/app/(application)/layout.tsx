"use client";

import { Header, HeaderLogged, Footer } from "@/components";
import React from "react";
import { useSession } from "next-auth/react";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();

  return (
    <div className="min-h-[100vh] flex flex-col justify-between">
      <div>
        {session?.user ? <HeaderLogged /> : <Header />}
        <div className="app-layout__container">{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default AppLayout;
