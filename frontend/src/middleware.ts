import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Allow all requests to proceed seamlessly for demo and production use
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
