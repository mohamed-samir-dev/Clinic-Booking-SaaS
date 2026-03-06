import { MessageSquare } from 'lucide-react';

export default function PageHeader() {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-2">
        <MessageSquare className="text-teal-400" size={32} />
        <h1 className="text-3xl font-bold text-white">Transfer Requests</h1>
      </div>
      <p className="text-gray-400">View and manage doctor transfer requests</p>
    </div>
  );
}
