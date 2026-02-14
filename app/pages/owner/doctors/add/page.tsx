'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

interface Clinic {
  _id: string;
  name: { en: string; ar: string };
}

export default function AddDoctorPage() {
  const router = useRouter();
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [formData, setFormData] = useState({
    clinicId: '',
    name: { en: '', ar: '' },
    email: '',
    phone: '',
    specialty: { en: '', ar: '' },
    subSpecialty: { en: '', ar: '' },
    bio: { en: '', ar: '' },
    education: { en: '', ar: '' },
    experienceYears: '',
    photoUrl: '',
    gender: 'male',
    languages: '',
    clinicRoomNumber: '',
    consultationFee: '',
    currency: 'EGP',
    slotDuration: '30',
    bufferBefore: '0',
    bufferAfter: '0',
    maxPatientsPerSlot: '1',
    minNoticeMinutes: '60',
    allowOnlineBooking: true,
    workingDays: [] as string[],
    workingHours: { from: '', to: '' },
  });

  const [loading, setLoading] = useState(false);
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
      }
    } catch (err) {
      console.error('Failed to fetch clinics:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const payload = {
        ...formData,
        experienceYears: Number(formData.experienceYears) || 0,
        consultationFee: Number(formData.consultationFee) || 0,
        slotDuration: Number(formData.slotDuration),
        bufferBefore: Number(formData.bufferBefore),
        bufferAfter: Number(formData.bufferAfter),
        maxPatientsPerSlot: Number(formData.maxPatientsPerSlot),
        minNoticeMinutes: Number(formData.minNoticeMinutes),
        languages: formData.languages.split(',').map(l => l.trim()).filter(Boolean),
        workingDays: formData.workingDays,
        workingHours: formData.workingHours.from && formData.workingHours.to ? formData.workingHours : undefined,
      };

      const response = await fetch('http://localhost:5000/api/owner/doctors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        router.push('/pages/owner/doctors');
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to create doctor');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={20} />
          Back
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Add New Doctor</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Clinic *
            </label>
            <select
              required
              value={formData.clinicId}
              onChange={(e) => setFormData({ ...formData, clinicId: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">-- اختر العيادة / Select Clinic --</option>
              {clinics.map((clinic) => (
                <option key={clinic._id} value={clinic._id}>
                  {clinic.name.ar} - {clinic.name.en}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name (English) *
              </label>
              <input
                type="text"
                required
                value={formData.name.en}
                onChange={(e) => setFormData({ ...formData, name: { ...formData.name, en: e.target.value } })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-600 placeholder:font-medium"
                placeholder="Dr. Ahmed Hassan"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name (Arabic) *
              </label>
              <input
                type="text"
                required
                value={formData.name.ar}
                onChange={(e) => setFormData({ ...formData, name: { ...formData.name, ar: e.target.value } })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-600 placeholder:font-medium"
                placeholder="د. أحمد حسن"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-600 placeholder:font-medium"
                placeholder="doctor@clinic.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-600 placeholder:font-medium"
                placeholder="+20123456789"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Specialty (English)
              </label>
              <input
                type="text"
                value={formData.specialty.en}
                onChange={(e) => setFormData({ ...formData, specialty: { ...formData.specialty, en: e.target.value } })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-600 placeholder:font-medium"
                placeholder="Dermatology"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Specialty (Arabic)
              </label>
              <input
                type="text"
                value={formData.specialty.ar}
                onChange={(e) => setFormData({ ...formData, specialty: { ...formData.specialty, ar: e.target.value } })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-600 placeholder:font-medium"
                placeholder="الأمراض الجلدية"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sub-Specialty (English)
              </label>
              <input
                type="text"
                value={formData.subSpecialty.en}
                onChange={(e) => setFormData({ ...formData, subSpecialty: { ...formData.subSpecialty, en: e.target.value } })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-600 placeholder:font-medium"
                placeholder="Cosmetic Dermatology"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sub-Specialty (Arabic)
              </label>
              <input
                type="text"
                value={formData.subSpecialty.ar}
                onChange={(e) => setFormData({ ...formData, subSpecialty: { ...formData.subSpecialty, ar: e.target.value } })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-600 placeholder:font-medium"
                placeholder="جلدية تجميلية"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio (English)
              </label>
              <textarea
                value={formData.bio.en}
                onChange={(e) => setFormData({ ...formData, bio: { ...formData.bio, en: e.target.value } })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-600 placeholder:font-medium"
                placeholder="Specialist in advanced skin treatments"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio (Arabic)
              </label>
              <textarea
                value={formData.bio.ar}
                onChange={(e) => setFormData({ ...formData, bio: { ...formData.bio, ar: e.target.value } })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-600 placeholder:font-medium"
                placeholder="متخصص في أحدث تقنيات علاج البشرة"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Education (English)
              </label>
              <input
                type="text"
                value={formData.education.en}
                onChange={(e) => setFormData({ ...formData, education: { ...formData.education, en: e.target.value } })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-600 placeholder:font-medium"
                placeholder="Cairo University - Faculty of Medicine"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Education (Arabic)
              </label>
              <input
                type="text"
                value={formData.education.ar}
                onChange={(e) => setFormData({ ...formData, education: { ...formData.education, ar: e.target.value } })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-600 placeholder:font-medium"
                placeholder="جامعة القاهرة - كلية الطب"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Experience Years
              </label>
              <input
                type="number"
                min="0"
                value={formData.experienceYears}
                onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender
              </label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Room Number
              </label>
              <input
                type="text"
                value={formData.clinicRoomNumber}
                onChange={(e) => setFormData({ ...formData, clinicRoomNumber: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-600 placeholder:font-medium"
                placeholder="Room 3"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Languages (comma separated)
              </label>
              <input
                type="text"
                value={formData.languages}
                onChange={(e) => setFormData({ ...formData, languages: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-600 placeholder:font-medium"
                placeholder="Arabic, English"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Photo URL
              </label>
              <input
                type="url"
                value={formData.photoUrl}
                onChange={(e) => setFormData({ ...formData, photoUrl: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-600 placeholder:font-medium"
                placeholder="https://example.com/photo.jpg"
              />
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Working Schedule / جدول العمل</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Working Days / أيام العمل *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { value: 'sunday', label: 'Sunday / الأحد' },
                  { value: 'monday', label: 'Monday / الإثنين' },
                  { value: 'tuesday', label: 'Tuesday / الثلاثاء' },
                  { value: 'wednesday', label: 'Wednesday / الأربعاء' },
                  { value: 'thursday', label: 'Thursday / الخميس' },
                  { value: 'friday', label: 'Friday / الجمعة' },
                  { value: 'saturday', label: 'Saturday / السبت' },
                ].map((day) => (
                  <label key={day.value} className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.workingDays.includes(day.value)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({ ...formData, workingDays: [...formData.workingDays, day.value] });
                        } else {
                          setFormData({ ...formData, workingDays: formData.workingDays.filter(d => d !== day.value) });
                        }
                      }}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{day.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Working Hours From / من الساعة
                </label>
                <input
                  type="time"
                  value={formData.workingHours.from}
                  onChange={(e) => setFormData({ ...formData, workingHours: { ...formData.workingHours, from: e.target.value } })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="09:00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Working Hours To / إلى الساعة
                </label>
                <input
                  type="time"
                  value={formData.workingHours.to}
                  onChange={(e) => setFormData({ ...formData, workingHours: { ...formData.workingHours, to: e.target.value } })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="17:00"
                />
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Consultation Fee
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.consultationFee}
                  onChange={(e) => setFormData({ ...formData, consultationFee: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Currency
                </label>
                <input
                  type="text"
                  value={formData.currency}
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Slot Duration (minutes)
                </label>
                <input
                  type="number"
                  min="5"
                  value={formData.slotDuration}
                  onChange={(e) => setFormData({ ...formData, slotDuration: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Buffer Before (min)
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.bufferBefore}
                  onChange={(e) => setFormData({ ...formData, bufferBefore: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Buffer After (min)
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.bufferAfter}
                  onChange={(e) => setFormData({ ...formData, bufferAfter: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Patients Per Slot
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.maxPatientsPerSlot}
                  onChange={(e) => setFormData({ ...formData, maxPatientsPerSlot: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Min Notice (min)
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.minNoticeMinutes}
                  onChange={(e) => setFormData({ ...formData, minNoticeMinutes: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.allowOnlineBooking}
                  onChange={(e) => setFormData({ ...formData, allowOnlineBooking: e.target.checked })}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">Allow Online Booking</span>
              </label>
            </div>
          </div>

          <div className="flex gap-4 pt-6 border-t">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
            >
              {loading ? 'Saving...' : 'Save Doctor'}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
