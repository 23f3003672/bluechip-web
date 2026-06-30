import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { FolderSearch } from "lucide-react";

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
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/80 pb-5 mb-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">{title}</h1>
        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        {pending && (
          <div className="mt-2 flex items-center gap-1.5 text-xs text-[#1a56a8] font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-[#1a56a8] animate-pulse" />
            <span>Updating content...</span>
          </div>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
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
        "rounded-xl border border-dashed border-slate-200 bg-white p-10 text-center flex flex-col items-center justify-center max-w-md mx-auto my-6 shadow-xs",
        className
      )}
    >
      <div className="rounded-full bg-slate-50 p-4 border border-slate-100 text-slate-400 mb-4 shadow-2xs">
        <FolderSearch className="h-6 w-6" />
      </div>
      <p className="text-sm font-semibold text-slate-800">{title}</p>
      <p className="mt-1.5 text-xs text-muted-foreground max-w-xs leading-relaxed">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
