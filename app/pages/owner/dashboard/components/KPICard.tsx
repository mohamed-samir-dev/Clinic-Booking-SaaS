import { memo } from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  change: number;
  icon: LucideIcon;
  tooltip?: string;
}

export const KPICard = memo(function KPICard({ title, value, change, icon: Icon, tooltip }: KPICardProps) {
  const isPositive = change >= 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100 dark:border-gray-700">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1" title={tooltip}>
            {title}
          </p>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {value}
          </h3>
          <div className={`flex items-center text-sm font-medium ${
            isPositive ? 'text-green-600' : 'text-red-600'
          }`}>
            {isPositive ? (
              <TrendingUp className="w-4 h-4 mr-1" />
            ) : (
              <TrendingDown className="w-4 h-4 mr-1" />
            )}
            <span>{Math.abs(change)}%</span>
            <span className="text-gray-500 dark:text-gray-400 ml-1 text-xs">vs previous</span>
          </div>
        </div>
        <div className="bg-teal-50 dark:bg-teal-900/20 p-3 rounded-lg">
          <Icon className="w-6 h-6 text-teal-600 dark:text-teal-400" />
        </div>
      </div>
    </div>
  );
});
