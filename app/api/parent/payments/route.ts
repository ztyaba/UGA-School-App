import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const payments = await prisma.payment.findMany({ include: { invoice: true } });
  return NextResponse.json(payments);
}
