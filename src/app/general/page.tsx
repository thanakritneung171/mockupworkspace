import PageHeader from "@/components/PageHeader";
import { Pill } from "@/components/ui";
import { GeneralIcon, BuildingIcon } from "@/components/icons";

const orgInfo = [
  { k: "Company Name", v: "สำนักงานคณะกรรมการสิทธิมนุษยชนแห่งชาติ" },
  { k: "Status", v: <Pill tone="ok">Active</Pill> },
  { k: "Address", v: "123 ถนนธุรกิจ แขวงสีลม เขตบางรัก กรุงเทพฯ 10500", span: true },
  { k: "Phone", v: "0123456789" },
  { k: "Email", v: "test1@mail.com" },
];

function Toggle({ on = true }: { on?: boolean }) {
  return (
    <span
      className={`relative h-6 w-[42px] shrink-0 rounded-full transition-colors ${on ? "bg-ok" : "bg-[#cbd3de]"}`}
      role="switch"
      aria-checked={on}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${on ? "right-0.5" : "left-0.5"}`}
      />
    </span>
  );
}

const settings = [
  { title: "Default Language", desc: "ภาษาหลักของ workspace สำหรับผู้ใช้ใหม่", tag: "ไทย (TH)" },
  { title: "Time Zone", desc: "โซนเวลาที่ใช้แสดงผลทั่วทั้งระบบ", tag: "GMT+7 Bangkok" },
  { title: "Two-Factor Authentication", desc: "บังคับยืนยันตัวตน 2 ขั้นตอนสำหรับผู้ดูแล", toggle: true },
  { title: "Allow External Sharing", desc: "อนุญาตให้แชร์ไฟล์กับผู้ใช้นอกองค์กร", toggle: false },
];

export default function GeneralPage() {
  return (
    <>
      <PageHeader icon={GeneralIcon} title="General" desc="ข้อมูลองค์กรและการตั้งค่าทั่วไป" />

      <div className="card mb-5 p-[22px]">
        <div className="mb-4 flex items-center gap-2.5 text-base font-bold">
          <BuildingIcon className="h-[18px] w-[18px] text-accent" />
          Organization Information
        </div>
        <div className="grid grid-cols-1 gap-x-7 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
          {orgInfo.map((it) => (
            <div key={it.k} className={it.span ? "lg:col-span-2" : ""}>
              <div className="mb-1.5 text-[12.5px] text-ink-faint">{it.k}</div>
              <div className="text-[15px] font-semibold">{it.v}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card p-[22px]">
        <div className="mb-4 flex items-center gap-2.5 text-base font-bold">
          <GeneralIcon className="h-[18px] w-[18px] text-accent" />
          General Settings
        </div>
        <div>
          {settings.map((s) => (
            <div key={s.title} className="flex items-center gap-3.5 border-b border-line py-4 last:border-none">
              <div className="flex-1">
                <b className="block text-sm font-semibold">{s.title}</b>
                <span className="text-[12.5px] text-ink-soft">{s.desc}</span>
              </div>
              {s.tag ? (
                <span className="rounded-md bg-accent-soft px-2.5 py-1 text-xs text-[#3a6fd8]">{s.tag}</span>
              ) : (
                <Toggle on={s.toggle} />
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
