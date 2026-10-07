import type { Metadata } from "next";
import Card from "@/components/ui/Card";
import LeadForm from "@/components/leads/LeadForm";

export const metadata: Metadata = { title: "Add lead" };

export default function NewLeadPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-bold sm:text-3xl">Add a lead</h1>
      <p className="mt-1 text-muted">
        Enter a business and its website. You can run an audit on it later.
      </p>
      <Card className="mt-6">
        <LeadForm />
      </Card>
    </div>
  );
}