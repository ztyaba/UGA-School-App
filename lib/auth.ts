import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/authOptions";

export async function requireRole(role: string) {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== role) {
    throw new Error("Unauthorized");
  }
  return session;
}
