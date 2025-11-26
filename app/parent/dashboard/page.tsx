import Link from "next/link";
import { prisma } from "../../../lib/prisma";

export default async function ParentDashboard() {
  const students = await prisma.student.findMany({ include: { class: true, school: true } });
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Parent Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {students.map((student) => (
          <div key={student.id} className="rounded border bg-white p-4 shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">{student.fullName}</p>
                <p className="text-sm text-slate-600">{student.class.name}</p>
                <p className="text-sm text-slate-600">{student.school.name}</p>
              </div>
              <Link href={`/parent/student/${student.id}`} className="text-indigo-600 text-sm font-semibold">
                View Fees
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
