import { Users, UserCheck, UserCog, Calendar } from 'lucide-react';

interface StatsCardsProps {
  stats: {
    total: number;
    availableToday: number;
    busy: number;
    todayAppointments: number;
  };
  language?: 'ar' | 'en';
}

const translations = {
  ar: {
    totalDoctors: 'إجمالي الأطباء',
    availableToday: 'متاحون اليوم',
    busyDoctors: 'أطباء مشغولون',
    todayAppointments: 'مواعيد اليوم'
  },
  en: {
    totalDoctors: 'Total Doctors',
    availableToday: 'Available Today',
    busyDoctors: 'Busy Doctors',
    todayAppointments: "Today's Appointments"
  }
};

export const StatsCards = ({ stats, language = 'en' }: StatsCardsProps) => {
  const t = translations[language];
  
  const cards = [
    {
      title: t.totalDoctors,
      value: stats.total,
      icon: Users,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10'
    },
    {
      title: t.availableToday,
      value: stats.availableToday,
      icon: UserCheck,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10'
    },
    {
      title: t.busyDoctors,
      value: stats.busy,
      icon: UserCog,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10'
    },
    {
      title: t.todayAppointments,
      value: stats.todayAppointments,
      icon: Calendar,
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
          <div className="flex items-center justify-between mb-3 sm:mb-4">
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
