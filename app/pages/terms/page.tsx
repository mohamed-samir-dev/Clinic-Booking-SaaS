'use client';

import Link from 'next/link';
import { FaFileContract } from 'react-icons/fa';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useLanguage } from '@/app/contexts/LanguageContext';
import translations from '@/messages/translations';

export default function TermsPage() {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const t = translations[locale].terms;
  const isRtl = locale === 'ar';

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Hero */}
      <section className={`relative text-white py-20 px-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-linear-to-br from-teal-600 to-teal-800'}`}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <FaFileContract className="text-teal-300 text-2xl" />
            <p className="text-teal-200 text-sm font-semibold">{t.hero.badge}</p>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t.hero.title} <span className="text-teal-300">{t.hero.titleHighlight}</span>
          </h1>
          <p className="text-teal-200 text-sm">{t.hero.lastUpdated}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <p className={`text-lg leading-relaxed mb-12 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            {t.intro}
          </p>

          <div className="space-y-8">
            {t.sections.map((section, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-xl border-s-4 border-teal-500 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white shadow-sm'}`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center text-sm font-bold shrink-0">
                    {idx + 1}
                  </span>
                  <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                    {section.title}
                  </h2>
                </div>
                <p className={`leading-relaxed ${isRtl ? 'pr-11' : 'pl-11'} ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {section.content}
                </p>
              </div>
            ))}
          </div>

          {/* Back link */}
          <div className="mt-12 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition"
            >
              {locale === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
