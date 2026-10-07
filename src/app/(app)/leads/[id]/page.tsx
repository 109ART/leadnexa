import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, ExternalLink, Pencil, ScanSearch, Mail, CalendarClock } from "lucide-react";
import { auth } from "@/server/auth";
import { getLead, listLeadActivities } from "@/server/services/leads/service";
import { displayUrl } from "@/lib/url";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import LeadStatusBadge from "@/components/leads/LeadStatusBadge";
import LeadActions from "@/components/leads/LeadActions";

export const metadata: Metadata = { title: "Lead details" };

function Detail({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="min-w-0">
      <dt className="text-xs font-medium uppercase tracking-wide text-muted">{label}</dt>
      <dd className="mt-1 text-sm [overflow-wrap:anywhere]">{children}</dd>
    </div>
  );
}

function Placeholder({
  icon: Icon,
  title,
  text,
}: {
  icon: typeof ScanSearch;
  title: string;
  text: string;
}) {
  return (
    <Card>
      <div className="flex items-start gap-4">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-indigo-50 text-primary">
          <Icon size={20} />
        </span>
        <div>
          <h2 className="font-semibold">{title}</h2>
          <p className="mt-1 text-sm text-muted">{text}</p>
        </div>
      </div>
    </Card>
  );
}

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const { id } = await params;
  const lead = await getLead(session.user.id, id);
  if (!lead) notFound();

  const activities = await listLeadActivities(session.user.id, lead.id);

  return (
    <div className="mx-auto max-w-6xl">
      <Link
        href="/leads"
        className="inline-flex items-center gap-1 text-sm text-muted hover:text-text"
      >
        <ArrowLeft size={16} /> All leads
      </Link>

      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold [overflow-wrap:anywhere] sm:text-3xl">
              {lead.businessName}
            </h1>
            <LeadStatusBadge status={lead.status} />
          </div>
          <a
            href={lead.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex items-center gap-1 text-sm text-muted hover:text-primary [overflow-wrap:anywhere]"
          >
            {displayUrl(lead.websiteUrl)} <ExternalLink size={14} />
          </a>
        </div>
        <Link href={`/leads/${lead.id}/edit`}>
          <Button variant="secondary" size="sm" className="w-full sm:w-auto">
            <span className="inline-flex items-center gap-2">
              <Pencil size={14} /> Edit
            </span>
          </Button>
        </Link>
      </div>

      <div className="mt-4">
        <LeadActions leadId={lead.id} status={lead.status} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <h2 className="font-semibold">Details</h2>
            <dl className="mt-4 grid gap-5 sm:grid-cols-2">
              <Detail label="Industry">{lead.industry ?? "-"}</Detail>
              <Detail label="Location">{lead.location ?? "-"}</Detail>
              <Detail label="Contact name">{lead.contactName ?? "-"}</Detail>
              <Detail label="Contact email">
                {lead.contactEmail ? (
                  <a
                    href={`mailto:${encodeURIComponent(lead.contactEmail)}`}
                    className="text-primary hover:underline"
                  >
                    {lead.contactEmail}
                  </a>
                ) : (
                  "-"
                )}
              </Detail>
              <Detail label="Lead score">
                {lead.score !== null ? lead.score : "Not scored yet"}
              </Detail>
              <Detail label="Added">
                {lead.createdAt.toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </Detail>
            </dl>
            {lead.notes && (
              <div className="mt-5 border-t border-border pt-5">
                <p className="text-xs font-medium uppercase tracking-wide text-muted">Notes</p>
                <p className="mt-1 whitespace-pre-wrap text-sm [overflow-wrap:anywhere]">
                  {lead.notes}
                </p>
              </div>
            )}
          </Card>

          <Placeholder
            icon={ScanSearch}
            title="Website audit"
            text="No audit yet. Website analysis is the next feature we build."
          />
          <Placeholder
            icon={Mail}
            title="Outreach email"
            text="Personalized emails will appear here once an audit exists."
          />
          <Placeholder
            icon={CalendarClock}
            title="Follow-ups"
            text="Follow-up reminders for this lead will appear here."
          />
        </div>

        <aside>
          <Card>
            <h2 className="font-semibold">Activity</h2>
            {activities.length === 0 ? (
              <p className="mt-4 text-sm text-muted">No activity yet.</p>
            ) : (
              <ul className="mt-4 space-y-4">
                {activities.map((a) => (
                  <li key={a.id} className="text-sm">
                    <p className="font-medium">{a.type}</p>
                    <p className="text-xs text-muted">
                      {a.createdAt.toLocaleString("en-GB", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </aside>
      </div>
    </div>
  );
}