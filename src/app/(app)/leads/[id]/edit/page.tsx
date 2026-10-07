import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/server/auth";
import { getLead } from "@/server/services/leads/service";
import Card from "@/components/ui/Card";
import LeadForm from "@/components/leads/LeadForm";

export const metadata: Metadata = { title: "Edit lead" };

export default async function EditLeadPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const { id } = await params;
  const lead = await getLead(session.user.id, id);
  if (!lead) notFound();

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-bold sm:text-3xl">Edit lead</h1>
      <Card className="mt-6">
        <LeadForm
          lead={{
            id: lead.id,
            businessName: lead.businessName,
            websiteUrl: lead.websiteUrl,
            industry: lead.industry,
            location: lead.location,
            contactName: lead.contactName,
            contactEmail: lead.contactEmail,
            notes: lead.notes,
          }}
        />
      </Card>
    </div>
  );
}