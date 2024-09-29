import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import Cookies from 'js-cookie';

export function middleware(request) {
  // Get the user ID from cookies
  const userId = request.cookies.get('access_token')?.value;

  // Define the protected routes
  const protectedRoutes = ['/scheckout/carts','/scheckout/address', '/scheckout/payment','/user/profile'];

  // If user is not authenticated and tries to access protected routes, redirect them
  if (protectedRoutes.includes(request.nextUrl.pathname)) {
    if (!userId) {
      // Redirect to login or another route if user is not authenticated
      return NextResponse.redirect(new URL('/route', request.url));
    }
  }

  // Allow the request to continue if authenticated or accessing non-protected routes
  return NextResponse.next();
}

// Specify the paths that the middleware should run on
export const config = {
  matcher: ['/checkout/carts', '/profile'], // Middleware will run only on these routes
};
