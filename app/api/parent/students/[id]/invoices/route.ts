export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const invoices = await prisma.invoice.findMany({
    where: { studentId: params.id },
    include: { lineItems: true, payments: true, term: true },
  });
  return NextResponse.json(invoices);
}
