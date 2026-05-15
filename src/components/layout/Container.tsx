import * as React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Render as a different HTML element */
  as?: React.ElementType;
  /** Narrow variant for prose/text-heavy pages */
  narrow?: boolean;
}

/**
 * Site-wide max-width container with consistent horizontal gutters.
 * Default: max-w-7xl (1280px). Narrow: max-w-4xl (896px).
 *
 * Usage:
 *   <Container>…</Container>
 *   <Container as="section" narrow>…</Container>
 */
export function Container({
  as: Tag = "div",
  narrow = false,
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        narrow ? "max-w-4xl" : "max-w-7xl",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
