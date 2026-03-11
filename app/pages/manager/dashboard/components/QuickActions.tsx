import { UserPlus, Calendar, Clock } from 'lucide-react';

interface QuickActionsProps {
  title: string;
  language: 'ar' | 'en';
  onAddDoctor: () => void;
  onViewAppointments: () => void;
  onManageSchedule: () => void;
}

const translations = {
  ar: {
    addDoctor: 'إضافة طبيب',
    viewAppointments: 'عرض المواعيد',
    manageSchedule: 'إدارة الجدول'
  },
  en: {
    addDoctor: 'Add Doctor',
    viewAppointments: 'View Appointments',
    manageSchedule: 'Manage Schedule'
  }
};

export const QuickActions = ({ title, language, onAddDoctor, onViewAppointments, onManageSchedule }: QuickActionsProps) => {
  const t = translations[language];

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
      <h3 className="text-lg font-bold text-white mb-4">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={onAddDoctor}
          className="flex items-center gap-3 p-4 bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors"
        >
          <UserPlus className="text-white" size={24} />
          <span className="text-white font-medium">{t.addDoctor}</span>
        </button>
        <button
          onClick={onViewAppointments}
          className="flex items-center gap-3 p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
        >
          <Calendar className="text-white" size={24} />
          <span className="text-white font-medium">{t.viewAppointments}</span>
        </button>
        <button
          onClick={onManageSchedule}
          className="flex items-center gap-3 p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
        >
          <Clock className="text-white" size={24} />
          <span className="text-white font-medium">{t.manageSchedule}</span>
        </button>
      </div>
    </div>
  );
};
