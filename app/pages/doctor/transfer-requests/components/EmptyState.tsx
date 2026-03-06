import { MessageSquare } from 'lucide-react';

interface EmptyStateProps {
  theme: string;
}

export const EmptyState = ({ theme }: EmptyStateProps) => {
  return (
    <div className={`rounded-xl border p-12 text-center ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
      <MessageSquare className={`mx-auto mb-4 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`} size={48} />
      <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>No transfer requests</p>
    </div>
  );
};
