import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

export async function POST(request: Request) {
  const body = await request.json();
  const { students } = body as { students: { fullName: string; studentCode: string; classId: string; schoolId: string }[] };
  const created = await prisma.$transaction(
    students.map((s) =>
      prisma.student.create({ data: { fullName: s.fullName, studentCode: s.studentCode, classId: s.classId, schoolId: s.schoolId } })
    )
  );
  return NextResponse.json(created);
}
