import { prisma } from "../../../lib/prisma";

export default async function ParentPayments() {
  const payments = await prisma.payment.findMany({ include: { invoice: true, school: true } });
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Payment History</h1>
      <div className="space-y-2">
        {payments.map((p) => (
          <div key={p.id} className="rounded border bg-white p-4 shadow">
            <div className="flex justify-between text-sm">
              <span>{p.invoiceId}</span>
              <span className="font-semibold">UGX {p.amount.toLocaleString()}</span>
            </div>
            <p className="text-xs text-slate-600">{p.school?.name}</p>
            <p className="text-xs text-slate-600">Status: {p.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
