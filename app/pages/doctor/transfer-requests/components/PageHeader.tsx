import { MessageSquare } from 'lucide-react';

interface PageHeaderProps {
  theme: string;
}

export const PageHeader = ({ theme }: PageHeaderProps) => {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-2">
        <MessageSquare className="text-teal-400" size={32} />
        <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Transfer Requests
        </h1>
      </div>
      <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
        Manage clinic transfer requests from managers
      </p>
    </div>
  );
};
