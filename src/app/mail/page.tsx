import PageHeader from "@/components/PageHeader";
import { Pill, UseBar } from "@/components/ui";
import { MailIcon, SearchIcon, SortIcon, PlusIcon } from "@/components/icons";

const accounts = [
  { email: "test333@debutmail.comth", created: "19/05/2026", used: 0, quota: "10,000", percent: 3 },
  { email: "7S070032@debutmail.comth", created: "19/05/2026", used: 0, quota: "3,000", percent: 2 },
  { email: "koschakon@debutmail.comth", created: "19/05/2026", used: 0, quota: "10", percent: 6 },
  { email: "koschakon.n@debutmail.comth", created: "19/05/2026", used: 0, quota: "5,000", percent: 4 },
];

export default function MailPage() {
  return (
    <>
      <PageHeader
        icon={MailIcon}
        title="Mail / Calendar"
        desc="จัดการบัญชีอีเมลและปฏิทิน"
        actions={
          <button className="inline-flex items-center gap-2 rounded-[10px] bg-accent px-4 py-2.5 text-[13.5px] font-semibold text-white shadow-[0_6px_16px_rgba(47,111,237,0.28)]">
            <PlusIcon className="h-4 w-4" /> Add Account
          </button>
        }
      />

      <div className="card mb-5 p-[22px]">
        <h2 className="mb-1 text-lg font-bold">Search &amp; Filter</h2>
        <p className="mb-4 text-[13px] text-ink-soft">ค้นหาตามอีเมล, ผู้รับผิดชอบ หรือสถานะ</p>
        <div className="grid gap-3.5 md:grid-cols-[1fr_220px_220px]">
          <label className="flex items-center gap-2.5 rounded-[10px] border border-line bg-ground px-3.5 py-2.5 text-[13.5px]">
            <SearchIcon className="h-4 w-4 text-ink-faint" />
            <input
              placeholder="ค้นหาตามอีเมล, ผู้รับผิดชอบ หรือสถานะ"
              className="w-full bg-transparent text-ink-soft outline-none placeholder:text-ink-faint"
            />
          </label>
          <select className="rounded-[10px] border border-line bg-ground px-3.5 py-2.5 text-[13.5px] text-ink-soft outline-none">
            <option>All Status</option>
            <option>Active</option>
            <option>Suspended</option>
          </select>
          <select className="rounded-[10px] border border-line bg-ground px-3.5 py-2.5 text-[13.5px] text-ink-soft outline-none">
            <option>All Package</option>
            <option>Email 100 accounts</option>
          </select>
        </div>
      </div>

      <div className="card">
        <div className="flex items-center justify-between p-[22px] pb-1.5">
          <h2 className="text-lg font-bold">
            Account List <span className="font-semibold text-ink-faint">(4)</span>
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>
                  <span className="inline-flex items-center gap-1.5">
                    Email Address <SortIcon className="h-3 w-3 opacity-45" />
                  </span>
                </th>
                <th>Created</th>
                <th>Last Login</th>
                <th>Mailbox Usage</th>
                <th>Package</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((a) => (
                <tr key={a.email}>
                  <td>
                    <b className="block font-semibold">{a.email}</b>
                    <span className="text-xs text-ink-faint">debutmail.comth</span>
                  </td>
                  <td className="text-ink-soft">{a.created}</td>
                  <td className="text-ink-soft">—</td>
                  <td className="min-w-[160px]">
                    {a.used} / {a.quota}
                    <UseBar percent={a.percent} />
                  </td>
                  <td className="text-ink-soft">Email 100 accounts</td>
                  <td>
                    <Pill tone="ok">Active</Pill>
                  </td>
                  <td>
                    <button className="grid h-[30px] w-[30px] place-items-center rounded-lg border border-line text-ink-soft">
                      ✎
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-line px-[18px] py-3.5 text-[13px] text-ink-soft">
          <span>Rows per page: 10</span>
          <span>1–4 of 4</span>
        </div>
      </div>
    </>
  );
}
