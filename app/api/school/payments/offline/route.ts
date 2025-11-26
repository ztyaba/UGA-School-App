import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

export async function POST(request: Request) {
  const body = await request.json();
  const { invoiceId, parentId, schoolId, amount, reference } = body;
  const payment = await prisma.payment.create({
    data: {
      invoiceId,
      parentId,
      schoolId,
      amount,
      method: "CASH",
      provider: "OFFLINE",
      reference: reference || "CASH",
      status: "SUCCESS",
    },
  });
  await prisma.invoice.update({ where: { id: invoiceId }, data: { status: "PAID" } });
  return NextResponse.json(payment);
}
