export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, phone, password, schoolId } = body;
  if (!email || !password || !schoolId) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { name, email, phone, passwordHash: hashed, role: "SCHOOL_ADMIN" },
  });
  await prisma.schoolAdmin.create({ data: { userId: user.id, schoolId } });
  return NextResponse.json({ id: user.id, email: user.email });
}
