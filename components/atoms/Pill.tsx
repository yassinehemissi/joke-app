import type { ReactNode } from "react";

type PillProps = {
  children: ReactNode;
};

export default function Pill({ children }: PillProps) {
  return (
    <span className="rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs uppercase tracking-[0.2em] text-[var(--ink-soft)] shadow-sm">
      {children}
    </span>
  );
}
