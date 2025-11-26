import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function GET() {
  const students = await prisma.student.findMany({ include: { class: true } });
  return NextResponse.json(students);
}
