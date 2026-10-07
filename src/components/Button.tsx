import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "navy" | "ghost";

const styles: Record<Variant, string> = {
  primary:
    "bg-teal text-white hover:bg-teal-dark shadow-sm shadow-teal/20",
  secondary:
    "border border-navy/15 bg-white/80 text-navy hover:border-teal hover:text-teal backdrop-blur",
  navy: "bg-navy text-white hover:bg-navy-deep",
  ghost: "text-teal hover:text-teal-dark",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal";

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
  const external = href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");

  if (external) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
