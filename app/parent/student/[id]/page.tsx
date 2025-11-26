export const dynamic = "force-dynamic";
import { prisma } from "../../../../lib/prisma";
import Link from "next/link";

export default async function ParentStudentPage({ params }: { params: { id: string } }) {
  const student = await prisma.student.findUnique({
    where: { id: params.id },
    include: { class: true, invoices: { include: { term: true } }, school: true },
  });
  if (!student) return <div>Student not found</div>;
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{student.fullName}</h1>
          <p className="text-slate-600 text-sm">{student.class.name} • {student.school.name}</p>
        </div>
        <Link href={`/parent/dashboard`} className="text-sm text-indigo-600">Back</Link>
      </div>
      <div className="space-y-2">
        {student.invoices.map((invoice) => (
          <div key={invoice.id} className="rounded border bg-white p-4 shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">{invoice.term.name}</p>
                <p className="text-sm text-slate-600">Due {invoice.dueDate.toDateString()}</p>
              </div>
              <Link href={`/parent/invoice/${invoice.id}`} className="text-indigo-600 text-sm font-semibold">
                View Invoice
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
