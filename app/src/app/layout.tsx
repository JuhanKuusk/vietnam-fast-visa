import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vietnam E-Visa in 30 Minutes | VietnamVisaHelp.com",
  description: "Get your Vietnam E-Visa approval letter in 30 minutes. Stuck at check-in? We fix that fast. Express visa service for urgent travelers.",
  keywords: "Vietnam visa, e-visa, urgent visa, fast visa, Vietnam travel, approval letter",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}

        {/* Askly Chat Widget */}
        <Script
          src="https://chat.askly.me/cw/chat/latest.js"
          tw-client-key="ubfeimuozup98jkokndvfgss"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
