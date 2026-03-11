import { Stethoscope } from 'lucide-react';
import { FormData } from '../types';

interface SpecialtyExperienceSectionProps {
  formData: FormData;
  onUpdate: (data: Partial<FormData>) => void;
  language?: 'ar' | 'en';
}

const translations = {
  ar: {
    title: 'التخصص والخبرة',
    specialtyEn: 'التخصص (إنجليزي)',
    specialtyAr: 'التخصص (عربي)',
    experienceYears: 'سنوات الخبرة',
    briefAr: 'نبذة مختصرة (عربي)',
    briefEn: 'نبذة مختصرة (إنجليزي)',
    bioAr: 'السيرة الذاتية (عربي)',
    bioEn: 'السيرة الذاتية (إنجليزي)',
    aboutUsAr: 'عنا (عربي)',
    aboutUsEn: 'عنا (إنجليزي)',
    languages: 'اللغات',
    tags: 'الوسوم',
    characters: 'حرف',
    briefPlaceholderAr: 'نبذة مختصرة عن الدكتور',
    briefPlaceholderEn: 'A brief introduction about the doctor',
    bioPlaceholderAr: 'متخصص في العلاجات المتقدمة',
    bioPlaceholderEn: 'Specialist in advanced treatments',
    aboutUsPlaceholderAr: 'معلومات تفصيلية عن خلفية الدكتور وإنجازاته وخبراته...',
    aboutUsPlaceholderEn: 'Detailed information about the doctor\'s background, achievements, and expertise...',
    languagesPlaceholder: 'ar, en',
    tagsPlaceholder: 'kids, surgery, online',
    commaSeparated: '(comma separated)'
  },
  en: {
    title: 'Specialty & Experience',
    specialtyEn: 'Specialty (English)',
    specialtyAr: 'Specialty (Arabic)',
    experienceYears: 'Experience Years',
    briefAr: 'Brief (Arabic)',
    briefEn: 'Brief (English)',
    bioAr: 'Bio (Arabic)',
    bioEn: 'Bio (English)',
    aboutUsAr: 'About Us (Arabic)',
    aboutUsEn: 'About Us (English)',
    languages: 'Languages',
    tags: 'Tags',
    characters: 'characters',
    briefPlaceholderAr: 'نبذة مختصرة عن الدكتور',
    briefPlaceholderEn: 'A brief introduction about the doctor',
    bioPlaceholderAr: 'متخصص في العلاجات المتقدمة',
    bioPlaceholderEn: 'Specialist in advanced treatments',
    aboutUsPlaceholderAr: 'معلومات تفصيلية عن خلفية الدكتور وإنجازاته وخبراته...',
    aboutUsPlaceholderEn: 'Detailed information about the doctor\'s background, achievements, and expertise...',
    languagesPlaceholder: 'ar, en',
    tagsPlaceholder: 'kids, surgery, online',
    commaSeparated: '(comma separated)'
  }
};

export default function SpecialtyExperienceSection({ formData, onUpdate, language = 'en' }: SpecialtyExperienceSectionProps) {
  const t = translations[language];
  
  return (
    <div className="bg-gray-700/50 p-5 rounded-xl border border-gray-600">
      <div className="flex items-center gap-3 mb-3">
        <div className="bg-teal-600 p-2 rounded-lg">
          <Stethoscope size={18} className="text-white" />
        </div>
        <h3 className="text-lg font-bold text-white">{t.title}</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">{t.specialtyEn} *</label>
          <input
            type="text"
            required
            value={formData.specialty.en}
            onChange={(e) => onUpdate({ specialty: { ...formData.specialty, en: e.target.value } })}
            className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white"
            placeholder="Cardiology"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">{t.specialtyAr}</label>
          <input
            type="text"
            value={formData.specialty.ar}
            onChange={(e) => onUpdate({ specialty: { ...formData.specialty, ar: e.target.value } })}
            className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white"
            placeholder="أمراض القلب"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">{t.experienceYears}</label>
          <input
            type="number"
            min="0"
            value={formData.experienceYears}
            onChange={(e) => onUpdate({ experienceYears: e.target.value })}
            className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white"
            placeholder="5"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-300 mb-2">{t.briefAr}</label>
          <textarea
            value={formData.brief.ar}
            onChange={(e) => onUpdate({ brief: { ...formData.brief, ar: e.target.value } })}
            rows={2}
            maxLength={200}
            className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white"
            placeholder={t.briefPlaceholderAr}
          />
          <p className="text-xs text-gray-500 mt-1">{formData.brief.ar.length}/200 {t.characters}</p>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-300 mb-2">{t.briefEn}</label>
          <textarea
            value={formData.brief.en}
            onChange={(e) => onUpdate({ brief: { ...formData.brief, en: e.target.value } })}
            rows={2}
            maxLength={200}
            className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white"
            placeholder={t.briefPlaceholderEn}
          />
          <p className="text-xs text-gray-500 mt-1">{formData.brief.en.length}/200 {t.characters}</p>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-300 mb-2">{t.bioAr}</label>
          <textarea
            value={formData.bio.ar}
            onChange={(e) => onUpdate({ bio: { ...formData.bio, ar: e.target.value } })}
            rows={3}
            maxLength={500}
            className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white"
            placeholder={t.bioPlaceholderAr}
          />
          <p className="text-xs text-gray-500 mt-1">{formData.bio.ar.length}/500 {t.characters}</p>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-300 mb-2">{t.bioEn}</label>
          <textarea
            value={formData.bio.en}
            onChange={(e) => onUpdate({ bio: { ...formData.bio, en: e.target.value } })}
            rows={3}
            maxLength={500}
            className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white"
            placeholder={t.bioPlaceholderEn}
          />
          <p className="text-xs text-gray-500 mt-1">{formData.bio.en.length}/500 {t.characters}</p>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-300 mb-2">{t.aboutUsAr}</label>
          <textarea
            value={formData.aboutUs.ar}
            onChange={(e) => onUpdate({ aboutUs: { ...formData.aboutUs, ar: e.target.value } })}
            rows={6}
            maxLength={2000}
            className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white"
            placeholder={t.aboutUsPlaceholderAr}
          />
          <p className="text-xs text-gray-500 mt-1">{formData.aboutUs.ar.length}/2000 {t.characters}</p>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-300 mb-2">{t.aboutUsEn}</label>
          <textarea
            value={formData.aboutUs.en}
            onChange={(e) => onUpdate({ aboutUs: { ...formData.aboutUs, en: e.target.value } })}
            rows={6}
            maxLength={2000}
            className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white"
            placeholder={t.aboutUsPlaceholderEn}
          />
          <p className="text-xs text-gray-500 mt-1">{formData.aboutUs.en.length}/2000 {t.characters}</p>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">{t.languages} {t.commaSeparated}</label>
          <input
            type="text"
            value={formData.languages}
            onChange={(e) => onUpdate({ languages: e.target.value })}
            className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white"
            placeholder={t.languagesPlaceholder}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">{t.tags} {t.commaSeparated}</label>
          <input
            type="text"
            value={formData.tags}
            onChange={(e) => onUpdate({ tags: e.target.value })}
            className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white"
            placeholder={t.tagsPlaceholder}
          />
        </div>
      </div>
    </div>
  );
}
