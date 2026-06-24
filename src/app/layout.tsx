import type { Metadata } from "next";
import { Geist, Noto_Sans_Thai } from "next/font/google";
import "./globals.css";
import Shell from "@/components/Shell";

const geistSans = Geist({
  variable: "--font-app-sans",
  subsets: ["latin"],
});

const notoThai = Noto_Sans_Thai({
  variable: "--font-thai",
  subsets: ["thai"],
});

export const metadata: Metadata = {
  title: "Debut Platform — Workspace Management",
  description: "จัดการ workspace: เมล, ปฏิทิน, แชต, ประชุม และไฟล์ ในที่เดียว",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`${geistSans.variable} ${notoThai.variable} h-full antialiased`}>
      <body className="min-h-full">
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
