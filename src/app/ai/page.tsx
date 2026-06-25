"use client";

import { useState } from "react";
import { Toggle, SettingRow, WarningBanner, InfoBanner, SettingCard } from "@/components/ui";
import {
  AiIcon, UsersIcon, PlusIcon, EditIcon, TrashIcon, XIcon, SearchIcon,
} from "@/components/icons";

type Group = { id: number; name: string; members: number[]; limit: number; unlimited: boolean };

const SEED_USERS = [
  { id:1, name:"Koschakon N.",  initials:"KN", grad:"#3b82f6,#6366f1" },
  { id:2, name:"Useradmin4",    initials:"U4", grad:"#6366f1,#a855f7" },
  { id:3, name:"Dev01",         initials:"D1", grad:"#0ea5e9,#22d3ee" },
  { id:4, name:"Kanogwan",      initials:"KW", grad:"#8b5cf6,#ec4899" },
  { id:5, name:"Useradmin2",    initials:"U2", grad:"#0f172a,#475569" },
  { id:6, name:"Thanakit C.",   initials:"TC", grad:"#10b981,#22c55e" },
];

function Avatar({ grad, initials, size = 28 }: { grad: string; initials: string; size?: number }) {
  const [from, to] = grad.split(",");
  return (
    <span
      className="inline-grid shrink-0 place-items-center rounded-full text-white font-bold"
      style={{ width: size, height: size, background: `linear-gradient(135deg,${from},${to})`, fontSize: size * 0.35 }}
    >
      {initials}
    </span>
  );
}

