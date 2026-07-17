import { Doctor } from '../types/types';
import DoctorRow from './DoctorRow';
import { useLanguage } from '@/app/contexts/LanguageContext';

const t = {
  ar: {
    doctor: 'الطبيب',
    email: 'البريد الإلكتروني',
    phone: 'الهاتف',
    specialty: 'التخصص',
    fee: 'الرسوم',
    status: 'الحالة',
    actions: 'الإجراءات',
    noDoctors: 'لا يوجد أطباء',
  },
  en: {
    doctor: 'Doctor',
    email: 'Email',
    phone: 'Phone',
    specialty: 'Specialty',
    fee: 'Fee',
    status: 'Status',
    actions: 'Actions',
    noDoctors: 'No doctors found',
  },
};

interface DoctorsTableProps {
  doctors: Doctor[];
  onDelete: (id: string, name: string) => void;
}

export default function DoctorsTable({ doctors, onDelete }: DoctorsTableProps) {
  const { locale } = useLanguage();
  const tr = t[locale as 'ar' | 'en'] ?? t.en;
  const isRtl = locale === 'ar';

  return (
    <div className="overflow-x-auto" dir={isRtl ? 'rtl' : 'ltr'}>
      <table className="w-full">
        <thead className="bg-gray-700 border-b border-gray-600">
          <tr>
            <th className={`px-6 py-3 ${isRtl ? 'text-right' : 'text-left'} text-xs font-medium text-gray-300 uppercase tracking-wider`}>
              {tr.doctor}
            </th>
            <th className={`px-6 py-3 ${isRtl ? 'text-right' : 'text-left'} text-xs font-medium text-gray-300 uppercase tracking-wider`}>
              {tr.email}
            </th>
            <th className={`px-6 py-3 ${isRtl ? 'text-right' : 'text-left'} text-xs font-medium text-gray-300 uppercase tracking-wider`}>
              {tr.phone}
            </th>
            <th className={`px-6 py-3 ${isRtl ? 'text-right' : 'text-left'} text-xs font-medium text-gray-300 uppercase tracking-wider`}>
              {tr.specialty}
            </th>
            <th className={`px-6 py-3 ${isRtl ? 'text-right' : 'text-left'} text-xs font-medium text-gray-300 uppercase tracking-wider`}>
              {tr.fee}
            </th>
            <th className={`px-6 py-3 ${isRtl ? 'text-right' : 'text-left'} text-xs font-medium text-gray-300 uppercase tracking-wider`}>
              {tr.status}
            </th>
            <th className={`px-6 py-3 ${isRtl ? 'text-left' : 'text-right'} text-xs font-medium text-gray-300 uppercase tracking-wider`}>
              {tr.actions}
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-800 divide-y divide-gray-700">
          {doctors.length === 0 ? (
            <tr>
              <td colSpan={7} className="px-6 py-8 text-center text-gray-400">
                {tr.noDoctors}
              </td>
            </tr>
          ) : (
            doctors.map((doctor) => (
              <DoctorRow key={doctor._id} doctor={doctor} onDelete={onDelete} />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
