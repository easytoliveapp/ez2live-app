import { NextRequest } from "next/server";

export default function isAuthenticated(request: NextRequest): boolean {
  const tokenKey =
    process.env.NODE_ENV === "production"
      ? "__Secure-next-auth.session-token"
      : "next-auth.session-token";

  const hasActiveSession = request.cookies.get(tokenKey);

  if (!hasActiveSession) {
    return false;
  }

  return true;
}
