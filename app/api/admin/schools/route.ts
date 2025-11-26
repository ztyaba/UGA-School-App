import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const schools = await prisma.school.findMany({ include: { admins: { include: { user: true } } } });
  return NextResponse.json(schools);
}
