"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSite } from "@/contexts/SiteContext";
import { SupportedLanguage } from "@/lib/translations";

export function LanguageSelector() {
  const { language, setLanguage, languages, isLoading } = useLanguage();
  const { siteConfig } = useSite();

  // Filter languages based on site config (if availableLanguages is set)
  const availableLanguages = useMemo(() => {
    const allowedLanguages = siteConfig.behavior.availableLanguages;
    if (!allowedLanguages || allowedLanguages.length === 0) {
      return Object.keys(languages) as SupportedLanguage[];
    }
    return allowedLanguages;
  }, [siteConfig.behavior.availableLanguages, languages]);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0 });

  // Set mounted state for portal
  useEffect(() => {
    setMounted(true);
  }, []);

  // Calculate dropdown position when opening
  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 8, // 8px gap below button
        right: window.innerWidth - rect.right,
      });
    }
  }, [isOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (
        buttonRef.current && !buttonRef.current.contains(target) &&
        dropdownRef.current && !dropdownRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  // Close dropdown on scroll
  useEffect(() => {
    if (isOpen) {
      const handleScroll = () => setIsOpen(false);
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [isOpen]);

  const currentLang = languages[language];

  const dropdownContent = isOpen && mounted ? createPortal(
    <div
      ref={dropdownRef}
      className="fixed w-48 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 py-2"
      style={{
        top: dropdownPosition.top,
        right: dropdownPosition.right,
        zIndex: 99999,
      }}
    >
      {availableLanguages.map((langCode) => {
        const lang = languages[langCode];
        const isSelected = langCode === language;

        return (
          <button
            key={langCode}
            onClick={() => {
              setLanguage(langCode);
              setIsOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
              isSelected ? "bg-gray-50 dark:bg-gray-700" : ""
            }`}
          >
            <span className="text-xl">{lang.flag}</span>
            <span className={`flex-1 text-sm ${isSelected ? "font-semibold text-gray-900 dark:text-white" : "text-gray-700 dark:text-gray-300"}`}>
              {lang.nativeName}
            </span>
            {isSelected && (
              <svg className="w-4 h-4" style={{ color: '#ef7175' }} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        );
      })}
    </div>,
    document.body
  ) : null;

  return (
    <>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="flex-shrink-0 flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm font-medium text-gray-700 dark:text-gray-200"
        disabled={isLoading}
      >
        <span className="text-xl sm:text-base">{currentLang.flag}</span>
        <span className="hidden sm:inline">{currentLang.nativeName}</span>
        {isLoading ? (
          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : (
          <svg
            className={`w-4 h-4 hidden sm:block transition-transform ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </button>
      {dropdownContent}
    </>
  );
}
