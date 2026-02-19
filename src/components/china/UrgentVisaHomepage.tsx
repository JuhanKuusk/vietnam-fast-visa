"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

/* ===============================
   CHINA DAILY COUNTER LOGIC
=============================== */

function getChinaDateKey() {
  const now = new Date();
  const chinaOffset = 8 * 60;
  const localOffset = now.getTimezoneOffset();
  const chinaTime = new Date(
    now.getTime() + (chinaOffset + localOffset) * 60000
  );
  return chinaTime.toISOString().split("T")[0];
}

function getChinaTime() {
  const now = new Date();
  const chinaOffset = 8 * 60;
  const localOffset = now.getTimezoneOffset();
  const chinaTime = new Date(
    now.getTime() + (chinaOffset + localOffset) * 60000
  );
  return chinaTime;
}

export default function UrgentVisaHomepage() {
  const [dailyCount, setDailyCount] = useState(87);
  const [totalCount, setTotalCount] = useState(18642);
  const [avgMinutes, setAvgMinutes] = useState(12);
  const [successRate] = useState(99.2);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedSpeed, setSelectedSpeed] = useState<"1hr" | "4hr" | "1day">("1hr");
  const [showNotification, setShowNotification] = useState(true);

  useEffect(() => {
    const dateKey = getChinaDateKey();
    const storageKey = "urgent_daily_" + dateKey;
    const totalKey = "urgent_total";
    const stored = localStorage.getItem(storageKey);
    const storedTotal = localStorage.getItem(totalKey);

    if (stored) {
      setDailyCount(parseInt(stored));
    } else {
      localStorage.setItem(storageKey, "87");
    }

    if (storedTotal) {
      setTotalCount(parseInt(storedTotal));
    } else {
      localStorage.setItem(totalKey, "18642");
    }

    // Update daily count periodically
    const interval = setInterval(() => {
      const increase = Math.floor(Math.random() * 2) + 1;
      setDailyCount((prev) => {
        const updated = prev + increase;
        localStorage.setItem(storageKey, updated.toString());
        return updated;
      });
      setTotalCount((prev) => {
        const updated = prev + 1;
        localStorage.setItem(totalKey, updated.toString());
        return updated;
      });
    }, 1000 * 60 * (30 + Math.random() * 30));

    return () => clearInterval(interval);
  }, []);

  // Animate average minutes
  useEffect(() => {
    const interval = setInterval(() => {
      setAvgMinutes(Math.floor(Math.random() * 5) + 10); // 10-14 minutes
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const prices = {
    "1hr": 1793,
    "4hr": 1329,
    "1day": 799,
  };

  const speedLabels = {
    "1hr": "1小时特急",
    "4hr": "4小时加急",
    "1day": "1天保证",
  };

  return (
    <div
      className="relative min-h-screen bg-[#f5f5f5] text-[#111]"
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
      }}
    >
      <div className="max-w-[430px] mx-auto relative">

        {/* ================= TOP TICKER BAR ================= */}
        <div
          className="bg-[#8B0000] text-white text-[11px] py-2 px-3 flex items-center justify-between overflow-hidden"
          style={{ letterSpacing: "0.3px" }}
        >
          <div className="flex items-center gap-1 whitespace-nowrap">
            <span className="text-yellow-300">刚刚成功办理</span>
            <span className="text-white font-bold">1小时签证</span>
            <span className="text-yellow-300">¥1793</span>
          </div>
          <div className="flex items-center gap-2 whitespace-nowrap">
            <span>今日已处理</span>
            <span className="text-yellow-300 font-bold">{dailyCount}</span>
            <span>单</span>
          </div>
          <div className="flex items-center gap-1 whitespace-nowrap">
            <span>平均出签</span>
            <span className="text-yellow-300 font-bold">{avgMinutes}</span>
            <span>分钟</span>
          </div>
        </div>

        {/* Second ticker row */}
        <div className="bg-[#6B0000] text-white text-[11px] py-1.5 px-3 flex items-center justify-center gap-4">
          <div className="flex items-center gap-1">
            <span className="text-green-400">✓</span>
            <span>支付宝 / 微信支付</span>
          </div>
          <span className="text-gray-400">|</span>
          <div className="flex items-center gap-1">
            <span className="text-green-400">✓</span>
            <span>24小时中文客服</span>
          </div>
        </div>

        {/* ================= HERO SECTION ================= */}
        <section
          className="relative px-4 pt-6 pb-8 text-white overflow-hidden"
          style={{
            background: "linear-gradient(180deg, #cc0000 0%, #990000 100%)",
          }}
        >
          {/* Airport background image */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: "url('/images/airport-bg.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              mixBlendMode: "overlay",
            }}
          />

          {/* Logo and headline */}
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-2xl">⭐</span>
              </div>
              <span className="text-lg font-bold text-yellow-300">登机保障</span>
              <span className="text-lg font-bold">签证服务</span>
            </div>

            <h1 className="text-[32px] leading-tight font-black mb-1">
              最快<span className="text-yellow-300">30</span>分钟出签
            </h1>
            <h2 className="text-[24px] leading-tight font-bold mb-4 opacity-95">
              保证值机通过
            </h2>

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="flex items-center gap-1.5 text-sm">
                <span className="text-green-400 text-lg">✓</span>
                <span>越南本地直营团队</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm">
                <span className="text-green-400 text-lg">✓</span>
                <span>胡志明市实体办公室</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm">
                <span className="text-green-400 text-lg">✓</span>
                <span>24小时人工审核</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm">
                <span className="text-green-400 text-lg">✓</span>
                <span>AI智能材料预审</span>
              </div>
            </div>
          </div>

          {/* Stats notification pill */}
          <div
            className="relative z-10 bg-white/20 backdrop-blur-sm rounded-full py-2 px-4 flex items-center justify-center gap-2"
          >
            <span className="text-yellow-300 text-lg">👋</span>
            <span className="text-sm">刚刚成功办理</span>
            <span className="text-yellow-300 font-bold">{totalCount.toLocaleString()}</span>
            <span className="text-sm">位旅客</span>
          </div>
        </section>

        {/* ================= MAIN CARD ================= */}
        <section className="px-4 -mt-2 relative z-20">
          <div
            className="bg-white rounded-[20px] p-5 shadow-xl"
            style={{ boxShadow: "0 10px 40px rgba(0,0,0,0.15)" }}
          >
            {/* Stats row */}
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-100">
              <div className="text-center">
                <div className="text-[11px] text-gray-500 mb-1">已累计服务</div>
                <div className="text-[22px] font-black text-[#cc0000]">{totalCount.toLocaleString()}</div>
                <div className="text-[11px] text-gray-500">位旅客</div>
              </div>
              <div className="w-px h-12 bg-gray-200" />
              <div className="text-center">
                <div className="text-[11px] text-gray-500 mb-1">近30天值机成功率</div>
                <div className="text-[22px] font-black text-[#cc0000]">{successRate}%</div>
                <div className="text-[11px] text-gray-500">保障通过</div>
              </div>
            </div>

            {/* Speed selection header */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-yellow-500 text-xl">⚡</span>
              <span className="font-bold text-[15px]">选择您的紧急程度</span>
            </div>

            {/* Speed cards */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {/* 1 Hour */}
              <button
                onClick={() => setSelectedSpeed("1hr")}
                className={`rounded-xl p-3 text-center transition-all ${
                  selectedSpeed === "1hr"
                    ? "bg-[#cc0000] text-white ring-2 ring-[#cc0000] ring-offset-2"
                    : "bg-[#ffebeb] text-[#cc0000]"
                }`}
              >
                <div className="text-[13px] font-bold mb-1">1小时特急</div>
                <div className="text-[18px] font-black">¥1793</div>
              </button>

              {/* 4 Hours */}
              <button
                onClick={() => setSelectedSpeed("4hr")}
                className={`rounded-xl p-3 text-center transition-all ${
                  selectedSpeed === "4hr"
                    ? "bg-[#f59e0b] text-white ring-2 ring-[#f59e0b] ring-offset-2"
                    : "bg-[#fef3c7] text-[#b45309]"
                }`}
              >
                <div className="text-[13px] font-bold mb-1">4小时加急</div>
                <div className="text-[18px] font-black">¥1329</div>
              </button>

              {/* 1 Day */}
              <button
                onClick={() => setSelectedSpeed("1day")}
                className={`rounded-xl p-3 text-center transition-all ${
                  selectedSpeed === "1day"
                    ? "bg-[#22c55e] text-white ring-2 ring-[#22c55e] ring-offset-2"
                    : "bg-[#dcfce7] text-[#16a34a]"
                }`}
              >
                <div className="text-[13px] font-bold mb-1">1天保证</div>
                <div className="text-[18px] font-black">¥799</div>
              </button>
            </div>

            {/* CTA Button */}
            <button
              className="w-full h-[52px] rounded-xl text-white text-[17px] font-bold flex items-center justify-center gap-2"
              style={{
                background: "linear-gradient(90deg, #cc0000, #990000)",
                boxShadow: "0 6px 20px rgba(204,0,0,0.4)",
              }}
            >
              <span className="text-yellow-300 text-xl">⚡</span>
              立即办理
            </button>

            {/* Payment methods */}
            <div className="flex items-center justify-center gap-4 mt-4 pt-3 border-t border-gray-100">
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 bg-[#1677ff] rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">支</span>
                </div>
                <span className="text-[12px] text-gray-600">支付宝</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 bg-[#07c160] rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">微</span>
                </div>
                <span className="text-[12px] text-gray-600">微信支付</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 bg-[#eb2f2f] rounded flex items-center justify-center">
                  <span className="text-white text-[10px] font-bold">银联</span>
                </div>
                <span className="text-[12px] text-gray-600">银联</span>
              </div>
            </div>
          </div>
        </section>

        {/* ================= FLOATING NOTIFICATION ================= */}
        {showNotification && (
          <div className="px-4 mt-4">
            <div
              className="bg-white rounded-full py-2.5 px-4 flex items-center justify-between shadow-md"
              style={{ boxShadow: "0 4px 15px rgba(0,0,0,0.1)" }}
            >
              <div className="flex items-center gap-2">
                <span className="text-yellow-400 text-lg">👋</span>
                <span className="text-[13px] text-gray-600">刚刚成功办理</span>
                <span className="text-[13px] text-[#cc0000] font-bold">1小时签证</span>
                <span className="text-[13px] text-[#cc0000] font-bold">¥1793</span>
              </div>
            </div>
          </div>
        )}

        {/* Payment badges row */}
        <div className="flex items-center justify-center gap-6 mt-4 mb-6">
          <div className="flex items-center gap-1.5">
            <div className="w-7 h-7 bg-[#1677ff] rounded flex items-center justify-center">
              <span className="text-white text-sm font-bold">支</span>
            </div>
            <span className="text-[11px] text-gray-500">支付宝</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-7 h-7 bg-[#07c160] rounded flex items-center justify-center">
              <span className="text-white text-sm font-bold">微</span>
            </div>
            <span className="text-[11px] text-gray-500">微信支付</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-7 h-7 bg-gradient-to-r from-orange-500 to-red-500 rounded flex items-center justify-center">
              <span className="text-white text-[9px] font-bold">银联</span>
            </div>
            <span className="text-[11px] text-gray-500">银联支付</span>
          </div>
        </div>

        {/* ================= WHY CHOOSE US ================= */}
        <section className="px-4 py-6 bg-white">
          <h2 className="text-center text-[18px] font-bold mb-5">
            为什么选择越南本地直营?
          </h2>

          {/* Office image */}
          <div className="relative rounded-xl overflow-hidden mb-5 shadow-lg">
            <div
              className="w-full h-[180px] bg-gray-200"
              style={{
                backgroundImage: "url('/images/office-vietnam.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Overlay badge */}
              <div className="absolute top-3 left-3 bg-white rounded-lg px-3 py-2 shadow-md flex items-center gap-2">
                <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
                  <span className="text-yellow-400 text-lg">⭐</span>
                </div>
                <div>
                  <div className="text-[10px] text-gray-500">越签 vm</div>
                  <div className="text-[9px] text-gray-400">Vietnam Visa Service</div>
                </div>
              </div>
            </div>
          </div>

          {/* Trust points */}
          <div className="space-y-3">
            <div className="flex items-start gap-3 bg-gray-50 rounded-xl p-3">
              <span className="text-green-500 text-lg mt-0.5">✓</span>
              <div>
                <span className="font-semibold">旅客拿打官家 就得保障</span>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-gray-50 rounded-xl p-3">
              <span className="text-green-500 text-lg mt-0.5">✓</span>
              <div>
                <span>专业签证公司</span>
                <span className="text-[#cc0000] font-bold">实力说服</span>
                <span>客户信誉至道</span>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-gray-50 rounded-xl p-3">
              <span className="text-green-500 text-lg mt-0.5">✓</span>
              <div>
                <span>专业签证客道</span>
                <span className="text-[#cc0000] font-bold">5年</span>
                <span>全程直营</span>
                <span className="text-[#cc0000] font-bold">100万</span>
                <span>+</span>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-gray-50 rounded-xl p-3">
              <span className="text-green-500 text-lg mt-0.5">✓</span>
              <div>
                <span>轻松急快</span>
                <span className="text-[#cc0000] font-bold">1小时拿签证</span>
                <span>大时卷！</span>
              </div>
            </div>
          </div>
        </section>

        {/* ================= FAQ SECTION ================= */}
        <section className="px-4 py-6 bg-[#f5f5f5]">
          <h2 className="text-center text-[18px] font-bold mb-2">常见问题</h2>
          <p className="text-center text-[13px] text-gray-500 mb-5">
            对应您的疑虑我们有专业解答 &gt;
          </p>

          <div className="space-y-2">
            {[
              "我们可以在机场紧急办理越南签证吗？",
              "越南可办理落地签证吗？",
              "办理越南签证需要什么材料？",
              "支付后多久可拿到越南批文？",
              "1小时真的可以出签吗？",
              "如何确保签证办理的安全性？",
            ].map((question, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-4 py-3.5 flex items-center justify-between text-left"
                >
                  <span className="text-[14px] font-medium">{question}</span>
                  <span className={`text-gray-400 transition-transform ${openFaq === index ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                {openFaq === index && (
                  <div className="px-4 pb-4 text-[13px] text-gray-600 leading-relaxed">
                    {index === 0 && "是的，我们提供机场紧急签证服务。资料齐全情况下可在60分钟内获得批文，确保您顺利登机。"}
                    {index === 1 && "中国公民可以申请越南落地签证，但需要提前获得批准函。我们可以快速帮您办理批准函。"}
                    {index === 2 && "需要护照首页照片、2寸白底证件照、入境日期和机场信息。我们的AI系统会自动审核材料。"}
                    {index === 3 && "根据您选择的服务等级：1小时特急、4小时加急或1天保证，我们会在相应时间内发送批文到您的邮箱。"}
                    {index === 4 && "是的，资料齐全情况下可在60分钟内获得批文。我们有专业团队24小时处理紧急申请。"}
                    {index === 5 && "我们是越南本地注册公司，拥有正规签证代办资质。所有支付通过支付宝/微信担保，安全可靠。"}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ================= CONTACT SECTION ================= */}
        <section className="px-4 py-6 bg-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[13px] text-gray-500 mb-1">客服热线</div>
              <div className="text-[18px] font-bold text-[#cc0000]">023-0309-0993</div>
            </div>
            <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center">
              <span className="text-[10px] text-gray-400">微信二维码</span>
            </div>
          </div>
          <p className="text-[12px] text-gray-500 mt-3">
            签证百年咖啡推荐·顺时根搜·筒情杏烟酿联
          </p>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="text-green-500">✓</span>
            <span className="text-[12px] text-gray-600">贴签召年效使·更抉里官厅跑跑</span>
          </div>
        </section>

        {/* ================= FOOTER ================= */}
        <footer className="bg-[#1a1a1a] text-gray-400 px-4 py-6 text-[12px]">
          <div className="flex items-center justify-center gap-6 mb-4">
            <div className="flex items-center gap-1.5">
              <div className="w-8 h-8 bg-[#1677ff] rounded flex items-center justify-center">
                <span className="text-white text-sm font-bold">支</span>
              </div>
              <div>
                <div className="text-[11px] text-white">支付宝</div>
                <div className="text-[9px] text-gray-500">ALIPAY</div>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-8 h-8 bg-[#07c160] rounded flex items-center justify-center">
                <span className="text-white text-sm font-bold">微</span>
              </div>
              <div>
                <div className="text-[11px] text-white">微信安付</div>
                <div className="text-[9px] text-gray-500">微信担保交易安全</div>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded flex items-center justify-center">
                <span className="text-white text-[9px] font-bold">银联</span>
              </div>
              <div>
                <div className="text-[11px] text-white">银联</div>
                <div className="text-[9px] text-gray-500">UNIONPAY</div>
              </div>
            </div>
          </div>
          <p className="text-center text-gray-500">
            © 2026 越签.com · 越南本地合法签证服务
          </p>
        </footer>

        {/* Bottom spacing for fixed bar */}
        <div className="h-20" />
      </div>

      {/* ================= FIXED BOTTOM BAR ================= */}
      <div
        className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50"
        style={{ boxShadow: "0 -4px 20px rgba(0,0,0,0.1)" }}
      >
        <div className="max-w-[430px] mx-auto px-4 py-3">
          <button
            className="w-full h-[48px] rounded-xl text-white text-[16px] font-bold flex items-center justify-center gap-2"
            style={{
              background: "linear-gradient(90deg, #22c55e, #16a34a)",
              boxShadow: "0 4px 15px rgba(34,197,94,0.4)",
            }}
          >
            <span className="text-lg">➕</span>
            在线客服咨询办签证
          </button>
        </div>
      </div>
    </div>
  );
}
