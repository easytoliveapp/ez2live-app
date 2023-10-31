import { Header } from "@/components";
import React from "react";

export default async function AuthenticationLayout({
  children,
}: {
  children: React.ReactNode;
  params: any;
}) {
  return (
    <div>
      <Header />
      <div className="auth-layout_container">{children}</div>
    </div>
  );
}
