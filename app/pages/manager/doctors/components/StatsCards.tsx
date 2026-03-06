import { Users, UserCheck, UserCog, Calendar } from 'lucide-react';

interface StatsCardsProps {
  stats: {
    total: number;
    availableToday: number;
    busy: number;
    todayAppointments: number;
  };
}

export const StatsCards = ({ stats }: StatsCardsProps) => {
  const cards = [
    {
      title: 'Total Doctors',
      value: stats.total,
      icon: Users,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10'
    },
    {
      title: 'Available Today',
      value: stats.availableToday,
      icon: UserCheck,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10'
    },
    {
      title: 'Busy Doctors',
      value: stats.busy,
      icon: UserCog,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10'
    },
    {
      title: "Today's Appointments",
      value: stats.todayAppointments,
      icon: Calendar,
      color: 'text-teal-400',
      bgColor: 'bg-teal-500/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-gray-800 rounded-xl border border-gray-700 p-6 hover:border-gray-600 transition-colors"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg ${card.bgColor}`}>
              <card.icon className={card.color} size={24} />
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-1">{card.value}</div>
          <div className="text-sm text-gray-400">{card.title}</div>
        </div>
      ))}
    </div>
  );
};
