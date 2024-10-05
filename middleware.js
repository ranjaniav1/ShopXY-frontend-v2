// import { NextResponse } from "next/server";

// export function middleware(req) {
//   // Extract Authorization header from the request
//   const authHeader = req.headers.get("Authorization");

//   // List of protected routes
//   const protectedRoutes = ["/user", "/scheckout"];

//   // Check if the request is for a protected route
//   if (protectedRoutes.includes(req.nextUrl.pathname)) {
//     // If Authorization header is missing, redirect to the home page
//     if (!authHeader) {
//       console.log("No token found, redirecting to home...");
//       return NextResponse.redirect(new URL("/", req.url));
//     }

//     // Optional: You could decode the token or verify it here if needed
//     // Example: Decode JWT or use token verification logic
//     // const token = authHeader.split(" ")[1]; // Extract the token part from the "Bearer TOKEN" structure
//     // const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     // if (decoded) { proceed... } else { return redirect... }
//   }

//   // Continue if Authorization header is present or route is not protected
//   return NextResponse.next();
// }

// // Define which routes should trigger the middleware
// export const config = {
//   matcher: ["/user/:path*", "/scheckout/:path*"], // Correct syntax for matching dynamic routes
// };
import { NextResponse } from "next/server";

export function middleware(req) {
  // Extract accessToken from cookies
  const token = req.cookies.get("accessToken");

  // List of protected routes
  const protectedRoutes = ["/user", "/scheckout"];

  // Check if the request is for a protected route
  if (protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route))) {
    // If accessToken is missing, redirect to the home page
    if (!token) {
      console.log("No token found, redirecting to home...");
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Optional: Verify the token here if needed (e.g., check expiration, validity)
    // Example: If using JWT, decode and verify the token
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // if (!decoded) {
    //   console.log("Invalid token, redirecting to home...");
    //   return NextResponse.redirect(new URL("/", req.url));
    // }
  }

  // Continue if token is present or route is not protected
  return NextResponse.next();
}

// Define which routes should trigger the middleware
export const config = {
  matcher: ["/user/:path*", "/scheckout/:path*"], // Match any path under /user and /scheckout
};
