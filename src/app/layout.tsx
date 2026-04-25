import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: {
    default: "DigiSell | Digital Workbook Checkout",
    template: "%s | DigiSell",
  },
  description:
    "A production-ready digital product selling system for landing pages, Stripe Checkout, and automated email delivery.",
  openGraph: {
    title: "DigiSell | Digital Workbook Checkout",
    description:
      "Sell premium downloadable workbooks with Stripe Checkout, secure delivery links, and transactional email fulfillment.",
    type: "website",
    siteName: "DigiSell",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
