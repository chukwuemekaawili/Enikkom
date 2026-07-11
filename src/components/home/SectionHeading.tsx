import { ReactNode } from "react";

interface Props {
  /** Legacy eyebrow label — accepted for compatibility, no longer rendered (Shell has no eyebrows). */
  kicker?: ReactNode;
  title: ReactNode;
  intro?: ReactNode;
  onDark?: boolean;
  align?: "left" | "center";
}

/**
 * Consistent section header, Shell-style: bare sentence-case title plus a
 * restrained intro. The old kicker eyebrow row is gone.
 */
export function SectionHeading({ title, intro, onDark = false, align = "left" }: Props) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <h2
        className="enk-display text-[clamp(1.5rem,2.8vw,2.05rem)]"
        style={{ color: onDark ? "var(--enk-on-dark)" : "var(--enk-ink)" }}
      >
        {title}
      </h2>
      {intro && (
        <p
          className="mt-3 text-[14px] leading-relaxed md:text-[15px]"
          style={{ color: onDark ? "var(--enk-on-dark-muted)" : "var(--enk-steel)" }}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
