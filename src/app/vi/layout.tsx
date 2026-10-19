import type { Metadata } from "next";
import type { ReactNode } from "react";
import { DocumentLang } from "@/components/DocumentLang";

export const metadata: Metadata = {
  other: {
    "content-language": "vi",
  },
};

export default function VietnameseLayout({ children }: { children: ReactNode }) {
  return (
    <div lang="vi">
      <DocumentLang lang="vi" />
      {children}
    </div>
  );
}
