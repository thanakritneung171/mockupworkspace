import PageHeader from "@/components/PageHeader";
import { StatCard, Pill, SectionHead } from "@/components/ui";
import { FilesIcon, StorageIcon, UploadIcon, ClockIcon, PlusIcon } from "@/components/icons";

const Small = ({ children }: { children: React.ReactNode }) => (
  <small className="text-sm font-semibold text-ink-faint"> {children}</small>
);

const files = [
  { name: "Q3-Budget-Plan.xlsx", owner: "useradmin4", size: "2.4 MB", mod: "วันนี้", tone: "ok", access: "Shared" },
  { name: "Brand-Guideline.pdf", owner: "kanogwan", size: "18.1 MB", mod: "เมื่อวาน", tone: "neutral", access: "Private" },
  { name: "Meeting-Notes.docx", owner: "useradmin2", size: "320 KB", mod: "22/06", tone: "ok", access: "Shared" },
  { name: "Product-Demo.mp4", owner: "dev01", size: "156 MB", mod: "21/06", tone: "neutral", access: "Private" },
];

export default function FilesPage() {
  return (
    <>
      <PageHeader icon={FilesIcon} title="Files" desc="พื้นที่จัดเก็บไฟล์ขององค์กร" />

      <div className="mb-5 grid gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={FilesIcon} tone="sky" label="Total Files" value="1,284" />
        <StatCard icon={StorageIcon} tone="violet" label="Storage" value={<>3.1<Small>/ 10 GB</Small></>} />
        <StatCard icon={UploadIcon} tone="green" label="Shared" value="312" />
        <StatCard icon={ClockIcon} tone="orange" label="Trash" value="47" />
      </div>

      <div className="card">
        <div className="flex items-center justify-between p-[22px] pb-0">
          <SectionHead title="Recent Files" />
          <a href="#" className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-accent">
            <PlusIcon className="h-3.5 w-3.5" /> Upload
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Owner</th>
                <th>Size</th>
                <th>Modified</th>
                <th>Access</th>
              </tr>
            </thead>
            <tbody>
              {files.map((f) => (
                <tr key={f.name}>
                  <td>
                    <b className="font-semibold">{f.name}</b>
                  </td>
                  <td className="text-ink-soft">{f.owner}</td>
                  <td className="text-ink-soft">{f.size}</td>
                  <td className="text-ink-soft">{f.mod}</td>
                  <td>
                    <Pill tone={f.tone}>{f.access}</Pill>
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
