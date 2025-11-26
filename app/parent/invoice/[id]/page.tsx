import { prisma } from "../../../../lib/prisma";
import Link from "next/link";

export default async function InvoicePage({ params }: { params: { id: string } }) {
  const invoice = await prisma.invoice.findUnique({
    where: { id: params.id },
    include: { lineItems: true, student: { include: { class: true } }, term: true },
  });
  if (!invoice) return <div>Invoice not found</div>;
  const total = invoice.lineItems.reduce((sum, item) => sum + item.amount, 0);
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Invoice - {invoice.term.name}</h1>
        <Link href={`/parent/student/${invoice.studentId}`} className="text-sm text-indigo-600">Back</Link>
      </div>
      <div className="rounded border bg-white p-4 shadow space-y-2">
        <p className="font-semibold">Student: {invoice.student.fullName}</p>
        <p className="text-sm text-slate-600">Class: {invoice.student.class.name}</p>
        <p className="text-sm text-slate-600">Status: {invoice.status}</p>
      </div>
      <div className="rounded border bg-white p-4 shadow">
        <h2 className="font-semibold mb-2">Line Items</h2>
        <ul className="space-y-1">
          {invoice.lineItems.map((item) => (
            <li key={item.id} className="flex justify-between text-sm">
              <span>{item.name}</span>
              <span>UGX {item.amount.toLocaleString()}</span>
            </li>
          ))}
        </ul>
        <div className="mt-3 flex justify-between font-semibold">
          <span>Total</span>
          <span>UGX {total.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
