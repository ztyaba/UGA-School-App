export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const schools = await prisma.school.findMany({ include: { admins: true } });
  return NextResponse.json(schools[0] || null);
}
