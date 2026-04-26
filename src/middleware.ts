import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAuth = !!token;
    const isAuthPage = req.nextUrl.pathname.startsWith("/login") || req.nextUrl.pathname.startsWith("/signup");

    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/dashboard/overview", req.url));
      }
      return null;
    }

    // New: redirect authenticated users from home page to dashboard
    if (req.nextUrl.pathname === "/" && isAuth) {
      return NextResponse.redirect(new URL("/dashboard/overview", req.url));
    }

    // If the user is unauthenticated and trying to access the home page, let them stay.
    if (!isAuth && req.nextUrl.pathname === "/") {
      return null;
    }
  },
  {
    callbacks: {
      async authorized() {
        // This is a work-around for handled redirection above
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/onboarding/:path*",
    "/settings/:path*",
    "/login",
    "/signup"
  ],
};
