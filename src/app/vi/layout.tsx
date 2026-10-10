import type { ReactNode } from "react";

export default function VietnameseLayout({ children }: { children: ReactNode }) {
  return <div lang="vi">{children}</div>;
}
