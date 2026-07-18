import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/app/contexts/LanguageContext';

const t = {
  ar: { title: 'إدارة الأطباء', addDoctor: 'إضافة طبيب' },
  en: { title: 'Manage Doctors', addDoctor: 'Add Doctor' },
};

export default function PageHeader() {
  const { locale } = useLanguage();
  const tr = t[locale as 'ar' | 'en'] ?? t.en;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      <h1 className="text-3xl font-bold text-white">{tr.title}</h1>
      <Link 
        href="/pages/owner/doctors/add"
        className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors w-full sm:w-auto justify-center"
      >
        <Plus size={20} />
        {tr.addDoctor}
      </Link>
    </div>
  );
}
