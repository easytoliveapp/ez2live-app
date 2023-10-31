import { HeaderLogged } from "@/components";
import React from "react";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <HeaderLogged />
      <div className="app-layout__container">{children}</div>
    </div>
  );
};

export default AppLayout;
