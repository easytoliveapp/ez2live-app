import { usePathname } from "next/navigation";

export function GenerateCallbackUrl() {
  const pathname = usePathname();
  return pathname.startsWith("/conta") || pathname === "/"
    ? ""
    : `?callbackUrl=${encodeURIComponent(pathname)}`;
}
