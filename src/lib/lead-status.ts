export const LEAD_STATUSES = [
  "NEW",
  "AUDITED",
  "CONTACTED",
  "REPLIED",
  "INTERESTED",
  "ARCHIVED",
] as const;

export type LeadStatusValue = (typeof LEAD_STATUSES)[number];

export const LEAD_STATUS_LABELS: Record<LeadStatusValue, string> = {
  NEW: "New",
  AUDITED: "Audited",
  CONTACTED: "Contacted",
  REPLIED: "Replied",
  INTERESTED: "Interested",
  ARCHIVED: "Archived",
};

export const LEAD_STATUS_TONES: Record<
  LeadStatusValue,
  "default" | "success" | "warning" | "error" | "neutral"
> = {
  NEW: "default",
  AUDITED: "neutral",
  CONTACTED: "warning",
  REPLIED: "success",
  INTERESTED: "success",
  ARCHIVED: "neutral",
};

export function isLeadStatus(value: unknown): value is LeadStatusValue {
  return (
    typeof value === "string" &&
    (LEAD_STATUSES as readonly string[]).includes(value)
  );
}