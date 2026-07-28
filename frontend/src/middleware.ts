import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Define protected paths
  const protectedRoutes = ["/dashboard", "/projects", "/warroom", "/settings", "/ai"];
  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));

  // Check for the authentication token cookie
  const isAuthenticated = request.cookies.get("nirman_authenticated")?.value === "true";

  if (isProtected && !isAuthenticated) {
    // Redirect to login page
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Allow the request to proceed
  return NextResponse.next();
}

// Configure routes to run middleware on
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/projects/:path*",
    "/warroom/:path*",
    "/settings/:path*",
    "/ai/:path*",
  ],
};
