import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json();
  const { paymentId, status } = body;
  const payment = await prisma.payment.update({
    where: { id: paymentId },
    data: { status: status || "SUCCESS" },
    include: { invoice: true },
  });
  await prisma.mobileMoneyTransaction.update({
    where: { paymentId },
    data: { callbackStatus: status || "SUCCESS", rawPayload: body },
  });
  if (payment.invoiceId) {
    await prisma.invoice.update({ where: { id: payment.invoiceId }, data: { status: "PAID" } });
  }
  return NextResponse.json({ ok: true });
}
