"use client";

import { useState } from "react";
import { Toggle, SettingRow, WarningBanner, SettingCard } from "@/components/ui";
import { FilesIcon, StorageIcon, ShareIcon, ShieldIcon } from "@/components/icons";

export default function FilesSettingsPage() {
  const [filesEnabled,         setFilesEnabled]         = useState(true);
  const [defaultQuota,         setDefaultQuota]         = useState(10);
  const [maxFileSize,          setMaxFileSize]          = useState(500);
  const [fileTypeMode,         setFileTypeMode]         = useState<"all"|"whitelist">("all");
  const [whitelistTypes,       setWhitelistTypes]       = useState("jpg, jpeg, png, pdf, doc, docx, xls, xlsx, ppt, pptx, zip, mp4");
  const [blockedTypes,         setBlockedTypes]         = useState("exe, bat, sh, cmd, vbs, js, ps1");
  const [allowExternalSharing, setAllowExternalSharing] = useState(true);
  const [requirePassword,      setRequirePassword]      = useState(false);
  const [defaultLinkExpiry,    setDefaultLinkExpiry]    = useState(7);
  const [allowInternalSharing, setAllowInternalSharing] = useState(true);
  const [trustedDomains,       setTrustedDomains]       = useState("debutmail.comth\nserver02.com");
  const [enableTrash,          setEnableTrash]          = useState(true);
  const [trashRetentionDays,   setTrashRetentionDays]   = useState(30);
  const [enableAppPassword,    setEnableAppPassword]    = useState(false);

  return (
    <>
      <div className="mb-6 flex items-center gap-3">
        <span className="grid h-12 w-12 place-items-center rounded-[14px]" style={{ background: "#fdeede" }}>
          <FilesIcon className="h-[24px] w-[24px]" style={{ color: "#e8821f" }} />
        </span>
        <div>
          <h1 className="text-[28px] font-extrabold text-ink">Files Settings</h1>
          <p className="text-[13.5px] text-ink-soft">ตั้งค่าพื้นที่จัดเก็บและการแชร์ไฟล์</p>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        {/* Global Files Control */}
        <SettingCard icon={FilesIcon} iconBg="#fdeede" iconColor="#e8821f" title="Global Files Control">
          <SettingRow
            title="Enable Files"
            desc="เปิด/ปิดการใช้งานระบบจัดเก็บไฟล์ทั้งหมดใน workspace"
            on={filesEnabled}
            onChange={() => setFilesEnabled(v => !v)}
          />
          {!filesEnabled && (
            <div className="mt-3">
              <WarningBanner>
                ระบบไฟล์ถูกปิดอยู่ — ผู้ใช้จะไม่สามารถอัปโหลด ดาวน์โหลด หรือแชร์ไฟล์ได้
              </WarningBanner>
            </div>
          )}
        </SettingCard>

        {/* Storage & Quota */}
        <SettingCard icon={StorageIcon} iconBg="#e8f0ff" iconColor="#2563eb" title="Storage & Quota">
          <div style={{ borderTop: "1px solid #f1f5f9" }} className="flex flex-col">
            {/* default user quota */}
            <div className="flex items-center gap-4 py-4" style={{ borderBottom: "1px solid #f1f5f9" }}>
              <div className="flex-1">
                <div className="text-[14px] font-semibold text-ink">Default User Quota</div>
                <div className="mt-0.5 text-[12.5px] text-ink-soft">พื้นที่จัดเก็บเริ่มต้นต่อผู้ใช้</div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={defaultQuota}
                  onChange={e => setDefaultQuota(Number(e.target.value))}
                  className="w-24 rounded-[10px] px-3.5 py-2.5 text-center text-[14px] font-semibold text-ink outline-none"
                  style={{ border: "1.5px solid #e5e9f0" }}
                />
                <span className="text-[13px] text-ink-soft">GB</span>
              </div>
            </div>
            {/* max file size */}
            <div className="flex items-center gap-4 py-4" style={{ borderBottom: "1px solid #f1f5f9" }}>
              <div className="flex-1">
                <div className="text-[14px] font-semibold text-ink">Max File Size per Upload</div>
                <div className="mt-0.5 text-[12.5px] text-ink-soft">ขนาดไฟล์สูงสุดที่อนุญาตต่อการอัปโหลด</div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={maxFileSize}
                  onChange={e => setMaxFileSize(Number(e.target.value))}
                  className="w-24 rounded-[10px] px-3.5 py-2.5 text-center text-[14px] font-semibold text-ink outline-none"
                  style={{ border: "1.5px solid #e5e9f0" }}
                />
                <span className="text-[13px] text-ink-soft">MB</span>
              </div>
            </div>
            {/* allowed file types */}
            <div className="py-4" style={{ borderBottom: "1px solid #f1f5f9" }}>
              <div className="mb-3 text-[14px] font-semibold text-ink">Allowed File Types</div>
              <div className="flex flex-col gap-2">
                {(["all","whitelist"] as const).map(mode => (
                  <label key={mode} className="flex cursor-pointer items-center gap-3">
                    <input
                      type="radio"
                      name="fileTypeMode"
                      checked={fileTypeMode === mode}
                      onChange={() => setFileTypeMode(mode)}
                      className="h-4 w-4 accent-accent"
                    />
                    <span className="text-[13.5px] text-ink">
                      {mode === "all" ? "ทุกประเภท" : "Whitelist only"}
                    </span>
                  </label>
                ))}
              </div>
              {fileTypeMode === "whitelist" && (
                <div className="mt-3">
                  <textarea
                    value={whitelistTypes}
                    onChange={e => setWhitelistTypes(e.target.value)}
                    rows={3}
                    className="w-full rounded-[10px] px-3.5 py-2.5 text-[13px] text-ink-soft outline-none resize-none"
                    style={{ border: "1.5px solid #e5e9f0", background: "#f8fafc" }}
                    placeholder="jpg, png, pdf, ..."
                  />
                  <p className="mt-1 text-[12px] text-ink-faint">คั่นด้วยเครื่องหมายจุลภาค</p>
                </div>
              )}
            </div>
            {/* blocked types */}
            <div className="py-4">
              <div className="mb-1.5 text-[14px] font-semibold text-ink">Blocked File Types (Blacklist)</div>
              <div className="mb-2 text-[12.5px] text-ink-soft">ประเภทไฟล์ที่ห้ามอัปโหลดเสมอ</div>
              <textarea
                value={blockedTypes}
                onChange={e => setBlockedTypes(e.target.value)}
                rows={2}
                className="w-full rounded-[10px] px-3.5 py-2.5 text-[13px] text-ink-soft outline-none resize-none"
                style={{ border: "1.5px solid #e5e9f0", background: "#f8fafc" }}
              />
            </div>
          </div>
        </SettingCard>

        {/* Sharing & Access */}
        <SettingCard icon={ShareIcon} iconBg="#efeafe" iconColor="#7c5cf0" title="Sharing & Access">
          <div style={{ borderTop: "1px solid #f1f5f9" }}>
            <div style={{ borderBottom: "1px solid #f1f5f9" }}>
              <SettingRow
                title="Allow External Sharing"
                desc="อนุญาตให้แชร์ไฟล์กับผู้ใช้นอกองค์กรผ่าน link"
                on={allowExternalSharing}
                onChange={() => setAllowExternalSharing(v => !v)}
              >
                <div className="rounded-[12px] p-4" style={{ background: "#f8fafc", border: "1px solid #e5e9f0" }}>
                  <div style={{ borderBottom: "1px solid #eef2f6" }}>
                    <div className="flex items-center justify-between py-3">
                      <div>
                        <div className="text-[13.5px] font-semibold text-ink">Require Password</div>
                        <div className="text-[12px] text-ink-faint">link แชร์ต้องใส่รหัสผ่านก่อนเข้าถึง</div>
                      </div>
                      <Toggle on={requirePassword} onChange={() => setRequirePassword(v => !v)} />
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <div className="text-[13.5px] font-semibold text-ink">Default Link Expiry</div>
                      <div className="text-[12px] text-ink-faint">วันหมดอายุเริ่มต้นของ link แชร์</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={defaultLinkExpiry}
                        onChange={e => setDefaultLinkExpiry(Number(e.target.value))}
                        className="w-20 rounded-[10px] px-3 py-2 text-center text-[14px] font-semibold text-ink outline-none"
                        style={{ border: "1.5px solid #e5e9f0", background: "#fff" }}
                      />
                      <span className="text-[13px] text-ink-soft">วัน</span>
                    </div>
                  </div>
                </div>
              </SettingRow>
            </div>
            <SettingRow
              title="Allow Internal Sharing"
              desc="อนุญาตให้แชร์ไฟล์ระหว่างผู้ใช้ภายในองค์กร"
              on={allowInternalSharing}
              onChange={() => setAllowInternalSharing(v => !v)}
            />
          </div>
        </SettingCard>

        {/* Security & Compliance */}
        <SettingCard icon={ShieldIcon} iconBg="#e8f0ff" iconColor="#2563eb" title="Security & Compliance">
          <div style={{ borderTop: "1px solid #f1f5f9" }}>
            {/* trusted domains */}
            <div className="py-4" style={{ borderBottom: "1px solid #f1f5f9" }}>
              <div className="mb-1.5 text-[14px] font-semibold text-ink">Trusted Domains</div>
              <div className="mb-2 text-[12.5px] text-ink-soft">โดเมนที่ได้รับความไว้วางใจสำหรับการแชร์ภายนอก</div>
              <textarea
                value={trustedDomains}
                onChange={e => setTrustedDomains(e.target.value)}
                rows={3}
                className="w-full rounded-[10px] px-3.5 py-2.5 text-[13px] text-ink-soft outline-none resize-none"
                style={{ border: "1.5px solid #e5e9f0", background: "#f8fafc" }}
                placeholder="example.com&#10;partner.org"
              />
              <p className="mt-1 text-[12px] text-ink-faint">หนึ่งโดเมนต่อบรรทัด</p>
            </div>
            {/* trash */}
            <div style={{ borderBottom: "1px solid #f1f5f9" }}>
              <SettingRow
                title="Enable Trash / Recycle Bin"
                desc="เก็บไฟล์ที่ถูกลบไว้ชั่วคราวก่อนลบถาวร"
                on={enableTrash}
                onChange={() => setEnableTrash(v => !v)}
              >
                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="number"
                    value={trashRetentionDays}
                    onChange={e => setTrashRetentionDays(Number(e.target.value))}
                    className="w-24 rounded-[10px] px-3.5 py-2.5 text-center text-[14px] font-semibold text-ink outline-none"
                    style={{ border: "1.5px solid #e5e9f0" }}
                  />
                  <span className="text-[13px] text-ink-soft">วันก่อนลบถาวร</span>
                </div>
              </SettingRow>
            </div>
            {/* app password */}
            <SettingRow
              title="Enable App Password for File Access"
              desc="กำหนดรหัสผ่านแอปแยกต่างหากสำหรับการเข้าถึงไฟล์"
              on={enableAppPassword}
              onChange={() => setEnableAppPassword(v => !v)}
            />
          </div>
        </SettingCard>
      </div>
    </>
  );
}
