import type { ComponentType, ReactNode, SVGProps } from "react";
import { AlertIcon, InfoIcon } from "@/components/icons";

/* ---------- Pill / status badge ---------- */
const pillTone: Record<string, string> = {
  ok:      "bg-ok-soft text-ok",
  exp:     "bg-[#fde7e7] text-[#d8484a]",
  term:    "bg-[#eef1f5] text-[#64748b]",
  soon:    "bg-[#fdf2d6] text-[#b07d09]",
  neutral: "bg-[#f1f5f9] text-[#475569]",
  admin:   "bg-[#eef2ff] text-[#4f46e5]",
  member:  "bg-[#f1f5f9] text-[#475569]",
  active:  "bg-ok-soft text-ok",
  inactive:"bg-[#f1f5f9] text-[#94a3b8]",
};

export function Pill({ tone = "neutral", children }: { tone?: keyof typeof pillTone | string; children: ReactNode }) {
  return <span className={`pill ${pillTone[tone] ?? pillTone.neutral}`}>{children}</span>;
}

/* ---------- Toggle switch ---------- */
export function Toggle({
  on,
  onChange,
  disabled,
}: {
  on: boolean;
  onChange?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      role="switch"
      aria-checked={on}
      onClick={onChange}
      disabled={disabled}
      className="relative shrink-0 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      style={{
        width: 44,
        height: 24,
        background: on ? "#22c55e" : "#e2e8f0",
        transition: "background 180ms",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <span
        className="absolute top-[3px] rounded-full bg-white shadow"
        style={{
          width: 18,
          height: 18,
          left: 3,
          transform: on ? "translateX(20px)" : "translateX(0)",
          transition: "transform 180ms",
        }}
      />
    </button>
  );
}

/* ---------- Setting row (label + desc + toggle) ---------- */
export function SettingRow({
  title,
  desc,
  on,
  onChange,
  children,
}: {
  title: string;
  desc?: string;
  on: boolean;
  onChange: () => void;
  children?: ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-4 py-4" style={{ borderBottom: children ? "none" : undefined }}>
        <div className="flex-1">
          <div className="text-[14px] font-semibold text-ink">{title}</div>
          {desc && <div className="mt-0.5 text-[12.5px] text-ink-soft">{desc}</div>}
        </div>
        <Toggle on={on} onChange={onChange} />
      </div>
      {children && on && (
        <div className="mb-4 ml-0 mt-1">{children}</div>
      )}
    </div>
  );
}

/* ---------- Warning banner (amber) ---------- */
export function WarningBanner({ children }: { children: ReactNode }) {
  return (
    <div
      className="flex items-start gap-3 rounded-[10px] px-4 py-3 text-[13px]"
      style={{
        background: "#fffbeb",
        border: "1px solid #fde68a",
        color: "#92400e",
      }}
    >
      <AlertIcon className="mt-0.5 h-[16px] w-[16px] shrink-0" style={{ color: "#d97706" }} />
      <span>{children}</span>
    </div>
  );
}

/* ---------- Info banner (blue) ---------- */
export function InfoBanner({ children }: { children: ReactNode }) {
  return (
    <div
      className="flex items-start gap-3 rounded-[10px] px-4 py-3 text-[13px]"
      style={{
        background: "#eff6ff",
        border: "1px solid #dbeafe",
        color: "#1e40af",
      }}
    >
      <InfoIcon className="mt-0.5 h-[16px] w-[16px] shrink-0" style={{ color: "#2563eb" }} />
      <span>{children}</span>
    </div>
  );
}

/* ---------- Section card with icon header ---------- */
export function SettingCard({
  icon: Icon,
  iconBg = "#eef2ff",
  iconColor = "#4f46e5",
  title,
  action,
  children,
}: {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  iconBg?: string;
  iconColor?: string;
  title: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="card p-6">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span
            className="grid h-[34px] w-[34px] shrink-0 place-items-center rounded-[9px]"
            style={{ background: iconBg }}
          >
            <Icon className="h-[18px] w-[18px]" style={{ color: iconColor }} />
          </span>
          <h2 className="text-[15px] font-bold text-ink">{title}</h2>
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}

/* ---------- Stat card ---------- */
const iconTone: Record<string, string> = {
  orange: "bg-[#fdeede] text-[#e8821f]",
  violet: "bg-[#efeafe] text-[#7c5cf0]",
  sky:    "bg-[#e8f0ff] text-accent",
  green:  "bg-ok-soft text-ok",
  slate:  "bg-[#f1f5f9] text-[#475569]",
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
    <div className="card flex items-center gap-4 px-5 py-[18px]">
      <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl ${iconTone[tone]}`}>
        <Icon className="h-[24px] w-[24px]" />
      </span>
      <div>
        <div className="text-[12.5px] font-medium text-ink-soft">{label}</div>
        <div className="mt-0.5 text-[24px] font-extrabold tracking-tight text-ink">{value}</div>
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
