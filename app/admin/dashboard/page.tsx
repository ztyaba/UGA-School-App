import { invoices } from "../../../data/invoices";
import { payments } from "../../../data/payments";
import { schools } from "../../../data/schools";
import { students } from "../../../data/students";

const currency = (value: number) => `UGX ${value.toLocaleString()}`;

export default function AdminDashboard() {
  const totalInvoiced = invoices.reduce((sum, inv) => sum + inv.due, 0);
  const totalCollected = payments.reduce((sum, p) => sum + p.amount, 0);
  const outstanding = totalInvoiced - totalCollected;

  const streamMap = students.reduce<Record<string, number>>((acc, student) => {
    acc[student.stream] = (acc[student.stream] || 0) + 1;
    return acc;
  }, {});
  const streamEntries = Object.entries(streamMap);

  return (
    <div className="grid gap-6 lg:grid-cols-[260px,1fr]">
      <aside className="glass-panel p-5">
        <h1 className="gradient-text text-xl font-bold">Super Admin</h1>
        <p className="mt-1 text-white/60">Platform-wide visibility across all roles.</p>
        <div className="mt-4 space-y-3 text-sm text-white/70">
          <div className="stat-pill">Schools: {schools.length}</div>
          <div className="stat-pill">Students: {students.length}</div>
          <div className="stat-pill">Invoices: {invoices.length}</div>
        </div>
      </aside>

      <section className="space-y-6">
        <header className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-white/60">Admin HQ</p>
            <h2 className="section-title gradient-text">Platform Overview</h2>
          </div>
          <div className="glass-panel px-4 py-3 text-sm text-white/70">
            Outstanding: <span className="font-semibold text-white">{currency(outstanding)}</span>
          </div>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Schools" value={schools.length.toString()} />
          <StatCard label="Students" value={students.length.toString()} />
          <StatCard label="Total Invoiced" value={currency(totalInvoiced)} />
          <StatCard label="Collected" value={currency(totalCollected)} />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="glass-panel p-5">
            <div className="flex items-center justify-between">
              <h3 className="card-title text-lg">Stream Distribution</h3>
              <span className="text-sm text-white/60">Animated bars</span>
            </div>
            <div className="mt-4 flex items-end gap-3">
              {streamEntries.map(([stream, count]) => (
                <div key={stream} className="flex-1 text-center">
                  <div
                    className="w-full rounded-t-lg bg-gradient-to-t from-black via-yellow-500/70 to-red-600/80"
                    style={{
                      animation: "barGrow 1.3s ease forwards",
                      height: `${Math.max(20, Math.min(90, (count / students.length) * 100 * 4))}%`,
                    }}
                  />
                  <p className="mt-2 text-sm text-white">{stream}</p>
                  <p className="text-xs text-white/60">{count} students</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel p-5">
            <div className="flex items-center justify-between">
              <h3 className="card-title text-lg">Recent Activity</h3>
              <span className="text-sm text-white/60">Invoices & payments</span>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {invoices.map((invoice) => {
                const student = students.find((s) => s.id === invoice.studentId);
                return (
                  <div key={invoice.id} className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <p className="text-sm text-white">{student?.fullName}</p>
                    <p className="text-xs text-white/60">{invoice.term}</p>
                    <div className="mt-2 flex items-center justify-between text-xs text-white/70">
                      <span>Due: {currency(invoice.due)}</span>
                      <span className="text-green-300">Paid: {currency(invoice.paid)}</span>
                    </div>
                    <span className="mt-2 inline-block rounded-full bg-white/10 px-2 py-1 text-[11px] text-white/80">{invoice.status}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="glass-panel p-5">
          <div className="flex items-center justify-between">
            <h3 className="card-title text-lg">Schools</h3>
            <span className="text-sm text-white/60">Full list</span>
          </div>
          <div className="mt-3 overflow-auto">
            <table className="table-grid">
              <thead>
                <tr>
                  <th>School</th>
                  <th>District</th>
                  <th>Students</th>
                  <th>Invoices</th>
                </tr>
              </thead>
              <tbody>
                {schools.map((school) => {
                  const roster = students.filter((s) => s.schoolId === school.id);
                  const invoiceCount = invoices.filter((inv) => inv.schoolId === school.id).length;
                  return (
                    <tr key={school.id}>
                      <td className="text-white">{school.name}</td>
                      <td>{school.district}</td>
                      <td>{roster.length}</td>
                      <td>{invoiceCount}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="glass-panel p-5">
          <div className="flex items-center justify-between">
            <h3 className="card-title text-lg">Payments</h3>
            <span className="text-sm text-white/60">{payments.length} transactions</span>
          </div>
          <div className="mt-3 overflow-auto">
            <table className="table-grid">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Student</th>
                  <th>School</th>
                  <th>Amount</th>
                  <th>Method</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => {
                  const student = students.find((s) => s.id === payment.studentId);
                  const school = schools.find((s) => s.id === payment.schoolId);
                  return (
                    <tr key={payment.id}>
                      <td className="text-white">{payment.id}</td>
                      <td>{student?.fullName}</td>
                      <td>{school?.name}</td>
                      <td>{currency(payment.amount)}</td>
                      <td>{payment.method}</td>
                      <td>
                        <span className="rounded-full bg-green-500/20 px-2 py-1 text-xs text-green-300">{payment.status}</span>
                      </td>
                      <td>{payment.date}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass-panel p-5 hover-lift">
      <p className="text-sm text-white/60">{label}</p>
      <p className="mt-3 text-2xl font-bold">{value}</p>
    </div>
  );
}
