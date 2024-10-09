import { NextResponse } from "next/server";

export function middleware(req) {
  // Get the access token from cookies
  const accessToken = req.cookies.get("user")?.value; // Adjust the key to match your cookie name

  // If access token is missing, redirect to login
  if (!accessToken) {
    return NextResponse.redirect(new URL("/", req.url)); // Redirect to the login page
  }

  // If access token is present, allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: ["/scheckout/:path*", "/user/:path*"] // Apply the middleware to specific routes
};
