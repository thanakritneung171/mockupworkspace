import type { Metadata } from "next";
import { Anuphan } from "next/font/google";
import "./globals.css";
import Shell from "@/components/Shell";

const anuphan = Anuphan({
  subsets: ["latin", "thai"],
  variable: "--font-anuphan",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Debut Workspace — Management Platform",
  description: "จัดการ workspace: เมล, ปฏิทิน, แชต, ประชุม และไฟล์ ในที่เดียว",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`${anuphan.variable} h-full antialiased`}>
      <body className="h-full overflow-hidden">
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
