import { Stat } from '../types';

interface StatsGridProps {
  stats: Stat[];
}

export default function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-5">
      {stats.map((stat, index) => (
        <div 
          key={index} 
          className="group relative bg-white rounded-2xl p-5 shadow-sm border border-gray-100 overflow-hidden"
        >
          <div className="absolute inset-0 bg-linear-to-br from-teal-50/0 to-cyan-50/0"></div>
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-11 h-11 rounded-xl bg-linear-to-br ${stat.color} flex items-center justify-center shadow-md`}>
                <span className="material-icons text-white text-xl">{stat.icon}</span>
              </div>
            </div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">{stat.label}</p>
            <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}
