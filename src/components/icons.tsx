import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function DashboardIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M3 13a9 9 0 0 1 18 0" />
      <path d="M12 13l4-3" />
      <circle cx="12" cy="13" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function GeneralIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8 2 2 0 1 1-2.8 2.8 1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 1 1-4 0 1.6 1.6 0 0 0-1.1-1.5 2 2 0 1 1-2.8-2.8A1.6 1.6 0 0 0 4 13H3a2 2 0 1 1 0-4 1.6 1.6 0 0 0 1.5-1.1 2 2 0 1 1 2.8-2.8A1.6 1.6 0 0 0 10 4V3a2 2 0 1 1 4 0 1.6 1.6 0 0 0 1.1 1.5 2 2 0 1 1 2.8 2.8A1.6 1.6 0 0 0 20 11h1a2 2 0 1 1 0 4z" />
    </svg>
  );
}

export function AiIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6z" />
      <path d="M19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8z" />
    </svg>
  );
}

export function UsageIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
    </svg>
  );
}

export function MailIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="M3 8l9 5 9-5" />
    </svg>
  );
}

export function ChatIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M21 12a8 8 0 0 1-11.5 7.2L4 20l1-4.3A8 8 0 1 1 21 12z" />
    </svg>
  );
}

export function MeetingIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <rect x="2.5" y="6.5" width="13" height="11" rx="2.5" />
      <path d="M15.5 10l6-3.5v11l-6-3.5" />
    </svg>
  );
}

export function FilesIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M3 7a2 2 0 0 1 2-2h4l2 2.5h8a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </svg>
  );
}

export function SearchIcon(p: IconProps) {
  return (
    <svg {...base} strokeWidth={2} {...p}>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4-4" />
    </svg>
  );
}

export function BellIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M6 8a6 6 0 1 1 12 0c0 7 3 8 3 8H3s3-1 3-8" />
      <path d="M10 20a2 2 0 0 0 4 0" />
    </svg>
  );
}

export function MenuIcon(p: IconProps) {
  return (
    <svg {...base} strokeWidth={2} {...p}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function PlusIcon(p: IconProps) {
  return (
    <svg {...base} strokeWidth={2} {...p}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function SortIcon(p: IconProps) {
  return (
    <svg {...base} strokeWidth={2} {...p}>
      <path d="M8 9l4-4 4 4M8 15l4 4 4-4" />
    </svg>
  );
}

export function CheckIcon(p: IconProps) {
  return (
    <svg {...base} strokeWidth={2} {...p}>
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

export function SubscriptionIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M17 1l4 4-4 4" />
      <path d="M3 11V9a4 4 0 0 1 4-4h14" />
      <path d="M7 23l-4-4 4-4" />
      <path d="M21 13v2a4 4 0 0 1-4 4H3" />
    </svg>
  );
}

export function ProductIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M21 16V8l-9-5-9 5v8l9 5 9-5z" />
      <path d="M3.3 7L12 12l8.7-5M12 22V12" />
    </svg>
  );
}

export function PackageIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M3 7l9-4 9 4-9 4-9-4z" />
      <path d="M3 12l9 4 9-4M3 17l9 4 9-4" />
    </svg>
  );
}

export function StorageIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M22 12A10 10 0 1 1 12 2v10z" />
    </svg>
  );
}

export function UsersIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20a6 6 0 0 1 12 0M16 4a3 3 0 0 1 0 6M21 20a6 6 0 0 0-5-5.9" />
    </svg>
  );
}

export function ClockIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

export function SendIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4z" />
    </svg>
  );
}

export function UploadIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M12 15V3M7 8l5-5 5 5M5 21h14" />
    </svg>
  );
}

export function BuildingIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M3 21h18M5 21V7l7-4 7 4v14M9 9h.01M15 9h.01M9 13h.01M15 13h.01M9 17h.01M15 17h.01" />
    </svg>
  );
}
