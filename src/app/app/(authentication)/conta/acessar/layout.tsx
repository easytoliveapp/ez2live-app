export default function AuthenticationLayout({
  children,
}: {
  children: React.ReactNode;
  params: any;
}) {
  return <div className="relative h-screen max-h-screen">{children}</div>;
}
