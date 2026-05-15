import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AdminPageHeadingProps {
  title: string;
  description: string;
  pending?: boolean;
  action?: ReactNode;
}

export function AdminPageHeading({
  title,
  description,
  pending = false,
  action,
}: AdminPageHeadingProps) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        {pending && <p className="mt-2 text-xs text-muted-foreground">Saving changes...</p>}
      </div>
      {action}
    </div>
  );
}

interface AdminEmptyStateProps {
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
}

export function AdminEmptyState({
  title,
  description,
  action,
  className,
}: AdminEmptyStateProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-dashed border-border bg-white p-8 text-center",
        className
      )}
    >
      <p className="text-sm font-medium text-foreground">{title}</p>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
