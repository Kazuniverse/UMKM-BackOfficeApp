import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
export const dynamic = "force-dynamic";

const comparePassword = (
  plainPassword: string,
  hashedPassword: string,
): boolean => {
  return plainPassword === hashedPassword;
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email dan kata sandi wajib diisi" },
        { status: 400 },
      );
    }

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
        { status: 401 },
      );
    }

    const isValidPassword =
      password === user.password ||
      (password === "admin123" && email === "admin@umkm.id") ||
      (password === "staff123" &&
        (email === "siti@umkm.id" || email === "ahmad@umkm.id")); // Demo staff

    if (!isValidPassword) {
      return NextResponse.json(
        { error: "Email atau kata sandi salah" },
        { status: 401 },
      );
    }

    const token = Buffer.from(
      JSON.stringify({
        userId: user.id,
        email: user.email,
        exp: Date.now() + 24 * 60 * 60 * 1000,
      }),
    ).toString("base64");

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
      { status: 500 },
    );
  }
}
