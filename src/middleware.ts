import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import isAuthenticated from "@/utils/isAuthenticated";

export async function middleware(request: NextRequest) {
  // Call our authentication function to check the request

  if (!isAuthenticated(request)) {
    // Respond with JSON indicating an error message
    return NextResponse.redirect(new URL("/conta/entrar", request.url));
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
    return NextResponse.redirect(new URL("/conta/entrar", request.url));
  }

  // If the user is not an admin or supplier and is trying to access the admin or dashboard, redirect to the home page
  if (
    tokenInfo.user.role === "user" &&
    (request.nextUrl.pathname.includes("/dashboard") ||
      request.nextUrl.pathname.includes("/admin"))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If the user is supplier account and is trying to access the admin or my-coupons, redirect to the dashboard page.

  if (
    tokenInfo.user.role === "supplier" &&
    (request.nextUrl.pathname.includes("/meus-cupons") ||
      request.nextUrl.pathname.includes("/admin"))
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
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
  ],
};
