import Link from "next/link";
import { Search } from "lucide-react";
import Button from "@/components/ui/Button";
import { LEAD_STATUSES, LEAD_STATUS_LABELS } from "@/lib/lead-status";

export default function LeadFilters({
  q,
  status,
}: {
  q: string;
  status: string;
}) {
  const active = q !== "" || status !== "";

  return (
    <form
      action="/leads"
      className="flex flex-col gap-3 sm:flex-row sm:items-center"
    >
      <div className="relative flex-1">
        <label htmlFor="q" className="sr-only">
          Search leads
        </label>
        <Search
          size={18}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
        />
        <input
          id="q"
          name="q"
          defaultValue={q}
          placeholder="Search name, website, industry, location..."
          className="w-full rounded-full border border-border bg-surface py-3 pl-11 pr-4 text-base outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="status" className="sr-only">
          Filter by status
        </label>
        <select
          id="status"
          name="status"
          defaultValue={status}
          className="w-full rounded-full border border-border bg-surface px-4 py-3 text-base outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 sm:w-auto sm:text-sm"
        >
          <option value="">All active</option>
          {LEAD_STATUSES.map((s) => (
            <option key={s} value={s}>
              {LEAD_STATUS_LABELS[s]}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-3">
        <Button type="submit" className="flex-1 sm:flex-none">
          Search
        </Button>
        {active && (
          <Link href="/leads" className="text-sm text-muted hover:text-text">
            Clear
          </Link>
        )}
      </div>
    </form>
  );
}