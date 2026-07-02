import { ReactNode } from "react";

interface Props {
  kicker: ReactNode;
  title: ReactNode;
  intro?: ReactNode;
  onDark?: boolean;
  align?: "left" | "center";
}

/** Consistent section header. One-color title; accent only in the kicker rule. */
export function SectionHeading({ kicker, title, intro, onDark = false, align = "left" }: Props) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className={`enk-kicker mb-4 ${onDark ? "enk-kicker--on-dark" : ""} ${align === "center" ? "justify-center" : ""}`}>
        {kicker}
      </p>
      <h2
        className="enk-display text-[clamp(1.75rem,3.6vw,2.75rem)]"
        style={{ color: onDark ? "var(--enk-on-dark)" : "var(--enk-ink)" }}
      >
        {title}
      </h2>
      {intro && (
        <p
          className="mt-4 text-[16px] leading-relaxed md:text-[17px]"
          style={{ color: onDark ? "var(--enk-on-dark-muted)" : "var(--enk-steel)" }}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
