import { MessageSquare } from 'lucide-react';

export default function EmptyState() {
  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 p-12 text-center">
      <MessageSquare className="mx-auto text-gray-600 mb-4" size={48} />
      <p className="text-gray-400">No requests found</p>
    </div>
  );
}
