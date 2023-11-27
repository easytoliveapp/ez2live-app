import { NextRequest, NextResponse } from "next/server";
import isAuthenticated from "@/utils/isAuthenticated";

export function middleware(request: NextRequest) {
  // Call our authentication function to check the request
  if (!isAuthenticated(request)) {
    console.log("debug preview.");
    // Respond with JSON indicating an error message
    return NextResponse.redirect(new URL("/conta/entrar", request.url));
  }

  // If the request is authenticated, continue to the API route handler
  return NextResponse.next();
}

// Limit the middleware to paths starting with `/api/`
export const config = {
  matcher: [
    "/meus-cupons",
    "/dashboard",
    "/dashboard/parceiro/:path*",
    "/parceiro-nao-encontrado",
    "/minha-conta",
  ],
};
