export default function FastLoginLayout({
  children,
}: {
  children: React.ReactNode;
  params: any;
}) {
  return <div className="auth-layout_container">{children}</div>;
}
