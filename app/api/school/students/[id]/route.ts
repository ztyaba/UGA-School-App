import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const student = await prisma.student.findUnique({
    where: { id: params.id },
    include: { class: true, invoices: { include: { lineItems: true } } },
  });
  return NextResponse.json(student);
}
