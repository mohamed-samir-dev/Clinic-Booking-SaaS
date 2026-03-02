import { Plus, UserCog, Building2, Users, FileText, Settings } from 'lucide-react';

interface QuickActionsTilesProps {
  onAddClinic: () => void;
  onAssignManager: () => void;
  onViewClinics: () => void;
  onViewManagers: () => void;
}

export const QuickActionsTiles = ({
  onAddClinic,
  onAssignManager,
  onViewClinics,
  onViewManagers,
}: QuickActionsTilesProps) => {
  const actions = [
    {
      title: 'Add New Clinic',
      description: 'Register a new clinic',
      icon: Plus,
      color: 'bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400',
      action: onAddClinic,
    },
    {
      title: 'Assign Manager',
      description: 'Assign manager to clinic',
      icon: UserCog,
      color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
      action: onAssignManager,
    },
    {
      title: 'View All Clinics',
      description: 'Manage all clinics',
      icon: Building2,
      color: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
      action: onViewClinics,
    },
    {
      title: 'View All Managers',
      description: 'Manage all managers',
      icon: Users,
      color: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400',
      action: onViewManagers,
    },
    {
      title: 'Financial Reports',
      description: 'View detailed reports',
      icon: FileText,
      color: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400',
      action: () => {},
    },
    {
      title: 'System Settings',
      description: 'Configure system',
      icon: Settings,
      color: 'bg-gray-50 dark:bg-gray-900/20 text-gray-600 dark:text-gray-400',
      action: () => {},
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {actions.map((action, idx) => {
          const Icon = action.icon;
          return (
            <button
              key={idx}
              onClick={action.action}
              className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-teal-500 dark:hover:border-teal-500 hover:shadow-md transition-all text-left group"
            >
              <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <Icon className="w-6 h-6" />
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{action.title}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">{action.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};
