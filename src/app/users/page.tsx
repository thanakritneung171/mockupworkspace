"use client";

import { useState, useMemo } from "react";
import { Toggle } from "@/components/ui";
import {
  UsersIcon, AiIcon, ChatIcon, MailIcon, CalendarIcon, ContactIcon,
  FilesIcon, MeetingIcon, SearchIcon, PlusIcon, XIcon, CheckIcon,
} from "@/components/icons";
import type { ComponentType, SVGProps } from "react";

/* ── types ── */
type Perms = { ai: 0|1; chat: 0|1; mail: 0|1; calendar: 0|1; contact: 0|1; files: 0|1; meeting: 0|1 };
type User  = { id: number; name: string; email: string; initials: string; grad: string; role: "admin"|"member"; status: "active"|"inactive"; perms: Perms };

const COMPONENTS: { key: keyof Perms; name: string; desc: string; icon: ComponentType<SVGProps<SVGSVGElement>> }[] = [
  { key: "ai",       name: "AI",       desc: "ผู้ช่วย AI และระบบอัตโนมัติ",  icon: AiIcon },
  { key: "chat",     name: "Chat",     desc: "ข้อความและช่องสนทนาของทีม",    icon: ChatIcon },
  { key: "mail",     name: "Mail",     desc: "อีเมลองค์กร",                   icon: MailIcon },
  { key: "calendar", name: "Calendar", desc: "ปฏิทินและนัดหมาย",             icon: CalendarIcon },
  { key: "contact",  name: "Contact",  desc: "สมุดรายชื่อองค์กร",            icon: ContactIcon },
  { key: "files",    name: "Files",    desc: "พื้นที่จัดเก็บไฟล์",           icon: FilesIcon },
  { key: "meeting",  name: "Meeting",  desc: "ห้องประชุมและวิดีโอคอล",       icon: MeetingIcon },
];

/* ── seed data ── */
const SEED: User[] = [
  { id:1, name:"Koschakon N.",  email:"koschakon.n@debutmail.comth",   initials:"KN", grad:"#3b82f6,#6366f1", role:"admin",  status:"active",   perms:{ai:1,chat:1,mail:1,calendar:1,contact:1,files:1,meeting:1} },
  { id:2, name:"Useradmin4",    email:"useradmin4@debutmail.comth",    initials:"U4", grad:"#6366f1,#a855f7", role:"admin",  status:"active",   perms:{ai:1,chat:1,mail:1,calendar:1,contact:0,files:1,meeting:1} },
  { id:3, name:"Dev01",         email:"dev01@server02.com",            initials:"D1", grad:"#0ea5e9,#22d3ee", role:"member", status:"active",   perms:{ai:0,chat:1,mail:1,calendar:1,contact:0,files:1,meeting:1} },
  { id:4, name:"Kanogwan",      email:"kanogwan@icedebutmail.com",     initials:"KW", grad:"#8b5cf6,#ec4899", role:"member", status:"active",   perms:{ai:1,chat:1,mail:1,calendar:0,contact:0,files:0,meeting:1} },
  { id:5, name:"Useradmin2",    email:"useradmin2@debutmail.comth",    initials:"U2", grad:"#0f172a,#475569", role:"admin",  status:"inactive", perms:{ai:1,chat:0,mail:1,calendar:1,contact:1,files:1,meeting:0} },
  { id:6, name:"Thanakit C.",   email:"thanakit.c@debutmail.comth",    initials:"TC", grad:"#10b981,#22c55e", role:"member", status:"active",   perms:{ai:0,chat:1,mail:1,calendar:1,contact:1,files:1,meeting:1} },
  { id:7, name:"Pitchaya S.",   email:"pitchaya.s@debutmail.comth",    initials:"PS", grad:"#f59e0b,#ef4444", role:"member", status:"active",   perms:{ai:1,chat:1,mail:0,calendar:0,contact:0,files:1,meeting:0} },
  { id:8, name:"Saowalak K.",   email:"saowalak.k@debutmail.comth",    initials:"SK", grad:"#ef4444,#f97316", role:"member", status:"inactive", perms:{ai:0,chat:0,mail:1,calendar:1,contact:1,files:0,meeting:0} },
];

