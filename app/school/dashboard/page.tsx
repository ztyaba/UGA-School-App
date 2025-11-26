export const dynamic = "force-dynamic";
import { prisma } from "../../../lib/prisma";

export default async function SchoolDashboard() {
  const payments = await prisma.payment.findMany();
  const invoiced = await prisma.invoice.aggregate({ _sum: { totalAmount: true } });
  const collected = payments.reduce((sum, p) => sum + p.amount, 0);
  const totalInvoiced = invoiced._sum.totalAmount || 0;
  const outstanding = totalInvoiced - collected;
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">School Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Total Invoiced" value={totalInvoiced} />
        <StatCard label="Collected" value={collected} />
        <StatCard label="Outstanding" value={outstanding} />
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded border bg-white p-4 shadow">
      <p className="text-sm text-slate-600">{label}</p>
      <p className="text-2xl font-bold">UGX {value.toLocaleString()}</p>
    </div>
  );
}
