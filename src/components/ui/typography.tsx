import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* ─── Heading ──────────────────────────────────────────────────────
 * Variants map to the visual scale; the `as` prop controls the
 * semantic element so you can render an h2 that looks like an h3
 * without breaking document outline.
 * ─────────────────────────────────────────────────────────────────── */
const headingVariants = cva(
  "font-semibold tracking-tight text-foreground",
  {
    variants: {
      /**
       * Visual size scale:
       *   display — hero headlines (80–96px feel)
       *   h1      — page titles
       *   h2      — section titles
       *   h3      — sub-section / card titles
       *   h4      — labels, sidebars
       */
      variant: {
        display:
          "text-4xl leading-tight sm:text-5xl md:text-6xl font-bold",
        h1: "text-3xl leading-tight sm:text-4xl md:text-5xl",
        h2: "text-2xl leading-snug sm:text-3xl md:text-4xl",
        h3: "text-xl leading-snug sm:text-2xl",
        h4: "text-base leading-normal sm:text-lg font-medium",
      },
    },
    defaultVariants: {
      variant: "h2",
    },
  }
);

type HeadingElement = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  /** Semantic HTML element — defaults match variant name */
  as?: HeadingElement;
}

/**
 * Polymorphic heading component.
 *
 * Usage:
 *   <Heading variant="h1">Page Title</Heading>
 *   <Heading as="h3" variant="h2">Section Title</Heading>  ← visual h2, semantic h3
 */
export function Heading({
  as,
  variant = "h2",
  className,
  children,
  ...props
}: HeadingProps) {
  // Default semantic element matches the variant name
  const semanticDefaults: Record<string, HeadingElement> = {
    display: "h1",
    h1: "h1",
    h2: "h2",
    h3: "h3",
    h4: "h4",
  };

  const Tag = as ?? (semanticDefaults[variant ?? "h2"] as HeadingElement);

  return (
    <Tag className={cn(headingVariants({ variant }), className)} {...props}>
      {children}
    </Tag>
  );
}

/* ─── Paragraph ───────────────────────────────────────────────────── */
const paragraphVariants = cva("text-foreground", {
  variants: {
    variant: {
      /** Larger intro paragraph — sits below a hero headline */
      lead: "text-lg leading-relaxed text-muted-foreground sm:text-xl",
      /** Standard body copy */
      base: "text-base leading-relaxed text-foreground/80",
      /** Secondary info, captions */
      sm: "text-sm leading-relaxed text-foreground/70",
      /** Explicitly de-emphasised */
      muted: "text-sm leading-relaxed text-muted-foreground",
    },
  },
  defaultVariants: {
    variant: "base",
  },
});

interface ParagraphProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof paragraphVariants> {}

/**
 * Usage:
 *   <Paragraph>Standard body text.</Paragraph>
 *   <Paragraph variant="lead">Intro paragraph.</Paragraph>
 *   <Paragraph variant="muted">Caption or helper text.</Paragraph>
 */
export function Paragraph({
  variant,
  className,
  children,
  ...props
}: ParagraphProps) {
  return (
    <p
      className={cn(paragraphVariants({ variant }), className)}
      {...props}
    >
      {children}
    </p>
  );
}

/* ─── Label / Eyebrow ─────────────────────────────────────────────
 * Small all-caps label used above section headings ("Our Services")
 * ─────────────────────────────────────────────────────────────────── */
type EyebrowProps = React.HTMLAttributes<HTMLParagraphElement>;

/**
 * Usage:
 *   <Eyebrow>What we do</Eyebrow>
 */
export function Eyebrow({ className, children, ...props }: EyebrowProps) {
  return (
    <p
      className={cn(
        "text-xs font-semibold uppercase tracking-widest text-primary",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}
