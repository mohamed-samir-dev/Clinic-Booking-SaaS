import { Clock, CheckCircle, XCircle } from 'lucide-react';

export const getStatusIcon = (status: string) => {
  switch (status) {
    case 'pending':
      return <Clock className="text-yellow-400" size={20} />;
    case 'accepted':
      return <CheckCircle className="text-green-400" size={20} />;
    case 'rejected':
      return <XCircle className="text-red-400" size={20} />;
    default:
      return null;
  }
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
    case 'accepted':
      return 'bg-green-500/20 text-green-400 border-green-500/50';
    case 'rejected':
      return 'bg-red-500/20 text-red-400 border-red-500/50';
    default:
      return '';
  }
};

export const getStatusText = (status: string, locale: 'ar' | 'en') => {
  const translations = {
    ar: {
      pending: 'قيد الانتظار',
      accepted: 'مقبول',
      rejected: 'مرفوض'
    },
    en: {
      pending: 'Pending',
      accepted: 'Accepted',
      rejected: 'Rejected'
    }
  };
  return translations[locale][status as keyof typeof translations.ar] || status;
};
