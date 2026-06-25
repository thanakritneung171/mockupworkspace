"use client";

import { useState } from "react";
import { SettingRow, WarningBanner, SettingCard } from "@/components/ui";
import { ChatIcon, SendIcon, FilesIcon } from "@/components/icons";

function NumberInput({ value, onChange, unit, min = 0 }: {
  value: number; onChange: (v: number) => void; unit?: string; min?: number;
}) {
  return (
    <div className="mt-2 flex items-center gap-2">
      <input
        type="number"
        value={value}
        min={min}
        onChange={e => onChange(Number(e.target.value))}
        className="w-32 rounded-[10px] px-3.5 py-2.5 text-[14px] font-semibold text-ink outline-none"
        style={{ border: "1.5px solid #e5e9f0", background: "#fff" }}
      />
      {unit && <span className="text-[13px] text-ink-soft">{unit}</span>}
    </div>
  );
}

export default function ChatSettingsPage() {
  const [chatEnabled,          setChatEnabled]          = useState(true);
  const [allowEditing,         setAllowEditing]         = useState(true);
  const [editSeconds,          setEditSeconds]          = useState(300);
  const [allowDeletion,        setAllowDeletion]        = useState(true);
  const [deleteSeconds,        setDeleteSeconds]        = useState(60);
  const [allowPinning,         setAllowPinning]         = useState(true);
  const [allowStarring,        setAllowStarring]        = useState(true);
  const [maxMessageLength,     setMaxMessageLength]     = useState(4000);
  const [allowChannelCreation, setAllowChannelCreation] = useState(true);
  const [allowDMs,             setAllowDMs]             = useState(true);
  const [readReceipts,         setReadReceipts]         = useState(true);
  const [allowUploads,         setAllowUploads]         = useState(true);
  const [maxFileSize,          setMaxFileSize]          = useState(50);
  const [allowedTypes,         setAllowedTypes]         = useState("jpg, jpeg, png, gif, pdf, doc, docx, xls, xlsx, zip");

  return (
    <>
      <div className="mb-6 flex items-center gap-3">
        <span className="grid h-12 w-12 place-items-center rounded-[14px]" style={{ background: "#e8f8f0" }}>
          <ChatIcon className="h-[24px] w-[24px]" style={{ color: "#059669" }} />
        </span>
        <div>
          <h1 className="text-[28px] font-extrabold text-ink">Chat Settings</h1>
          <p className="text-[13.5px] text-ink-soft">ตั้งค่าระบบข้อความและช่องสนทนา</p>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        {/* Global Chat Control */}
        <SettingCard icon={ChatIcon} iconBg="#e8f8f0" iconColor="#059669" title="Global Chat Control">
          <SettingRow
            title="Enable Chat"
            desc="เปิด/ปิดการใช้งานระบบแชตทั้งหมดใน workspace"
            on={chatEnabled}
            onChange={() => setChatEnabled(v => !v)}
          />
          {!chatEnabled && (
            <div className="mt-3">
              <WarningBanner>
                ระบบแชตถูกปิดอยู่ — ผู้ใช้จะไม่สามารถส่งข้อความหรือเข้าถึงช่องสนทนาได้
              </WarningBanner>
            </div>
          )}
        </SettingCard>

        {/* Messaging Settings */}
        <SettingCard icon={SendIcon} iconBg="#e8f0ff" iconColor="#2563eb" title="Messaging Settings">
          <div style={{ borderBottom: "1px solid #f1f5f9" }}>
            <SettingRow
              title="Allow Message Editing"
              desc="อนุญาตให้ผู้ใช้แก้ไขข้อความที่ส่งแล้ว"
              on={allowEditing}
              onChange={() => setAllowEditing(v => !v)}
            >
              <NumberInput value={editSeconds} onChange={setEditSeconds} unit="วินาทีหลังส่ง" min={0} />
            </SettingRow>
          </div>
          <div style={{ borderBottom: "1px solid #f1f5f9" }}>
            <SettingRow
              title="Allow Message Deletion"
              desc="อนุญาตให้ผู้ใช้ลบข้อความที่ส่งแล้ว"
              on={allowDeletion}
              onChange={() => setAllowDeletion(v => !v)}
            >
              <NumberInput value={deleteSeconds} onChange={setDeleteSeconds} unit="วินาทีก่อนล็อก" min={0} />
            </SettingRow>
          </div>
          <div style={{ borderBottom: "1px solid #f1f5f9" }}>
            <SettingRow
              title="Allow Message Pinning"
              desc="อนุญาตให้ปักหมุดข้อความในช่องสนทนา"
              on={allowPinning}
              onChange={() => setAllowPinning(v => !v)}
            />
          </div>
          <div style={{ borderBottom: "1px solid #f1f5f9" }}>
            <SettingRow
              title="Allow Message Starring"
              desc="อนุญาตให้ผู้ใช้ติดดาวข้อความสำคัญ"
              on={allowStarring}
              onChange={() => setAllowStarring(v => !v)}
            />
          </div>
          <div className="flex items-center justify-between py-4">
            <div className="flex-1">
              <div className="text-[14px] font-semibold text-ink">Maximum Message Length</div>
              <div className="mt-0.5 text-[12.5px] text-ink-soft">จำนวนตัวอักษรสูงสุดต่อข้อความ</div>
            </div>
            <input
              type="number"
              value={maxMessageLength}
              onChange={e => setMaxMessageLength(Number(e.target.value))}
              className="w-28 rounded-[10px] px-3.5 py-2.5 text-center text-[14px] font-semibold text-ink outline-none"
              style={{ border: "1.5px solid #e5e9f0" }}
            />
          </div>
        </SettingCard>

        {/* Channel Settings */}
        <SettingCard icon={ChatIcon} iconBg="#efeafe" iconColor="#7c5cf0" title="Channel Settings">
          <div style={{ borderBottom: "1px solid #f1f5f9" }}>
            <SettingRow
              title="Allow Channel Creation"
              desc="อนุญาตให้ผู้ใช้ทั่วไปสร้างช่องสนทนาใหม่"
              on={allowChannelCreation}
              onChange={() => setAllowChannelCreation(v => !v)}
            />
          </div>
          <div style={{ borderBottom: "1px solid #f1f5f9" }}>
            <SettingRow
              title="Allow Direct Messages"
              desc="อนุญาตให้ผู้ใช้ส่งข้อความโดยตรงถึงกัน"
              on={allowDMs}
              onChange={() => setAllowDMs(v => !v)}
            />
          </div>
          <SettingRow
            title="Read Receipts"
            desc="แสดงสถานะการอ่านข้อความ (เครื่องหมายถูก)"
            on={readReceipts}
            onChange={() => setReadReceipts(v => !v)}
          />
        </SettingCard>

        {/* File Sharing in Chat */}
        <SettingCard icon={FilesIcon} iconBg="#fdeede" iconColor="#e8821f" title="File Sharing in Chat">
          <SettingRow
            title="Allow File Uploads"
            desc="อนุญาตให้ผู้ใช้แนบและส่งไฟล์ในการสนทนา"
            on={allowUploads}
            onChange={() => setAllowUploads(v => !v)}
          >
            <div className="rounded-[12px] p-4" style={{ background: "#f8fafc", border: "1px solid #e5e9f0" }}>
              <div className="mb-4">
                <label className="mb-1.5 block text-[12.5px] font-semibold text-ink-soft">Max File Size (MB)</label>
                <input
                  type="number"
                  value={maxFileSize}
                  onChange={e => setMaxFileSize(Number(e.target.value))}
                  className="w-28 rounded-[10px] px-3.5 py-2.5 text-[14px] font-semibold text-ink outline-none"
                  style={{ border: "1.5px solid #e5e9f0", background: "#fff" }}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-[12.5px] font-semibold text-ink-soft">Allowed File Types</label>
                <textarea
                  value={allowedTypes}
                  onChange={e => setAllowedTypes(e.target.value)}
                  rows={3}
                  className="w-full rounded-[10px] px-3.5 py-2.5 text-[13px] text-ink-soft outline-none resize-none"
                  style={{ border: "1.5px solid #e5e9f0", background: "#fff" }}
                />
                <p className="mt-1 text-[12px] text-ink-faint">คั่นด้วยเครื่องหมายจุลภาค</p>
              </div>
            </div>
          </SettingRow>
        </SettingCard>
      </div>
    </>
  );
}
