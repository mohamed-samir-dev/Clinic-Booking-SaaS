import { AppointmentStatus } from '@/app/types/appointment';
import { FaExclamationCircle, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

export const getStatusBadge = (status: AppointmentStatus) => {
  const styles = {
    pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    confirmed: 'bg-teal-50 text-teal-700 border-teal-200',
    completed: 'bg-blue-50 text-blue-700 border-blue-200',
    cancelled: 'bg-red-50 text-red-700 border-red-200',
    'no-show': 'bg-gray-50 text-gray-700 border-gray-200',
  };

  const icons = {
    pending: <FaExclamationCircle className="mr-1" />,
    confirmed: <FaCheckCircle className="mr-1" />,
    completed: <FaCheckCircle className="mr-1" />,
    cancelled: <FaTimesCircle className="mr-1" />,
    'no-show': <FaTimesCircle className="mr-1" />,
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${styles[status]}`}>
      {icons[status]}
      {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
    </span>
  );
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.toLocaleDateString('en-US', { weekday: 'short' });
  const fullDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  return { day, fullDate };
};
