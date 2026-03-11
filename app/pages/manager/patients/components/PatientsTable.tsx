import { Phone, Calendar, Activity, Mail, User, Droplet, Eye } from 'lucide-react';
import { Patient } from '../page';

type Language = 'ar' | 'en';

const translations = {
  ar: {
    loading: 'جاري تحميل المرضى...',
    noPatients: 'لم يتم العثور على مرضى',
    visits: 'زيارة',
    active: 'نشط',
    inactive: 'غير نشط',
    viewProfile: 'عرض الملف',
    patientName: 'اسم المريض',
    contact: 'الاتصال',
    gender: 'الجنس',
    bloodType: 'فصيلة الدم',
    lastVisit: 'آخر زيارة',
    totalVisits: 'إجمالي الزيارات',
    status: 'الحالة',
    actions: 'الإجراءات',
    completed: 'مكتمل',
    upcoming: 'قادم',
    male: 'ذكر',
    female: 'أنثى'
  },
  en: {
    loading: 'Loading patients...',
    noPatients: 'No patients found',
    visits: 'visits',
    active: 'Active',
    inactive: 'Inactive',
    viewProfile: 'View Profile',
    patientName: 'Patient Name',
    contact: 'Contact',
    gender: 'Gender',
    bloodType: 'Blood Type',
    lastVisit: 'Last Visit',
    totalVisits: 'Total Visits',
    status: 'Status',
    actions: 'Actions',
    completed: 'completed',
    upcoming: 'upcoming',
    male: 'Male',
    female: 'Female'
  }
};

interface PatientsTableProps {
  patients: Patient[];
  loading: boolean;
  onViewProfile?: (patient: Patient) => void;
  language?: Language;
}

