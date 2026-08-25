import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || "not set",
    supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      ? "set"
      : "not set",
    supabaseServiceKey: process.env.SUPABASE_SERVICE_ROLE_KEY
      ? "set"
      : "not set",
  });
}
