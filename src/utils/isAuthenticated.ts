import { NextRequest } from "next/server";

export default function isAuthenticated(request: NextRequest): boolean {
  const hasActiveSession = request.cookies.get("next-auth.session-token");

  if (!hasActiveSession) {
    return false;
  }

  return true;
}