export const PatientsTable = ({ patients, loading, onViewProfile, language = 'ar' }: PatientsTableProps) => {
  const t = translations[language];
  
  const getGender = (gender?: string) => {
    if (!gender) return 'N/A';
    if (language === 'ar') {
      return gender.toLowerCase() === 'male' ? t.male : gender.toLowerCase() === 'female' ? t.female : gender;
    }
    return gender.charAt(0).toUpperCase() + gender.slice(1);
  };
  if (loading) {
    return (
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 sm:p-8 text-center">
        <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-teal-400 mx-auto"></div>
        <p className="text-gray-400 mt-4 text-sm sm:text-base">{t.loading}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden mb-4 md:mb-6">
      {/* Mobile View */}
      <div className="block lg:hidden">
        {patients.length === 0 ? (
          <div className="p-6 text-center text-gray-400">{t.noPatients}</div>
        ) : (
          <div className="divide-y divide-gray-700">
            {patients.map((patient) => (
              <div key={patient._id} className="p-4 hover:bg-gray-750 transition-colors">
                <div className={`flex items-start gap-3 mb-3 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                  <div className="w-12 h-12 rounded-full bg-teal-500/20 flex items-center justify-center shrink-0">
                    <span className="text-teal-400 font-semibold text-lg">{patient.name.charAt(0)}</span>
                  </div>
                  <div className={`flex-1 min-w-0 ${language === 'ar' ? 'text-right' : ''}`}>
                    <div className="text-white font-medium mb-1 truncate">{patient.name}</div>
                    {patient.email && (
                      <div className={`text-xs text-gray-400 flex items-center gap-1 mb-1 truncate ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                        <Mail size={12} />
                        {patient.email}
                      </div>
                    )}
                    <div className={`flex items-center gap-2 text-gray-300 text-sm ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                      <Phone size={14} className="text-gray-400" />
                      {patient.phone}
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                  <div className={`flex items-center gap-1 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                    <User size={12} className="text-gray-400" />
                    <span className="text-gray-300">{getGender(patient.gender)}</span>
                  </div>
                  <div className={`flex items-center gap-1 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                    <Droplet size={12} className="text-red-400" />
                    <span className="text-white font-medium">{patient.bloodType || 'N/A'}</span>
                  </div>
                  <div className={`flex items-center gap-1 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                    <Activity size={12} className="text-teal-400" />
                    <span className="text-white">{patient.totalVisits} {t.visits}</span>
                  </div>
                  <div className={`flex items-center gap-1 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                    <Calendar size={12} className="text-gray-400" />
                    <span className="text-gray-300 truncate">{patient.lastAppointment ? new Date(patient.lastAppointment).toLocaleDateString() : 'N/A'}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  {patient.upcomingVisits > 0 ? (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                      {t.active} ({patient.upcomingVisits})
                    </span>
                  ) : (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-500/20 text-gray-400">
                      {t.inactive}
                    </span>
                  )}
                  <button
                    onClick={() => onViewProfile?.(patient)}
                    className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                    title={t.viewProfile}
                  >
                    <Eye size={16} className="text-white" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Desktop View */}
      <div className="hidden lg:block overflow-x-auto" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <table className="w-full">
          <thead className="bg-gray-750">
            <tr>
              <th className={`px-6 py-4 ${language === 'ar' ? 'text-right' : 'text-left'} text-xs font-semibold text-gray-400 uppercase`}>{t.patientName}</th>
              <th className={`px-6 py-4 ${language === 'ar' ? 'text-right' : 'text-left'} text-xs font-semibold text-gray-400 uppercase`}>{t.contact}</th>
              <th className={`px-6 py-4 ${language === 'ar' ? 'text-right' : 'text-left'} text-xs font-semibold text-gray-400 uppercase`}>{t.gender}</th>
              <th className={`px-6 py-4 ${language === 'ar' ? 'text-right' : 'text-left'} text-xs font-semibold text-gray-400 uppercase`}>{t.bloodType}</th>
              <th className={`px-6 py-4 ${language === 'ar' ? 'text-right' : 'text-left'} text-xs font-semibold text-gray-400 uppercase`}>{t.lastVisit}</th>
              <th className={`px-6 py-4 ${language === 'ar' ? 'text-right' : 'text-left'} text-xs font-semibold text-gray-400 uppercase`}>{t.totalVisits}</th>
              <th className={`px-6 py-4 ${language === 'ar' ? 'text-right' : 'text-left'} text-xs font-semibold text-gray-400 uppercase`}>{t.status}</th>
              <th className={`px-6 py-4 ${language === 'ar' ? 'text-right' : 'text-left'} text-xs font-semibold text-gray-400 uppercase`}>{t.actions}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {patients.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-6 py-8 text-center text-gray-400">
                  {t.noPatients}
                </td>
              </tr>
            ) : (
              patients.map((patient) => (
                <tr key={patient._id} className="hover:bg-gray-750 transition-colors">
                  <td className="px-6 py-4">
                    <div className={`flex items-center gap-3 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                      <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center">
                        <span className="text-teal-400 font-semibold">{patient.name.charAt(0)}</span>
                      </div>
                      <div className={language === 'ar' ? 'text-right' : ''}>
                        <div className="text-white font-medium">{patient.name}</div>
                        {patient.email && (
                          <div className={`text-xs text-gray-400 flex items-center gap-1 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                            <Mail size={12} />
                            {patient.email}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`flex items-center gap-2 text-gray-300 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                      <Phone size={16} className="text-gray-400" />
                      {patient.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`flex items-center gap-2 text-gray-300 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                      <User size={16} className="text-gray-400" />
                      {getGender(patient.gender)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`flex items-center gap-2 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                      <Droplet size={16} className="text-red-400" />
                      <span className="text-white font-medium">{patient.bloodType || 'N/A'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`flex items-center gap-2 text-gray-300 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                      <Calendar size={16} className="text-gray-400" />
                      {patient.lastAppointment ? new Date(patient.lastAppointment).toLocaleDateString() : 'N/A'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`flex items-center gap-2 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                      <Activity size={16} className="text-teal-400" />
                      <span className="text-white font-medium">{patient.totalVisits}</span>
                      <span className="text-xs text-gray-400">({patient.completedVisits} {t.completed})</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {patient.upcomingVisits > 0 ? (
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                        {t.active} ({patient.upcomingVisits} {t.upcoming})
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-500/20 text-gray-400">
                        {t.inactive}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => onViewProfile?.(patient)}
                      className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                      title={t.viewProfile}
                    >
                      <Eye size={16} className="text-white" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
