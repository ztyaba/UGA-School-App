export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json();
  const { schoolId, name, startDate, endDate, dueDate } = body;
  const term = await prisma.term.create({
    data: { schoolId, name, startDate: new Date(startDate), endDate: new Date(endDate), dueDate: new Date(dueDate) },
  });
  return NextResponse.json(term);
}
