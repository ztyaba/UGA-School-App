export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json();
  const { parentId, schoolCode, studentCode, relationship } = body;
  const school = await prisma.school.findUnique({ where: { code: schoolCode } });
  if (!school) return NextResponse.json({ error: "School not found" }, { status: 404 });
  const student = await prisma.student.findFirst({ where: { studentCode, schoolId: school.id } });
  if (!student) return NextResponse.json({ error: "Student not found" }, { status: 404 });
  await prisma.parentStudent.create({
    data: { parentId, studentId: student.id, relationship: relationship || "Parent" },
  });
  return NextResponse.json({ linked: true });
}
