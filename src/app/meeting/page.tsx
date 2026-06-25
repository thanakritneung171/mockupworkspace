"use client";

import { useState } from "react";
import { Toggle, SettingRow, WarningBanner, InfoBanner, SettingCard } from "@/components/ui";
import { MeetingIcon, UsersIcon, ShieldIcon, AiIcon } from "@/components/icons";

export default function MeetingSettingsPage() {
  const [meetingEnabled,      setMeetingEnabled]      = useState(true);
  const [maxParticipants,     setMaxParticipants]      = useState(50);
  const [emptyTimeout,        setEmptyTimeout]         = useState(300);
  const [allowHostOverride,   setAllowHostOverride]    = useState(true);
  const [allowGuestJoin,      setAllowGuestJoin]       = useState(false);
  const [requireHostApproval, setRequireHostApproval]  = useState(true);
  const [enableWaitingRoom,   setEnableWaitingRoom]    = useState(true);
  const [allowRecording,      setAllowRecording]       = useState(true);
  const [enableAutoSummary,   setEnableAutoSummary]    = useState(false);

  return (
    <>
      <div className="mb-6 flex items-center gap-3">
        <span className="grid h-12 w-12 place-items-center rounded-[14px]" style={{ background: "#fef3c7" }}>
          <MeetingIcon className="h-[24px] w-[24px]" style={{ color: "#d97706" }} />
        </span>
        <div>
          <h1 className="text-[28px] font-extrabold text-ink">Meeting Settings</h1>
          <p className="text-[13.5px] text-ink-soft">ตั้งค่าห้องประชุมและระบบวิดีโอคอล</p>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        {/* Global Meeting Control */}
        <SettingCard icon={MeetingIcon} iconBg="#fef3c7" iconColor="#d97706" title="Global Meeting Control">
          <SettingRow
            title="Enable Meeting"
            desc="เปิด/ปิดการใช้งานระบบประชุมทั้งหมดใน workspace"
            on={meetingEnabled}
            onChange={() => setMeetingEnabled(v => !v)}
          />
          {!meetingEnabled && (
            <div className="mt-3">
              <WarningBanner>
                ระบบประชุมถูกปิดอยู่ — ผู้ใช้จะไม่สามารถสร้างหรือเข้าร่วมการประชุมได้
              </WarningBanner>
            </div>
          )}
        </SettingCard>

        {/* Room Defaults */}
        <SettingCard icon={MeetingIcon} iconBg="#e8f0ff" iconColor="#2563eb" title="Room Defaults">
          <div className="flex flex-col gap-0" style={{ borderTop: "1px solid #f1f5f9" }}>
            {/* max participants */}
            <div className="flex items-center gap-4 py-4" style={{ borderBottom: "1px solid #f1f5f9" }}>
              <div className="flex-1">
                <div className="text-[14px] font-semibold text-ink">Default Max Participants</div>
                <div className="mt-0.5 text-[12.5px] text-ink-soft">จำนวนผู้เข้าร่วมสูงสุดเริ่มต้นต่อห้อง</div>
              </div>
              <input
                type="number"
                value={maxParticipants}
                onChange={e => setMaxParticipants(Number(e.target.value))}
                className="w-24 rounded-[10px] px-3.5 py-2.5 text-center text-[14px] font-semibold text-ink outline-none"
                style={{ border: "1.5px solid #e5e9f0" }}
              />
            </div>
            {/* empty room timeout */}
            <div className="flex items-center gap-4 py-4" style={{ borderBottom: "1px solid #f1f5f9" }}>
              <div className="flex-1">
                <div className="text-[14px] font-semibold text-ink">Default Empty Room Timeout</div>
                <div className="mt-0.5 text-[12.5px] text-ink-soft">ปิดห้องอัตโนมัติเมื่อไม่มีผู้เข้าร่วม (วินาที)</div>
              </div>
              <input
                type="number"
                value={emptyTimeout}
                onChange={e => setEmptyTimeout(Number(e.target.value))}
                className="w-24 rounded-[10px] px-3.5 py-2.5 text-center text-[14px] font-semibold text-ink outline-none"
                style={{ border: "1.5px solid #e5e9f0" }}
              />
            </div>
            {/* allow host override */}
            <SettingRow
              title="Allow Host to Override"
              desc="อนุญาตให้ host เปลี่ยนการตั้งค่าห้องได้ตามต้องการ"
              on={allowHostOverride}
              onChange={() => setAllowHostOverride(v => !v)}
            />
          </div>
        </SettingCard>

        {/* Participant & Security */}
        <SettingCard icon={ShieldIcon} iconBg="#efeafe" iconColor="#7c5cf0" title="Participant & Security">
          <div style={{ borderTop: "1px solid #f1f5f9" }}>
            <SettingRow
              title="Allow Guest Join"
              desc="อนุญาตให้ผู้ใช้ภายนอกองค์กรเข้าร่วมการประชุมได้"
              on={allowGuestJoin}
              onChange={() => setAllowGuestJoin(v => !v)}
            >
              <div className="rounded-[12px] p-4" style={{ background: "#f8fafc", border: "1px solid #e5e9f0" }}>
                <div style={{ borderBottom: "1px solid #eef2f6" }}>
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <div className="text-[13.5px] font-semibold text-ink">Require Host to Approve</div>
                      <div className="text-[12px] text-ink-faint">host ต้องอนุมัติก่อนที่ guest จะเข้าได้</div>
                    </div>
                    <Toggle on={requireHostApproval} onChange={() => setRequireHostApproval(v => !v)} />
                  </div>
                </div>
                <div className="flex items-center justify-between py-3">
                  <div>
                    <div className="text-[13.5px] font-semibold text-ink">Enable Waiting Room</div>
                    <div className="text-[12px] text-ink-faint">ผู้เข้าร่วมรอใน waiting room ก่อนเข้าห้อง</div>
                  </div>
                  <Toggle on={enableWaitingRoom} onChange={() => setEnableWaitingRoom(v => !v)} />
                </div>
              </div>
            </SettingRow>
          </div>
          <div className="mt-3">
            <InfoBanner>
              การเปิดใช้ Guest Join อาจมีความเสี่ยงด้านความปลอดภัย — แนะนำให้เปิด Waiting Room ด้วยเสมอ
            </InfoBanner>
          </div>
        </SettingCard>

        {/* Recording & Transcription */}
        <SettingCard icon={AiIcon} iconBg="#e8f8f0" iconColor="#059669" title="Recording & Transcription">
          <div style={{ borderTop: "1px solid #f1f5f9" }}>
            <div style={{ borderBottom: "1px solid #f1f5f9" }}>
              <SettingRow
                title="Allow Recording"
                desc="อนุญาตให้บันทึกการประชุมเป็นไฟล์วิดีโอ"
                on={allowRecording}
                onChange={() => setAllowRecording(v => !v)}
              />
            </div>
            <SettingRow
              title="Enable Auto Meeting Summary (AI)"
              desc="ใช้ AI สรุปสาระสำคัญและ action items หลังประชุมอัตโนมัติ"
              on={enableAutoSummary}
              onChange={() => setEnableAutoSummary(v => !v)}
            />
          </div>
        </SettingCard>
      </div>
    </>
  );
}
