"use client";

import { SearchIcon, BellIcon, MenuIcon } from "@/components/icons";

export default function Topbar({ onMenu }: { onMenu: () => void }) {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-line bg-white px-5 sm:px-7">
      <button
        onClick={onMenu}
        aria-label="เปิดเมนู"
        className="grid h-[38px] w-[38px] place-items-center rounded-[9px] border border-line text-ink-soft md:hidden"
      >
        <MenuIcon className="h-[18px] w-[18px]" />
      </button>

      <div className="hidden max-w-[420px] flex-1 items-center gap-2 rounded-[10px] border border-line bg-ground px-3.5 py-2.5 text-[13.5px] text-ink-faint sm:flex">
        <SearchIcon className="h-4 w-4" />
        ค้นหาผู้ใช้, อีเมล, ไฟล์...
      </div>

      <div className="flex-1" />

      <div className="hidden items-center gap-2 rounded-[10px] border border-[#d6e4fd] bg-accent-soft px-3.5 py-[7px] text-[13px] text-ink-soft sm:flex">
        Active Domain: <b className="font-semibold text-accent">debutmail.comth</b>
      </div>

      <button
        aria-label="การแจ้งเตือน"
        className="relative grid h-[38px] w-[38px] place-items-center rounded-[9px] border border-line text-ink-soft"
      >
        <BellIcon className="h-[18px] w-[18px]" />
        <span className="absolute right-[9px] top-2 h-[7px] w-[7px] rounded-full border-2 border-white bg-c-coral" />
      </button>

      <span className="grid h-[38px] w-[38px] place-items-center rounded-full bg-gradient-to-br from-accent to-[#7a5cf0] text-sm font-bold text-white">
        U
      </span>
    </header>
  );
}
