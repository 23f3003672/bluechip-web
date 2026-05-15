/**
 * SiteButton — project-level button component.
 *
 * Wraps the shadcn/base-ui Button with sizes tuned for a marketing site
 * (taller touch targets, more horizontal padding) and adds a primary-
 * outlined "ghost" style that works on both light and dark backgrounds.
 *
 * Use this component on all public-facing pages.
 * Use the raw shadcn <Button> inside the admin dashboard.
 */
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const siteButtonVariants = cva(
  // Base — shared across all variants
  [
    "inline-flex items-center justify-center gap-2",
    "rounded-lg font-medium text-sm",
    "transition-colors duration-150",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "whitespace-nowrap select-none",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ],
  {
    variants: {
      variant: {
        /** Solid blue — primary CTA */
        primary:
          "bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80",
        /** Outlined — secondary CTA */
        outline:
          "border border-primary text-primary bg-transparent hover:bg-primary/5 active:bg-primary/10",
        /** Ghost — tertiary / inline actions */
        ghost:
          "text-foreground/70 hover:bg-secondary hover:text-foreground active:bg-secondary/80",
        /** Destructive — danger actions in admin */
        destructive:
          "bg-destructive/10 text-destructive border border-destructive/30 hover:bg-destructive/20",
        /** Flat light — for use on dark/image backgrounds */
        light:
          "bg-white text-foreground hover:bg-white/90 active:bg-white/80",
      },
      size: {
        sm: "h-8 px-4 text-xs",
        md: "h-10 px-5 text-sm",
        lg: "h-12 px-7 text-sm",
        xl: "h-14 px-8 text-base",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface SiteButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof siteButtonVariants> {}

/**
 * Standard <button> element.
 *
 * For link-as-button pattern, use `SiteButtonLink` below.
 *
 * Usage:
 *   <SiteButton>Submit</SiteButton>
 *   <SiteButton variant="outline" size="lg">Learn More</SiteButton>
 */
export function SiteButton({
  variant,
  size,
  className,
  children,
  ...props
}: SiteButtonProps) {
  return (
    <button
      className={cn(siteButtonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </button>
  );
}

/**
 * Anchor styled as a SiteButton — for navigation CTAs.
 *
 * Usage:
 *   <SiteButtonLink href="/contact" variant="primary" size="lg">
 *     Get in Touch
 *   </SiteButtonLink>
 */
export interface SiteButtonLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof siteButtonVariants> {}

export function SiteButtonLink({
  variant,
  size,
  className,
  children,
  ...props
}: SiteButtonLinkProps) {
  return (
    <a
      className={cn(siteButtonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </a>
  );
}

export { siteButtonVariants };
