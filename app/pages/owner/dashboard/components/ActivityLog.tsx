import { ActivityLog as ActivityLogType } from '../types';
import { Clock, User, Building2, UserPlus, Settings } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface ActivityLogProps {
  activities: ActivityLogType[];
}

const resolveName = (name: unknown): string => {
  if (typeof name === 'string') return name;
  if (typeof name === 'object' && name !== null && 'en' in name && 'ar' in name) {
    const obj = name as { en?: string; ar?: string };
    return obj.en || obj.ar || '';
  }
  return '';
};

export const ActivityLog = ({ activities }: ActivityLogProps) => {
  const getActivityIcon = (entityType: string) => {
    switch (entityType) {
      case 'clinic':
        return Building2;
      case 'manager':
        return UserPlus;
      case 'doctor':
        return User;
      default:
        return Settings;
    }
  };

  if (activities.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No recent activity to display
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
      </div>
      <div className="p-6">
        <div className="flow-root">
          <ul className="-mb-8">
            {activities.map((activity, idx) => {
              const Icon = getActivityIcon(activity.entityType);
              return (
                <li key={activity.id}>
                  <div className="relative pb-8">
                    {idx !== activities.length - 1 && (
                      <span
                        className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-700"
                        aria-hidden="true"
                      />
                    )}
                    <div className="relative flex items-start space-x-3">
                      <div className="relative">
                        <div className="h-10 w-10 rounded-full bg-teal-50 dark:bg-teal-900/20 flex items-center justify-center ring-8 ring-white dark:ring-gray-800">
                          <Icon className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div>
                          <div className="text-sm">
                            <span className="font-medium text-gray-900 dark:text-white">
                              {resolveName(activity.actorName)}
                            </span>
                            <span className="text-gray-500 dark:text-gray-400"> {resolveName(activity.action)} </span>
                            <span className="font-medium text-gray-900 dark:text-white">
                              {resolveName(activity.entityName)}
                            </span>
                          </div>
                          <div className="mt-1 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                            <Clock className="w-3 h-3" />
                            {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
