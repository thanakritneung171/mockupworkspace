"use client";

import { SearchIcon, BellIcon, MenuIcon } from "@/components/icons";

export default function Topbar({ onMenu }: { onMenu: () => void }) {
  return (
    <header
      className="sticky top-0 z-20 flex items-center gap-3 px-7"
      style={{
        height: 64,
        background: "rgba(241,245,249,.92)",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid #e9edf4",
      }}
    >
      <button
        onClick={onMenu}
        aria-label="เปิดเมนู"
        className="grid h-10 w-10 place-items-center rounded-[9px] text-ink-soft md:hidden"
        style={{ border: "1px solid #e5e9f0" }}
      >
        <MenuIcon className="h-[18px] w-[18px]" />
      </button>

      <label
        className="hidden max-w-[340px] flex-1 items-center gap-2 sm:flex"
        style={{
          height: 40,
          borderRadius: 10,
          border: "1px solid #e5e9f0",
          background: "#fff",
          padding: "0 14px",
          fontSize: 13.5,
        }}
      >
        <SearchIcon className="h-4 w-4 shrink-0 text-ink-faint" />
        <input
          placeholder="ค้นหาผู้ใช้, อีเมล, ไฟล์..."
          className="w-full bg-transparent text-ink-soft outline-none placeholder:text-ink-faint"
          style={{ fontSize: 13.5 }}
        />
      </label>

      <div className="flex-1" />

      <div
        className="hidden items-center gap-1.5 sm:flex"
        style={{
          background: "#eaf1ff",
          borderRadius: 999,
          padding: "6px 14px",
          fontSize: 12.5,
          color: "#475569",
        }}
      >
        Active Domain:{" "}
        <b className="font-semibold" style={{ color: "#2563eb" }}>
          debutmail.comth
        </b>
      </div>

      <button
        aria-label="การแจ้งเตือน"
        className="relative grid h-10 w-10 place-items-center rounded-[9px] text-ink-soft"
        style={{ border: "1px solid #e5e9f0", background: "#fff" }}
      >
        <BellIcon className="h-[18px] w-[18px]" />
        <span
          className="absolute right-2.5 top-2 h-[7px] w-[7px] rounded-full border-2 border-white"
          style={{ background: "#ef4444" }}
        />
      </button>

      <span
        className="grid h-[38px] w-[38px] shrink-0 place-items-center rounded-full text-sm font-bold text-white"
        style={{ background: "linear-gradient(135deg,#3b82f6,#6366f1)" }}
      >
        U
      </span>
    </header>
  );
}
