export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json();
  const { schoolId, name, levelOrder } = body;
  const created = await prisma.class.create({ data: { schoolId, name, levelOrder } });
  return NextResponse.json(created);
}
