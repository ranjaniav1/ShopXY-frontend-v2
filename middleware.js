// middleware.js (at root of project or in /app folder)

import { NextResponse } from "next/server";

export function middleware(req) {
  // Try to get token from cookies
  const token = req.cookies.get("accessToken")?.value;

  console.log("Access Token from cookie:", token); // For debugging

  // Redirect to login if token is missing on protected paths
  const protectedPaths = ["/scheckout", "/user"];
  if (
    protectedPaths.some((path) => req.nextUrl.pathname.startsWith(path)) &&
    !token
  ) {
    // Redirect to login page on frontend
    const loginUrl = new URL("/", req.url);
    return NextResponse.redirect(loginUrl);


    // Otherwise continue
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/scheckout/:path*", "/user/:path*"],
};
