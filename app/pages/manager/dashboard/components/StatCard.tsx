import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: LucideIcon;
  vsText: string;
}

export const StatCard = ({ title, value, change, icon: Icon, vsText }: StatCardProps) => {
  const isPositive = change >= 0;

  return (
    <div className="bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-700">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-400 mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-white mb-2">{value}</h3>
          <div className={`flex items-center gap-1 text-sm font-medium ${
            isPositive ? 'text-green-400' : 'text-red-400'
          }`}>
            {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            <span>{Math.abs(change)}%</span>
            <span className="text-gray-500 text-xs">{vsText}</span>
          </div>
        </div>
        <div className="bg-teal-900/20 p-3 rounded-lg">
          <Icon className="w-6 h-6 text-teal-400" />
        </div>
      </div>
    </div>
  );
};
