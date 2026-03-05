import { BarChart3 } from 'lucide-react';
import { WeeklyData } from '../types';

interface WeeklyChartProps {
  title: string;
  data: WeeklyData[];
  dataKey: 'appointments' | 'revenue';
  color: string;
}

export const WeeklyChart = ({ title, data, dataKey, color }: WeeklyChartProps) => {
  const maxValue = Math.max(...data.map(d => d[dataKey]));

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
      <div className="flex items-center gap-3 mb-6">
        <BarChart3 className="text-teal-400" size={24} />
        <h3 className="text-lg font-bold text-white">{title}</h3>
      </div>
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">{item.day}</span>
              <span className="text-white font-medium">
                {dataKey === 'revenue' ? `$${item[dataKey]}` : item[dataKey]}
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className={`${color} h-2 rounded-full transition-all`}
                style={{ width: `${(item[dataKey] / maxValue) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
