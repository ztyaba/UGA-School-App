export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json();
  const { invoiceId, parentId, schoolId, phoneNumber, network, amount } = body;
  const payment = await prisma.payment.create({
    data: {
      invoiceId,
      parentId,
      schoolId,
      method: "MOBILE_MONEY",
      provider: network,
      reference: `MM-${Date.now()}`,
      amount,
      status: "PENDING",
      mobileTx: {
        create: { phoneNumber, network, callbackStatus: "AWAITING" },
      },
    },
    include: { mobileTx: true },
  });
  return NextResponse.json({ paymentId: payment.id, reference: payment.reference });
}