/* ── avatar ── */
function Avatar({ grad, initials, size = 38 }: { grad: string; initials: string; size?: number }) {
  const [from, to] = grad.split(",");
  return (
    <span
      className="inline-grid shrink-0 place-items-center rounded-full text-white font-bold"
      style={{
        width: size, height: size,
        background: `linear-gradient(135deg,${from},${to})`,
        fontSize: size * 0.34,
      }}
    >
      {initials}
    </span>
  );
}

/* ── role / status chips ── */
function RoleChip({ role }: { role: string }) {
  const isAdmin = role === "admin";
  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[11.5px] font-semibold"
      style={isAdmin
        ? { background: "#eef2ff", color: "#4f46e5" }
        : { background: "#f1f5f9", color: "#475569" }}
    >
      {role === "admin" ? "Admin" : "Member"}
    </span>
  );
}
function StatusChip({ status }: { status: string }) {
  const isActive = status === "active";
  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[11.5px] font-semibold"
      style={isActive
        ? { background: "#dcfce7", color: "#16a34a" }
        : { background: "#f1f5f9", color: "#94a3b8" }}
    >
      {isActive ? "Active" : "Inactive"}
    </span>
  );
}

/* ── permission dot ── */
function PermDot({ on, label }: { on: boolean; label: string }) {
  return (
    <span
      title={label}
      className="inline-block rounded-[5px]"
      style={{
        width: 15, height: 15,
        background: on ? "#22c55e" : "#e7ebf1",
        flexShrink: 0,
      }}
    />
  );
}

/* ── drawer ── */
function PermDrawer({ user, onClose, onUpdate }: { user: User; onClose: () => void; onUpdate: (u: User) => void }) {
  const onCount = Object.values(user.perms).filter(Boolean).length;

  function toggle(key: keyof Perms) {
    onUpdate({ ...user, perms: { ...user.perms, [key]: user.perms[key] ? 0 : 1 } });
  }
  function setAll(val: 0|1) {
    const p = {} as Perms;
    COMPONENTS.forEach(c => { p[c.key] = val; });
    onUpdate({ ...user, perms: p });
  }

  return (
    <>
      {/* scrim */}
      <div
        className="fixed inset-0 z-40"
        style={{ background: "rgba(15,23,42,.4)" }}
        onClick={onClose}
      />
      {/* panel */}
      <div
        className="fixed right-0 top-0 z-50 flex h-full flex-col bg-white"
        style={{
          width: "min(432px, 92vw)",
          boxShadow: "-14px 0 44px rgba(15,23,42,.18)",
        }}
      >
        {/* header */}
        <div className="flex items-start justify-between p-6" style={{ borderBottom: "1px solid #f1f5f9" }}>
          <div className="flex items-center gap-3">
            <Avatar grad={user.grad} initials={user.initials} size={46} />
            <div>
              <div className="text-[16px] font-bold text-ink">{user.name}</div>
              <div className="text-[12px] text-ink-faint">{user.email}</div>
              <div className="mt-2 flex gap-2">
                <RoleChip role={user.role} />
                <StatusChip status={user.status} />
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="grid h-[34px] w-[34px] shrink-0 place-items-center rounded-[9px]"
            style={{ background: "#f1f5f9" }}
          >
            <XIcon className="h-4 w-4 text-ink-soft" />
          </button>
        </div>

        {/* preset bar */}
        <div
          className="flex items-center justify-between px-6 py-3"
          style={{ background: "#f8fafc", borderBottom: "1px solid #f1f5f9" }}
        >
          <span className="text-[13px] font-semibold text-ink">
            {onCount}/7 Component เปิดอยู่
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setAll(1)}
              className="rounded-[8px] px-3 py-1.5 text-[12px] font-semibold"
              style={{ border: "1px solid #bbf7d0", background: "#f0fdf4", color: "#16a34a" }}
            >
              เปิดทั้งหมด
            </button>
            <button
              onClick={() => setAll(0)}
              className="rounded-[8px] px-3 py-1.5 text-[12px] font-semibold"
              style={{ border: "1px solid #e9edf4", background: "#fff", color: "#64748b" }}
            >
              ปิดทั้งหมด
            </button>
          </div>
        </div>

        {/* component rows */}
        <div className="flex-1 overflow-y-auto">
          {COMPONENTS.map((c) => {
            const isOn = !!user.perms[c.key];
            const Icon = c.icon;
            return (
              <div
                key={c.key}
                className="flex items-center gap-4 px-6 py-4"
                style={{ borderBottom: "1px solid #f1f5f9" }}
              >
                <span
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-xl"
                  style={isOn
                    ? { background: "#eff6ff", border: "1.5px solid #2563eb", color: "#2563eb" }
                    : { background: "#f4f6f9", border: "1.5px solid #94a3b8", color: "#94a3b8" }}
                >
                  <Icon className="h-[19px] w-[19px]" />
                </span>
                <div className="flex-1">
                  <div className="text-[14.5px] font-semibold text-ink">{c.name}</div>
                  <div className="text-[12px] text-ink-faint">{c.desc}</div>
                </div>
                <Toggle on={isOn} onChange={() => toggle(c.key)} />
              </div>
            );
          })}
        </div>

        {/* footer */}
        <div
          className="flex items-center gap-2 px-6 py-4"
          style={{ borderTop: "1px solid #f1f5f9", background: "#fafcff" }}
        >
          <CheckIcon className="h-4 w-4 text-ok" />
          <span className="text-[12.5px] text-ink-soft">การเปลี่ยนแปลงถูกบันทึกอัตโนมัติ</span>
        </div>
      </div>
    </>
  );
}

