"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSite } from "@/contexts/SiteContext";
import { IndianPaymentIcons } from "./indian-payment-icons";

export function Footer() {
  const { t } = useLanguage();
  const { content, layout, isIndiaSite, theme } = useSite();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Important Disclaimer */}
        <div className="mb-4">
          <h3 className="text-amber-400 font-semibold mb-1.5 text-sm">{t.legal.importantDisclaimer}</h3>
          <p className="text-xs text-gray-400">
            {t.legal.disclaimerBannerText}
          </p>
        </div>

        {/* Policy Links and Payment Methods - combined on desktop, separate on mobile */}
        <div className="mb-4">
          {/* Desktop: Policy links and payment logos on same row */}
          <div className="hidden sm:flex justify-center items-center gap-4 flex-wrap">
            <Link href="/terms" className="text-xs text-gray-400 hover:text-white transition-colors">
              {t.legal.footerTerms}
            </Link>
            <span className="text-gray-600">|</span>
            <Link href="/refund" className="text-xs text-gray-400 hover:text-white transition-colors">
              {t.legal.footerRefund}
            </Link>
            <span className="text-gray-600">|</span>
            <Link href="/privacy" className="text-xs text-gray-400 hover:text-white transition-colors">
              {t.legal.footerPrivacy}
            </Link>
            <span className="text-gray-600">|</span>
            <span className="text-xs text-gray-500">{t.legal.securePayment}</span>
            {/* Visa */}
            <svg className="h-8 w-auto" viewBox="0 0 750 471" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="750" height="471" rx="40" fill="#1A1F71"/>
              <path d="M278.198 334.228L311.058 138.55H364.534L331.67 334.228H278.198Z" fill="white"/>
              <path d="M524.307 142.687C513.088 138.55 495.395 134 473.639 134C420.835 134 383.875 161.478 383.548 201.185C383.228 230.934 410.937 247.535 431.864 257.359C453.311 267.401 460.674 273.95 460.582 283.119C460.445 297.187 443.655 303.57 427.973 303.57C406.201 303.57 394.64 300.379 376.952 292.418L369.736 288.938L361.886 336.103C374.586 341.625 397.855 346.441 421.979 346.686C478.067 346.686 514.354 319.504 514.816 277.169C515.028 253.504 500.126 235.413 468.548 220.477C449.28 210.96 437.532 204.569 437.66 194.748C437.66 185.963 447.953 176.576 470.099 176.576C488.636 176.265 502.472 180.23 513.357 184.367L518.571 186.788L526.261 141.093L524.307 142.687Z" fill="white"/>
              <path d="M612.936 138.55H571.69C558.657 138.55 548.866 142.215 543.093 155.649L464.182 334.228H520.177C520.177 334.228 529.501 309.232 531.67 303.166C537.97 303.166 592.285 303.254 600.364 303.254C602.048 311.236 607.115 334.228 607.115 334.228H656.499L612.936 138.55ZM548.263 260.069C552.68 248.746 570.509 200.773 570.509 200.773C570.181 201.302 574.883 189.082 577.589 181.524L581.172 199.036C581.172 199.036 592.002 249.315 594.271 260.069H548.263Z" fill="white"/>
              <path d="M232.903 138.55L180.668 267.401L175.113 240.594C165.556 210.064 137.299 176.904 105.799 160.298L153.414 333.987H209.84L289.33 138.55H232.903Z" fill="white"/>
              <path d="M131.92 138.55H45.8776L45.125 142.755C112.024 159.533 156.601 200.025 175.109 240.607L156.237 155.871C152.986 142.656 143.284 138.953 131.92 138.55Z" fill="#F9A533"/>
            </svg>
            {/* Mastercard */}
            <svg className="h-8 w-auto" viewBox="0 0 750 471" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="750" height="471" rx="40" fill="#16366F"/>
              <circle cx="299" cy="235.5" r="143" fill="#EB001B"/>
              <circle cx="451" cy="235.5" r="143" fill="#F79E1B"/>
              <path d="M375 124.5C410.898 152.069 434 195.721 434 244.5C434 293.279 410.898 336.931 375 364.5C339.102 336.931 316 293.279 316 244.5C316 195.721 339.102 152.069 375 124.5Z" fill="#FF5F00"/>
            </svg>
            {/* PayPal */}
            <svg className="h-8 w-auto" viewBox="0 0 750 471" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="750" height="471" rx="40" fill="#003087"/>
              <path d="M338.5 163H271.5C267.5 163 264 166.5 263.5 170.5L235.5 343C235 346 237 349 240.5 349H273C277 349 280.5 345.5 281 341.5L289 291.5C289.5 287.5 293 284 297 284H320C363 284 388 262.5 395 222C398 205 395.5 191 387.5 181C378.5 169.5 361.5 163 338.5 163ZM347 224.5C343 251 322.5 251 303 251H291.5L299.5 199.5C300 196.5 302.5 194 305.5 194H310.5C324 194 336.5 194 343 202C347 207.5 348.5 215 347 224.5Z" fill="white"/>
              <path d="M495 222.5H461.5C458.5 222.5 456 225 455.5 228L454 238L451.5 234.5C444 223.5 427 220 410 220C371 220 337.5 250 331 294.5C327.5 316.5 332.5 337.5 345 352C356 364.5 372 370 391.5 370C424.5 370 442.5 348.5 442.5 348.5L441 358.5C440.5 361.5 442.5 364.5 446 364.5H476C480 364.5 483.5 361 484 357L502.5 229.5C503 226.5 501 223.5 497.5 223.5H495V222.5ZM453.5 296C450 317.5 433 332 411 332C400 332 391 328.5 385.5 322C380 315.5 378 306.5 379.5 296.5C382.5 275.5 400 260.5 421.5 260.5C432 260.5 441 264 446.5 270.5C452.5 277.5 455 286 453.5 296Z" fill="white"/>
              <path d="M622 222.5H588.5C585.5 222.5 583 225 582.5 228L581 238L578.5 234.5C571 223.5 554 220 537 220C498 220 464.5 250 458 294.5C454.5 316.5 459.5 337.5 472 352C483 364.5 499 370 518.5 370C551.5 370 569.5 348.5 569.5 348.5L568 358.5C567.5 361.5 569.5 364.5 573 364.5H603C607 364.5 610.5 361 611 357L629.5 229.5C630 226.5 628 223.5 624.5 223.5H622V222.5ZM580.5 296C577 317.5 560 332 538 332C527 332 518 328.5 512.5 322C507 315.5 505 306.5 506.5 296.5C509.5 275.5 527 260.5 548.5 260.5C559 260.5 568 264 573.5 270.5C579.5 277.5 582 286 580.5 296Z" fill="white"/>
            </svg>
            {/* Alipay */}
            <svg className="h-8 w-auto" viewBox="0 0 750 471" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="750" height="471" rx="40" fill="#1677FF"/>
              <path d="M584.5 300C584.5 300 498 266 437.5 243.5C453 210.5 463.5 172 463.5 172H378.5V209H424.5C424.5 209 416.5 242 397 277C363.5 261.5 320 250 320 300C320 350 365 370 410 350C455 330 484.5 295 484.5 295C484.5 295 551 330 584.5 300Z" fill="white"/>
              <path d="M375 145C294.5 145 229 210.5 229 291C229 371.5 294.5 437 375 437C455.5 437 521 371.5 521 291C521 210.5 455.5 145 375 145ZM375 410C309.5 410 256 356.5 256 291C256 225.5 309.5 172 375 172C440.5 172 494 225.5 494 291C494 356.5 440.5 410 375 410Z" fill="white"/>
              <text x="175" y="310" fill="white" fontSize="90" fontFamily="Arial, sans-serif" fontWeight="bold">A</text>
            </svg>
          </div>

          {/* Mobile: Policy links row */}
          <div className="sm:hidden text-center mb-3">
            <Link href="/terms" className="text-xs text-gray-400 hover:text-white transition-colors">
              {t.legal.footerTerms}
            </Link>
            <span className="text-gray-600 mx-2">|</span>
            <Link href="/refund" className="text-xs text-gray-400 hover:text-white transition-colors">
              {t.legal.footerRefund}
            </Link>
            <span className="text-gray-600 mx-2">|</span>
            <Link href="/privacy" className="text-xs text-gray-400 hover:text-white transition-colors">
              {t.legal.footerPrivacy}
            </Link>
          </div>

          {/* Mobile: Payment logos row */}
          <div className="sm:hidden flex justify-center items-center gap-3">
            <span className="text-xs text-gray-500">{t.legal.securePayment}</span>
            {/* Visa */}
            <svg className="h-8 w-auto" viewBox="0 0 750 471" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="750" height="471" rx="40" fill="#1A1F71"/>
              <path d="M278.198 334.228L311.058 138.55H364.534L331.67 334.228H278.198Z" fill="white"/>
              <path d="M524.307 142.687C513.088 138.55 495.395 134 473.639 134C420.835 134 383.875 161.478 383.548 201.185C383.228 230.934 410.937 247.535 431.864 257.359C453.311 267.401 460.674 273.95 460.582 283.119C460.445 297.187 443.655 303.57 427.973 303.57C406.201 303.57 394.64 300.379 376.952 292.418L369.736 288.938L361.886 336.103C374.586 341.625 397.855 346.441 421.979 346.686C478.067 346.686 514.354 319.504 514.816 277.169C515.028 253.504 500.126 235.413 468.548 220.477C449.28 210.96 437.532 204.569 437.66 194.748C437.66 185.963 447.953 176.576 470.099 176.576C488.636 176.265 502.472 180.23 513.357 184.367L518.571 186.788L526.261 141.093L524.307 142.687Z" fill="white"/>
              <path d="M612.936 138.55H571.69C558.657 138.55 548.866 142.215 543.093 155.649L464.182 334.228H520.177C520.177 334.228 529.501 309.232 531.67 303.166C537.97 303.166 592.285 303.254 600.364 303.254C602.048 311.236 607.115 334.228 607.115 334.228H656.499L612.936 138.55ZM548.263 260.069C552.68 248.746 570.509 200.773 570.509 200.773C570.181 201.302 574.883 189.082 577.589 181.524L581.172 199.036C581.172 199.036 592.002 249.315 594.271 260.069H548.263Z" fill="white"/>
              <path d="M232.903 138.55L180.668 267.401L175.113 240.594C165.556 210.064 137.299 176.904 105.799 160.298L153.414 333.987H209.84L289.33 138.55H232.903Z" fill="white"/>
              <path d="M131.92 138.55H45.8776L45.125 142.755C112.024 159.533 156.601 200.025 175.109 240.607L156.237 155.871C152.986 142.656 143.284 138.953 131.92 138.55Z" fill="#F9A533"/>
            </svg>
            {/* Mastercard */}
            <svg className="h-8 w-auto" viewBox="0 0 750 471" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="750" height="471" rx="40" fill="#16366F"/>
              <circle cx="299" cy="235.5" r="143" fill="#EB001B"/>
              <circle cx="451" cy="235.5" r="143" fill="#F79E1B"/>
              <path d="M375 124.5C410.898 152.069 434 195.721 434 244.5C434 293.279 410.898 336.931 375 364.5C339.102 336.931 316 293.279 316 244.5C316 195.721 339.102 152.069 375 124.5Z" fill="#FF5F00"/>
            </svg>
            {/* PayPal */}
            <svg className="h-8 w-auto" viewBox="0 0 750 471" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="750" height="471" rx="40" fill="#003087"/>
              <path d="M338.5 163H271.5C267.5 163 264 166.5 263.5 170.5L235.5 343C235 346 237 349 240.5 349H273C277 349 280.5 345.5 281 341.5L289 291.5C289.5 287.5 293 284 297 284H320C363 284 388 262.5 395 222C398 205 395.5 191 387.5 181C378.5 169.5 361.5 163 338.5 163ZM347 224.5C343 251 322.5 251 303 251H291.5L299.5 199.5C300 196.5 302.5 194 305.5 194H310.5C324 194 336.5 194 343 202C347 207.5 348.5 215 347 224.5Z" fill="white"/>
              <path d="M495 222.5H461.5C458.5 222.5 456 225 455.5 228L454 238L451.5 234.5C444 223.5 427 220 410 220C371 220 337.5 250 331 294.5C327.5 316.5 332.5 337.5 345 352C356 364.5 372 370 391.5 370C424.5 370 442.5 348.5 442.5 348.5L441 358.5C440.5 361.5 442.5 364.5 446 364.5H476C480 364.5 483.5 361 484 357L502.5 229.5C503 226.5 501 223.5 497.5 223.5H495V222.5ZM453.5 296C450 317.5 433 332 411 332C400 332 391 328.5 385.5 322C380 315.5 378 306.5 379.5 296.5C382.5 275.5 400 260.5 421.5 260.5C432 260.5 441 264 446.5 270.5C452.5 277.5 455 286 453.5 296Z" fill="white"/>
              <path d="M622 222.5H588.5C585.5 222.5 583 225 582.5 228L581 238L578.5 234.5C571 223.5 554 220 537 220C498 220 464.5 250 458 294.5C454.5 316.5 459.5 337.5 472 352C483 364.5 499 370 518.5 370C551.5 370 569.5 348.5 569.5 348.5L568 358.5C567.5 361.5 569.5 364.5 573 364.5H603C607 364.5 610.5 361 611 357L629.5 229.5C630 226.5 628 223.5 624.5 223.5H622V222.5ZM580.5 296C577 317.5 560 332 538 332C527 332 518 328.5 512.5 322C507 315.5 505 306.5 506.5 296.5C509.5 275.5 527 260.5 548.5 260.5C559 260.5 568 264 573.5 270.5C579.5 277.5 582 286 580.5 296Z" fill="white"/>
            </svg>
            {/* Alipay */}
            <svg className="h-8 w-auto" viewBox="0 0 750 471" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="750" height="471" rx="40" fill="#1677FF"/>
              <path d="M584.5 300C584.5 300 498 266 437.5 243.5C453 210.5 463.5 172 463.5 172H378.5V209H424.5C424.5 209 416.5 242 397 277C363.5 261.5 320 250 320 300C320 350 365 370 410 350C455 330 484.5 295 484.5 295C484.5 295 551 330 584.5 300Z" fill="white"/>
              <path d="M375 145C294.5 145 229 210.5 229 291C229 371.5 294.5 437 375 437C455.5 437 521 371.5 521 291C521 210.5 455.5 145 375 145ZM375 410C309.5 410 256 356.5 256 291C256 225.5 309.5 172 375 172C440.5 172 494 225.5 494 291C494 356.5 440.5 410 375 410Z" fill="white"/>
              <text x="175" y="310" fill="white" fontSize="90" fontFamily="Arial, sans-serif" fontWeight="bold">A</text>
            </svg>
          </div>
        </div>

        {/* Indian Payment Methods (only shows on India site) */}
        {isIndiaSite && (
          <div className="mb-4 flex justify-center">
            <IndianPaymentIcons showLabel={true} className="py-2" />
          </div>
        )}

        {/* Support Hours for India */}
        {layout.showISTTimezone && (
          <div className="text-center mb-4 py-2 bg-gray-800 rounded-lg">
            <p className="text-sm text-amber-400">
              🇮🇳 Support Hours: 6:30 AM - 11:30 PM IST (Indian Standard Time)
            </p>
            <p className="text-xs text-gray-400 mt-1">
              WhatsApp support available 24/7 for urgent requests
            </p>
          </div>
        )}

        {/* Contact Info & Copyright */}
        <div className="border-t border-gray-700 pt-4 text-center text-xs text-gray-400">
          <p className="mb-1.5">
            <span>Email: </span>
            <a href={`mailto:${content.supportEmail}`} className="hover:text-white transition-colors">
              {content.supportEmail}
            </a>
            <span className="mx-2">|</span>
            <span>WhatsApp: </span>
            <a href={`https://wa.me/${content.whatsappNumber.replace(/\+/g, '')}`} className="hover:text-white transition-colors">
              {content.whatsappDisplay}
            </a>
            <span className="mx-2">|</span>
            <span>Address: Park 7 Building, Floor 38, Vinhomes Central Park, 720A, Binh Thanh District, Ho Chi Minh City, Vietnam</span>
          </p>
          <p className="text-gray-500 text-xs">
            © 2026 {content.siteName} - All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
