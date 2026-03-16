import { useState } from 'react';
import { Calendar, Plus, UserCog, FileText } from 'lucide-react';
import { DateRange } from '../types';

interface DashboardHeaderProps {
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
  onAddClinic: () => void;
  onAssignManager: () => void;
  onViewReports: () => void;
  notificationCount?: number;
}

export const DashboardHeader = ({
  onDateRangeChange,
  onAddClinic,
  onAssignManager,
  onViewReports,
}: DashboardHeaderProps) => {
  const [showQuickActions, setShowQuickActions] = useState(false);

  const quickActions = [
    { label: 'Add New Clinic', icon: Plus, action: onAddClinic },
    { label: 'Assign Manager', icon: UserCog, action: onAssignManager },
    { label: 'View Reports', icon: FileText, action: onViewReports },
  ];

  const handlePresetRange = (days: number, type: 'past' | 'future') => {
    let from: string, to: string;
    
    if (type === 'past') {
      from = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      to = new Date().toISOString().split('T')[0];
    } else {
      from = new Date().toISOString().split('T')[0];
      to = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    }
    
    onDateRangeChange({ from, to });
  };

  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Owner Dashboard</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Executive overview across all clinics
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">

          {/* Date Range Picker */}
          <div className="relative">
            <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700">
              <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <select
                defaultValue="30-future"
                onChange={(e) => {
                  const [days, type] = e.target.value.split('-');
                  handlePresetRange(Number(days), type as 'past' | 'future');
                }}
                className="bg-gray-50 dark:bg-gray-700 border-none focus:ring-0 text-sm text-gray-900 dark:text-gray-300 cursor-pointer font-medium"
              >
                <option value="30-past" className="bg-white text-gray-900">Last 30 days</option>
                <option value="7-past" className="bg-white text-gray-900">Last 7 days</option>
                <option value="90-past" className="bg-white text-gray-900">Last 90 days</option>
                <option value="30-future" className="bg-white text-gray-900">Next 30 days</option>
                <option value="90-future" className="bg-white text-gray-900">Next 90 days</option>
                <option value="365-future" className="bg-white text-gray-900">Next 12 months</option>
              </select>
            </div>
          </div>


          {/* Quick Actions */}
          <div className="relative">
            <button
              onClick={() => setShowQuickActions(!showQuickActions)}
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <Plus className="w-4 h-4" />
              Quick Actions
            </button>

            {showQuickActions && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowQuickActions(false)}
                />
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-20">
                  {quickActions.map((action, idx) => {
                    const Icon = action.icon;
                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          action.action();
                          setShowQuickActions(false);
                        }}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-3 first:rounded-t-lg last:rounded-b-lg"
                      >
                        <Icon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{action.label}</span>
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
