import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Check if the path is in the admin section
  if (path.startsWith("/admin") && !path.startsWith("/admin/login")) {
    // Check for admin session in cookies or headers
    const session = request.cookies.get("admin_session");

    if (!session) {
      // Redirect to login if not authenticated
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
