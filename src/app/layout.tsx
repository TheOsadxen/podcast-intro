import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "مكالمة | Mukalamah",
  description: "منصتك لاكتشاف أفكار مبتكرة",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/tis7nmt.css" />
      </head>

      <body className='font-["source-arabic-sans"] '>{children}</body>
    </html>
  );
}
