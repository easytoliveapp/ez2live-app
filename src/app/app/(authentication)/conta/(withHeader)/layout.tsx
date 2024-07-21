"use client";
import { Header } from "@/components";
import { usePathname } from "next/navigation";

export default function AuthenticationLayout({
  children,
}: {
  children: React.ReactNode;
  params: any;
}) {
  const pathname = usePathname();
  const hideHeader = pathname === "/app/conta/entrar";

  return (
    <div>
      <head>
        <title>EasyToLive</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      {!hideHeader && <Header />}
      <div className="auth-layout_container">{children}</div>
    </div>
  );
}
