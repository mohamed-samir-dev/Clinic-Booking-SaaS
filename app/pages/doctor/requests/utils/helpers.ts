import translations from '@/messages/translations';

export const getTimeAgo = (date: string, locale: 'en' | 'ar' = 'en') => {
  const now = new Date();
  const created = new Date(date);
  const diffMs = now.getTime() - created.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (locale === 'ar') {
    if (diffMins < 60) return `منذ ${diffMins} دقيقة`;
    if (diffHours < 24) return `منذ ${diffHours} ساعة`;
    return `منذ ${diffDays} يوم`;
  }
  
  if (diffMins < 60) return `${diffMins} minutes ago`;
  if (diffHours < 24) return `${diffHours} hours ago`;
  return `${diffDays} days ago`;
};

export const getStatusConfig = (status: string, locale: 'en' | 'ar' = 'en', theme: 'light' | 'dark' = 'light') => {
  const t = translations[locale].doctor.requests;
  
  const configs = {
    pending: {
      label: t.pending,
      bgColor: theme === 'dark' ? 'from-yellow-900/30 to-yellow-800/30' : 'from-yellow-50 to-yellow-50',
      borderColor: theme === 'dark' ? 'border-yellow-700/50' : 'border-yellow-200',
      iconBg: 'from-yellow-500 to-yellow-600',
      textColor: 'text-yellow-700',
      icon: 'pending_actions'
    },
    confirmed: {
      label: t.confirmed,
      bgColor: theme === 'dark' ? 'from-teal-900/30 to-cyan-900/30' : 'from-teal-50 to-cyan-50',
      borderColor: theme === 'dark' ? 'border-teal-700/50' : 'border-teal-200',
      iconBg: 'from-teal-500 to-cyan-600',
      textColor: 'text-teal-700',
      icon: 'check_circle'
    },
    completed: {
      label: locale === 'ar' ? 'مكتمل' : 'Completed',
      bgColor: theme === 'dark' ? 'from-gray-800/50 to-slate-800/50' : 'from-gray-50 to-slate-50',
      borderColor: theme === 'dark' ? 'border-gray-700/50' : 'border-gray-200',
      iconBg: 'from-gray-500 to-slate-600',
      textColor: 'text-gray-700',
      icon: 'task_alt'
    },
    cancelled: {
      label: t.cancelled,
      bgColor: theme === 'dark' ? 'from-red-900/30 to-rose-900/30' : 'from-red-50 to-rose-50',
      borderColor: theme === 'dark' ? 'border-red-700/50' : 'border-red-200',
      iconBg: 'from-red-500 to-rose-600',
      textColor: 'text-red-700',
      icon: 'cancel'
    }
  };
  return configs[status as keyof typeof configs] || configs.pending;
};
