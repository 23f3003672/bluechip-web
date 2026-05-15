import * as React from "react";
import { cn } from "@/lib/utils";

type SpacingVariant = "default" | "sm" | "lg" | "none";

interface SectionWrapperProps extends React.HTMLAttributes<HTMLElement> {
  /** Controls top/bottom padding */
  spacing?: SpacingVariant;
  /** Alternate background — applies bg-secondary */
  alternate?: boolean;
}

const spacingMap: Record<SpacingVariant, string> = {
  none: "",
  sm: "py-10 md:py-14",
  default: "py-16 md:py-24",
  lg: "py-20 md:py-32",
};

/**
 * Semantic <section> wrapper with consistent vertical rhythm.
 *
 * Usage:
 *   <SectionWrapper>…</SectionWrapper>
 *   <SectionWrapper spacing="sm" alternate>…</SectionWrapper>
 */
export function SectionWrapper({
  spacing = "default",
  alternate = false,
  className,
  children,
  ...props
}: SectionWrapperProps) {
  return (
    <section
      className={cn(
        spacingMap[spacing],
        alternate && "bg-secondary",
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}
