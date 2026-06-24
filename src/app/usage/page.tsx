import PageHeader from "@/components/PageHeader";
import { StatCard, SectionHead, UseBar } from "@/components/ui";
import { UsageIcon, StorageIcon, UsersIcon, MailIcon, MeetingIcon } from "@/components/icons";

const Small = ({ children }: { children: React.ReactNode }) => (
  <small className="text-sm font-semibold text-ink-faint"> {children}</small>
);

const bars = [
  { label: "Mail Storage", text: "12.4 / 20 GB", percent: 62, color: "var(--color-c-blue)" },
  { label: "Files Storage", text: "3.1 / 10 GB", percent: 31, color: "var(--color-c-purple)" },
  { label: "Email Accounts", text: "4 / 20", percent: 20, color: "var(--color-c-green)" },
  { label: "AI Credits", text: "8,420 / 20,000", percent: 42, color: "var(--color-accent-2)" },
];

export default function UsagePage() {
  return (
    <>
      <PageHeader icon={UsageIcon} title="Usage" desc="ปริมาณการใช้งานและโควต้า" />

      <div className="mb-5 grid gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={StorageIcon} tone="sky" label="Storage Used" value={<>12.4<Small>/ 20 GB</Small></>} />
        <StatCard icon={UsersIcon} tone="green" label="Accounts" value={<>4<Small>/ 20</Small></>} />
        <StatCard icon={MailIcon} tone="orange" label="Mails / Day" value="45.5K" />
        <StatCard icon={MeetingIcon} tone="violet" label="Meeting Mins" value="3,210" />
      </div>

      <div className="card p-[22px]">
        <SectionHead title="Resource Usage by Application" />
        <div className="flex flex-col gap-5">
          {bars.map((b) => (
            <div key={b.label}>
              <div className="mb-0.5 flex justify-between text-[13.5px]">
                <b className="font-semibold">{b.label}</b>
                <span className="text-ink-soft">{b.text}</span>
              </div>
              <UseBar percent={b.percent} color={b.color} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
