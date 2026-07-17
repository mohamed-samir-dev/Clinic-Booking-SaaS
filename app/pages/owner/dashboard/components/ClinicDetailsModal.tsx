'use client';
import { useEffect, useState } from 'react';
import { X, MapPin, Phone, Mail, Star, Calendar, DollarSign, Users, Stethoscope, Building2 } from 'lucide-react';

interface ClinicDetails {
  _id: string;
  name: { en: string; ar: string };
  address?: { en: string; ar: string };
  phone?: string;
  email?: string;
  isActive: boolean;
  rating?: number;
  specializations?: string[];
  workingHours?: { day: string; from: string; to: string }[];
}

interface ClinicDetailsModalProps {
  clinicId: string | null;
  performanceData?: {
    revenue: number;
    appointments: number;
    doctors: number;
    patients: number;
    rating: number;
    managerName: string;
    managerEmail: string;
  };
  onClose: () => void;
}

export function ClinicDetailsModal({ clinicId, performanceData, onClose }: ClinicDetailsModalProps) {
  const [clinic, setClinic] = useState<ClinicDetails | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!clinicId) return;
    setLoading(true);
    const token = localStorage.getItem('token');
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/owner/clinics/${clinicId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(r => r.ok ? r.json() : null)
      .then(data => setClinic(data))
      .finally(() => setLoading(false));
  }, [clinicId]);

  if (!clinicId) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60" onClick={onClose}>
      <div
        className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto border border-gray-700"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className="bg-teal-900/40 p-2 rounded-lg">
              <Building2 className="w-5 h-5 text-teal-400" />
            </div>
            <div>
              {loading ? (
                <div className="h-5 w-40 bg-gray-700 rounded animate-pulse" />
              ) : (
                <>
                  <h2 className="text-white font-semibold">{clinic?.name?.ar || clinic?.name?.en || '—'}</h2>
                  <p className="text-gray-400 text-sm">{clinic?.name?.en}</p>
                </>
              )}
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-gray-700 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-5">
          {/* Status */}
          {!loading && clinic && (
            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
              clinic.isActive ? 'bg-green-900/30 text-green-400' : 'bg-gray-700 text-gray-400'
            }`}>
              {clinic.isActive ? 'نشط' : 'غير نشط'}
            </span>
          )}

          {/* Performance Stats */}
          {performanceData && (
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: DollarSign, label: 'Revenue', value: `$${performanceData.revenue.toLocaleString()}`, color: 'text-green-400' },
                { icon: Calendar, label: 'Appointments', value: performanceData.appointments, color: 'text-blue-400' },
                { icon: Stethoscope, label: 'Doctors', value: performanceData.doctors, color: 'text-purple-400' },
                { icon: Users, label: 'Patients', value: performanceData.patients, color: 'text-orange-400' },
              ].map(({ icon: Icon, label, value, color }) => (
                <div key={label} className="bg-gray-700/50 rounded-lg p-3 flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${color}`} />
                  <div>
                    <p className="text-gray-400 text-xs">{label}</p>
                    <p className="text-white font-semibold text-sm">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Rating */}
          {performanceData && (
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-white font-semibold">
                {typeof performanceData.rating === 'number' ? performanceData.rating.toFixed(1) : 'N/A'}
              </span>
              <span className="text-gray-400 text-sm">Rating</span>
            </div>
          )}

          {/* Clinic Info */}
          {loading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-5 bg-gray-700 rounded animate-pulse" />
              ))}
            </div>
          ) : clinic && (
            <div className="space-y-3 border-t border-gray-700 pt-4">
              {clinic.address && (clinic.address.ar || clinic.address.en) && (
                <div className="flex items-start gap-2 text-sm text-gray-300">
                  <MapPin className="w-4 h-4 mt-0.5 text-gray-400 shrink-0" />
                  <span>{clinic.address.ar || clinic.address.en}</span>
                </div>
              )}
              {clinic.phone && (
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span>{clinic.phone}</span>
                </div>
              )}
              {clinic.email && (
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span>{clinic.email}</span>
                </div>
              )}
            </div>
          )}

          {/* Manager Info */}
          {performanceData?.managerName && (
            <div className="border-t border-gray-700 pt-4">
              <p className="text-gray-400 text-xs mb-1">Manager</p>
              <p className="text-white text-sm font-medium">{performanceData.managerName}</p>
              {performanceData.managerEmail && (
                <p className="text-gray-400 text-sm">{performanceData.managerEmail}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