function GroupModal({
  group,
  onSave,
  onClose,
}: {
  group: Group | null;
  onSave: (g: Group) => void;
  onClose: () => void;
}) {
  const isNew = !group;
  const [name, setName]         = useState(group?.name ?? "");
  const [limit, setLimit]       = useState(group?.limit ?? 10000);
  const [unlimited, setUnlimited] = useState(group?.unlimited ?? true);
  const [members, setMembers]   = useState<number[]>(group?.members ?? []);
  const [search, setSearch]     = useState("");

  const filtered = SEED_USERS.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  function toggleMember(id: number) {
    setMembers(prev => prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]);
  }

  function handleSave() {
    if (!name.trim()) return;
    onSave({
      id: group?.id ?? Date.now(),
      name: name.trim(),
      members,
      limit,
      unlimited,
    });
  }

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: "rgba(15,23,42,.5)" }}
        onClick={onClose}
      />
      <div
        className="fixed left-1/2 top-1/2 z-[60] flex w-full max-w-[520px] -translate-x-1/2 -translate-y-1/2 flex-col rounded-2xl bg-white"
        style={{ boxShadow: "0 20px 60px rgba(15,23,42,.2)" }}
      >
        <div className="flex items-center justify-between p-6" style={{ borderBottom: "1px solid #f1f5f9" }}>
          <h2 className="text-[16px] font-bold text-ink">{isNew ? "New Group" : "Edit Group"}</h2>
          <button onClick={onClose} className="grid h-8 w-8 place-items-center rounded-lg"
            style={{ background: "#f1f5f9" }}>
            <XIcon className="h-4 w-4 text-ink-soft" />
          </button>
        </div>

        <div className="flex flex-col gap-5 overflow-y-auto p-6">
          {/* group name */}
          <div>
            <label className="mb-1.5 block text-[13px] font-semibold text-ink">
              Group Name <span className="text-red-500">*</span>
            </label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Engineering Team"
              className="w-full rounded-[10px] px-3.5 py-2.5 text-[13.5px] text-ink outline-none"
              style={{ border: "1.5px solid #e5e9f0" }}
            />
          </div>

          {/* credit limit */}
          <div>
            <label className="mb-1.5 block text-[13px] font-semibold text-ink">Credit Limit</label>
            <div className="mb-2 flex items-center gap-3">
              <Toggle on={unlimited} onChange={() => setUnlimited(v => !v)} />
              <span className="text-[13px] text-ink-soft">Unlimited</span>
            </div>
            {!unlimited && (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={limit}
                  onChange={e => setLimit(Number(e.target.value))}
                  className="w-40 rounded-[10px] px-3.5 py-2.5 text-[13.5px] text-ink outline-none"
                  style={{ border: "1.5px solid #e5e9f0" }}
                />
                <span className="text-[13px] text-ink-soft">credits / วัน</span>
              </div>
            )}
          </div>

          {/* members */}
          <div>
            <label className="mb-2 block text-[13px] font-semibold text-ink">
              Members{" "}
              <span className="font-normal text-ink-faint">({members.length} selected)</span>
            </label>
            <label className="mb-3 flex items-center gap-2 rounded-[10px] px-3 py-2.5"
              style={{ border: "1px solid #e5e9f0" }}>
              <SearchIcon className="h-4 w-4 shrink-0 text-ink-faint" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="ค้นหาผู้ใช้..."
                className="w-full bg-transparent text-[13px] outline-none placeholder:text-ink-faint"
              />
            </label>
            <div className="flex max-h-[200px] flex-col gap-1 overflow-y-auto rounded-[10px]"
              style={{ border: "1px solid #e5e9f0" }}>
              {filtered.map(u => {
                const checked = members.includes(u.id);
                return (
                  <label key={u.id}
                    className="flex cursor-pointer items-center gap-3 px-3.5 py-2.5 transition-colors"
                    style={{ background: checked ? "#f0fdf4" : "transparent" }}
                    onMouseEnter={e => !checked && (e.currentTarget.style.background = "#f8fafc")}
                    onMouseLeave={e => !checked && (e.currentTarget.style.background = "transparent")}
                  >
                    <input type="checkbox" checked={checked} onChange={() => toggleMember(u.id)}
                      className="h-4 w-4 accent-accent rounded" />
                    <Avatar grad={u.grad} initials={u.initials} />
                    <span className="text-[13.5px] text-ink">{u.name}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 px-6 py-4" style={{ borderTop: "1px solid #f1f5f9" }}>
          <button onClick={onClose}
            className="rounded-[10px] px-4 py-2.5 text-[13.5px] font-semibold text-ink-soft"
            style={{ border: "1px solid #e5e9f0" }}>
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!name.trim()}
            className="rounded-[10px] px-4 py-2.5 text-[13.5px] font-semibold text-white"
            style={{ background: "#2563eb", opacity: name.trim() ? 1 : 0.5 }}
          >
            Save Group
          </button>
        </div>
      </div>
    </>
  );
}

export default function AISettingsPage() {
  const [aiEnabled,      setAiEnabled]      = useState(true);
  const [limitEnabled,   setLimitEnabled]   = useState(false);
  const [creditLimit,    setCreditLimit]     = useState(10000);
  const [groups,         setGroups]         = useState<Group[]>([
    { id:1, name:"Engineering",    members:[1,3,6], limit:50000, unlimited:false },
    { id:2, name:"Management",     members:[2,5],   limit:0,     unlimited:true  },
  ]);
  const [modal,          setModal]          = useState<"new"|number|null>(null);

  const editGroup = typeof modal === "number" ? groups.find(g => g.id === modal) ?? null : null;

  function saveGroup(g: Group) {
    setGroups(prev => {
      const idx = prev.findIndex(x => x.id === g.id);
      return idx >= 0 ? prev.map(x => x.id === g.id ? g : x) : [...prev, g];
    });
    setModal(null);
  }

  function deleteGroup(id: number) {
    setGroups(prev => prev.filter(g => g.id !== id));
  }

  return (
    <>
      <div className="mb-6 flex items-center gap-3">
        <span className="grid h-12 w-12 place-items-center rounded-[14px]" style={{ background: "#eef2ff" }}>
          <AiIcon className="h-[24px] w-[24px]" style={{ color: "#4f46e5" }} />
        </span>
        <div>
          <h1 className="text-[28px] font-extrabold text-ink">AI Settings</h1>
          <p className="text-[13.5px] text-ink-soft">ตั้งค่าและควบคุมฟีเจอร์ AI สำหรับ workspace</p>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        {/* Global AI Control */}
        <SettingCard icon={AiIcon} iconBg="#eef2ff" iconColor="#4f46e5" title="Global AI Control">
          <SettingRow
            title="Enable AI Features"
            desc="เปิด/ปิดการใช้งาน AI ทั้งหมดใน workspace"
            on={aiEnabled}
            onChange={() => setAiEnabled(v => !v)}
          />
          {!aiEnabled && (
            <div className="mt-3">
              <WarningBanner>
                ฟีเจอร์ AI ถูกปิดอยู่ — ผู้ใช้ทุกคนไม่สามารถเข้าถึง Smart Reply, Meeting Summary และระบบ AI อื่น ๆ ได้
              </WarningBanner>
            </div>
          )}
        </SettingCard>

        {/* Credit Limit */}
        <SettingCard icon={UsersIcon} iconBg="#e8f0ff" iconColor="#2563eb" title="Credit Limit per User">
          <SettingRow
            title="Limit Credit per User / Day"
            desc="จำกัดจำนวน Credit ที่ผู้ใช้แต่ละคนสามารถใช้ต่อวัน"
            on={limitEnabled}
            onChange={() => setLimitEnabled(v => !v)}
          >
            <div className="rounded-[12px] p-4" style={{ background: "#f8fafc", border: "1px solid #e5e9f0" }}>
              <div className="mb-3 flex items-center gap-3">
                <input
                  type="number"
                  value={creditLimit}
                  onChange={e => setCreditLimit(Number(e.target.value))}
                  className="w-36 rounded-[10px] px-3.5 py-2.5 text-[15px] font-semibold text-ink outline-none"
                  style={{ border: "1.5px solid #e5e9f0", background: "#fff" }}
                />
                <span className="text-[13.5px] text-ink-soft">credits / วัน</span>
              </div>
              <p className="mb-3 text-[12.5px] text-ink-faint">
                ค่าเริ่มต้น 10,000 credits ต่อวัน — หากไม่ตั้งค่า ระบบจะไม่จำกัดการใช้งาน
              </p>
              <button
                className="rounded-[9px] px-4 py-2 text-[13px] font-semibold"
                style={{ border: "1.5px solid #2563eb", color: "#2563eb", background: "#fff" }}
              >
                Apply Default to All Users
              </button>
            </div>
          </SettingRow>
        </SettingCard>

        {/* Group Credit Limits */}
        <SettingCard
          icon={AiIcon}
          iconBg="#eef2ff"
          iconColor="#4f46e5"
          title="Group Credit Limits"
          action={
            <button
              onClick={() => setModal("new")}
              className="inline-flex items-center gap-2 rounded-[10px] px-3.5 py-2 text-[13px] font-semibold text-white"
              style={{ background: "#2563eb" }}
            >
              <PlusIcon className="h-3.5 w-3.5" /> New Group
            </button>
          }
        >
          <div className="mb-4">
            <InfoBanner>
              เมื่อผู้ใช้อยู่ในหลาย Group ระบบจะใช้ Limit ที่สูงที่สุด
            </InfoBanner>
          </div>
          <div className="flex flex-col gap-3">
            {groups.map(g => (
              <div
                key={g.id}
                className="flex items-center gap-4 rounded-[12px] px-5 py-4"
                style={{ border: "1px solid #e5e9f0", background: "#fafcff" }}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[14.5px] font-semibold text-ink">{g.name}</span>
                    <span
                      className="rounded-full px-2.5 py-0.5 text-[11.5px] font-semibold"
                      style={{ background: "#e8f0ff", color: "#2563eb" }}
                    >
                      {g.members.length} members
                    </span>
                  </div>
                  <div className="mt-1 text-[12.5px] text-ink-soft">
                    Limit: {g.unlimited ? "Unlimited" : `${g.limit.toLocaleString()} credits / วัน`}
                  </div>
                  <div className="mt-2 flex gap-1.5">
                    {g.members.map(mid => {
                      const u = SEED_USERS.find(x => x.id === mid);
                      if (!u) return null;
                      return <Avatar key={mid} grad={u.grad} initials={u.initials} size={24} />;
                    })}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setModal(g.id)}
                    className="grid h-8 w-8 place-items-center rounded-lg text-ink-soft"
                    style={{ border: "1px solid #e5e9f0", background: "#fff" }}
                  >
                    <EditIcon className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => deleteGroup(g.id)}
                    className="grid h-8 w-8 place-items-center rounded-lg"
                    style={{ border: "1px solid #fde7e7", background: "#fff", color: "#d8484a" }}
                  >
                    <TrashIcon className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
            {groups.length === 0 && (
              <div className="py-8 text-center text-[13.5px] text-ink-faint">
                ยังไม่มี Group — กด New Group เพื่อสร้าง
              </div>
            )}
          </div>
        </SettingCard>
      </div>

      {/* modal */}
      {modal !== null && (
        <GroupModal
          group={modal === "new" ? null : editGroup}
          onSave={saveGroup}
          onClose={() => setModal(null)}
        />
      )}
    </>
  );
}
