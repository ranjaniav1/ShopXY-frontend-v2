// middleware.js
const { NextResponse } = require("next/server");

function middleware(req) {
  const token = req.cookies.get("accessToken")?.value;

  console.log("Access Token from cookie:", token);

  const protectedPaths = ["/scheckout", "/user"];
  if (
    protectedPaths.some((path) => req.nextUrl.pathname.startsWith(path)) &&
    !token
  ) {
    const loginUrl = new URL("/", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

module.exports = {
  middleware,
  config: {
    matcher: ["/scheckout/:path*", "/user/:path*"],
  },
};
