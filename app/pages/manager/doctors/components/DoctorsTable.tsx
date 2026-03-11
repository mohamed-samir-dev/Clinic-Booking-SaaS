import { Eye, Calendar, Clock, UserX, Star } from 'lucide-react';
import Image from 'next/image';
import { Doctor } from '../page';

interface DoctorsTableProps {
  doctors: Doctor[];
  loading: boolean;
  onViewProfile: (doctor: Doctor) => void;
  onEditSchedule: (doctor: Doctor) => void;
  onViewAppointments: (doctorId: string) => void;
  onDeactivate: (id: string) => void;
  language?: 'ar' | 'en';
}

const translations = {
  ar: {
    loading: 'جاري تحميل الأطباء...',
    noDoctors: 'لم يتم العثور على أطباء',
    years: 'سنوات',
    todayAppointments: 'مواعيد اليوم:',
    profile: 'الملف',
    schedule: 'الجدول',
    appointments: 'المواعيد',
    activate: 'تفعيل',
    deactivate: 'إلغاء التفعيل',
    doctorName: 'اسم الطبيب',
    specialty: 'التخصص',
    experience: 'الخبرة',
    rating: 'التقييم',
    status: 'الحالة',
    actions: 'الإجراءات',
    viewProfile: 'عرض الملف',
    editSchedule: 'تعديل الجدول',
    viewAppointments: 'عرض المواعيد',
    activateDoctor: 'تفعيل الطبيب',
    deactivateDoctor: 'إلغاء تفعيل الطبيب',
    available: 'متاح',
    busy: 'مشغول',
    offDuty: 'غير متاح',
    onLeave: 'في إجازة'
  },
  en: {
    loading: 'Loading doctors...',
    noDoctors: 'No doctors found',
    years: 'years',
    todayAppointments: "Today's Appointments:",
    profile: 'Profile',
    schedule: 'Schedule',
    appointments: 'Appointments',
    activate: 'Activate',
    deactivate: 'Deactivate',
    doctorName: 'Doctor Name',
    specialty: 'Specialty',
    experience: 'Experience',
    rating: 'Rating',
    status: 'Status',
    actions: 'Actions',
    viewProfile: 'View Profile',
    editSchedule: 'Edit Schedule',
    viewAppointments: 'View Appointments',
    activateDoctor: 'Activate Doctor',
    deactivateDoctor: 'Deactivate Doctor',
    available: 'available',
    busy: 'busy',
    offDuty: 'off-duty',
    onLeave: 'on-leave'
  }
};

