import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { APP_NAME, APP_TAGLINE, SITE_URL } from "@/lib/constants";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${APP_NAME} | AI website audits and outreach for web developers`,
    template: `%s | ${APP_NAME}`,
  },
  description:
    "Audit business websites, spot opportunities, and write personalized outreach emails. Built for web developers and agencies.",
  openGraph: {
    title: `${APP_NAME} | AI website audits and outreach`,
    description: APP_TAGLINE,
    url: "/",
    siteName: APP_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${APP_NAME} | AI website audits and outreach`,
    description: APP_TAGLINE,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
