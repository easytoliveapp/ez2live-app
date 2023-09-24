import { MiddlewareRequest } from "@netlify/next";

export default function isAuthenticated(request: MiddlewareRequest): boolean {
  const hasActiveSession = request.cookies.get("next-auth.session-token");

  if (!hasActiveSession) {
    return false;
  }

  return true;
}
