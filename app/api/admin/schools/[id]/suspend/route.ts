export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const school = await prisma.school.update({ where: { id: params.id }, data: { status: "SUSPENDED" } });
  return NextResponse.json(school);
}
