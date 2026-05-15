import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

/* ─── Sub-components ─────────────────────────────────────────────── */

interface CardImageProps {
  src: string;
  alt: string;
  /** Aspect ratio class — default is 16/9 */
  aspectClass?: string;
}

export function CardImage({
  src,
  alt,
  aspectClass = "aspect-video",
}: CardImageProps) {
  return (
    <div className={cn("relative w-full overflow-hidden rounded-t-xl", aspectClass)}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
}

interface CardBadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function CardBadge({ children, className }: CardBadgeProps) {
  return (
    <Badge
      variant="secondary"
      className={cn(
        "rounded-md px-2 py-0.5 text-xs font-medium text-primary bg-primary/8",
        className
      )}
    >
      {children}
    </Badge>
  );
}

/* ─── BaseCard ───────────────────────────────────────────────────────
 * Foundation card used across Projects, Services, and Recognitions.
 * Compose with sub-components above for richer layouts.
 * ─────────────────────────────────────────────────────────────────── */

interface BaseCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Makes the entire card a link */
  href?: string;
  /** Suppress the default hover effect */
  noHover?: boolean;
}

/**
 * Usage (simple):
 *   <BaseCard href="/projects/example">
 *     <CardImage src="…" alt="…" />
 *     <div className="p-5">
 *       <CardBadge>Civil</CardBadge>
 *       <Heading variant="h4" className="mt-2">Project Title</Heading>
 *       <Paragraph variant="sm" className="mt-1">Short description…</Paragraph>
 *     </div>
 *   </BaseCard>
 */
export function BaseCard({
  href,
  noHover = false,
  className,
  children,
  ...props
}: BaseCardProps) {
  const inner = (
    <div
      className={cn(
        // Base surface
        "group flex flex-col overflow-hidden rounded-xl bg-card",
        "border border-border",
        // Hover
        !noHover && [
          "transition-shadow duration-200",
          "hover:shadow-md hover:shadow-foreground/5",
          href && "hover:border-primary/30",
        ],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl"
      >
        {inner}
      </Link>
    );
  }

  return inner;
}

/* ─── BaseCard body padding helpers ─────────────────────────────── */

export function CardBody({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-col gap-1.5 p-5", className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooterRow({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center justify-between border-t border-border px-5 py-3 text-xs text-muted-foreground",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
