import type { ReactNode } from "react";

type BodyTextProps = {
  children: ReactNode;
  tone?: "default" | "muted";
};

export default function BodyText({ children, tone = "default" }: BodyTextProps) {
  const toneClass =
    tone === "muted" ? "text-[var(--ink-soft)]" : "text-[var(--ink)]";

  return (
    <p className={`text-base leading-relaxed ${toneClass}`}>{children}</p>
  );
}
