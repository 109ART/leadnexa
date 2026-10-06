import type { LucideIcon } from "lucide-react";
import Card from "@/components/ui/Card";
import AnimatedNumber from "./AnimatedNumber";

export default function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number;
  icon: LucideIcon;
}) {
  return (
    <Card className="flex items-center gap-4 transition duration-200 hover:-translate-y-0.5 hover:shadow-lg">
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-indigo-50 text-primary">
        <Icon size={22} />
      </span>
      <div>
        <p className="text-sm text-muted">{label}</p>
        <p className="text-3xl font-bold">
          <AnimatedNumber value={value} />
        </p>
      </div>
    </Card>
  );
}