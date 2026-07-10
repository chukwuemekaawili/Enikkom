import { ReactNode } from "react";

interface Props {
  kicker: ReactNode;
  title: ReactNode;
  intro?: ReactNode;
  onDark?: boolean;
  align?: "left" | "center";
}

/**
 * Consistent section header in the Field Records language: mono record
 * eyebrow (via .enk-kicker), engineered title, restrained intro.
 */
export function SectionHeading({ kicker, title, intro, onDark = false, align = "left" }: Props) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className={`enk-kicker mb-4 ${onDark ? "enk-kicker--on-dark" : ""} ${align === "center" ? "justify-center" : ""}`}>
        {kicker}
      </p>
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
