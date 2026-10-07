"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { setLeadStatusAction } from "@/app/(app)/leads/actions";
import Button from "@/components/ui/Button";
import type { LeadStatusValue } from "@/lib/lead-status";

const actions: { status: LeadStatusValue; label: string }[] = [
  { status: "CONTACTED", label: "Mark contacted" },
  { status: "REPLIED", label: "Mark replied" },
  { status: "INTERESTED", label: "Mark interested" },
];

export default function LeadActions({
  leadId,
  status,
}: {
  leadId: string;
  status: LeadStatusValue;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");

  function change(next: LeadStatusValue) {
    setError("");
    startTransition(async () => {
      const result = await setLeadStatusAction(leadId, next);
      if (result.error) {
        setError(result.error);
        return;
      }
      router.refresh();
    });
  }

  const archived = status === "ARCHIVED";

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {!archived &&
          actions.map((a) => (
            <Button
              key={a.status}
              variant="secondary"
              size="sm"
              disabled={pending || status === a.status}
              onClick={() => change(a.status)}
            >
              {a.label}
            </Button>
          ))}
        {archived ? (
          <Button size="sm" disabled={pending} onClick={() => change("NEW")}>
            Restore lead
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            disabled={pending}
            onClick={() => change("ARCHIVED")}
          >
            Archive
          </Button>
        )}
      </div>
      {error && <p className="mt-2 text-sm text-error">{error}</p>}
    </div>
  );
}