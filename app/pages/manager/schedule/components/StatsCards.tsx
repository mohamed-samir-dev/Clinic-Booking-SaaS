import { Calendar, Clock, Users, UserCheck } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface StatsCardsProps {
  stats: {
    appointmentsToday: number;
    availableSlots: number;
    busyDoctors: number;
    freeDoctors: number;
  };
  language?: 'ar' | 'en';
}

export function StatsCards({ stats, language = 'en' }: StatsCardsProps) {
  const t = useTranslations('manager.schedule.stats');
  
  const cards = [
    {
      icon: Calendar,
      label: t('appointmentsToday'),
      value: stats.appointmentsToday,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10'
    },
    {
      icon: Clock,
      label: t('availableSlots'),
      value: stats.availableSlots,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10'
    },
    {
      icon: Users,
      label: t('busyDoctors'),
      value: stats.busyDoctors,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10'
    },
    {
      icon: UserCheck,
      label: t('freeDoctors'),
      value: stats.freeDoctors,
      color: 'text-teal-400',
      bgColor: 'bg-teal-500/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-4 md:mb-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-gray-800 rounded-xl border border-gray-700 p-4 sm:p-5 md:p-6 hover:border-gray-600 transition-all hover:shadow-lg hover:shadow-teal-500/10"
        >
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <div className={`p-2 sm:p-3 rounded-lg ${card.bgColor}`}>
              <card.icon className={card.color} size={20} />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-white mb-1">{card.value}</div>
          <div className="text-xs sm:text-sm text-gray-400">{card.label}</div>
        </div>
      ))}
    </div>
  );
}
