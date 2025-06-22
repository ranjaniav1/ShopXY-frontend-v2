// middleware.js
const { NextResponse } = require("next/server");

export default function middleware(req) {
  const token = req.cookies.get("user")?.value;

  console.log("Access Token from cookie:", token);

  if (!token) {

    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}



export const config = {
  matcher: ["/scheckout/:path*", "/user/:path*"],

};
