"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navGroups } from "@/lib/nav";

export default function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  return (
    <>
      {/* mobile backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-30 bg-black/40 transition-opacity md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden="true"
      />

      <aside
        className={`fixed z-40 flex h-screen w-64 shrink-0 flex-col bg-gradient-to-b from-frame to-frame-2 text-frame-text transition-transform md:sticky md:top-0 md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* brand */}
        <div className="flex items-center gap-3 border-b border-frame-line px-[22px] py-5">
          <span className="grid h-[34px] w-[34px] shrink-0 place-items-center rounded-[9px] bg-gradient-to-br from-accent-2 to-[#e85b2a] shadow-[0_4px_12px_rgba(232,91,42,0.35)]">
            <svg viewBox="0 0 24 24" className="h-5 w-5">
              <path d="M3 19L9 8l4 6 2-3 3 8H3z" fill="#fff" />
            </svg>
          </span>
          <span className="leading-tight">
            <span className="block text-base font-bold tracking-[0.2px] text-white">Debut Platform</span>
            <span className="block text-[11px] font-medium tracking-[0.4px] text-frame-dim">Workspace Management</span>
          </span>
        </div>

        {/* nav */}
        <nav className="flex flex-col gap-[3px] overflow-y-auto p-[14px]">
          {navGroups.map((group) => (
            <div key={group.label}>
              <div className="px-3 pb-1.5 pt-3.5 text-[10.5px] font-semibold uppercase tracking-[1.4px] text-frame-dim">
                {group.label}
              </div>
              {group.items.map((item) => {
                const active = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={`relative flex w-full items-center gap-3 rounded-[10px] px-3 py-[11px] text-sm font-medium transition-colors ${
                      active
                        ? "bg-accent/15 font-semibold text-[#cfe0ff] before:absolute before:bottom-2 before:left-0 before:top-2 before:w-[3px] before:rounded-r before:bg-accent before:content-['']"
                        : "text-frame-text hover:bg-white/5 hover:text-[#dde7f5]"
                    }`}
                  >
                    <Icon className={`h-[19px] w-[19px] shrink-0 ${active ? "text-[#7ab0ff] opacity-100" : "opacity-85"}`} />
                    <span className="flex-1">{item.label}</span>
                    {item.badge ? (
                      <span className="rounded-full bg-accent-2 px-[7px] py-px text-[10px] font-bold text-white">
                        {item.badge}
                      </span>
                    ) : null}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* footer */}
        <div className="mt-auto flex items-center gap-3 border-t border-frame-line p-4 text-[13px]">
          <span className="grid h-[34px] w-[34px] shrink-0 place-items-center rounded-full bg-gradient-to-br from-accent to-[#7a5cf0] text-[13px] font-bold text-white">
            U
          </span>
          <span className="leading-tight">
            <b className="block text-[13px] font-semibold text-[#e7eefb]">useradmin4</b>
            <span className="text-[11.5px] text-frame-dim">debutmail.comth</span>
          </span>
        </div>
      </aside>
    </>
  );
}
