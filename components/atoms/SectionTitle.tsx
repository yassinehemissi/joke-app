import type { ReactNode } from "react";

type SectionTitleProps = {
  children: ReactNode;
};

export default function SectionTitle({ children }: SectionTitleProps) {
  return (
    <h2 className="text-xl font-semibold uppercase tracking-[0.28em] text-[var(--ink)]">
      {children}
    </h2>
  );
}
