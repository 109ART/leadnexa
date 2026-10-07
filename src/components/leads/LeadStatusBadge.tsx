import Badge from "@/components/ui/Badge";
import {
  LEAD_STATUS_LABELS,
  LEAD_STATUS_TONES,
  type LeadStatusValue,
} from "@/lib/lead-status";

export default function LeadStatusBadge({ status }: { status: LeadStatusValue }) {
  return (
    <Badge tone={LEAD_STATUS_TONES[status]}>{LEAD_STATUS_LABELS[status]}</Badge>
  );
}