import "./globals.css";
import { ReactNode } from "react";
import { Inter } from "next/font/google";
import Link from "next/link";
import AuthProvider from "../components/auth-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SchoolPay Uganda",
  description: "Tuition management for Ugandan schools",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="main-shell">
            <div className="neon-orb yellow" />
            <div className="neon-orb red" />
            <div className="neon-orb white" />
            <header className="sticky top-0 z-20 border-b border-white/10 bg-black/40 backdrop-blur-xl">
              <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                <Link href="/" className="text-xl font-extrabold gradient-text">
                  SchoolPay Uganda
                </Link>
                <nav className="hidden gap-8 md:flex">
                  <Link className="nav-link" href="/">Home</Link>
                  <a className="nav-link" href="#features">Features</a>
                  <a className="nav-link" href="#support">Support</a>
                </nav>
                <div className="flex items-center gap-3">
                  <Link
                    href="/admin/dashboard"
                    className="hover-lift rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white"
                  >
                    Admin
                  </Link>
                </div>
              </div>
            </header>
            <main className="relative z-10 mx-auto max-w-6xl px-6 pb-12 pt-8">{children}</main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
