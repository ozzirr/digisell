import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: {
    default: "You First | Workbook digitali",
    template: "%s | You First",
  },
  description:
    "Workbook digitali per rimetterti al centro quando l'amore ti confonde.",
  openGraph: {
    title: "You First | Workbook digitali",
    description:
      "Kit digitali pratici per scrivere, riflettere e fare chiarezza nei momenti emotivi difficili.",
    type: "website",
    siteName: "You First",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
