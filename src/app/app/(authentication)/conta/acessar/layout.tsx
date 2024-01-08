export default function AuthenticationLayout({
  children,
}: {
  children: React.ReactNode;
  params: any;
}) {
  return <div className="max-h-screen">{children}</div>;
}
