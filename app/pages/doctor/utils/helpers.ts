export const getText = (value: string | { en: string; ar: string } | undefined): string => {
  if (typeof value === 'string') return value;
  if (value && typeof value === 'object') {
    return value.en || value.ar || '';
  }
  return String(value || '');
};

export const getStatusConfig = (status: string) => {
  const statusConfig: Record<string, {
    label: string;
    location: string;
    bgColor: string;
    borderColor: string;
    iconBg: string;
    textColor: string;
    button: boolean;
  }> = {
    confirmed: { 
      label: 'Checked-in', 
      location: 'Waiting Room',
      bgColor: 'from-teal-50 to-cyan-50',
      borderColor: 'border-teal-200',
      iconBg: 'from-teal-500 to-cyan-600',
      textColor: 'text-teal-700',
      button: true
    },
    pending: { 
      label: 'In Consultation', 
      location: 'Room 2',
      bgColor: 'from-blue-50 to-indigo-50',
      borderColor: 'border-blue-200',
      iconBg: 'from-blue-500 to-indigo-600',
      textColor: 'text-blue-700',
      button: false
    },
    completed: { 
      label: 'Discharged', 
      location: 'Processed',
      bgColor: 'from-gray-50 to-slate-50',
      borderColor: 'border-gray-200',
      iconBg: 'from-gray-500 to-slate-600',
      textColor: 'text-gray-700',
      button: false
    }
  };
  
  return statusConfig[status] || statusConfig.pending;
};
