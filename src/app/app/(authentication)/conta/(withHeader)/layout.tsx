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
  const paths = {
    hideHeaderPaths: [
      "/app/conta/entrar",
      "/app/conta/cadastrar/parceiro",
      "/yet/another/path",
    ],
  };

  const hideHeader = paths.hideHeaderPaths.includes(pathname);

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
