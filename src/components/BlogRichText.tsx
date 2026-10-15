import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Renders blog paragraph text with markdown-style [label](/path) links.
 * External http(s) links open in a new tab; internal paths use Next Link.
 */
export function BlogRichText({ text }: { text: string }) {
  const nodes: ReactNode[] = [];
  const pattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    const label = match[1];
    const href = match[2];
    const external = href.startsWith("http") || href.startsWith("mailto:");
    if (external) {
      nodes.push(
        <a
          key={`a-${key++}`}
          href={href}
          className="font-semibold text-teal hover:text-teal-dark"
          {...(href.startsWith("http")
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {label}
        </a>,
      );
    } else {
      nodes.push(
        <Link
          key={`a-${key++}`}
          href={href}
          className="font-semibold text-teal hover:text-teal-dark"
        >
          {label}
        </Link>,
      );
    }
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return <>{nodes}</>;
}
