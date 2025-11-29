import { invoices } from "../../../data/invoices";
import { payments } from "../../../data/payments";
import { schools } from "../../../data/schools";
import { students } from "../../../data/students";

const currency = (value: number) => `UGX ${value.toLocaleString()}`;

export default function ParentDashboard() {
  const totalBalance = students.reduce((sum, s) => sum + s.balance, 0);
  const outstandingInvoices = invoices.filter((inv) => inv.status !== "Paid").length;
  const paidInvoices = invoices.filter((inv) => inv.status === "Paid").length;
  const topBalances = [...students]
    .sort((a, b) => b.balance - a.balance)
    .slice(0, 5);

  return (
    <div className="grid gap-6 lg:grid-cols-[260px,1fr]">
      <aside className="glass-panel p-5">
        <h1 className="gradient-text text-xl font-bold">Parent Portal</h1>
        <p className="mt-1 text-white/60">Monitor every child across all schools.</p>
        <div className="mt-4 space-y-3 text-sm text-white/70">
          <div className="stat-pill">Students: {students.length}</div>
          <div className="stat-pill">Schools: {schools.length}</div>
          <div className="stat-pill">Payments logged: {payments.length}</div>
        </div>
      </aside>

      <section className="space-y-6">
        <header className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-white/60">Parent Insights</p>
            <h2 className="section-title gradient-text">Balances & Activity</h2>
          </div>
          <div className="glass-panel px-4 py-3 text-sm text-white/70">
            {schools.map((school) => (
              <div key={school.id} className="flex items-center justify-between">
                <span>{school.name}</span>
                <span className="text-white/50">{school.district}</span>
              </div>
            ))}
          </div>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Students" value={students.length.toString()} highlight="👧" />
          <StatCard label="Total Balance" value={currency(totalBalance)} highlight="💳" />
          <StatCard label="Invoices Paid" value={paidInvoices.toString()} highlight="✅" />
          <StatCard label="Open Invoices" value={outstandingInvoices.toString()} highlight="📄" />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="glass-panel p-5">
            <div className="flex items-center justify-between">
              <h3 className="card-title text-lg">Balances by Student</h3>
              <span className="text-sm text-white/60">Top 5</span>
            </div>
            <div className="mt-4 flex items-end gap-3">
              {topBalances.map((student) => (
                <div key={student.id} className="flex flex-1 flex-col items-center gap-2">
                  <div
                    className="w-full rounded-t-lg bg-gradient-to-t from-red-700/70 via-yellow-500/60 to-white/80"
                    style={{
                      animation: "barGrow 1.6s ease forwards",
                      height: `${Math.max(20, Math.min(90, (student.balance / topBalances[0].balance) * 100))}%`,
                    }}
                  />
                  <p className="text-xs text-center text-white/70">{student.fullName.split(" ")[0]}</p>
                  <p className="text-xs text-white/50">{currency(student.balance)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel p-5">
            <div className="flex items-center justify-between">
              <h3 className="card-title text-lg">Payment Pulse</h3>
              <span className="text-sm text-white/60">Animated line</span>
            </div>
            <div className="mt-5 grid grid-cols-6 gap-2">
              {payments.map((payment) => (
                <div key={payment.id} className="h-24 rounded-full bg-white/10">
                  <div
                    className="h-full w-full rounded-full bg-gradient-to-t from-black via-yellow-400/70 to-red-600/80"
                    style={{ animation: "glowLine 2s ease-in-out infinite", opacity: 0.7 }}
                  />
                  <p className="mt-2 text-xs text-white/60">{payment.method}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="glass-panel p-5">
          <div className="flex items-center justify-between">
            <h3 className="card-title text-lg">All Students</h3>
            <span className="text-sm text-white/60">60 total</span>
          </div>
          <div className="mt-4 max-h-[420px] overflow-auto">
            <table className="table-grid">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>School</th>
                  <th>Class</th>
                  <th>Stream</th>
                  <th>Balance</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => {
                  const school = schools.find((s) => s.id === student.schoolId);
                  return (
                    <tr key={student.id}>
                      <td className="text-white">{student.fullName}</td>
                      <td>{school?.name}</td>
                      <td>{student.classLevel}</td>
                      <td>{student.stream}</td>
                      <td>{currency(student.balance)}</td>
                      <td>
                        <span className="rounded-full bg-green-500/20 px-2 py-1 text-xs text-green-300">{student.status}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="glass-panel p-5">
            <div className="flex items-center justify-between">
              <h3 className="card-title text-lg">Invoices</h3>
              <span className="text-sm text-white/60">{invoices.length} records</span>
            </div>
            <div className="mt-3 overflow-auto">
              <table className="table-grid">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Student</th>
                    <th>Term</th>
                    <th>Due</th>
                    <th>Paid</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice) => {
                    const student = students.find((s) => s.id === invoice.studentId);
                    return (
                      <tr key={invoice.id}>
                        <td className="text-white">{invoice.id}</td>
                        <td>{student?.fullName}</td>
                        <td>{invoice.term}</td>
                        <td>{currency(invoice.due)}</td>
                        <td>{currency(invoice.paid)}</td>
                        <td>
                          <span className="rounded-full bg-white/10 px-2 py-1 text-xs text-white/80">{invoice.status}</span>
                        </td>
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
              <span className="text-sm text-white/60">{payments.length} receipts</span>
            </div>
            <div className="mt-3 overflow-auto">
              <table className="table-grid">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Student</th>
                    <th>Amount</th>
                    <th>Method</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) => {
                    const student = students.find((s) => s.id === payment.studentId);
                    return (
                      <tr key={payment.id}>
                        <td className="text-white">{payment.id}</td>
                        <td>{student?.fullName}</td>
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
        </div>
      </section>
    </div>
  );
}

function StatCard({ label, value, highlight }: { label: string; value: string; highlight: string }) {
  return (
    <div className="glass-panel p-5 hover-lift">
      <div className="flex items-start justify-between">
        <p className="text-sm text-white/60">{label}</p>
        <span className="text-lg">{highlight}</span>
      </div>
      <p className="mt-3 text-2xl font-bold">{value}</p>
    </div>
  );
}
