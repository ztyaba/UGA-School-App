import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function POST(request: Request) {
  const body = await request.json();
  const { classId, termId, items } = body as { classId: string; termId: string; items: { itemName: string; amount: number }[] };
  const created = await prisma.$transaction(
    items.map((item) =>
      prisma.feeItemTemplate.create({
        data: { classId, termId, itemName: item.itemName, amount: item.amount },
      })
    )
  );
  return NextResponse.json(created);
}
