"use client";

import { usePathname } from "next/navigation";

export function SkipLink() {
  const pathname = usePathname() || "/";
  const isVi = pathname.startsWith("/vi");
  return (
    <a href="#main-content" className="skip-link">
      {isVi ? "Đi tới nội dung" : "Skip to content"}
    </a>
  );
}