/* ── main page ── */
export default function UsersPage() {
  const [users, setUsers]         = useState<User[]>(SEED);
  const [uQ, setUQ]               = useState("");
  const [uRole, setURole]         = useState("all");
  const [uStatus, setUStatus]     = useState("all");
  const [drawerId, setDrawerId]   = useState<number|null>(null);

  const filtered = useMemo(() => users.filter(u => {
    const q = uQ.toLowerCase();
    if (q && !u.name.toLowerCase().includes(q) && !u.email.toLowerCase().includes(q)) return false;
    if (uRole !== "all" && u.role !== uRole) return false;
    if (uStatus !== "all" && u.status !== uStatus) return false;
    return true;
  }), [users, uQ, uRole, uStatus]);

  const drawerUser = users.find(u => u.id === drawerId) ?? null;

  const total    = users.length;
  const active   = users.filter(u => u.status === "active").length;
  const inactive = users.filter(u => u.status === "inactive").length;
  const admins   = users.filter(u => u.role === "admin").length;

  function updateUser(updated: User) {
    setUsers(prev => prev.map(u => u.id === updated.id ? updated : u));
  }

  return (
    <>
      {/* page header */}
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div className="flex items-center gap-3">
          <span
            className="grid h-12 w-12 place-items-center rounded-[14px]"
            style={{ background: "#eaf1ff" }}
          >
            <UsersIcon className="h-[24px] w-[24px]" style={{ color: "#2563eb" }} />
          </span>
          <div>
            <h1 className="text-[28px] font-extrabold leading-tight text-ink">Users</h1>
            <p className="mt-0.5 text-[13.5px] text-ink-soft">จัดการผู้ใช้และสิทธิ์การเข้าถึงแอปพลิเคชัน</p>
          </div>
        </div>
        <button
          className="inline-flex items-center gap-2 rounded-[11px] px-4 py-2.5 text-[13.5px] font-semibold text-white"
          style={{
            background: "#2563eb",
            boxShadow: "0 4px 14px rgba(37,99,235,.35)",
          }}
        >
          <PlusIcon className="h-4 w-4" /> เพิ่มผู้ใช้
        </button>
      </div>

      {/* stat cards */}
      <div className="mb-5 grid gap-[14px] sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: UsersIcon, bg: "#e8f0ff", color: "#2563eb", label: "Total Users",    value: total },
          { icon: UsersIcon, bg: "#e7f7ee", color: "#16a34a", label: "Active Users",   value: active },
          { icon: UsersIcon, bg: "#f1f5f9", color: "#64748b", label: "Inactive Users", value: inactive },
          { icon: UsersIcon, bg: "#efeafe", color: "#7c5cf0", label: "Admins",          value: admins },
        ].map((s) => (
          <div
            key={s.label}
            className="card flex items-center gap-3 px-5 py-[18px]"
          >
            <span
              className="grid h-12 w-12 shrink-0 place-items-center rounded-xl"
              style={{ background: s.bg }}
            >
              <s.icon className="h-[22px] w-[22px]" style={{ color: s.color }} />
            </span>
            <div>
              <div className="text-[12.5px] font-medium text-ink-soft">{s.label}</div>
              <div className="text-[24px] font-extrabold text-ink">{s.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* filter bar */}
      <div className="card mb-4 flex flex-wrap gap-3 p-4">
        <label className="flex min-w-[200px] flex-1 items-center gap-2 rounded-[10px] px-3.5 py-2.5"
          style={{ border: "1px solid #e5e9f0", background: "#f8fafc" }}>
          <SearchIcon className="h-4 w-4 shrink-0 text-ink-faint" />
          <input
            value={uQ}
            onChange={e => setUQ(e.target.value)}
            placeholder="ค้นหาชื่อหรืออีเมล..."
            className="w-full bg-transparent text-[13.5px] text-ink-soft outline-none placeholder:text-ink-faint"
          />
        </label>
        <select
          value={uRole}
          onChange={e => setURole(e.target.value)}
          className="rounded-[10px] px-3.5 py-2.5 text-[13.5px] text-ink-soft outline-none"
          style={{ border: "1px solid #e5e9f0", background: "#f8fafc" }}
        >
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="member">Member</option>
        </select>
        <select
          value={uStatus}
          onChange={e => setUStatus(e.target.value)}
          className="rounded-[10px] px-3.5 py-2.5 text-[13.5px] text-ink-soft outline-none"
          style={{ border: "1px solid #e5e9f0", background: "#f8fafc" }}
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* user permissions list */}
      <div className="card overflow-hidden">
        {/* list header */}
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ borderBottom: "1px solid #f1f5f9" }}
        >
          <span className="text-[15px] font-bold text-ink">
            User Permissions{" "}
            <span className="font-semibold text-ink-faint">({filtered.length})</span>
          </span>
          {/* legend */}
          <div className="flex items-center gap-4 text-[12px] text-ink-soft">
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-3 w-3 rounded-[3px]" style={{ background: "#22c55e" }} />
              เปิด
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-3 w-3 rounded-[3px]" style={{ background: "#e7ebf1" }} />
              ปิด
            </span>
          </div>
        </div>

        {/* rows */}
        {filtered.map((u) => {
          const onCount = Object.values(u.perms).filter(Boolean).length;
          return (
            <div
              key={u.id}
              onClick={() => setDrawerId(u.id)}
              className="flex cursor-pointer items-center gap-4 px-6 py-[14px] transition-colors"
              style={{ borderBottom: "1px solid #f1f5f9" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#f8fafc")}
              onMouseLeave={e => (e.currentTarget.style.background = "")}
            >
              {/* avatar + name */}
              <Avatar grad={u.grad} initials={u.initials} size={38} />
              <div className="w-[200px] shrink-0">
                <div className="text-[14px] font-semibold text-ink">{u.name}</div>
                <div className="text-[12px] text-ink-faint">{u.email}</div>
              </div>

              {/* role + status */}
              <div className="w-[160px] shrink-0 flex flex-col gap-1">
                <RoleChip role={u.role} />
                <StatusChip status={u.status} />
              </div>

              {/* dots */}
              <div className="flex flex-1 items-center gap-1.5">
                {COMPONENTS.map(c => (
                  <PermDot
                    key={c.key}
                    on={!!u.perms[c.key]}
                    label={`${c.name} · ${u.perms[c.key] ? "เปิด" : "ปิด"}`}
                  />
                ))}
              </div>

              {/* count + chevron */}
              <span className="text-[13px] font-bold text-ink">{onCount}/7</span>
              <span className="text-[18px] font-light text-ink-faint">›</span>
            </div>
          );
        })}

        {/* footer */}
        <div
          className="flex flex-wrap items-center justify-between gap-2 px-6 py-3.5 text-[12.5px] text-ink-soft"
          style={{ borderTop: "1px solid #f1f5f9" }}
        >
          <span>แสดง {filtered.length} จากทั้งหมด {total} ผู้ใช้</span>
          <span style={{ color: "#94a3b8" }}>การเปลี่ยนแปลงจะถูกบันทึกอัตโนมัติ</span>
        </div>
      </div>

      {/* permission drawer */}
      {drawerUser && (
        <PermDrawer
          user={drawerUser}
          onClose={() => setDrawerId(null)}
          onUpdate={updateUser}
        />
      )}
    </>
  );
}
