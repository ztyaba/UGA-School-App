import { prisma } from "../../../lib/prisma";

export default async function AdminDashboard() {
  const schoolCount = await prisma.school.count();
  const payments = await prisma.payment.count();
  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-bold">Super Admin Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded border bg-white p-4 shadow">
          <p className="text-sm text-slate-600">Schools</p>
          <p className="text-2xl font-bold">{schoolCount}</p>
        </div>
        <div className="rounded border bg-white p-4 shadow">
          <p className="text-sm text-slate-600">Payments</p>
          <p className="text-2xl font-bold">{payments}</p>
        </div>
      </div>
    </div>
  );
}
