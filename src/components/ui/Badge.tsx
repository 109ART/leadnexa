import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: "default" | "success" | "warning" | "error" | "neutral";
};

const tones = {
  default: "bg-indigo-50 text-primary",
  success: "bg-green-50 text-success",
  warning: "bg-amber-50 text-warning",
  error: "bg-red-50 text-error",
  neutral: "bg-slate-100 text-muted",
};

export default function Badge({
  tone = "default",
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        tones[tone],
        className
      )}
      {...props}
    />
  );
}
