import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant =
  | "primary"
  | "secondary"
  | "navy"
  | "ghost"
  /** Solid light button for navy / dark bands — avoids white-on-white from class overrides. */
  | "onDark"
  /** Outlined light button for navy / dark bands. */
  | "onDarkOutline";

const styles: Record<Variant, string> = {
  primary:
    "bg-teal text-white hover:bg-teal-dark shadow-md shadow-teal/25 ring-1 ring-teal/20",
  secondary:
    "border border-slate-200 bg-white text-navy hover:border-teal hover:text-teal shadow-sm",
  navy: "bg-navy text-white hover:bg-navy-deep shadow-md shadow-navy/20",
  ghost: "text-teal hover:text-teal-dark",
  onDark:
    "border border-white/20 bg-white text-navy shadow-md shadow-black/15 hover:bg-cream-mist",
  onDarkOutline:
    "border border-white/45 bg-transparent text-white hover:border-white hover:bg-white/10",
};

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-base font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal";

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
  ...props
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
} & Omit<ComponentProps<"a">, "href" | "className">) {
  const classes = `${base} ${styles[variant]} ${className}`;
  const external =
    href.startsWith("http") ||
    href.startsWith("tel:") ||
    href.startsWith("mailto:");

  if (external) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}
