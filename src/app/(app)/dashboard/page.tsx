import { headers } from "next/headers";
import {
  Users,
  ScanSearch,
  Mail,
  Send,
  CalendarClock,
  Star,
  Activity as ActivityIcon,
} from "lucide-react";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
import Card from "@/components/ui/Card";
import StatCard from "@/components/dashboard/StatCard";

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const userId = session!.user.id;

  const [
    totalLeads,
    audits,
    emailsGenerated,
    emailsSent,
    followUps,
    interested,
    activities,
  ] = await Promise.all([
    db.lead.count({ where: { userId } }),
    db.websiteAudit.count({
      where: { lead: { userId }, status: "COMPLETED" },
    }),
    db.email.count({ where: { userId } }),
    db.email.count({
      where: { userId, status: { in: ["SENT_MANUALLY", "SENT"] } },
    }),
    db.followUp.count({ where: { userId, status: "PENDING" } }),
    db.lead.count({ where: { userId, status: "INTERESTED" } }),
    db.activity.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 8,
    }),
  ]);

  const firstName = session!.user.name.split(" ")[0];

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="text-2xl font-bold sm:text-3xl">Welcome, {firstName}</h1>
      <p className="mt-1 text-muted">Here is where your outreach stands.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard label="Total leads" value={totalLeads} icon={Users} />
        <StatCard label="Audits completed" value={audits} icon={ScanSearch} />
        <StatCard label="Emails generated" value={emailsGenerated} icon={Mail} />
        <StatCard label="Emails sent" value={emailsSent} icon={Send} />
        <StatCard label="Pending follow-ups" value={followUps} icon={CalendarClock} />
        <StatCard label="Interested leads" value={interested} icon={Star} />
      </div>

      <Card className="mt-8">
        <h2 className="text-lg font-semibold">Recent activity</h2>
        {activities.length === 0 ? (
          <div className="mt-6 flex flex-col items-center py-8 text-center">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-indigo-50 text-primary">
              <ActivityIcon size={22} />
            </span>
            <p className="mt-4 font-medium">Nothing here yet</p>
            <p className="mt-1 max-w-sm text-sm text-muted">
              Add your first lead and run an audit. Your actions will show up
              here.
            </p>
          </div>
        ) : (
          <ul className="mt-4 divide-y divide-border">
            {activities.map((a) => (
              <li key={a.id} className="flex items-center justify-between py-3 text-sm">
                <span>{a.type}</span>
                <span className="text-muted">
                  {a.createdAt.toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}