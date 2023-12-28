import { usePathname } from "next/navigation";

export function useCallbackUrl() {
  const pathname = usePathname();
  const generateCallbackUrl = () => {
    return pathname.startsWith("/conta") || pathname === "/app"
      ? ""
      : `?callbackUrl=${encodeURIComponent(pathname)}`;
  };

  return { generateCallbackUrl };
}
