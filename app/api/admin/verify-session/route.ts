import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET =
  process.env.JWT_SECRET || "your-secret-key-here-change-in-production";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;

    if (!token) {
      return NextResponse.json({
        isAuthenticated: false,
      });
    }

    try {
      // Verify the JWT token
      const decoded = jwt.verify(token, JWT_SECRET) as {
        username: string;
        role: string;
        loggedIn: boolean;
      };

      // Check if user has admin role
      if (decoded.role === "admin" && decoded.loggedIn === true) {
        return NextResponse.json({
          isAuthenticated: true,
          username: decoded.username,
        });
      } else {
        return NextResponse.json({
          isAuthenticated: false,
        });
      }
    } catch (error) {
      // Token invalid or expired
      // Clear the invalid token
      const cookieStore = await cookies();
      cookieStore.delete("admin_token");

      return NextResponse.json({
        isAuthenticated: false,
      });
    }
  } catch (error) {
    console.error("Error verifying session:", error);
    return NextResponse.json({ isAuthenticated: false }, { status: 500 });
  }
}
