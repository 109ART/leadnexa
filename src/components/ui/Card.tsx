import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export default function Card({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-card border border-border bg-surface p-6 shadow-soft",
        className
      )}
      {...props}
    />
  );
}