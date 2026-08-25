import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET =
  process.env.JWT_SECRET || "your-secret-key-here-change-in-production";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    const adminUsername = process.env.ADMIN_USERNAME || "admin";
    const adminPassword = process.env.ADMIN_PASSWORD || "ruhi123";

    if (username === adminUsername && password === adminPassword) {
      // Create JWT token
      const token = jwt.sign(
        {
          username,
          role: "admin",
          loggedIn: true,
        },
        JWT_SECRET,
        { expiresIn: "7d" }, // Token expires in 7 days
      );

      // Set the session cookie
      const cookieStore = await cookies();
      cookieStore.set({
        name: "admin_token",
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return NextResponse.json(
        { success: true, message: "Login successful" },
        { status: 200 },
      );
    } else {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 },
      );
    }
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 },
    );
  }
}
