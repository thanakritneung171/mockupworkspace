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
        className={`fixed z-40 flex h-screen w-[248px] shrink-0 flex-col transition-transform md:sticky md:top-0 md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ background: "#0c1322" }}
      >
        {/* brand */}
        <div className="flex items-center gap-0 px-5 py-5" style={{ borderBottom: "1px solid #1c2941" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-transparent.png" alt="Debut" style={{ height: 38, objectFit: "contain" }} />
          <span className="ml-2.5 leading-tight">
            <span className="block text-[14px] font-bold text-white" style={{ letterSpacing: "0.2px" }}>
              Debut Workspace
            </span>
            <span className="block text-[10.5px] font-medium" style={{ color: "#5b6b85" }}>
              Management Platform
            </span>
          </span>
        </div>

        {/* nav */}
        <nav className="flex flex-col gap-[2px] overflow-y-auto p-[14px]">
          {navGroups.map((group) => (
            <div key={group.label} className="mb-1">
              <div
                className="px-3 pb-2 pt-3 text-[10px] font-bold uppercase"
                style={{ color: "#5b6b85", letterSpacing: ".09em" }}
              >
                {group.label}
              </div>
              {group.items.map((item) => {
                const active = pathname === item.href || pathname.startsWith(item.href + "/");
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={`relative flex w-full items-center gap-[10px] rounded-[9px] px-[11px] py-[9px] text-[13.5px] transition-colors ${
                      active
                        ? "font-semibold text-white"
                        : "font-medium hover:text-white"
                    }`}
                    style={{
                      background: active ? "#1c2941" : "transparent",
                      color: active ? "#ffffff" : "#94a3b8",
                    }}
                    onMouseEnter={(e) => {
                      if (!active) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,.05)";
                    }}
                    onMouseLeave={(e) => {
                      if (!active) (e.currentTarget as HTMLElement).style.background = "transparent";
                    }}
                  >
                    <Icon className="h-[18px] w-[18px] shrink-0" />
                    <span className="flex-1">{item.label}</span>
                    {item.badge ? (
                      <span
                        className="rounded-full px-[7px] py-px text-[10px] font-bold text-white"
                        style={{
                          background:
                            item.badge === "New"
                              ? "linear-gradient(135deg,#f59e0b,#ef4444)"
                              : "#2563eb",
                        }}
                      >
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
        <div
          className="mt-auto flex items-center gap-3 p-4"
          style={{ borderTop: "1px solid #1c2941" }}
        >
          <span
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-[13px] font-bold text-white"
            style={{ background: "linear-gradient(135deg,#3b82f6,#6366f1)" }}
          >
            U
          </span>
          <span className="leading-tight">
            <b className="block text-[13px] font-semibold text-white">useradmin4</b>
            <span className="text-[11px]" style={{ color: "#5b6b85" }}>
              debutmail.comth
            </span>
          </span>
        </div>
      </aside>
    </>
  );
}
