import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { ROLE_START_URL, PRIVATE_ROUTES_CONFIG } from "./routers";
import { ROLES } from "./constants/roles";

export async function middleware(request: NextRequest) {
  const tokenInfo = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    cookieName:
      process.env.NODE_ENV === "production"
        ? "__Secure-next-auth.session-token"
        : "next-auth.session-token",
  });

  const privateRequestRoute = PRIVATE_ROUTES_CONFIG.filter((routes) => {
    return routes.path === request.nextUrl.pathname;
  }).shift();

  if (
    !tokenInfo &&
    privateRequestRoute &&
    !privateRequestRoute?.isPublic &&
    !privateRequestRoute?.roles.some((role) => role === ROLES.commonUser)
  ) {
    return NextResponse.redirect("/conta/acessar");
  }

  if (
    tokenInfo &&
    privateRequestRoute &&
    !privateRequestRoute?.isPublic &&
    !privateRequestRoute?.roles.some((role) => role === tokenInfo?.user.role)
  ) {
    return NextResponse.redirect(
      new URL(
        ROLE_START_URL[tokenInfo?.user.role as keyof typeof ROLE_START_URL] ??
          "/",
        request.url,
      ),
    );
  }

  if (
    (tokenInfo?.user.role === ROLES.supplier ||
      tokenInfo?.user.role === ROLES.admin) &&
    request.nextUrl.pathname === "/"
  ) {
    return NextResponse.redirect(
      new URL(
        ROLE_START_URL[tokenInfo?.user.role as keyof typeof ROLE_START_URL] ??
          "/",
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
