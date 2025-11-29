import Link from "next/link";

const portalCards = [
  {
    title: "Parent Portal",
    description: "Track balances, invoices, and payments for every child.",
    href: "/parent/dashboard",
    icon: "👨‍👩‍👧",
  },
  {
    title: "Bursar Portal",
    description: "Manage school finances, balances, and collections in one place.",
    href: "/school/dashboard",
    icon: "🏫",
  },
];

export default function Home() {
  return (
    <div className="space-y-10">
      <section className="glass-panel p-8 lg:p-10">
        <p className="text-sm uppercase tracking-[0.3em] text-white/70">Uganda-first Tuition Suite</p>
        <h1 className="section-title gradient-text mt-2">SchoolPay Uganda</h1>
        <p className="mt-3 max-w-3xl text-lg text-white/70">
          Neon-glass dashboards for parents and bursars. Secure, fast, and built to keep Ugandan schools fully funded.
        </p>
        <div className="mt-6 flex flex-wrap gap-3 text-sm text-white/80" id="features">
          <span className="stat-pill">Instant mobile money receipts</span>
          <span className="stat-pill">Invoice tracking & balance alerts</span>
          <span className="stat-pill">Multi-school visibility</span>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        {portalCards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="glass-panel hover-lift block p-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl" aria-hidden>{card.icon}</p>
                <h2 className="mt-3 text-2xl font-bold gradient-text">{card.title}</h2>
                <p className="mt-2 text-white/70">{card.description}</p>
              </div>
              <div className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm text-white">Enter</div>
            </div>
          </Link>
        ))}
      </section>

      <section id="support" className="glass-panel p-8">
        <h3 className="text-xl font-bold gradient-text">Support</h3>
        <p className="mt-2 text-white/70">
          Need help? Reach us anytime at support@schoolpay.ug — we&apos;re here for parents, bursars, and administrators.
        </p>
      </section>
    </div>
  );
}
