'use client';

import { useEffect, useState } from 'react';
import { Plus, Search, Edit, Trash2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useLanguage } from '@/app/contexts/LanguageContext';

interface Manager {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  clinicId?: {
    _id: string;
    name: { en: string; ar: string };
  };
  isActive: boolean;
  lastLoginAt?: string;
}

export default function ManageManagersPage() {
  const t = useTranslations('owner.managers');
  const { locale } = useLanguage();
  const [managers, setManagers] = useState<Manager[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchManagers();
  }, []);

  const fetchManagers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/owner/managers`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setManagers(data);
      }
    } catch (error) {
      console.error('Error fetching managers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(t('deleteConfirm'))) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/owner/managers/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        fetchManagers();
      }
    } catch (error) {
      console.error('Error deleting manager:', error);
    }
  };

  const filteredManagers = managers.filter((manager) =>
    manager.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    manager.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isRtl = locale === 'ar';

  return (
    <div className="min-h-screen bg-gray-900 p-6" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">{t('title')}</h1>
        <Link
          href="/pages/owner/managers/add"
          className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
        >
          <Plus size={20} />
          {t('addManager')}
        </Link>
      </div>

      <div className="bg-gray-800 rounded-lg shadow">
        <div className="p-4 border-b border-gray-700">
          <div className="relative">
            <Search className={`absolute ${isRtl ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-gray-400`} size={20} />
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full ${isRtl ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-2 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500`}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700 border-b border-gray-600">
              <tr>
                <th className={`px-6 py-3 ${isRtl ? 'text-right' : 'text-left'} text-xs font-medium text-gray-300 uppercase tracking-wider`}>
                  {t('table.manager')}
                </th>
                <th className={`px-6 py-3 ${isRtl ? 'text-right' : 'text-left'} text-xs font-medium text-gray-300 uppercase tracking-wider`}>
                  {t('table.email')}
                </th>
                <th className={`px-6 py-3 ${isRtl ? 'text-right' : 'text-left'} text-xs font-medium text-gray-300 uppercase tracking-wider`}>
                  {t('table.phone')}
                </th>
                <th className={`px-6 py-3 ${isRtl ? 'text-right' : 'text-left'} text-xs font-medium text-gray-300 uppercase tracking-wider`}>
                  {t('table.clinic')}
                </th>
                <th className={`px-6 py-3 ${isRtl ? 'text-right' : 'text-left'} text-xs font-medium text-gray-300 uppercase tracking-wider`}>
                  {t('table.status')}
                </th>
                <th className={`px-6 py-3 ${isRtl ? 'text-right' : 'text-left'} text-xs font-medium text-gray-300 uppercase tracking-wider`}>
                  {t('table.lastLogin')}
                </th>
                <th className={`px-6 py-3 ${isRtl ? 'text-left' : 'text-right'} text-xs font-medium text-gray-300 uppercase tracking-wider`}>
                  {t('table.actions')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-400">
                    {t('loading')}
                  </td>
                </tr>
              ) : filteredManagers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-400">
                    <div className="flex flex-col items-center gap-2">
                      <AlertCircle size={48} className="text-gray-600" />
                      <p>{t('noManagers')}</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredManagers.map((manager) => (
                  <tr key={manager._id} className="hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center text-white font-semibold">
                          {manager.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="font-medium text-white">{manager.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      {manager.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      {manager.phone || t('na')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      {manager.clinicId ? (
                        <span>{locale === 'ar' ? manager.clinicId.name.ar : manager.clinicId.name.en}</span>
                      ) : (
                        <span className="text-orange-400 flex items-center gap-1">
                          <AlertCircle size={14} />
                          {t('noClinic')}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          manager.isActive
                            ? 'bg-green-900/30 text-green-400'
                            : 'bg-red-900/30 text-red-400'
                        }`}
                      >
                        {manager.isActive ? t('status.active') : t('status.disabled')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      {manager.lastLoginAt
                        ? new Date(manager.lastLoginAt).toLocaleDateString(locale === 'ar' ? 'ar-EG' : 'en-US')
                        : t('never')}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap ${isRtl ? 'text-left' : 'text-right'} text-sm font-medium`}>
                      <Link
                        href={`/pages/owner/managers/edit/${manager._id}`}
                        className={`text-teal-400 hover:text-teal-300 ${isRtl ? 'ml-4' : 'mr-4'} inline-block`}
                      >
                        <Edit size={18} />
                      </Link>
                      <button
                        onClick={() => handleDelete(manager._id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
