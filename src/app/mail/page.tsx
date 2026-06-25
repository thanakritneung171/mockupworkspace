"use client";

import { useState } from "react";
import { Toggle, WarningBanner, SettingCard, UseBar } from "@/components/ui";
import {
  MailIcon, CalendarIcon, ContactIcon, PlusIcon, SearchIcon, SortIcon,
} from "@/components/icons";

const accounts = [
  { email:"test333@debutmail.comth",       created:"19/05/2026", lastLogin:"—",           quota:10000, used:280,  percent:3 },
  { email:"7S070032@debutmail.comth",      created:"19/05/2026", lastLogin:"—",           quota:3000,  used:60,   percent:2 },
  { email:"koschakon@debutmail.comth",     created:"19/05/2026", lastLogin:"20/06/2026",  quota:10,    used:0.6,  percent:6 },
  { email:"koschakon.n@debutmail.comth",   created:"19/05/2026", lastLogin:"21/06/2026",  quota:5000,  used:200,  percent:4 },
];

export default function MailSettingsPage() {
  const [mailEnabled,     setMailEnabled]     = useState(true);
  const [calendarEnabled, setCalendarEnabled] = useState(true);
  const [contactEnabled,  setContactEnabled]  = useState(true);

  const [search,  setSearch]  = useState("");
  const [status,  setStatus]  = useState("all");
  const [pkg,     setPkg]     = useState("all");

  const filtered = accounts.filter(a => {
    if (search && !a.email.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-[14px]" style={{ background: "#fde7e7" }}>
            <MailIcon className="h-[24px] w-[24px]" style={{ color: "#d8484a" }} />
          </span>
          <div>
            <h1 className="text-[28px] font-extrabold text-ink">Mail / Calendar / Contact</h1>
            <p className="text-[13.5px] text-ink-soft">จัดการบัญชีอีเมล ปฏิทิน และสมุดรายชื่อ</p>
          </div>
        </div>
        <button
          className="inline-flex items-center gap-2 rounded-[11px] px-4 py-2.5 text-[13.5px] font-semibold text-white"
          style={{ background: "#2563eb", boxShadow: "0 4px 14px rgba(37,99,235,.35)" }}
        >
          <PlusIcon className="h-4 w-4" /> Add Account
        </button>
      </div>

      <div className="flex flex-col gap-5">
        {/* Component Access Control */}
        <SettingCard icon={MailIcon} iconBg="#fde7e7" iconColor="#d8484a" title="Component Access Control">
          <div className="mb-4">
            <WarningBanner>
              การปิดใช้งาน Component จะส่งผลกับผู้ใช้ทุกคน — แนะนำให้ตรวจสอบสิทธิ์รายบุคคลใน Users ก่อนปิด
            </WarningBanner>
          </div>
          <div className="flex flex-col gap-0" style={{ borderTop: "1px solid #f1f5f9" }}>
            {[
              { key:"mail",     label:"Mail",     desc:"บริการอีเมลองค์กร",            icon:MailIcon,     bg:"#fde7e7", color:"#d8484a", on:mailEnabled,     set:setMailEnabled },
              { key:"calendar", label:"Calendar", desc:"ปฏิทินและการนัดหมาย",          icon:CalendarIcon, bg:"#e8f0ff", color:"#2563eb", on:calendarEnabled, set:setCalendarEnabled },
              { key:"contact",  label:"Contact",  desc:"สมุดรายชื่อและผู้ติดต่อ",     icon:ContactIcon,  bg:"#e8f8f0", color:"#059669", on:contactEnabled,  set:setContactEnabled },
            ].map(row => {
              const Icon = row.icon;
              return (
                <div
                  key={row.key}
                  className="flex items-center gap-4 py-4"
                  style={{ borderBottom: "1px solid #f1f5f9" }}
                >
                  <span
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-xl"
                    style={{ background: row.bg }}
                  >
                    <Icon className="h-[20px] w-[20px]" style={{ color: row.color }} />
                  </span>
                  <div className="flex-1">
                    <div className="text-[14px] font-semibold text-ink">{row.label}</div>
                    <div className="text-[12.5px] text-ink-soft">{row.desc}</div>
                  </div>
                  <Toggle on={row.on} onChange={() => row.set((v: boolean) => !v)} />
                </div>
              );
            })}
          </div>
        </SettingCard>

        {/* Account List */}
        <div className="card">
          {/* filter bar */}
          <div className="flex flex-wrap gap-3 p-5" style={{ borderBottom: "1px solid #f1f5f9" }}>
            <label className="flex min-w-[180px] flex-1 items-center gap-2 rounded-[10px] px-3.5 py-2.5"
              style={{ border: "1px solid #e5e9f0", background: "#f8fafc" }}>
              <SearchIcon className="h-4 w-4 shrink-0 text-ink-faint" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="ค้นหาตามอีเมล..."
                className="w-full bg-transparent text-[13.5px] text-ink-soft outline-none placeholder:text-ink-faint"
              />
            </label>
            <select
              value={status}
              onChange={e => setStatus(e.target.value)}
              className="rounded-[10px] px-3.5 py-2.5 text-[13.5px] text-ink-soft outline-none"
              style={{ border: "1px solid #e5e9f0", background: "#f8fafc" }}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
            </select>
            <select
              value={pkg}
              onChange={e => setPkg(e.target.value)}
              className="rounded-[10px] px-3.5 py-2.5 text-[13.5px] text-ink-soft outline-none"
              style={{ border: "1px solid #e5e9f0", background: "#f8fafc" }}
            >
              <option value="all">All Package</option>
              <option value="email100">Email 100 accounts</option>
            </select>
          </div>

          {/* table header */}
          <div className="flex items-center justify-between px-5 py-4">
            <h2 className="text-[15px] font-bold text-ink">
              Account List{" "}
              <span className="font-semibold text-ink-faint">({filtered.length})</span>
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>
                    <span className="inline-flex items-center gap-1.5">
                      Email Address <SortIcon className="h-3 w-3 opacity-45" />
                    </span>
                  </th>
                  <th>Created</th>
                  <th>Last Login</th>
                  <th>Mailbox Usage</th>
                  <th>Package</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((a) => (
                  <tr key={a.email}>
                    <td>
                      <b className="block font-semibold">{a.email}</b>
                      <span className="text-xs text-ink-faint">debutmail.comth</span>
                    </td>
                    <td className="text-ink-soft">{a.created}</td>
                    <td className="text-ink-soft">{a.lastLogin}</td>
                    <td className="min-w-[160px] text-ink-soft">
                      {a.used} / {a.quota.toLocaleString()} MB
                      <UseBar percent={a.percent} />
                    </td>
                    <td className="text-ink-soft">Email 100 accounts</td>
                    <td>
                      <span
                        className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[11.5px] font-semibold"
                        style={{ background: "#dcfce7", color: "#16a34a" }}
                      >
                        Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div
            className="flex items-center justify-between px-5 py-3.5 text-[12.5px] text-ink-soft"
            style={{ borderTop: "1px solid #f1f5f9" }}
          >
            <span>Rows per page: 10</span>
            <span>1–{filtered.length} of {filtered.length}</span>
          </div>
        </div>
      </div>
    </>
  );
}
