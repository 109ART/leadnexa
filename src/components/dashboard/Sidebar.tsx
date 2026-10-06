"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  UserPlus,
  ScanSearch,
  Mail,
  CalendarClock,
  BarChart3,
  Settings,
  Sparkles,
} from "lucide-react";
import { APP_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

const items = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/leads", label: "Leads", icon: Users },
  { href: "/leads/new", label: "Add Lead", icon: UserPlus },
  { href: "/audits", label: "Website Audits", icon: ScanSearch },
  { href: "/emails", label: "Emails", icon: Mail },
  { href: "/follow-ups", label: "Follow-ups", icon: CalendarClock },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/profile", label: "Settings", icon: Settings },
];

export default function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  // Highlight only the most specific matching item
  const activeHref =
    items
      .filter((i) => pathname === i.href || pathname.startsWith(i.href + "/"))
      .sort((a, b) => b.href.length - a.href.length)[0]?.href ?? "";

  return (
    <div className="flex h-full flex-col bg-surface p-4">
      <Link href="/dashboard" className="mb-8 flex items-center gap-2 px-2 pt-2 font-bold">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-linear-to-br from-primary to-secondary text-white">
          <Sparkles size={18} />
        </span>
        {APP_NAME}
      </Link>

      <nav className="space-y-1">
        {items.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-full px-4 py-2.5 text-sm font-medium transition",
              href === activeHref
                ? "bg-primary text-white shadow-soft"
                : "text-muted hover:bg-slate-100 hover:text-text"
            )}
          >
            <Icon size={18} />
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
}