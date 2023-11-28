import { Header } from "@/components";

export default function AuthenticationLayout({
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
