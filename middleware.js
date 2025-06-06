import { NextResponse } from "next/server";

export function middleware(req) {

  const token = req.cookies.get('accessToken')?.value ;
  console.log('Access Token from cookies:', token);

  if (!token) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/scheckout/:path*", "/user/:path*"],
};
