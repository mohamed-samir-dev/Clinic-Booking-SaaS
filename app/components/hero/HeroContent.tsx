'use client';
import Link from 'next/link';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useLanguage } from '@/app/contexts/LanguageContext';
import messages from '@/messages/en.json';
import messagesAr from '@/messages/ar.json';

export default function HeroContent() {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const t = locale === 'ar' ? messagesAr.hero : messages.hero;

  return (
    <div className={`space-y-4 sm:space-y-5 md:space-y-6 max-w-2xl text-center ${locale === 'ar' ? 'lg:text-right' : 'lg:text-left'}`}>
      <div className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-teal-600/90 backdrop-blur-sm rounded-full">
        <span className="text-white font-semibold text-xs sm:text-sm">{t.badge}</span>
      </div>
      
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
        {t.title}
        <span className={`${theme === 'dark' ? 'text-teal-300' : 'text-teal-400'}`}>{t.titleHighlight}</span>
      </h1>
      
      <p className={`text-base sm:text-lg md:text-xl leading-relaxed px-2 sm:px-0 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-200'}`}>
        {t.description}
      </p>

      <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start">
        <Link
          href="/pages/booking"
          className="px-6 sm:px-8 py-3 sm:py-4 bg-teal-600 text-white rounded-full font-semibold text-sm sm:text-base hover:bg-teal-700 transition-all shadow-lg hover:shadow-xl hover:scale-105"
        >
          {t.bookAppointment}
        </Link>
        <Link
          href="/pages/contact"
          className="px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white rounded-full font-semibold text-sm sm:text-base hover:bg-white/20 transition-all"
        >
          {t.contactUs}
        </Link>
      </div>
    </div>
  );
}
