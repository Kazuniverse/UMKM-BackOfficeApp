import { NextResponse } from "next/server";

export async function POST() {
  // In production, you would invalidate the session/token here
  // For now, we'll just return a success message
  // The client-side will handle removing localStorage items
  
  return NextResponse.json({
    message: "Logout berhasil",
  });
}