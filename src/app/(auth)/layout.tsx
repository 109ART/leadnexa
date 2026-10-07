import Link from "next/link";
import { Sparkles } from "lucide-react";
import { APP_NAME } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="grid min-h-screen place-items-center px-4 py-12">
      <div className="w-full max-w-md">
        <Link href="/" className="mb-8 flex items-center justify-center gap-2 font-bold">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-linear-to-br from-primary to-secondary text-white">
            <Sparkles size={18} />
          </span>
          {APP_NAME}
        </Link>
        {children}
      </div>
    </main>
  );
}