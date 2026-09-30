import Badge from "@/components/ui/Badge";

export default function AuditPreview() {
  return (
    <div className="rounded-card border border-border bg-surface p-6 text-left shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted">
            Sample audit
          </p>
          <h3 className="mt-1 text-lg font-semibold">ABC Restaurant</h3>
          <p className="text-sm text-muted">example.com · California, USA</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-primary">78</p>
          <p className="text-xs text-muted">Lead score</p>
        </div>
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full w-[78%] rounded-full bg-linear-to-r from-primary to-secondary" />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <p className="mb-2 text-sm font-medium">Verified observations</p>
          <div className="flex flex-wrap gap-2">
            <Badge tone="success">Viewport tag found</Badge>
            <Badge tone="warning">No booking link</Badge>
            <Badge tone="warning">Missing meta description</Badge>
          </div>
        </div>
        <div>
          <p className="mb-2 text-sm font-medium">AI suggestions</p>
          <div className="flex flex-wrap gap-2">
            <Badge>Add online booking</Badge>
            <Badge>Improve homepage CTA</Badge>
          </div>
        </div>
      </div>
    </div>
  );
}