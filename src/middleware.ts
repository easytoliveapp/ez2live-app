import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import isAuthenticated from "@/utils/isAuthenticated";
import {
  ADMIN_USERS_ROUTES,
  REFUSE_COMMUM_USERS,
  REFUSE_NON_LOGGED_USERS,
  SUPPLIER_USERS_ROUTES,
} from "./constants/PrivateRoutes";

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

  // If the user is not an admin or supplier and is trying to access the admin or dashboard, redirect to the home page
  if (
    tokenInfo?.user.role === "user" &&
    REFUSE_COMMUM_USERS.some((route) =>
      request.nextUrl.pathname.startsWith(route),
    )
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If the user is supplier account and is trying to access the admin or my-coupons, redirect to the dashboard page.
  if (
    tokenInfo?.user.role === "supplier" &&
    !SUPPLIER_USERS_ROUTES.some((route) =>
      request.nextUrl.pathname.startsWith(route),
    )
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  // If the user is an admin will only be able to access routes starting with /admin
  if (
    tokenInfo?.user.role === "admin" &&
    !ADMIN_USERS_ROUTES.some((route) =>
      request.nextUrl.pathname.startsWith(route),
    )
  ) {
    return NextResponse.redirect(new URL("/admin/parceiros", request.url));
  }

  // If the request is authenticated and authorized, continue to the API route handler
  return NextResponse.next();
}

// Limit the middleware to paths starting with `/api/`
export const config = {
  matcher: [
    "/admin/:path*",
    "/meus-cupons",
    "/dashboard/:path*",
    "/dashboard/parceiro/:path*",
    "/parceiro-nao-encontrado",
    "/minha-conta",
    "/",
  ],
};
