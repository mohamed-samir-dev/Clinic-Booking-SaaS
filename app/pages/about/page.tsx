'use client';

import { FaHeart, FaLightbulb, FaCheckCircle } from 'react-icons/fa';
import Link from 'next/link';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useLanguage } from '@/app/contexts/LanguageContext';
import translations from '@/messages/translations';

export default function AboutPage() {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const t = translations[locale].about;
  
  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Hero Section */}
      <section className={`relative text-white py-20 px-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-linear-to-br from-teal-600 to-teal-800'}`}>
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-teal-200 text-sm font-semibold mb-2">{t.established}</p>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {t.heroTitle} <span className="text-teal-400">{t.heroTitleHighlight}</span>
          </h1>
          <p className="text-xl text-teal-100 max-w-3xl mx-auto mb-8">
            {t.heroDescription}
          </p>
          <Link href="/pages/doctors">
            <button className="bg-white cursor-pointer text-teal-700 px-8 py-3 rounded-lg font-semibold hover:bg-teal-50 transition">
              {t.meetDoctors}
            </button>
          </Link>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <h2 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{t.ourHistory}</h2>
            <span className="text-teal-600 text-2xl">|</span>
            <h3 className={`text-2xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{t.ourStory}</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <p className={`leading-relaxed mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                {t.storyPart1}
              </p>
              <p className={`leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                {t.storyPart2}
              </p>
            </div>
            
            <div className={`p-8 rounded-xl border-l-4 border-teal-600 ${theme === 'dark' ? 'bg-teal-900/20' : 'bg-teal-50'}`}>
              <p className={`italic text-lg leading-relaxed mb-4 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                &rdquo;{t.quote}&rdquo;
              </p>
              <p className="text-teal-700 font-semibold">{t.quoteAuthor}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className={`py-16 px-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-teal-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{t.timeline1Title}</h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                {t.timeline1Desc}
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-teal-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{t.timeline2Title}</h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                {t.timeline2Desc}
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-teal-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{t.timeline3Title}</h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                {t.timeline3Desc}
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-teal-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{t.timeline4Title}</h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                {t.timeline4Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={`py-16 px-6 text-white ${theme === 'dark' ? 'bg-gray-800' : 'bg-linear-to-r from-teal-600 to-teal-700'}`}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 text-center">
          <div>
            <div className="text-5xl font-bold mb-2">10+</div>
            <p className="text-teal-100 text-lg">{t.yearsExperience}</p>
          </div>
          <div>
            <div className="text-5xl font-bold mb-2">50k+</div>
            <p className="text-teal-100 text-lg">{t.happyPatients}</p>
          </div>
          <div>
            <div className="text-5xl font-bold mb-2">20+</div>
            <p className="text-teal-100 text-lg">{t.specializedDoctors}</p>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-3xl font-bold text-center mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{t.coreValues}</h2>
          <p className={`text-center mb-12 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            {t.coreValuesDesc}
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className={`p-8 rounded-xl shadow-lg hover:shadow-xl transition text-center ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
              <FaHeart className="text-5xl text-teal-600 mx-auto mb-4" />
              <h3 className={`text-xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{t.compassion}</h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                {t.compassionDesc}
              </p>
            </div>
            
            <div className={`p-8 rounded-xl shadow-lg hover:shadow-xl transition text-center ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
              <FaLightbulb className="text-5xl text-teal-600 mx-auto mb-4" />
              <h3 className={`text-xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{t.innovation}</h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                {t.innovationDesc}
              </p>
            </div>
            
            <div className={`p-8 rounded-xl shadow-lg hover:shadow-xl transition text-center ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
              <FaCheckCircle className="text-5xl text-teal-600 mx-auto mb-4" />
              <h3 className={`text-xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{t.excellence}</h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                {t.excellenceDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-16 px-6 text-white ${theme === 'dark' ? 'bg-gray-800' : 'bg-linear-to-br from-teal-600 to-teal-800'}`}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t.ctaTitle} <span className="text-teal-400">{t.ctaTitleHighlight}</span>?
          </h2>
          <p className="text-teal-100 text-lg mb-8">
            {t.ctaDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/pages/booking">
              <button className="bg-white cursor-pointer text-teal-700 px-8 py-3 rounded-lg font-semibold hover:bg-teal-50 transition">
                {t.bookOnline}
              </button>
            </Link>
            <button className="bg-teal-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-800 transition border-2 border-white">
              {t.callUs}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
