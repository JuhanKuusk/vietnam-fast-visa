"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSite } from "@/contexts/SiteContext";
import { LanguageSelector } from "@/components/ui/language-selector";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Footer } from "@/components/ui/footer";
import { Logo } from "@/components/ui/logo";

export default function DisclaimerPage() {
  const { t } = useLanguage();
  const { isChinaSite } = useSite();

  // Dynamic site display name
  const siteDisplayName = isChinaSite ? "越签.com" : "VietnamTravel.help";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="hover:opacity-90 transition-opacity">
            <Logo size="md" siteName={isChinaSite ? "越签.com" : undefined} />
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <LanguageSelector />
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            {isChinaSite ? "免责声明" : "Disclaimer"}
          </h1>

          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
            {isChinaSite ? (
              <>
                {siteDisplayName} 是由百思价旅行社运营的私人旅行咨询和礼宾服务（许可证号：01-1794/2022/SDL-GPLHND）。我们与越南政府、大使馆或移民局无关。我们提供B2B和B2C旅行规划、机场快速通道和文件准备协助服务。旅客可选择通过官方政府门户网站直接办理入境要求和旅行证件。
              </>
            ) : (
              <>
                {siteDisplayName} is a private travel consultancy and concierge service operated by BestPrice Travel (License No: 01-1794/2022/SDL-GPLHND). We are not affiliated with the Vietnamese Government, embassies, or the Immigration Department. We provide B2B and B2C travel planning, airport fast-track, and document preparation assistance. Travelers may choose to arrange their own entry requirements and travel documents directly through official government portals.
              </>
            )}
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
