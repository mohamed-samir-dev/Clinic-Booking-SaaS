import { Plus } from 'lucide-react';
import Link from 'next/link';

export default function PageHeader() {
  return (
    <div className="flex items-center justify-between mb-8">
      <h1 className="text-3xl font-bold text-white">Manage Doctors</h1>
      <Link 
        href="/pages/owner/doctors/add"
        className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
      >
        <Plus size={20} />
        Add Doctor
      </Link>
    </div>
  );
}
