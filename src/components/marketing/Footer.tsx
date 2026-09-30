import Link from "next/link";
import { APP_NAME } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-border px-4 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-muted sm:flex-row">
        <p>
          © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
        </p>
        <div className="flex gap-6">
          <Link href="#features" className="hover:text-text">Features</Link>
          <Link href="#how-it-works" className="hover:text-text">How it works</Link>
          <Link href="#pricing" className="hover:text-text">Pricing</Link>
        </div>
      </div>
    </footer>
  );
}