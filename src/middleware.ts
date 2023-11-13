import { NextRequest, NextResponse } from "next/server";
import isAuthenticated from "@/utils/isAuthenticated";

export function middleware(request: NextRequest) {
  // Call our authentication function to check the request
  if (!isAuthenticated(request)) {
    // Respond with JSON indicating an error message
    return NextResponse.redirect(new URL("/auth/login", request.url));
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
    "/account",
  ],
};
