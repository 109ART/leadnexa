"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Sidebar from "./Sidebar";
import LogoutButton from "./LogoutButton";

export default function AppShell({
  user,
  children,
}: {
  user: { name: string; email: string };
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[16rem_1fr]">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen border-r border-border lg:block">
        <Sidebar />
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-navy/50"
            onClick={() => setOpen(false)}
          />
          <aside className="absolute left-0 top-0 h-full w-64 shadow-soft">
            <Sidebar onNavigate={() => setOpen(false)} />
          </aside>
        </div>
      )}

      <div className="min-w-0">
        <header className="flex items-center justify-between gap-4 border-b border-border bg-surface/80 px-4 py-3 backdrop-blur sm:px-8">
          <button
            className="lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
          <div className="ml-auto flex items-center gap-4">
            <div className="hidden text-right text-sm sm:block">
              <p className="font-medium">{user.name}</p>
              <p className="text-xs text-muted">{user.email}</p>
            </div>
            <LogoutButton />
          </div>
        </header>
        <div className="p-4 sm:p-8">{children}</div>
      </div>
    </div>
  );
}