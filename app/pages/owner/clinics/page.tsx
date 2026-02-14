'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Building2, MapPin, Phone, Mail } from 'lucide-react';

interface Clinic {
  _id: string;
  name: { en: string; ar: string };
  address?: { en: string; ar: string };
  phone?: string;
  email?: string;
  isActive: boolean;
  createdAt: string;
}

export default function ClinicsPage() {
  const router = useRouter();
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchClinics();
  }, []);

  const fetchClinics = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/owner/clinics', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setClinics(data);
      } else {
        setError('Failed to fetch clinics');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">إدارة العيادات</h1>
          <p className="text-gray-600 mt-1">Manage Clinics</p>
        </div>
        <button
          onClick={() => router.push('/pages/owner/clinics/add')}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          إضافة عيادة جديدة
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading clinics...</p>
        </div>
      ) : clinics.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <Building2 size={64} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">لا توجد عيادات</h3>
          <p className="text-gray-600 mb-6">ابدأ بإضافة عيادة جديدة</p>
          <button
            onClick={() => router.push('/pages/owner/clinics/add')}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} />
            إضافة عيادة
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clinics.map((clinic) => (
            <div
              key={clinic._id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Building2 size={24} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{clinic.name.ar}</h3>
                    <p className="text-sm text-gray-600">{clinic.name.en}</p>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    clinic.isActive
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {clinic.isActive ? 'نشط' : 'غير نشط'}
                </span>
              </div>

              <div className="space-y-3">
                {clinic.address && (clinic.address.ar || clinic.address.en) && (
                  <div className="flex items-start gap-2 text-sm text-gray-600">
                    <MapPin size={16} className="mt-1 flex-shrink-0" />
                    <div>
                      <p>{clinic.address.ar}</p>
                      <p className="text-gray-500">{clinic.address.en}</p>
                    </div>
                  </div>
                )}

                {clinic.phone && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone size={16} />
                    <span>{clinic.phone}</span>
                  </div>
                )}

                {clinic.email && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail size={16} />
                    <span>{clinic.email}</span>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  تم الإنشاء: {new Date(clinic.createdAt).toLocaleDateString('ar-EG')}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
