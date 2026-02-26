export const getTimeAgo = (date: string) => {
  const now = new Date();
  const created = new Date(date);
  const diffMs = now.getTime() - created.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 60) return `${diffMins} minutes ago`;
  if (diffHours < 24) return `${diffHours} hours ago`;
  return `${diffDays} days ago`;
};

export const getStatusConfig = (status: string) => {
  const configs = {
    pending: {
      label: 'Pending',
      bgColor: 'from-yellow-50 to-yellow-50',
      borderColor: 'border-yellow-200',
      iconBg: 'from-yellow-500 to-yellow-600',
      textColor: 'text-yellow-700',
      icon: 'pending_actions'
    },
    confirmed: {
      label: 'Confirmed',
      bgColor: 'from-teal-50 to-cyan-50',
      borderColor: 'border-teal-200',
      iconBg: 'from-teal-500 to-cyan-600',
      textColor: 'text-teal-700',
      icon: 'check_circle'
    },
    completed: {
      label: 'Completed',
      bgColor: 'from-gray-50 to-slate-50',
      borderColor: 'border-gray-200',
      iconBg: 'from-gray-500 to-slate-600',
      textColor: 'text-gray-700',
      icon: 'task_alt'
    },
    cancelled: {
      label: 'Cancelled',
      bgColor: 'from-red-50 to-rose-50',
      borderColor: 'border-red-200',
      iconBg: 'from-red-500 to-rose-600',
      textColor: 'text-red-700',
      icon: 'cancel'
    }
  };
  return configs[status as keyof typeof configs] || configs.pending;
};
