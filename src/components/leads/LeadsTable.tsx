import Link from "next/link";
import { ExternalLink } from "lucide-react";
import Card from "@/components/ui/Card";
import LeadStatusBadge from "./LeadStatusBadge";
import { displayUrl } from "@/lib/url";
import type { listLeads } from "@/server/services/leads/service";

type LeadRow = Awaited<ReturnType<typeof listLeads>>["leads"][number];

function formatDate(date: Date) {
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function SiteLink({ url }: { url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-sm text-muted hover:text-primary"
    >
      {displayUrl(url)}
      <ExternalLink size={12} />
    </a>
  );
}

export default function LeadsTable({ leads }: { leads: LeadRow[] }) {
  return (
    <>
      {/* Tablet and desktop: table */}
      <Card className="hidden overflow-hidden p-0 md:block">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-slate-50 text-xs uppercase tracking-wide text-muted">
              <tr>
                <th scope="col" className="px-6 py-3 font-medium">Business</th>
                <th scope="col" className="px-6 py-3 font-medium">Industry</th>
                <th scope="col" className="px-6 py-3 font-medium">Location</th>
                <th scope="col" className="px-6 py-3 font-medium">Status</th>
                <th scope="col" className="px-6 py-3 font-medium">Score</th>
                <th scope="col" className="px-6 py-3 font-medium">Added</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {leads.map((lead) => (
                <tr key={lead.id} className="transition hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <Link
                      href={`/leads/${lead.id}`}
                      className="font-medium hover:text-primary"
                    >
                      {lead.businessName}
                    </Link>
                    <div>
                      <SiteLink url={lead.websiteUrl} />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted">{lead.industry ?? "-"}</td>
                  <td className="px-6 py-4 text-muted">{lead.location ?? "-"}</td>
                  <td className="px-6 py-4">
                    <LeadStatusBadge status={lead.status} />
                  </td>
                  <td className="px-6 py-4 text-muted">{lead.score ?? "-"}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-muted">
                    {formatDate(lead.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Phone: cards */}
      <ul className="space-y-3 md:hidden">
        {leads.map((lead) => (
          <li key={lead.id}>
            <Card className="p-4">
              <div className="flex items-start justify-between gap-3">
                <Link
                  href={`/leads/${lead.id}`}
                  className="font-semibold hover:text-primary"
                >
                  {lead.businessName}
                </Link>
                <LeadStatusBadge status={lead.status} />
              </div>
              <div className="mt-1">
                <SiteLink url={lead.websiteUrl} />
              </div>
              <p className="mt-3 text-xs text-muted">
                {[lead.industry, lead.location].filter(Boolean).join(" · ") ||
                  "No details yet"}
              </p>
              <p className="mt-1 text-xs text-muted">
                Added {formatDate(lead.createdAt)}
                {lead.score !== null && ` · Score ${lead.score}`}
              </p>
            </Card>
          </li>
        ))}
      </ul>
    </>
  );
}