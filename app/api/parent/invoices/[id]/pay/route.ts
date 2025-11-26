import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const { parentId, method, provider, reference, amount } = body;
  const invoice = await prisma.invoice.findUnique({ where: { id: params.id } });
  if (!invoice) return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
  const payment = await prisma.payment.create({
    data: {
      invoiceId: params.id,
      parentId,
      schoolId: invoice.studentId,
      method,
      provider,
      reference: reference || "M-MOCK",
      amount,
      status: "SUCCESS",
    },
  });
  await prisma.invoice.update({
    where: { id: params.id },
    data: { status: "PAID" },
  });
  return NextResponse.json({ paymentId: payment.id });
}
