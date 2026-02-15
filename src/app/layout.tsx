import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteProvider } from "@/contexts/SiteContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { CookieConsent } from "@/components/ui/cookie-consent";

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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200 overflow-x-hidden`}
      >
        <SiteProvider>
          <ThemeProvider>
            <LanguageProvider>
              {children}
              <CookieConsent />
            </LanguageProvider>
          </ThemeProvider>
        </SiteProvider>
      </body>
    </html>
  );
}
