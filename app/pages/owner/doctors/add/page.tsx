'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, User, Mail, Phone, Stethoscope, GraduationCap, Clock, DollarSign, Calendar, Building2 } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-teal-700 hover:text-teal-900 mb-4 font-medium transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back</span>
        </button>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-teal-100 overflow-hidden">
          <div className="bg-gradient-to-r from-teal-600 to-cyan-600 p-6 text-white">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                <User size={28} />
              </div>
              <div>
                <h1 className="text-2xl font-bold mb-1">Add New Doctor</h1>
                <p className="text-teal-50">Complete the form to add a new doctor to your clinic</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-6 py-4 rounded-lg mb-4 flex items-center gap-3">
                <div className="bg-red-100 p-2 rounded-full">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="font-medium">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-5 rounded-xl border border-teal-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-teal-600 p-2 rounded-lg">
                    <Building2 size={18} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">Clinic Selection</h3>
                </div>
                <select
                  required
                  value={formData.clinicId}
                  onChange={(e) => setFormData({ ...formData, clinicId: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-teal-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white transition-all text-gray-900"
                >
                  <option value="">-- Select Clinic --</option>
                  {clinics.map((clinic) => (
                    <option key={clinic._id} value={clinic._id}>
                      {clinic.name.ar} - {clinic.name.en}
                    </option>
                  ))}
                </select>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-xl border border-blue-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-blue-600 p-2 rounded-lg">
                    <User size={18} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">Personal Information</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <User size={16} className="text-blue-600" />
                      Name (English) *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name.en}
                      onChange={(e) => setFormData({ ...formData, name: { ...formData.name, en: e.target.value } })}
                      className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder:text-gray-400 transition-all"
                      placeholder="Dr. Ahmed Hassan"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <User size={16} className="text-blue-600" />
                      Name (Arabic) *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name.ar}
                      onChange={(e) => setFormData({ ...formData, name: { ...formData.name, ar: e.target.value } })}
                      className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder:text-gray-400 transition-all"
                      placeholder="د. أحمد محمد"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <Mail size={16} className="text-blue-600" />
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder:text-gray-400 transition-all"
                      placeholder="doctor@clinic.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <Phone size={16} className="text-blue-600" />
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder:text-gray-400 transition-all"
                      placeholder="+20123456789"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 rounded-xl border border-purple-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-purple-600 p-2 rounded-lg">
                    <Stethoscope size={18} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">Specialty & Experience</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Specialty (English)
                    </label>
                    <input
                      type="text"
                      value={formData.specialty.en}
                      onChange={(e) => setFormData({ ...formData, specialty: { ...formData.specialty, en: e.target.value } })}
                      className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900 placeholder:text-gray-400 transition-all"
                      placeholder="Dermatology"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Specialty (Arabic)
                    </label>
                    <input
                      type="text"
                      value={formData.specialty.ar}
                      onChange={(e) => setFormData({ ...formData, specialty: { ...formData.specialty, ar: e.target.value } })}
                      className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900 placeholder:text-gray-400 transition-all"
                      placeholder="الأمراض الجلدية"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Sub-Specialty (English)
                    </label>
                    <input
                      type="text"
                      value={formData.subSpecialty.en}
                      onChange={(e) => setFormData({ ...formData, subSpecialty: { ...formData.subSpecialty, en: e.target.value } })}
                      className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900 placeholder:text-gray-400 transition-all"
                      placeholder="Cosmetic Dermatology"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Sub-Specialty (Arabic)
                    </label>
                    <input
                      type="text"
                      value={formData.subSpecialty.ar}
                      onChange={(e) => setFormData({ ...formData, subSpecialty: { ...formData.subSpecialty, ar: e.target.value } })}
                      className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900 placeholder:text-gray-400 transition-all"
                      placeholder="جلدية تجميلية"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Bio (English)
                    </label>
                    <textarea
                      value={formData.bio.en}
                      onChange={(e) => setFormData({ ...formData, bio: { ...formData.bio, en: e.target.value } })}
                      rows={3}
                      className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900 placeholder:text-gray-400 transition-all"
                      placeholder="Specialist in advanced skin treatments"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Bio (Arabic)
                    </label>
                    <textarea
                      value={formData.bio.ar}
                      onChange={(e) => setFormData({ ...formData, bio: { ...formData.bio, ar: e.target.value } })}
                      rows={3}
                      className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900 placeholder:text-gray-400 transition-all"
                      placeholder="متخصص في أحدث تقنيات علاج البشرة"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-5 rounded-xl border border-amber-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-amber-600 p-2 rounded-lg">
                    <GraduationCap size={18} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">Education & Details</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Education (English)
                    </label>
                    <input
                      type="text"
                      value={formData.education.en}
                      onChange={(e) => setFormData({ ...formData, education: { ...formData.education, en: e.target.value } })}
                      className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-900 placeholder:text-gray-400 transition-all"
                      placeholder="Cairo University - Faculty of Medicine"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Education (Arabic)
                    </label>
                    <input
                      type="text"
                      value={formData.education.ar}
                      onChange={(e) => setFormData({ ...formData, education: { ...formData.education, ar: e.target.value } })}
                      className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-900 placeholder:text-gray-400 transition-all"
                      placeholder="جامعة القاهرة - كلية الطب"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Experience Years
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.experienceYears}
                      onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                      placeholder="5"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Gender
                    </label>
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all text-gray-700"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Room Number
                    </label>
                    <input
                      type="text"
                      value={formData.clinicRoomNumber}
                      onChange={(e) => setFormData({ ...formData, clinicRoomNumber: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-900 placeholder:text-gray-400 transition-all"
                      placeholder="Room 3"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Languages (comma separated)
                    </label>
                    <input
                      type="text"
                      value={formData.languages}
                      onChange={(e) => setFormData({ ...formData, languages: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-900 placeholder:text-gray-400 transition-all"
                      placeholder="Arabic, English"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Photo URL
                    </label>
                    <input
                      type="url"
                      value={formData.photoUrl}
                      onChange={(e) => setFormData({ ...formData, photoUrl: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-900 placeholder:text-gray-400 transition-all"
                      placeholder="https://example.com/photo.jpg"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-5 rounded-xl border border-green-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-green-600 p-2 rounded-lg">
                    <Calendar size={18} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">Working Schedule</h3>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Working Days *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { value: 'sunday', label: 'Sunday' },
                      { value: 'monday', label: 'Monday' },
                      { value: 'tuesday', label: 'Tuesday' },
                      { value: 'wednesday', label: 'Wednesday' },
                      { value: 'thursday', label: 'Thursday' },
                      { value: 'friday', label: 'Friday' },
                      { value: 'saturday', label: 'Saturday' },
                    ].map((day) => (
                      <label 
                        key={day.value} 
                        className={`flex items-center justify-center gap-2 p-3 border-2 rounded-xl cursor-pointer transition-all ${
                          formData.workingDays.includes(day.value)
                            ? 'bg-green-600 border-green-600 text-white shadow-lg'
                            : 'border-green-200 hover:border-green-400 hover:bg-green-50 text-gray-700'
                        }`}
                      >
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
                          className="hidden"
                        />
                        <span className="text-sm font-semibold">{day.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <Clock size={16} className="text-green-600" />
                      From
                    </label>
                    <input
                      type="time"
                      value={formData.workingHours.from}
                      onChange={(e) => setFormData({ ...formData, workingHours: { ...formData.workingHours, from: e.target.value } })}
                      className="w-full px-4 py-3 border-2 border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-gray-700"
                      placeholder="09:00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <Clock size={16} className="text-green-600" />
                      To
                    </label>
                    <input
                      type="time"
                      value={formData.workingHours.to}
                      onChange={(e) => setFormData({ ...formData, workingHours: { ...formData.workingHours, to: e.target.value } })}
                      className="w-full px-4 py-3 border-2 border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-gray-700"
                      placeholder="17:00"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-rose-50 to-red-50 p-5 rounded-xl border border-rose-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-rose-600 p-2 rounded-lg">
                    <DollarSign size={18} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">Booking Information</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Consultation Fee
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.consultationFee}
                      onChange={(e) => setFormData({ ...formData, consultationFee: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-rose-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all text-gray-700"
                      placeholder="200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Currency
                    </label>
                    <input
                      type="text"
                      value={formData.currency}
                      onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-rose-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all text-gray-700"
                      placeholder="EGP"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Slot Duration (minutes)
                    </label>
                    <input
                      type="number"
                      min="5"
                      value={formData.slotDuration}
                      onChange={(e) => setFormData({ ...formData, slotDuration: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-rose-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all text-gray-700"
                      placeholder="30"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Buffer Before (min)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.bufferBefore}
                      onChange={(e) => setFormData({ ...formData, bufferBefore: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-rose-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all text-gray-700"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Buffer After (min)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.bufferAfter}
                      onChange={(e) => setFormData({ ...formData, bufferAfter: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-rose-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all text-gray-700"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Patients Per Slot
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={formData.maxPatientsPerSlot}
                      onChange={(e) => setFormData({ ...formData, maxPatientsPerSlot: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-rose-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all text-gray-700"
                      placeholder="1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Min Notice (min)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.minNoticeMinutes}
                      onChange={(e) => setFormData({ ...formData, minNoticeMinutes: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-rose-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all text-gray-700"
                      placeholder="60"
                    />
                  </div>
                </div>

                <label className="flex items-center gap-3 p-4 bg-white rounded-xl border-2 border-rose-200 cursor-pointer hover:bg-rose-50 transition-all">
                  <input
                    type="checkbox"
                    checked={formData.allowOnlineBooking}
                    onChange={(e) => setFormData({ ...formData, allowOnlineBooking: e.target.checked })}
                    className="w-5 h-5 text-rose-600 border-gray-300 rounded focus:ring-rose-500"
                  />
                  <span className="text-sm font-semibold text-gray-700">Allow Online Booking</span>
                </label>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-8 py-3 rounded-xl hover:from-teal-700 hover:to-cyan-700 transition-all disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  {loading ? 'Saving...' : 'Save Doctor'}
                </button>
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="flex-1 bg-gray-200 text-gray-700 px-8 py-3 rounded-xl hover:bg-gray-300 transition-all font-bold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
