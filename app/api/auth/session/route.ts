import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/authOptions";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  return NextResponse.json(session);
}
