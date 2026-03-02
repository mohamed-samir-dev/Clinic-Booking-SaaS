import { Stethoscope } from 'lucide-react';
import { FormData } from '../types';

interface SpecialtyExperienceSectionProps {
  formData: FormData;
  onUpdate: (data: Partial<FormData>) => void;
}

export default function SpecialtyExperienceSection({ formData, onUpdate }: SpecialtyExperienceSectionProps) {
  return (
    <div className="bg-gray-700/50 p-5 rounded-xl border border-gray-600">
      <div className="flex items-center gap-3 mb-3">
        <div className="bg-teal-600 p-2 rounded-lg">
          <Stethoscope size={18} className="text-white" />
        </div>
        <h3 className="text-lg font-bold text-white">التخصص والخبرة - Specialty & Experience</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">التخصص (إنجليزي) - Specialty (English) *</label>
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
          <label className="block text-sm font-semibold text-gray-300 mb-2">التخصص (عربي) - Specialty (Arabic)</label>
          <input
            type="text"
            value={formData.specialty.ar}
            onChange={(e) => onUpdate({ specialty: { ...formData.specialty, ar: e.target.value } })}
            className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white"
            placeholder="أمراض القلب"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">سنوات الخبرة - Experience Years</label>
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
          <label className="block text-sm font-semibold text-gray-300 mb-2">نبذة مختصرة (عربي) - Brief (Arabic)</label>
          <textarea
            value={formData.brief.ar}
            onChange={(e) => onUpdate({ brief: { ...formData.brief, ar: e.target.value } })}
            rows={2}
            maxLength={200}
            className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white"
            placeholder="نبذة مختصرة عن الدكتور"
          />
          <p className="text-xs text-gray-500 mt-1">{formData.brief.ar.length}/200 characters</p>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-300 mb-2">نبذة مختصرة (إنجليزي) - Brief (English)</label>
          <textarea
            value={formData.brief.en}
            onChange={(e) => onUpdate({ brief: { ...formData.brief, en: e.target.value } })}
            rows={2}
            maxLength={200}
            className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white"
            placeholder="A brief introduction about the doctor"
          />
          <p className="text-xs text-gray-500 mt-1">{formData.brief.en.length}/200 characters</p>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-300 mb-2">السيرة الذاتية (عربي) - Bio (Arabic)</label>
          <textarea
            value={formData.bio.ar}
            onChange={(e) => onUpdate({ bio: { ...formData.bio, ar: e.target.value } })}
            rows={3}
            maxLength={500}
            className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white"
            placeholder="متخصص في العلاجات المتقدمة"
          />
          <p className="text-xs text-gray-500 mt-1">{formData.bio.ar.length}/500 characters</p>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-300 mb-2">السيرة الذاتية (إنجليزي) - Bio (English)</label>
          <textarea
            value={formData.bio.en}
            onChange={(e) => onUpdate({ bio: { ...formData.bio, en: e.target.value } })}
            rows={3}
            maxLength={500}
            className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white"
            placeholder="Specialist in advanced treatments"
          />
          <p className="text-xs text-gray-500 mt-1">{formData.bio.en.length}/500 characters</p>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-300 mb-2">عنا (عربي) - About Us (Arabic)</label>
          <textarea
            value={formData.aboutUs.ar}
            onChange={(e) => onUpdate({ aboutUs: { ...formData.aboutUs, ar: e.target.value } })}
            rows={6}
            maxLength={2000}
            className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white"
            placeholder="معلومات تفصيلية عن خلفية الدكتور وإنجازاته وخبراته..."
          />
          <p className="text-xs text-gray-500 mt-1">{formData.aboutUs.ar.length}/2000 characters</p>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-300 mb-2">عنا (إنجليزي) - About Us (English)</label>
          <textarea
            value={formData.aboutUs.en}
            onChange={(e) => onUpdate({ aboutUs: { ...formData.aboutUs, en: e.target.value } })}
            rows={6}
            maxLength={2000}
            className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white"
            placeholder="Detailed information about the doctor's background, achievements, and expertise..."
          />
          <p className="text-xs text-gray-500 mt-1">{formData.aboutUs.en.length}/2000 characters</p>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">اللغات - Languages (comma separated)</label>
          <input
            type="text"
            value={formData.languages}
            onChange={(e) => onUpdate({ languages: e.target.value })}
            className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white"
            placeholder="ar, en"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">الوسوم - Tags (comma separated)</label>
          <input
            type="text"
            value={formData.tags}
            onChange={(e) => onUpdate({ tags: e.target.value })}
            className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white"
            placeholder="kids, surgery, online"
          />
        </div>
      </div>
    </div>
  );
}
