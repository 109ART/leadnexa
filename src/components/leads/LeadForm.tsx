"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  createLeadAction,
  updateLeadAction,
} from "@/app/(app)/leads/actions";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

type LeadFormProps = {
  lead?: {
    id: string;
    businessName: string;
    websiteUrl: string;
    industry: string | null;
    location: string | null;
    contactName: string | null;
    contactEmail: string | null;
    notes: string | null;
  };
};

function Field({
  label,
  name,
  error,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      {children}
      {error && <p className="mt-1 text-sm text-error">{error}</p>}
    </div>
  );
}

export default function LeadForm({ lead }: LeadFormProps) {
  const router = useRouter();
  const editing = Boolean(lead);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setError("");
    setFieldErrors({});
    setSuccess(false);
    setPending(true);

    const formData = new FormData(form);
    const result = lead
      ? await updateLeadAction(lead.id, formData)
      : await createLeadAction(formData);
    setPending(false);

    if (result.error) setError(result.error);
    if (result.fieldErrors) setFieldErrors(result.fieldErrors);
    if (result.ok) {
      if (lead) {
        router.push(`/leads/${lead.id}`);
        router.refresh();
      } else {
        form.reset();
        setSuccess(true);
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Business name *" name="businessName" error={fieldErrors.businessName}>
          <Input id="businessName" name="businessName" placeholder="ABC Restaurant" defaultValue={lead?.businessName ?? ""} />
        </Field>
        <Field label="Website *" name="websiteUrl" error={fieldErrors.websiteUrl}>
          <Input id="websiteUrl" name="websiteUrl" placeholder="example.com" inputMode="url" defaultValue={lead?.websiteUrl ?? ""} />
        </Field>
        <Field label="Industry" name="industry" error={fieldErrors.industry}>
          <Input id="industry" name="industry" placeholder="Restaurant" defaultValue={lead?.industry ?? ""} />
        </Field>
        <Field label="Location" name="location" error={fieldErrors.location}>
          <Input id="location" name="location" placeholder="California, USA" defaultValue={lead?.location ?? ""} />
        </Field>
        <Field label="Contact name" name="contactName" error={fieldErrors.contactName}>
          <Input id="contactName" name="contactName" placeholder="Jane Smith" defaultValue={lead?.contactName ?? ""} />
        </Field>
        <Field label="Contact email" name="contactEmail" error={fieldErrors.contactEmail}>
          <Input id="contactEmail" name="contactEmail" type="email" placeholder="jane@example.com" defaultValue={lead?.contactEmail ?? ""} />
        </Field>
      </div>

      <Field label="Notes" name="notes" error={fieldErrors.notes}>
        <textarea
          id="notes"
          name="notes"
          rows={4}
          defaultValue={lead?.notes ?? ""}
          placeholder="Anything useful: how you found them, what you noticed..."
          className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-base outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 sm:text-sm"
        />
      </Field>

      {error && <p className="text-sm text-error">{error}</p>}
      {success && (
        <p className="rounded-xl bg-green-50 p-3 text-sm text-success" role="status">
          Lead added. You can add another one.
        </p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" disabled={pending} className="w-full sm:w-auto">
          {pending ? "Saving..." : editing ? "Save changes" : "Add lead"}
        </Button>
        {lead && (
          <Link
            href={`/leads/${lead.id}`}
            className="text-center text-sm text-muted hover:text-text"
          >
            Cancel
          </Link>
        )}
      </div>
    </form>
  );
}