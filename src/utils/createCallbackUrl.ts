import { usePathname } from "next/navigation";

export function CreateCallbackUrl() {
  const pathname = usePathname();
  pathname.startsWith("/conta") || pathname === "/"
    ? ""
    : `?callbackUrl=${encodeURIComponent(pathname)}`;
}
