import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import isAuthenticated from "@/utils/isAuthenticated";
import { REFUSE_NON_LOGGED_USERS } from "./constants/PrivateRoutes";
import { ROUTES_CONFIG } from "./routers";

export async function middleware(request: NextRequest) {
  // Call our authentication function to check the request

  if (!isAuthenticated(request)) {
    if (
      REFUSE_NON_LOGGED_USERS.some((route) =>
        request.nextUrl.pathname.startsWith(route),
      )
    ) {
      return NextResponse.redirect(new URL("/conta/entrar", request.url));
    }
    // Respond with JSON indicating an error message
  }

  const tokenInfo = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    cookieName:
      process.env.NODE_ENV === "production"
        ? "__Secure-next-auth.session-token"
        : "next-auth.session-token",
  });

  if (!tokenInfo) {
    if (
      REFUSE_NON_LOGGED_USERS.some((route) =>
        request.nextUrl.pathname.startsWith(route),
      )
    ) {
      return NextResponse.redirect(new URL("/conta/entrar", request.url));
    }
  }
  const requestedRouteInfo = ROUTES_CONFIG.filter(
    (config) => config.path === request.nextUrl.pathname,
  ).shift();
  console.log(requestedRouteInfo);
  if (
    !requestedRouteInfo?.isPublic &&
    !requestedRouteInfo?.roles.some((role) => role === tokenInfo?.user.role)
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If the request is authenticated and authorized, continue to the API route handler
  return NextResponse.next();
}
