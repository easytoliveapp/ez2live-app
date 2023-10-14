import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export default async function isAuthenticated(request: NextRequest) {
  const tokenKey =
    process.env.NODE_ENV === "production"
      ? "__Secure-next-auth.session-token"
      : "next-auth.session-token";

  const hasActiveSession = request.cookies.get(tokenKey);

  if (!hasActiveSession) {
    return false;
  }

  const token = await getToken({ req: request });

  return token;
}
