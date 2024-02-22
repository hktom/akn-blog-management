import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const userId = request.cookies.get("userId");

  if (request.nextUrl.pathname !== "/login" && !userId) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (request.nextUrl.pathname === "/login" && userId) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/",
};
