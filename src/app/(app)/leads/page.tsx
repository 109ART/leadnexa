import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Plus, Users } from "lucide-react";
import { auth } from "@/server/auth";
import { listLeads } from "@/server/services/leads/service";
import { isLeadStatus } from "@/lib/lead-status";
import Card from "@/components/ui/Card";
import LeadFilters from "@/components/leads/LeadFilters";
import LeadsTable from "@/components/leads/LeadsTable";

export const metadata: Metadata = { title: "Leads" };

function pageHref(page: number, q: string, status: string) {
  const params = new URLSearchParams();
  if (q) params.set("q", q);
  if (status) params.set("status", status);
  if (page > 1) params.set("page", String(page));
  const query = params.toString();
  return query ? `/leads?${query}` : "/leads";
}

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string; page?: string }>;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const params = await searchParams;
  const q = (params.q ?? "").trim().slice(0, 100);
  const status = isLeadStatus(params.status) ? params.status : undefined;
  const pageNumber = Number.parseInt(params.page ?? "1", 10);

  const { leads, total, page, totalPages } = await listLeads(session.user.id, {
    q,
    status,
    page: Number.isNaN(pageNumber) ? 1 : pageNumber,
  });

  const filtering = q !== "" || status !== undefined;

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">Leads</h1>
          <p className="mt-1 text-muted">
            {total} {total === 1 ? "lead" : "leads"}
            {filtering && " match your filters"}
          </p>
        </div>
        <Link
          href="/leads/new"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-white shadow-soft transition hover:bg-indigo-700"
        >
          <Plus size={16} /> Add lead
        </Link>
      </div>

      <div className="mt-6">
        <LeadFilters q={q} status={status ?? ""} />
      </div>

      <div className="mt-6">
        {leads.length === 0 ? (
          <Card className="flex flex-col items-center py-16 text-center">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-indigo-50 text-primary">
              <Users size={22} />
            </span>
            <p className="mt-4 font-medium">
              {filtering ? "No leads match your search" : "No leads yet"}
            </p>
            <p className="mt-1 max-w-sm text-sm text-muted">
              {filtering
                ? "Try a different search or clear the filters."
                : "Add the first business you want to reach out to."}
            </p>
            {!filtering && (
              <Link
                href="/leads/new"
                className="mt-6 rounded-full bg-primary px-6 py-3 text-sm font-medium text-white"
              >
                Add your first lead
              </Link>
            )}
          </Card>
        ) : (
          <LeadsTable leads={leads} />
        )}
      </div>

      {totalPages > 1 && (
        <nav
          aria-label="Pagination"
          className="mt-6 flex items-center justify-between text-sm"
        >
          {page > 1 ? (
            <Link
              href={pageHref(page - 1, q, status ?? "")}
              className="rounded-full border border-border bg-surface px-4 py-2 hover:bg-slate-50"
            >
              Previous
            </Link>
          ) : (
            <span />
          )}
          <span className="text-muted">
            Page {page} of {totalPages}
          </span>
          {page < totalPages ? (
            <Link
              href={pageHref(page + 1, q, status ?? "")}
              className="rounded-full border border-border bg-surface px-4 py-2 hover:bg-slate-50"
            >
              Next
            </Link>
          ) : (
            <span />
          )}
        </nav>
      )}
    </div>
  );
}