import "./globals.css";
import { ReactNode } from "react";
import { Inter } from "next/font/google";
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
          <div className="min-h-screen bg-slate-50">
            <header className="border-b bg-white shadow-sm">
              <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
                <div className="font-bold text-xl">SchoolPay Uganda</div>
                <p className="text-sm text-slate-600">Secure tuition payments</p>
              </div>
            </header>
            <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
