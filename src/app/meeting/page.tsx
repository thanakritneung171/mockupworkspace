import PageHeader from "@/components/PageHeader";
import { StatCard, Pill, SectionHead } from "@/components/ui";
import { MeetingIcon, ClockIcon, UsersIcon, PlusIcon } from "@/components/icons";

const meetings = [
  { title: "Weekly Sync", host: "useradmin4", when: "วันนี้ 14:00", people: 8, tone: "ok", status: "Confirmed" },
  { title: "Q3 Planning", host: "useradmin2", when: "พรุ่งนี้ 10:30", people: 12, tone: "ok", status: "Confirmed" },
  { title: "Design Review", host: "kanogwan", when: "25/06 16:00", people: 5, tone: "soon", status: "Pending" },
  { title: "Client Demo", host: "dev01", when: "26/06 09:00", people: 4, tone: "soon", status: "Pending" },
];

export default function MeetingPage() {
  return (
    <>
      <PageHeader icon={MeetingIcon} title="Meeting" desc="ห้องประชุมและการนัดหมาย" />

      <div className="mb-5 grid gap-[18px] md:grid-cols-3">
        <StatCard icon={MeetingIcon} tone="sky" label="Scheduled Today" value="6" />
        <StatCard icon={ClockIcon} tone="green" label="Total Minutes" value="3,210" />
        <StatCard icon={UsersIcon} tone="violet" label="Avg Participants" value="7.2" />
      </div>

      <div className="card">
        <div className="flex items-center justify-between p-[22px] pb-0">
          <SectionHead title="Upcoming Meetings" />
          <a href="#" className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-accent">
            <PlusIcon className="h-3.5 w-3.5" /> Schedule
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Host</th>
                <th>When</th>
                <th>Participants</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {meetings.map((m) => (
                <tr key={m.title}>
                  <td>
                    <b className="font-semibold">{m.title}</b>
                  </td>
                  <td className="text-ink-soft">{m.host}</td>
                  <td className="text-ink-soft">{m.when}</td>
                  <td className="text-ink-soft">{m.people}</td>
                  <td>
                    <Pill tone={m.tone}>{m.status}</Pill>
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
