import type { ComponentType, ReactNode, SVGProps } from "react";

export default function PageHeader({
  icon: Icon,
  title,
  desc,
  actions,
}: {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  desc: string;
  actions?: ReactNode;
}) {
  return (
    <>
      <div className="mb-2.5 flex items-center gap-2 text-[13px] text-ink-faint">
        <span className="text-ink-soft">Home</span>
        <span className="opacity-60">›</span>
        <b className="font-semibold text-accent">{title}</b>
      </div>
      <div className="mb-[22px] flex flex-wrap items-end justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-[11px] bg-accent-soft text-accent">
            <Icon className="h-[22px] w-[22px]" />
          </span>
          <div>
            <h1 className="text-2xl font-bold tracking-[-0.3px]">{title}</h1>
            <p className="mt-0.5 text-[13.5px] text-ink-soft">{desc}</p>
          </div>
        </div>
        {actions ? <div className="flex gap-2.5">{actions}</div> : null}
      </div>
    </>
  );
}
