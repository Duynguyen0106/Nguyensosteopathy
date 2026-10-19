import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  other: {
    "content-language": "vi",
  },
};

export default function VietnameseLayout({ children }: { children: ReactNode }) {
  // Root <html lang> stays en-GB (single root layout). Mark this subtree for
  // Vietnamese readers and assistive tech; hreflang is set on /vi metadata.
  return <div lang="vi">{children}</div>;
}
