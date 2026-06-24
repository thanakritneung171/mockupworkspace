import PageHeader from "@/components/PageHeader";
import { StatCard, Pill, SectionHead } from "@/components/ui";
import { ChatIcon, SendIcon, UsersIcon, PlusIcon } from "@/components/icons";

const channels = [
  { name: "# general", members: 42, last: "5 นาทีที่แล้ว", tone: "ok", status: "Active" },
  { name: "# dev-team", members: 12, last: "20 นาทีที่แล้ว", tone: "ok", status: "Active" },
  { name: "# announcements", members: 58, last: "2 ชม.ที่แล้ว", tone: "neutral", status: "Read-only" },
  { name: "# project-q3", members: 9, last: "เมื่อวาน", tone: "soon", status: "Archived soon" },
];

export default function ChatPage() {
  return (
    <>
      <PageHeader icon={ChatIcon} title="Chat" desc="ข้อความและช่องสนทนาของทีม" />

      <div className="mb-5 grid gap-[18px] md:grid-cols-3">
        <StatCard icon={ChatIcon} tone="sky" label="Active Channels" value="26" />
        <StatCard icon={SendIcon} tone="green" label="Messages Today" value="3,847" />
        <StatCard icon={UsersIcon} tone="orange" label="Online Now" value="18" />
      </div>

      <div className="card">
        <div className="flex items-center justify-between p-[22px] pb-0">
          <SectionHead title="Channels" />
          <a href="#" className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-accent">
            <PlusIcon className="h-3.5 w-3.5" /> New Channel
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Channel</th>
                <th>Members</th>
                <th>Last Message</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {channels.map((c) => (
                <tr key={c.name}>
                  <td>
                    <b className="font-semibold">{c.name}</b>
                  </td>
                  <td className="text-ink-soft">{c.members}</td>
                  <td className="text-ink-soft">{c.last}</td>
                  <td>
                    <Pill tone={c.tone}>{c.status}</Pill>
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
