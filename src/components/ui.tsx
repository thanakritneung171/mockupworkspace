import type { ComponentType, ReactNode, SVGProps } from "react";

/* ---------- Pill / status badge ---------- */
const pillTone: Record<string, string> = {
  ok: "bg-ok-soft text-ok",
  exp: "bg-[#fde7e7] text-[#d8484a]",
  term: "bg-[#eef1f5] text-[#64748b]",
  soon: "bg-[#fdf2d6] text-[#b07d09]",
  neutral: "bg-[#eef1f5] text-[#64748b]",
};

export function Pill({ tone = "neutral", children }: { tone?: keyof typeof pillTone | string; children: ReactNode }) {
  return <span className={`pill ${pillTone[tone] ?? pillTone.neutral}`}>{children}</span>;
}

/* ---------- Stat card ---------- */
const iconTone: Record<string, string> = {
  orange: "bg-[#fdeede] text-[#e8821f]",
  violet: "bg-[#efeafe] text-[#7c5cf0]",
  sky: "bg-[#e6f1fd] text-accent",
  green: "bg-ok-soft text-ok",
};

export function StatCard({
  icon: Icon,
  tone,
  label,
  value,
  sub,
}: {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  tone: keyof typeof iconTone;
  label: string;
  value: ReactNode;
  sub?: ReactNode;
}) {
  return (
    <div className="card flex items-center gap-4 px-6 py-5">
      <span className={`grid h-[54px] w-[54px] shrink-0 place-items-center rounded-2xl ${iconTone[tone]}`}>
        <Icon className="h-[26px] w-[26px]" />
      </span>
      <div>
        <div className="text-[13.5px] font-medium text-ink-soft">{label}</div>
        <div className="mt-0.5 text-[30px] font-bold tracking-tight">{value}</div>
        {sub ? <div className="mt-0.5 text-xs text-ink-faint">{sub}</div> : null}
      </div>
    </div>
  );
}

/* ---------- Section header inside a card ---------- */
export function SectionHead({ title, action }: { title: string; action?: ReactNode }) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h2 className="text-lg font-bold">{title}</h2>
      {action}
    </div>
  );
}

/* ---------- Usage progress bar ---------- */
export function UseBar({ percent, color = "var(--color-accent)" }: { percent: number; color?: string }) {
  return (
    <div className="usebar">
      <i style={{ width: `${Math.min(100, Math.max(0, percent))}%`, background: color }} />
    </div>
  );
}
