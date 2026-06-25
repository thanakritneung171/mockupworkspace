import type { ComponentType, SVGProps } from "react";
import {
  DashboardIcon,
  AiIcon,
  UsageIcon,
  UsersIcon,
  MailIcon,
  ChatIcon,
  MeetingIcon,
  FilesIcon,
} from "@/components/icons";

export type NavItem = {
  href: string;
  label: string;
  desc: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  badge?: string;
};

export type NavGroup = {
  label: string;
  items: NavItem[];
};

export const navGroups: NavGroup[] = [
  {
    label: "Workspace",
    items: [
      { href: "/dashboard", label: "Dashboard", desc: "ภาพรวมการใช้งานทั้งหมดของ workspace", icon: DashboardIcon },
      { href: "/ai", label: "AI", desc: "ผู้ช่วย AI และระบบอัตโนมัติ", icon: AiIcon, badge: "New" },
      { href: "/usage", label: "Usage", desc: "ปริมาณการใช้งานและโควต้า", icon: UsageIcon },
      { href: "/users", label: "Users", desc: "จัดการผู้ใช้และสิทธิ์การเข้าถึง", icon: UsersIcon },
    ],
  },
  {
    label: "Applications",
    items: [
      { href: "/mail", label: "Mail / Calendar / Contact", desc: "จัดการบัญชีอีเมลและปฏิทิน", icon: MailIcon },
      { href: "/chat", label: "Chat", desc: "ข้อความและช่องสนทนาของทีม", icon: ChatIcon, badge: "12" },
      { href: "/meeting", label: "Meeting", desc: "ห้องประชุมและการนัดหมาย", icon: MeetingIcon },
      { href: "/files", label: "Files", desc: "พื้นที่จัดเก็บไฟล์ขององค์กร", icon: FilesIcon },
    ],
  },
];

export const allNavItems: NavItem[] = navGroups.flatMap((g) => g.items);
