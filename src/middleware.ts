import { NextRequest, NextResponse } from "next/server";
import isAuthenticated from "@/utils/isAuthenticated";

export async function middleware(request: NextRequest) {
  // Call our authentication function to check the request
  const token = await isAuthenticated(request);

  if (!token) {
    // Respond with JSON indicating an error message
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (token && token.user.isSupplier && !token.user.isVerified) {
    return NextResponse.redirect(
      new URL("/supplier-not-verified", request.url),
    );
  }

  if (
    token &&
    !token.user.isSupplier &&
    request.nextUrl.pathname.includes("supplier")
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If the request is authenticated, continue to the API route handler
  return NextResponse.next();
}

// Limit the middleware to paths starting with `/api/`
export const config = {
  matcher: [
    "/",
    "/dashboard",
    "/dashboard/supplier/:path*",
    "/supplier-not-verified",
  ],
};
