import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  // if (!token && request.nextUrl.pathname.startsWith("/drivers")) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  if (token && ["/login", "/register"].includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/drivers", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/drivers/:path*", "/login", "/register"],
};
