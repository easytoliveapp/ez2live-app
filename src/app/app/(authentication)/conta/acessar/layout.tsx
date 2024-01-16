export default function AuthenticationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="relative h-screen max-h-screen">{children}</div>;
}
