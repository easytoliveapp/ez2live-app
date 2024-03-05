import { Header } from "@/components";

export default function AuthenticationLayout({
  children,
}: {
  children: React.ReactNode;
  params: any;
}) {
  return (
    <div>
      <head>
        <title>EasyToLive</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <Header />
      <div className="auth-layout_container">{children}</div>
    </div>
  );
}
