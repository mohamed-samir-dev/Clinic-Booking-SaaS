import { Users, UserCheck, UserPlus, Activity } from 'lucide-react';

type Language = 'ar' | 'en';

const translations = {
  ar: {
    totalPatients: 'إجمالي المرضى',
    activePatients: 'المرضى النشطين',
    newThisMonth: 'جدد هذا الشهر',
    totalVisits: 'إجمالي الزيارات'
  },
  en: {
    totalPatients: 'Total Patients',
    activePatients: 'Active Patients',
    newThisMonth: 'New This Month',
    totalVisits: 'Total Visits'
  }
};

interface PatientStatsCardsProps {
  stats: {
    total: number;
    active: number;
    newThisMonth: number;
    totalVisits: number;
  };
  language?: Language;
}

export const PatientStatsCards = ({ stats, language = 'ar' }: PatientStatsCardsProps) => {
  const t = translations[language];
  
  const cards = [
    {
      title: t.totalPatients,
      value: stats.total,
      icon: Users,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10'
    },
    {
      title: t.activePatients,
      value: stats.active,
      icon: UserCheck,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10'
    },
    {
      title: t.newThisMonth,
      value: stats.newThisMonth,
      icon: UserPlus,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10'
    },
    {
      title: t.totalVisits,
      value: stats.totalVisits,
      icon: Activity,
      color: 'text-teal-400',
      bgColor: 'bg-teal-500/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-4 md:mb-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-gray-800 rounded-xl border border-gray-700 p-4 sm:p-5 md:p-6 hover:border-gray-600 transition-colors"
        >
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <div className={`p-2 sm:p-3 rounded-lg ${card.bgColor}`}>
              <card.icon className={card.color} size={20} />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-white mb-1">{card.value}</div>
          <div className="text-xs sm:text-sm text-gray-400">{card.title}</div>
        </div>
      ))}
    </div>
  );
};
