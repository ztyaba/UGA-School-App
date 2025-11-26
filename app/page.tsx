import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome to SchoolPay Uganda</h1>
      <p className="text-slate-700 max-w-2xl">
        Manage tuition, invoicing and payments for schools, parents and administrators.
        Use the quick links below to explore the experience for each role.
      </p>
      <div className="grid gap-4 md:grid-cols-3">
        <Link
          href="/parent/dashboard"
          className="rounded-lg border bg-white p-4 shadow hover:shadow-md"
        >
          <h2 className="font-semibold">Parent Portal</h2>
          <p className="text-sm text-slate-600">View students, invoices and pay tuition.</p>
        </Link>
        <Link
          href="/school/dashboard"
          className="rounded-lg border bg-white p-4 shadow hover:shadow-md"
        >
          <h2 className="font-semibold">School Admin</h2>
          <p className="text-sm text-slate-600">Manage classes, fees, students and payments.</p>
        </Link>
        <Link
          href="/admin/dashboard"
          className="rounded-lg border bg-white p-4 shadow hover:shadow-md"
        >
          <h2 className="font-semibold">Super Admin</h2>
          <p className="text-sm text-slate-600">Approve schools and view platform analytics.</p>
        </Link>
      </div>
    </div>
  );
}
