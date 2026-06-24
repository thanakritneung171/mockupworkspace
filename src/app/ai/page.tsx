import PageHeader from "@/components/PageHeader";
import { StatCard } from "@/components/ui";
import { AiIcon, ProductIcon } from "@/components/icons";

const stats = [
  { icon: AiIcon, tone: "violet" as const, label: "AI Credits Used", value: "8,420", sub: "จากโควต้า 20,000" },
  { icon: ProductIcon, tone: "sky" as const, label: "Active Models", value: "2", sub: "Opus 4.8 · Haiku 4.5" },
  { icon: AiIcon, tone: "green" as const, label: "Automations Run", value: "1,209", sub: "เดือนนี้" },
];

const features = [
  { tone: "bg-[#efeafe] text-[#7c5cf0]", title: "Smart Reply", desc: "ร่างคำตอบอีเมลและแชตอัตโนมัติด้วย AI ตามบริบทของบทสนทนา" },
  { tone: "bg-[#e6f1fd] text-accent", title: "Meeting Summary", desc: "สรุปประเด็นและสิ่งที่ต้องทำต่อจากการประชุมโดยอัตโนมัติ" },
  { tone: "bg-[#fdeede] text-[#e8821f]", title: "Spam Intelligence", desc: "คัดกรองสแปมและอีเมลอันตรายแม่นยำขึ้นด้วยโมเดลเรียนรู้" },
];

export default function AiPage() {
  return (
    <>
      <PageHeader icon={AiIcon} title="AI" desc="ผู้ช่วย AI และระบบอัตโนมัติ" />

      <div className="mb-5 grid gap-[18px] md:grid-cols-3">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      <div className="grid gap-[18px] md:grid-cols-3">
        {features.map((f) => (
          <div key={f.title} className="card p-[22px]">
            <span className={`mb-3.5 grid h-[46px] w-[46px] place-items-center rounded-xl ${f.tone}`}>
              <AiIcon className="h-[23px] w-[23px]" />
            </span>
            <h3 className="mb-1.5 text-[15.5px] font-bold">{f.title}</h3>
            <p className="text-[13px] leading-relaxed text-ink-soft">{f.desc}</p>
          </div>
        ))}
      </div>
    </>
  );
}
