import { usePathname } from "next/navigation";

export function useGenerateCallbackUrl() {
  const pathname = usePathname();
  return pathname.startsWith("/conta") || pathname === "/"
    ? ""
    : `?callbackUrl=${encodeURIComponent(pathname)}`;
}
