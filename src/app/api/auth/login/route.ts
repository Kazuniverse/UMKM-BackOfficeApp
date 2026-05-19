import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Simple password comparison (in production, use bcrypt)
const comparePassword = (plainPassword: string, hashedPassword: string): boolean => {
  // For demo purposes, we'll do a simple comparison
  // In production, use bcrypt.compare(plainPassword, hashedPassword)
  return plainPassword === hashedPassword;
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email dan kata sandi wajib diisi" },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        password: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Email atau kata sandi salah" },
        { status: 401 }
      );
    }

    // Verify password (in production, use bcrypt)
    // For demo, we'll accept common demo passwords
    const isValidPassword = 
      password === user.password || // Direct match (for seeded data)
      password === "admin123" && email === "admin@umkm.id" || // Demo admin
      password === "staff123" && (email === "siti@umkm.id" || email === "ahmad@umkm.id"); // Demo staff

    if (!isValidPassword) {
      return NextResponse.json(
        { error: "Email atau kata sandi salah" },
        { status: 401 }
      );
    }

    // Generate a simple token (in production, use JWT)
    const token = Buffer.from(JSON.stringify({
      userId: user.id,
      email: user.email,
      exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    })).toString("base64");

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      message: "Login berhasil",
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat login" },
      { status: 500 }
    );
  }
}