import PageHeader from "@/components/PageHeader";
import { StatCard, SectionHead, Pill } from "@/components/ui";
import Donut from "@/components/Donut";
import {
  DashboardIcon,
  SubscriptionIcon,
  ProductIcon,
  PackageIcon,
} from "@/components/icons";

const tiles = [
  { label: "Total Processed", value: "1,365,506", sub: "30 วันล่าสุด", cls: "from-[#5a9be8] to-c-blue" },
  { label: "Delivered", value: "1,285,993", sub: "94.18% ของทั้งหมด", cls: "from-[#3bb56c] to-[#2f9d5b]" },
  { label: "Bounce", value: "78,553", sub: "5.75% ของทั้งหมด", cls: "from-[#f37c7c] to-[#ec5f5f]" },
  { label: "Dropped", value: "133", sub: "0.01% ของทั้งหมด", cls: "from-[#f6cb4a] to-[#f0b322]" },
  { label: "Filtered", value: "831", sub: "0.06% ของทั้งหมด", cls: "from-[#9b6ff5] to-[#7e54ef]" },
];

const activity = [
  { user: "koschakon", email: "koschakon@debutmail.comth", action: "เพิ่มบัญชีอีเมลใหม่", app: "Mail", time: "2 นาทีที่แล้ว", tone: "ok", status: "Success" },
  { user: "useradmin2", email: "useradmin2@debutmail.comth", action: "เริ่มประชุมทีม Q3", app: "Meeting", time: "18 นาทีที่แล้ว", tone: "ok", status: "Success" },
  { user: "dev01", email: "dev01@server02.com", action: "อัปโหลดไฟล์ 24 รายการ", app: "Files", time: "1 ชม.ที่แล้ว", tone: "ok", status: "Success" },
  { user: "kanogwan", email: "kanogwan@icedebutmail.com", action: "ส่งออกบันทึกแชต", app: "Chat", time: "3 ชม.ที่แล้ว", tone: "soon", status: "Processing" },
];

const legend = [
  { c: "var(--color-c-green)", label: "Delivered", v: "94.18%" },
  { c: "var(--color-c-coral)", label: "Bounce", v: "5.75%" },
  { c: "var(--color-c-purple)", label: "Filtered", v: "0.06%" },
  { c: "var(--color-c-yellow)", label: "Dropped", v: "0.01%" },
];

export default function DashboardPage() {
  return (
    <>
      <PageHeader icon={DashboardIcon} title="Dashboard" desc="ภาพรวมการใช้งานทั้งหมดของ workspace" />

      <div className="mb-5 grid gap-[18px] md:grid-cols-3">
        <StatCard icon={SubscriptionIcon} tone="orange" label="Total Subscription" value="15" sub="+2 จากเดือนก่อน" />
        <StatCard icon={ProductIcon} tone="violet" label="Active Products" value="3" sub="Mail · Chat · Meet" />
        <StatCard icon={PackageIcon} tone="sky" label="Total Packages" value="8" sub="2 ใกล้หมดอายุ" />
      </div>

      <div className="card mb-5 p-[22px]">
        <SectionHead
          title="Email Statistics Overview"
          action={<a href="#" className="text-[13px] font-semibold text-accent">View More ›</a>}
        />
        <div className="grid grid-cols-2 gap-3.5 lg:grid-cols-5">
          {tiles.map((t) => (
            <div key={t.label} className={`min-h-[108px] rounded-[13px] bg-gradient-to-br p-[18px] text-white ${t.cls}`}>
              <div className="flex items-center justify-between text-[13.5px] font-semibold opacity-95">{t.label}</div>
              <div className="mt-3.5 text-[26px] font-bold tracking-[-0.3px]">{t.value}</div>
              <div className="mt-0.5 text-[11.5px] opacity-90">{t.sub}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-10 px-2.5 pb-2 pt-6">
          <Donut
            data={[
              { value: 94.18, color: "#33a35e" },
              { value: 5.75, color: "#ef6f6f" },
              { value: 0.06, color: "#8b5cf6" },
              { value: 0.01, color: "#f3c032" },
            ]}
            centerValue="94.2%"
            centerLabel="Delivered"
          />
          <div className="flex min-w-[190px] flex-col gap-3.5">
            {legend.map((l) => (
              <div key={l.label} className="flex items-center gap-2.5 text-[13.5px] text-ink-soft">
                <span className="h-[11px] w-[11px] shrink-0 rounded-[3px]" style={{ background: l.c }} />
                {l.label}
                <b className="ml-auto font-semibold text-ink">{l.v}</b>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="flex items-center justify-between p-[22px] pb-0">
          <h2 className="text-lg font-bold">Recent Activity</h2>
          <a href="#" className="text-[13px] font-semibold text-accent">View all ›</a>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Action</th>
                <th>Application</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {activity.map((a) => (
                <tr key={a.email}>
                  <td>
                    <b className="block font-semibold">{a.user}</b>
                    <span className="text-xs text-ink-faint">{a.email}</span>
                  </td>
                  <td>{a.action}</td>
                  <td className="text-ink-soft">{a.app}</td>
                  <td className="text-ink-soft">{a.time}</td>
                  <td>
                    <Pill tone={a.tone}>{a.status}</Pill>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
