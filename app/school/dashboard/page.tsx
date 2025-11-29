import { invoices } from "../../../data/invoices";
import { payments } from "../../../data/payments";
import { schools } from "../../../data/schools";
import { students } from "../../../data/students";

const currency = (value: number) => `UGX ${value.toLocaleString()}`;

const schoolStats = schools.map((school) => {
  const roster = students.filter((s) => s.schoolId === school.id);
  const schoolInvoices = invoices.filter((inv) => inv.schoolId === school.id);
  const schoolPayments = payments.filter((pay) => pay.schoolId === school.id);
  const balance = roster.reduce((sum, s) => sum + s.balance, 0);
  const invoiced = schoolInvoices.reduce((sum, inv) => sum + inv.due, 0);
  const collected = schoolPayments.reduce((sum, p) => sum + p.amount, 0);
  return { school, roster, schoolInvoices, schoolPayments, balance, invoiced, collected };
});

export default function SchoolDashboard() {
  const totalInvoiced = invoices.reduce((sum, inv) => sum + inv.due, 0);
  const totalCollected = payments.reduce((sum, p) => sum + p.amount, 0);
  const totalOutstanding = totalInvoiced - totalCollected;
  const totalStudents = students.length;

  return (
    <div className="grid gap-6 lg:grid-cols-[260px,1fr]">
      <aside className="glass-panel p-5">
        <h1 className="gradient-text text-xl font-bold">Bursar Portal</h1>
        <p className="mt-1 text-white/60">Track balances per school and term.</p>
        <div className="mt-4 space-y-3 text-sm text-white/70">
          <div className="stat-pill">Total schools: {schools.length}</div>
          <div className="stat-pill">Students: {totalStudents}</div>
          <div className="stat-pill">Payments: {payments.length}</div>
        </div>
      </aside>

      <section className="space-y-6">
        <header className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-white/60">School Finance</p>
            <h2 className="section-title gradient-text">Collections & Balances</h2>
          </div>
          <div className="glass-panel px-4 py-3 text-sm text-white/70">
            Outstanding balance total: <span className="font-semibold text-white">{currency(totalOutstanding)}</span>
          </div>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Total Invoiced" value={currency(totalInvoiced)} />
          <StatCard label="Collected" value={currency(totalCollected)} />
          <StatCard label="Outstanding" value={currency(totalOutstanding)} />
          <StatCard label="Students" value={totalStudents.toString()} />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="glass-panel p-5">
            <div className="flex items-center justify-between">
              <h3 className="card-title text-lg">Balances by School</h3>
              <span className="text-sm text-white/60">Animated bars</span>
            </div>
            <div className="mt-5 flex items-end gap-4">
              {schoolStats.map((item) => (
                <div key={item.school.id} className="flex-1">
                  <div
                    className="w-full rounded-t-lg bg-gradient-to-t from-yellow-500/40 via-red-500/70 to-white/80"
                    style={{
                      animation: "barGrow 1.4s ease forwards",
                      height: `${Math.max(20, Math.min(95, (item.balance / (schoolStats[0]?.balance || 1)) * 100))}%`,
                    }}
                  />
                  <p className="mt-2 text-sm text-white">{item.school.name}</p>
                  <p className="text-xs text-white/60">{currency(item.balance)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel p-5">
            <div className="flex items-center justify-between">
              <h3 className="card-title text-lg">Payment Pulse</h3>
              <span className="text-sm text-white/60">Glow line</span>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3">
              {schoolStats.map((item) => (
                <div key={item.school.id} className="h-28 rounded-2xl bg-white/5 p-3">
                  <div
                    className="h-full w-full rounded-lg bg-gradient-to-br from-black via-yellow-500/70 to-red-600/70"
                    style={{ animation: "glowLine 2s ease-in-out infinite" }}
                  />
                  <p className="mt-2 text-xs text-white/70">{item.school.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="glass-panel p-5">
          <div className="flex items-center justify-between">
            <h3 className="card-title text-lg">School Summary</h3>
            <span className="text-sm text-white/60">All three schools</span>
          </div>
          <div className="mt-3 overflow-auto">
            <table className="table-grid">
              <thead>
                <tr>
                  <th>School</th>
                  <th>District</th>
                  <th>Students</th>
                  <th>Invoice Due</th>
                  <th>Collected</th>
                  <th>Outstanding</th>
                </tr>
              </thead>
              <tbody>
                {schoolStats.map((item) => (
                  <tr key={item.school.id}>
                    <td className="text-white">{item.school.name}</td>
                    <td>{item.school.district}</td>
                    <td>{item.roster.length}</td>
                    <td>{currency(item.invoiced)}</td>
                    <td>{currency(item.collected)}</td>
                    <td>{currency(item.invoiced - item.collected)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="glass-panel p-5">
          <div className="flex items-center justify-between">
            <h3 className="card-title text-lg">Students by School</h3>
            <span className="text-sm text-white/60">Full roster</span>
          </div>
          <div className="mt-3 max-h-[380px] overflow-auto">
            <table className="table-grid">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>School</th>
                  <th>Class</th>
                  <th>Stream</th>
                  <th>Balance</th>
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
