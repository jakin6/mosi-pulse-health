import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Panel({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      className={cn("rounded-xl bg-card ring-1 ring-border", className)}
    >
      {children}
    </section>
  );
}

export function PanelHead({
  title,
  meta,
  action,
  onAction,
}: {
  title: string;
  meta?: string;
  action?: string;
  onAction?: () => void;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <h2 className="font-display text-lg font-semibold">{title}</h2>
      {action ? (
        <button
          type="button"
          onClick={onAction}
          className="text-[13px] font-medium text-accent hover:underline"
        >
          {action} →
        </button>
      ) : meta ? (
        <span className="font-mono text-[11px] text-muted-foreground">{meta}</span>
      ) : null}
    </div>
  );
}

export function Label({ children }: { children: ReactNode }) {
  return <p className="label-mono">{children}</p>;
}

export type Tone = "good" | "warn" | "bad" | "neutral";

export const toneText: Record<Tone, string> = {
  good: "text-good",
  warn: "text-warn",
  bad: "text-bad",
  neutral: "text-muted-foreground",
};

export const toneDot: Record<Tone, string> = {
  good: "bg-good",
  warn: "bg-warn",
  bad: "bg-bad",
  neutral: "bg-muted-foreground",
};

export function Dot({ tone }: { tone: Tone }) {
  return <span className={cn("inline-block size-1.5 rounded-full", toneDot[tone])} />;
}

export function Delta({ value, invert = false }: { value: number; invert?: boolean }) {
  const positive = invert ? value <= 0 : value >= 0;
  return (
    <span
      className={cn(
        "font-mono text-[12px] font-medium",
        positive ? "text-good" : "text-bad",
      )}
    >
      {value >= 0 ? "↑" : "↓"} {Math.abs(value).toFixed(1)}%
    </span>
  );
}

export function Sparkline({
  values,
  tone = "good",
}: {
  values: number[];
  tone?: Tone;
}) {
  const max = Math.max(...values, 1);
  return (
    <span className="flex h-8 items-end gap-[3px]" aria-hidden>
      {values.map((v, i) => (
        <i
          key={i}
          className={cn(
            "w-[3px] rounded-[1px]",
            toneDot[tone],
            i === values.length - 1 ? "opacity-100" : "opacity-40",
          )}
          style={{ height: `${Math.max(12, (v / max) * 100)}%` }}
        />
      ))}
    </span>
  );
}

export function Segmented<T extends string>({
  options,
  value,
  onChange,
  size = "md",
}: {
  options: { id: T; label: string }[];
  value: T;
  onChange: (id: T) => void;
  size?: "sm" | "md";
}) {
  return (
    <div className="flex flex-wrap items-center gap-1 rounded-lg bg-secondary p-1">
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          onClick={() => onChange(o.id)}
          className={cn(
            "rounded-md font-medium transition-colors",
            size === "sm" ? "px-2.5 py-1 text-[12px]" : "px-3 py-1.5 text-[13px]",
            value === o.id
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function Bar({
  value,
  tone = "good",
  className,
}: {
  value: number;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn("block h-2 overflow-hidden rounded-full bg-track", className)}
    >
      <span
        className={cn("block h-full rounded-full transition-[width] duration-700", toneDot[tone])}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </span>
  );
}

export function StatRow({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: Tone;
}) {
  return (
    <div className="flex items-baseline justify-between border-b border-border/60 py-2 last:border-0">
      <span className="text-[13px] text-muted-foreground">{label}</span>
      <span className={cn("font-mono text-[13px] font-medium", tone && toneText[tone])}>
        {value}
      </span>
    </div>
  );
}

export function EmptyState({ title, detail }: { title: string; detail: string }) {
  return (
    <div className="rounded-lg border border-dashed border-border px-4 py-8 text-center">
      <p className="text-[13px] font-semibold">{title}</p>
      <p className="mt-1 text-[12px] text-muted-foreground">{detail}</p>
    </div>
  );
}