export const DoctorsTable = ({ 
  doctors, 
  loading, 
  onViewProfile, 
  onEditSchedule, 
  onViewAppointments, 
  onDeactivate,
  language = 'en'
}: DoctorsTableProps) => {
  const t = translations[language];
  
  const getName = (name: string | { en: string; ar: string }) => 
    typeof name === 'string' ? name : name[language];

  const getStatusText = (status: string) => {
    const statusMap: Record<string, string> = {
      'available': language === 'ar' ? t.available : 'available',
      'busy': language === 'ar' ? t.busy : 'busy',
      'off-duty': language === 'ar' ? t.offDuty : 'off-duty',
      'on-leave': language === 'ar' ? t.onLeave : 'on-leave'
    };
    return statusMap[status] || status;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-500/20 text-green-400';
      case 'busy': return 'bg-orange-500/20 text-orange-400';
      case 'off-duty': return 'bg-gray-500/20 text-gray-400';
      case 'on-leave': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden mb-4 md:mb-6">
      {/* Mobile Card View */}
      <div className="block lg:hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-400 mx-auto"></div>
            <p className="text-gray-400 mt-4">{t.loading}</p>
          </div>
        ) : doctors.length === 0 ? (
          <div className="p-8 text-center text-gray-400">
            {t.noDoctors}
          </div>
        ) : (
          <div className="divide-y divide-gray-700">
            {doctors.map((doctor) => (
              <div key={doctor._id} className="p-4">
                <div className="flex items-start gap-3 mb-3">
                  {doctor.image ? (
                    <Image src={doctor.image} alt={getName(doctor.name)} width={48} height={48} className="w-12 h-12 rounded-full object-cover" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-teal-500/20 flex items-center justify-center shrink-0">
                      <span className="text-teal-400 font-semibold text-lg">
                        {getName(doctor.name).charAt(0)}
                      </span>
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium text-sm mb-1 truncate">{getName(doctor.name)}</h3>
                    <p className="text-gray-400 text-xs mb-2">{doctor.specialty}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <span>{doctor.experience} {t.years}</span>
                      <div className="flex items-center gap-1">
                        <Star size={12} className="text-yellow-400 fill-yellow-400" />
                        <span className="text-white">{doctor.rating.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getStatusColor(doctor.status)}`}>
                    {getStatusText(doctor.status)}
                  </span>
                </div>
                
                <div className="flex items-center justify-between mb-3 text-xs">
                  <span className="text-gray-400">{t.todayAppointments}</span>
                  <span className="text-white font-medium">{doctor.todayAppointments}</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onViewProfile(doctor)}
                    className="flex items-center justify-center gap-1 px-2 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-xs"
                  >
                    <Eye size={14} className="text-white" />
                    <span className="text-white">{t.profile}</span>
                  </button>
                  
                  <button
                    onClick={() => onEditSchedule(doctor)}
                    className="flex items-center justify-center gap-1 px-2 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors text-xs"
                  >
                    <Clock size={14} className="text-white" />
                    <span className="text-white">{t.schedule}</span>
                  </button>
                  
                  <button
                    onClick={() => onViewAppointments(doctor._id)}
                    className="flex items-center justify-center gap-1 px-2 py-2 bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors text-xs"
                  >
                    <Calendar size={14} className="text-white" />
                    <span className="text-white">{t.appointments}</span>
                  </button>
                  
                  <button
                    onClick={() => onDeactivate(doctor._id)}
                    className={`flex items-center justify-center gap-1 px-2 py-2 rounded-lg transition-colors text-xs ${
                      doctor.status === 'off-duty' 
                        ? 'bg-green-600 hover:bg-green-700' 
                        : 'bg-red-600 hover:bg-red-700'
                    }`}
                  >
                    <UserX size={14} className="text-white" />
                    <span className="text-white">{doctor.status === 'off-duty' ? t.activate : t.deactivate}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-750">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">{t.doctorName}</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">{t.specialty}</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">{t.experience}</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">{t.todayAppointments}</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">{t.rating}</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">{t.status}</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">{t.actions}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {loading ? (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-400 mx-auto"></div>
                  <p className="text-gray-400 mt-4">{t.loading}</p>
                </td>
              </tr>
            ) : doctors.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-gray-400">
                  {t.noDoctors}
                </td>
              </tr>
            ) : (
              doctors.map((doctor) => (
                <tr key={doctor._id} className="hover:bg-gray-750 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {doctor.image ? (
                        <Image src={doctor.image} alt={getName(doctor.name)} width={40} height={40} className="w-10 h-10 rounded-full object-cover" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center">
                          <span className="text-teal-400 font-semibold">
                            {getName(doctor.name).charAt(0)}
                          </span>
                        </div>
                      )}
                      <span className="text-white font-medium">{getName(doctor.name)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-300">{doctor.specialty}</td>
                  <td className="px-6 py-4 text-gray-300">{doctor.experience} {t.years}</td>
                  <td className="px-6 py-4 text-gray-300">{doctor.todayAppointments}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <Star size={16} className="text-yellow-400 fill-yellow-400" />
                      <span className="text-white">{doctor.rating.toFixed(1)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(doctor.status)}`}>
                      {getStatusText(doctor.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => onViewProfile(doctor)}
                        className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                        title={t.viewProfile}
                      >
                        <Eye size={16} className="text-white" />
                      </button>
                      
                      <button
                        onClick={() => onEditSchedule(doctor)}
                        className="p-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
                        title={t.editSchedule}
                      >
                        <Clock size={16} className="text-white" />
                      </button>
                      
                      <button
                        onClick={() => onViewAppointments(doctor._id)}
                        className="p-2 bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors"
                        title={t.viewAppointments}
                      >
                        <Calendar size={16} className="text-white" />
                      </button>
                      
                      <button
                        onClick={() => onDeactivate(doctor._id)}
                        className={`p-2 rounded-lg transition-colors ${
                          doctor.status === 'off-duty' 
                            ? 'bg-green-600 hover:bg-green-700' 
                            : 'bg-red-600 hover:bg-red-700'
                        }`}
                        title={doctor.status === 'off-duty' ? t.activateDoctor : t.deactivateDoctor}
                      >
                        <UserX size={16} className="text-white" />
                      </button>
                    </div>
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
