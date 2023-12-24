import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import isAuthenticated from "@/utils/isAuthenticated";
import { REFUSE_NON_LOGGED_USERS } from "./constants/PrivateRoutes";
import { ROLE_START_URL, PRIVATE_ROUTES_CONFIG, SIGN_IN_ROUTE_PATH } from "./routers";

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

  if (!tokenInfo && request.nextUrl.pathname !== SIGN_IN_ROUTE_PATH) {
    return NextResponse.redirect(new URL("/conta/entrar", request.url));

  }

  const requestRouteConfig = PRIVATE_ROUTES_CONFIG.filter((routes) => {
    return routes.path === request.nextUrl.pathname;
  }).shift();
  if (
    tokenInfo &&
    !requestRouteConfig?.isPublic &&
    !requestRouteConfig?.roles.some((role) => role === tokenInfo?.user.role)
  ) {
    return NextResponse.redirect(
      new URL(
        ROLE_START_URL[
        tokenInfo?.user.role as keyof typeof ROLE_START_URL
        ] ?? "/",
        request.url,
      ),
    );
  }

  return NextResponse.next();
}

// Limit the middleware to paths starting with `/api/`
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
