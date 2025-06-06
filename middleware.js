// middleware.ts
import { NextResponse } from 'next/server';

export function middleware(req) {
  const authHeader = req.headers.get('authorization');
  const accessToken = authHeader?.replace('Bearer ', '');
  const token = req.cookies.get('accessToken')?.value || accessToken;
  console.log('Access Token from cookies:', token);
  console.log('Access Token in middleware:', accessToken);

  if (!accessToken) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/scheckout/:path*', '/user/:path*'],
};
