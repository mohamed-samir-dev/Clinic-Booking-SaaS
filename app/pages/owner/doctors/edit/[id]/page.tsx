'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, User, Stethoscope, DollarSign, Calendar, Building2, Camera, Star, Plus, Trash2, GraduationCap, RefreshCw } from 'lucide-react';

interface Clinic {
  _id: string;
  name: { en: string; ar: string };
}

export default function EditDoctorPage() {
  const router = useRouter();
  const params = useParams();
  const doctorId = params.id as string;
  
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [formData, setFormData] = useState({
    clinicId: '',
    firstName: '',
    lastName: '',
    name: { en: '', ar: '' },
    email: '',
    phone: '',
    specialty: { en: '', ar: '' },
    title: 'Dr',
    photoUrl: '',
    bloodType: '',
    bio: { en: '', ar: '' },
    brief: { en: '', ar: '' },
    aboutUs: { en: '', ar: '' },
    experienceYears: '',
    gender: 'male',
    languages: '',
    fees: '',
    followUpFees: '',
    consultationDuration: '20',
    availability: [] as Array<{ day: string; slots: Array<{ from: string; to: string }>; workingHours?: { from: string; to: string } }>,
    maxAppointmentsPerDay: '20',
    allowOnlineBooking: true,
    requiresConfirmation: false,
    tags: '',
    isFeatured: false,
    address: '',
    city: '',
    currency: '',
    slotDuration: '',
    bufferBefore: '',
    bufferAfter: '',
    maxPatientsPerSlot: '',
    minNoticeMinutes: '',
    reviews: [] as Array<{ patientName: string; rating: number; comment: string; date: string }>,
    education: [] as Array<{ degree: string; institution: string; year: string }>,
    specializations: [] as Array<string>,
  });

  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(true);
  const [error, setError] = useState('');
  const [newReview, setNewReview] = useState({
    patientName: '',
    rating: 5,
    comment: '',
    date: new Date().toISOString().split('T')[0]
  });

  const [newEducation, setNewEducation] = useState({
    degree: '',
    institution: '',
    year: ''
  });

  const [newSpecialization, setNewSpecialization] = useState('');

  useEffect(() => {
    fetchClinics();
    fetchDoctorData();
  }, []);

  const fetchClinics = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/owner/clinics', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setClinics(data);
      }
    } catch (error) {
    }
  };

  const fetchDoctorData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/owner/doctors`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (response.ok) {
        const doctors = await response.json();
        const doctor = doctors.find((d: { _id: string }) => d._id === doctorId);
        
        if (doctor) {
          setFormData({
            clinicId: doctor.clinicId?._id || doctor.clinicId || '',
            firstName: doctor.firstName || '',
            lastName: doctor.lastName || '',
            name: { en: doctor.name?.en || '', ar: doctor.name?.ar || '' },
            email: doctor.email || '',
            phone: doctor.phone || '',
            specialty: { en: doctor.specialty?.en || '', ar: doctor.specialty?.ar || '' },
            title: doctor.title || 'Dr',
            photoUrl: doctor.photoUrl || '',
            bloodType: doctor.bloodType || '',
            bio: { 
              en: typeof doctor.bio === 'object' ? doctor.bio?.en || '' : doctor.bio || '',
              ar: typeof doctor.bio === 'object' ? doctor.bio?.ar || '' : ''
            },
            brief: { 
              en: typeof doctor.brief === 'object' ? doctor.brief?.en || '' : doctor.brief || '',
              ar: typeof doctor.brief === 'object' ? doctor.brief?.ar || '' : ''
            },
            aboutUs: { 
              en: typeof doctor.aboutUs === 'object' ? doctor.aboutUs?.en || '' : doctor.aboutUs || '',
              ar: typeof doctor.aboutUs === 'object' ? doctor.aboutUs?.ar || '' : ''
            },
            experienceYears: doctor.experienceYears?.toString() || '',
            gender: doctor.gender || 'male',
            languages: Array.isArray(doctor.languages) ? doctor.languages.join(', ') : '',
            fees: doctor.fees?.toString() || '',
            followUpFees: doctor.followUpFees?.toString() || '',
            consultationDuration: doctor.consultationDuration?.toString() || '20',
            availability: Array.isArray(doctor.availability) ? doctor.availability : [],
            maxAppointmentsPerDay: doctor.bookingSettings?.maxAppointmentsPerDay?.toString() || '20',
            allowOnlineBooking: doctor.bookingSettings?.allowOnlineBooking ?? true,
            requiresConfirmation: doctor.bookingSettings?.requiresConfirmation ?? false,
            tags: Array.isArray(doctor.tags) ? doctor.tags.join(', ') : '',
            isFeatured: doctor.isFeatured ?? false,
            address: doctor.location?.address || '',
            city: doctor.location?.city || '',
            currency: doctor.currency || '',
            slotDuration: doctor.slotDuration?.toString() || '',
            bufferBefore: doctor.bufferBefore?.toString() || '',
            bufferAfter: doctor.bufferAfter?.toString() || '',
            maxPatientsPerSlot: doctor.maxPatientsPerSlot?.toString() || '',
            minNoticeMinutes: doctor.minNoticeMinutes?.toString() || '',
            reviews: Array.isArray(doctor.reviews) ? doctor.reviews : [],
            education: Array.isArray(doctor.education) ? doctor.education : [],
            specializations: Array.isArray(doctor.specializations) ? doctor.specializations : [],
          });
        }
      }
    } catch (error) {
      setError('Failed to load doctor data');
    } finally {
      setFetchingData(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const payload: any = {
        clinicId: formData.clinicId,
        firstName: formData.firstName,
        lastName: formData.lastName,
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        specialty: formData.specialty,
        title: formData.title,
        photoUrl: formData.photoUrl || undefined,
        bloodType: formData.bloodType || undefined,
        bio: formData.bio || undefined,
        brief: formData.brief || undefined,
        aboutUs: formData.aboutUs || undefined,
        experienceYears: Number(formData.experienceYears) || 0,
        gender: formData.gender,
        languages: formData.languages.split(',').map(l => l.trim()).filter(Boolean),
        fees: Number(formData.fees),
        followUpFees: formData.followUpFees ? Number(formData.followUpFees) : undefined,
        consultationDuration: Number(formData.consultationDuration),
        availability: formData.availability,
        bookingSettings: {
          maxAppointmentsPerDay: Number(formData.maxAppointmentsPerDay),
          allowOnlineBooking: formData.allowOnlineBooking,
          requiresConfirmation: formData.requiresConfirmation,
        },
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
        isFeatured: formData.isFeatured,
        location: {
          address: formData.address || undefined,
          city: formData.city || undefined,
        },
        reviews: formData.reviews,
      };

      if (formData.currency) payload.currency = formData.currency;
      if (formData.slotDuration) payload.slotDuration = Number(formData.slotDuration);
      if (formData.bufferBefore) payload.bufferBefore = Number(formData.bufferBefore);
      if (formData.bufferAfter) payload.bufferAfter = Number(formData.bufferAfter);
      if (formData.maxPatientsPerSlot) payload.maxPatientsPerSlot = Number(formData.maxPatientsPerSlot);
      if (formData.minNoticeMinutes) payload.minNoticeMinutes = Number(formData.minNoticeMinutes);
      payload.education = formData.education;
      payload.specializations = formData.specializations;

      const response = await fetch(`http://localhost:5000/api/owner/doctors/${doctorId}`, {
        method: 'PUT',
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
        setError(data.message || 'Failed to update doctor');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (fetchingData) {
    return (
      <div className="min-h-screen bg-linear-to-br from-teal-50 via-cyan-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading doctor data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-teal-50 via-cyan-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-teal-700 hover:text-teal-900 mb-4 font-medium transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back</span>
        </button>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-teal-100 overflow-hidden">
          <div className="bg-linear-to-r from-teal-600 to-cyan-600 p-6 text-white">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                <User size={28} />
              </div>
              <div>
                <h1 className="text-2xl font-bold mb-1">Edit Doctor</h1>
                <p className="text-teal-50">Update doctor information</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-6 py-4 rounded-lg mb-4 flex items-center gap-3">
                <span className="font-medium">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-linear-to-br from-teal-50 to-cyan-50 p-5 rounded-xl border border-teal-200">
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

              <div className="bg-linear-to-br from-blue-50 to-indigo-50 p-5 rounded-xl border border-blue-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-blue-600 p-2 rounded-lg">
                    <User size={18} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">Personal Information</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">First Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Name (English)</label>
                    <input
                      type="text"
                      value={formData.name.en}
                      onChange={(e) => setFormData({ ...formData, name: { ...formData.name, en: e.target.value } })}
                      className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Name (Arabic)</label>
                    <input
                      type="text"
                      value={formData.name.ar}
                      onChange={(e) => setFormData({ ...formData, name: { ...formData.name, ar: e.target.value } })}
                      className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Title *</label>
                    <select
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    >
                      <option value="Dr">Dr</option>
                      <option value="Prof">Prof</option>
                      <option value="Consultant">Consultant</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Gender</label>
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Blood Type</label>
                    <select
                      value={formData.bloodType}
                      onChange={(e) => setFormData({ ...formData, bloodType: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    >
                      <option value="">-- Select Blood Type --</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-linear-to-br from-emerald-50 to-green-50 p-5 rounded-xl border border-emerald-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-emerald-600 p-2 rounded-lg">
                    <Camera size={18} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">Profile Photo</h3>
                </div>
                <input
                  type="url"
                  value={formData.photoUrl}
                  onChange={(e) => setFormData({ ...formData, photoUrl: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900"
                  placeholder="https://example.com/doctor-photo.jpg"
                />
              </div>

              <div className="bg-linear-to-br from-purple-50 to-pink-50 p-5 rounded-xl border border-purple-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-purple-600 p-2 rounded-lg">
                    <Stethoscope size={18} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">Specialty & Experience</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Specialty (English) *</label>
                    <input
                      type="text"
                      required
                      value={formData.specialty.en}
                      onChange={(e) => setFormData({ ...formData, specialty: { ...formData.specialty, en: e.target.value } })}
                      className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Specialty (Arabic)</label>
                    <input
                      type="text"
                      value={formData.specialty.ar}
                      onChange={(e) => setFormData({ ...formData, specialty: { ...formData.specialty, ar: e.target.value } })}
                      className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Experience Years</label>
                    <input
                      type="number"
                      min="0"
                      value={formData.experienceYears}
                      onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Bio (Arabic)</label>
                    <textarea
                      value={formData.bio.ar}
                      onChange={(e) => setFormData({ ...formData, bio: { ...formData.bio, ar: e.target.value } })}
                      rows={3}
                      className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Bio (English)</label>
                    <textarea
                      value={formData.bio.en}
                      onChange={(e) => setFormData({ ...formData, bio: { ...formData.bio, en: e.target.value } })}
                      rows={3}
                      className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Brief (Arabic)</label>
                    <textarea
                      value={formData.brief.ar}
                      onChange={(e) => setFormData({ ...formData, brief: { ...formData.brief, ar: e.target.value } })}
                      rows={2}
                      className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Brief (English)</label>
                    <textarea
                      value={formData.brief.en}
                      onChange={(e) => setFormData({ ...formData, brief: { ...formData.brief, en: e.target.value } })}
                      rows={2}
                      className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">About Us (Arabic)</label>
                    <textarea
                      value={formData.aboutUs.ar}
                      onChange={(e) => setFormData({ ...formData, aboutUs: { ...formData.aboutUs, ar: e.target.value } })}
                      rows={3}
                      className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">About Us (English)</label>
                    <textarea
                      value={formData.aboutUs.en}
                      onChange={(e) => setFormData({ ...formData, aboutUs: { ...formData.aboutUs, en: e.target.value } })}
                      rows={3}
                      className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Languages (comma separated)</label>
                    <input
                      type="text"
                      value={formData.languages}
                      onChange={(e) => setFormData({ ...formData, languages: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Tags (comma separated)</label>
                    <input
                      type="text"
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-linear-to-br from-amber-50 to-orange-50 p-5 rounded-xl border border-amber-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-amber-600 p-2 rounded-lg">
                    <Building2 size={18} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">Location</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-900"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-linear-to-br from-green-50 to-emerald-50 p-5 rounded-xl border border-green-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-green-600 p-2 rounded-lg">
                    <Calendar size={18} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">Working Days & Hours</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].map((day) => {
                    const isSelected = formData.availability.some(a => a.day === day);
                    return (
                      <label key={day} className="flex items-center gap-2 p-3 bg-white rounded-lg border-2 border-green-200 cursor-pointer hover:bg-green-50 transition-all">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData({
                                ...formData,
                                availability: [...formData.availability, { day, slots: [{ from: '09:00', to: '17:00' }], workingHours: { from: '09:00', to: '17:00' } }]
                              });
                            } else {
                              setFormData({
                                ...formData,
                                availability: formData.availability.filter(a => a.day !== day)
                              });
                            }
                          }}
                          className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                        />
                        <span className="text-sm font-semibold text-gray-700 capitalize">{day}</span>
                      </label>
                    );
                  })}
                </div>
                
                {formData.availability.length > 0 && (
                  <div className="mt-4 space-y-3">
                    <h4 className="text-md font-semibold text-gray-700">Set Working Hours:</h4>
                    {formData.availability.map((avail, index) => (
                      <div key={avail.day} className="bg-white p-4 rounded-lg border-2 border-green-200">
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-semibold text-gray-800 capitalize">{avail.day}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-semibold text-gray-600 mb-1">From</label>
                            <input
                              type="time"
                              value={avail.workingHours?.from || '09:00'}
                              onChange={(e) => {
                                const updated = [...formData.availability];
                                updated[index] = {
                                  ...updated[index],
                                  workingHours: { ...updated[index].workingHours, from: e.target.value, to: updated[index].workingHours?.to || '17:00' }
                                };
                                setFormData({ ...formData, availability: updated });
                              }}
                              className="w-full px-3 py-2 border-2 border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 text-gray-900"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-gray-600 mb-1">To</label>
                            <input
                              type="time"
                              value={avail.workingHours?.to || '17:00'}
                              onChange={(e) => {
                                const updated = [...formData.availability];
                                updated[index] = {
                                  ...updated[index],
                                  workingHours: { from: updated[index].workingHours?.from || '09:00', to: e.target.value }
                                };
                                setFormData({ ...formData, availability: updated });
                              }}
                              className="w-full px-3 py-2 border-2 border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 text-gray-900"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-linear-to-br from-rose-50 to-red-50 p-5 rounded-xl border border-rose-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-rose-600 p-2 rounded-lg">
                    <DollarSign size={18} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">Booking Information</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Consultation Fee *</label>
                    <input
                      type="number"
                      min="0"
                      required
                      value={formData.fees}
                      onChange={(e) => setFormData({ ...formData, fees: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-rose-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 text-gray-700"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Follow-up Fee</label>
                    <input
                      type="number"
                      min="0"
                      value={formData.followUpFees}
                      onChange={(e) => setFormData({ ...formData, followUpFees: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-rose-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 text-gray-700"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Currency</label>
                    <input
                      type="text"
                      value={formData.currency}
                      onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-rose-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 text-gray-700"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Consultation Duration (min) *</label>
                    <input
                      type="number"
                      min="5"
                      required
                      value={formData.consultationDuration}
                      onChange={(e) => setFormData({ ...formData, consultationDuration: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-rose-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 text-gray-700"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Slot Duration (min)</label>
                    <input
                      type="number"
                      min="5"
                      value={formData.slotDuration}
                      onChange={(e) => setFormData({ ...formData, slotDuration: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-rose-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 text-gray-700"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Max Appointments/Day *</label>
                    <input
                      type="number"
                      min="1"
                      required
                      value={formData.maxAppointmentsPerDay}
                      onChange={(e) => setFormData({ ...formData, maxAppointmentsPerDay: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-rose-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 text-gray-700"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Buffer Before (min)</label>
                    <input
                      type="number"
                      min="0"
                      value={formData.bufferBefore}
                      onChange={(e) => setFormData({ ...formData, bufferBefore: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-rose-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 text-gray-700"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Buffer After (min)</label>
                    <input
                      type="number"
                      min="0"
                      value={formData.bufferAfter}
                      onChange={(e) => setFormData({ ...formData, bufferAfter: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-rose-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 text-gray-700"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Max Patients/Slot</label>
                    <input
                      type="number"
                      min="1"
                      value={formData.maxPatientsPerSlot}
                      onChange={(e) => setFormData({ ...formData, maxPatientsPerSlot: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-rose-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 text-gray-700"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Min Notice (min)</label>
                    <input
                      type="number"
                      min="0"
                      value={formData.minNoticeMinutes}
                      onChange={(e) => setFormData({ ...formData, minNoticeMinutes: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-rose-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 text-gray-700"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="flex items-center gap-3 p-4 bg-white rounded-xl border-2 border-rose-200 cursor-pointer hover:bg-rose-50 transition-all">
                    <input
                      type="checkbox"
                      checked={formData.allowOnlineBooking}
                      onChange={(e) => setFormData({ ...formData, allowOnlineBooking: e.target.checked })}
                      className="w-5 h-5 text-rose-600 border-gray-300 rounded focus:ring-rose-500"
                    />
                    <span className="text-sm font-semibold text-gray-700">Allow Online Booking</span>
                  </label>
                  <label className="flex items-center gap-3 p-4 bg-white rounded-xl border-2 border-rose-200 cursor-pointer hover:bg-rose-50 transition-all">
                    <input
                      type="checkbox"
                      checked={formData.requiresConfirmation}
                      onChange={(e) => setFormData({ ...formData, requiresConfirmation: e.target.checked })}
                      className="w-5 h-5 text-rose-600 border-gray-300 rounded focus:ring-rose-500"
                    />
                    <span className="text-sm font-semibold text-gray-700">Requires Confirmation</span>
                  </label>
                  <label className="flex items-center gap-3 p-4 bg-white rounded-xl border-2 border-rose-200 cursor-pointer hover:bg-rose-50 transition-all">
                    <input
                      type="checkbox"
                      checked={formData.isFeatured}
                      onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                      className="w-5 h-5 text-rose-600 border-gray-300 rounded focus:ring-rose-500"
                    />
                    <span className="text-sm font-semibold text-gray-700">Featured Doctor</span>
                  </label>
                </div>
              </div>

              <div className="bg-linear-to-br from-yellow-50 to-amber-50 p-5 rounded-xl border border-yellow-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-yellow-600 p-2 rounded-lg">
                    <Star size={18} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">Reviews</h3>
                </div>
                
                {formData.reviews.length > 0 && (
                  <div className="space-y-3 mb-4">
                    {formData.reviews.map((review, index) => (
                      <div key={index} className="bg-white p-4 rounded-lg border-2 border-yellow-200 flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-semibold text-gray-900">{review.patientName}</span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  size={16}
                                  className={i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                          <p className="text-gray-700 text-sm">{review.comment}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, reviews: formData.reviews.filter((_, i) => i !== index) })}
                          className="text-red-500 hover:text-red-700 p-1 ml-2"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="bg-white p-4 rounded-lg border-2 border-yellow-200 space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Patient Name</label>
                      <input
                        type="text"
                        value={newReview.patientName}
                        onChange={(e) => setNewReview({ ...newReview, patientName: e.target.value })}
                        className="w-full px-3 py-2 border-2 border-yellow-200 rounded-lg focus:ring-2 focus:ring-yellow-500 text-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Rating</label>
                      <select
                        value={newReview.rating}
                        onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                        className="w-full px-3 py-2 border-2 border-yellow-200 rounded-lg focus:ring-2 focus:ring-yellow-500 text-gray-900"
                      >
                        <option value={5}>⭐⭐⭐⭐⭐ (5)</option>
                        <option value={4}>⭐⭐⭐⭐ (4)</option>
                        <option value={3}>⭐⭐⭐ (3)</option>
                        <option value={2}>⭐⭐ (2)</option>
                        <option value={1}>⭐ (1)</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Comment</label>
                    <textarea
                      value={newReview.comment}
                      onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                      rows={2}
                      className="w-full px-3 py-2 border-2 border-yellow-200 rounded-lg focus:ring-2 focus:ring-yellow-500 text-gray-900"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (newReview.patientName && newReview.comment) {
                        setFormData({ ...formData, reviews: [...formData.reviews, { ...newReview }] });
                        setNewReview({ patientName: '', rating: 5, comment: '', date: new Date().toISOString().split('T')[0] });
                      }
                    }}
                    className="flex items-center gap-2 bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-all font-semibold"
                  >
                    <Plus size={18} />
                    Add Review
                  </button>
                </div>
              </div>

              <div className="bg-linear-to-br from-indigo-50 to-blue-50 p-5 rounded-xl border border-indigo-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-indigo-600 p-2 rounded-lg">
                    <GraduationCap size={18} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">Education</h3>
                </div>
                
                {formData.education.length > 0 && (
                  <div className="space-y-3 mb-4">
                    {formData.education.map((edu, index) => (
                      <div key={index} className="bg-white p-4 rounded-lg border-2 border-indigo-200 flex justify-between items-start">
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900">{edu.degree}</div>
                          <div className="text-gray-700 text-sm">{edu.institution}</div>
                          <div className="text-gray-500 text-sm">{edu.year}</div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, education: formData.education.filter((_, i) => i !== index) })}
                          className="text-red-500 hover:text-red-700 p-1 ml-2"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="bg-white p-4 rounded-lg border-2 border-indigo-200 space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Degree</label>
                      <input
                        type="text"
                        value={newEducation.degree}
                        onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
                        className="w-full px-3 py-2 border-2 border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Institution</label>
                      <input
                        type="text"
                        value={newEducation.institution}
                        onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
                        className="w-full px-3 py-2 border-2 border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Year</label>
                      <input
                        type="text"
                        value={newEducation.year}
                        onChange={(e) => setNewEducation({ ...newEducation, year: e.target.value })}
                        className="w-full px-3 py-2 border-2 border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (newEducation.degree && newEducation.institution && newEducation.year) {
                        setFormData({ ...formData, education: [...formData.education, { ...newEducation }] });
                        setNewEducation({ degree: '', institution: '', year: '' });
                      }
                    }}
                    className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all font-semibold"
                  >
                    <Plus size={18} />
                    Add Education
                  </button>
                </div>
              </div>

              <div className="bg-linear-to-br from-cyan-50 to-teal-50 p-5 rounded-xl border border-cyan-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-cyan-600 p-2 rounded-lg">
                    <Stethoscope size={18} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">Specializations</h3>
                </div>
                
                {formData.specializations.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {formData.specializations.map((spec, index) => (
                      <div key={index} className="bg-white px-4 py-2 rounded-lg border-2 border-cyan-200 flex items-center gap-2">
                        <span className="text-gray-900 font-medium">{spec}</span>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, specializations: formData.specializations.filter((_, i) => i !== index) })}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="bg-white p-4 rounded-lg border-2 border-cyan-200 flex gap-3">
                  <input
                    type="text"
                    value={newSpecialization}
                    onChange={(e) => setNewSpecialization(e.target.value)}
                    placeholder="Enter specialization"
                    className="flex-1 px-3 py-2 border-2 border-cyan-200 rounded-lg focus:ring-2 focus:ring-cyan-500 text-gray-900"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newSpecialization.trim()) {
                        setFormData({ ...formData, specializations: [...formData.specializations, newSpecialization.trim()] });
                        setNewSpecialization('');
                      }
                    }}
                    className="flex items-center gap-2 bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 transition-all font-semibold"
                  >
                    <Plus size={18} />
                    Add
                  </button>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-linear-to-r from-teal-600 to-cyan-600 text-white px-8 py-3 rounded-xl hover:from-teal-700 hover:to-cyan-700 transition-all disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed font-bold shadow-lg"
                >
                  {loading ? 'Updating...' : 'Update Doctor'}
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
