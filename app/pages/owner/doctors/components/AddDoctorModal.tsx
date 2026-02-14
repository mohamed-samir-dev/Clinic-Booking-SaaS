// 'use client';

// import { useState } from 'react';
// import { X } from 'lucide-react';

// interface AddDoctorModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSuccess: () => void;
// }

// export default function AddDoctorModal({ isOpen, onClose, onSuccess }: AddDoctorModalProps) {
//   const [formData, setFormData] = useState({
//     name: { en: '', ar: '' },
//     email: '',
//     phone: '',
//     specialty: { en: '', ar: '' },
//     subSpecialty: { en: '', ar: '' },
//     bio: { en: '', ar: '' },
//     education: { en: '', ar: '' },
//     experienceYears: '',
//     photoUrl: '',
//     gender: 'male',
//     languages: '',
//     clinicRoomNumber: '',
//     consultationFee: '',
//     currency: 'EGP',
//     slotDuration: '30',
//     bufferBefore: '0',
//     bufferAfter: '0',
//     maxPatientsPerSlot: '1',
//     minNoticeMinutes: '60',
//     allowOnlineBooking: true,
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       const token = localStorage.getItem('token');
//       const payload = {
//         ...formData,
//         experienceYears: Number(formData.experienceYears) || 0,
//         consultationFee: Number(formData.consultationFee) || 0,
//         slotDuration: Number(formData.slotDuration),
//         bufferBefore: Number(formData.bufferBefore),
//         bufferAfter: Number(formData.bufferAfter),
//         maxPatientsPerSlot: Number(formData.maxPatientsPerSlot),
//         minNoticeMinutes: Number(formData.minNoticeMinutes),
//         languages: formData.languages.split(',').map(l => l.trim()).filter(Boolean),
//       };

//       const response = await fetch('http://localhost:5000/api/owner/doctors', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(payload),
//       });

//       if (response.ok) {
//         onSuccess();
//         onClose();
//       } else {
//         const data = await response.json();
//         setError(data.message || 'Failed to create doctor');
//       }
//     } catch (err) {
//       setError('Network error. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
//         <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
//           <h2 className="text-2xl font-bold text-gray-900">إضافة طبيب جديد</h2>
//           <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
//             <X size={24} />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="p-6 space-y-6">
//           {error && (
//             <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
//               {error}
//             </div>
//           )}

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 الاسم (عربي) *
//               </label>
//               <input
//                 type="text"
//                 required
//                 value={formData.name.ar}
//                 onChange={(e) => setFormData({ ...formData, name: { ...formData.name, ar: e.target.value } })}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="د. أحمد حسن"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Name (English) *
//               </label>
//               <input
//                 type="text"
//                 required
//                 value={formData.name.en}
//                 onChange={(e) => setFormData({ ...formData, name: { ...formData.name, en: e.target.value } })}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="Dr. Ahmed Hassan"
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 البريد الإلكتروني *
//               </label>
//               <input
//                 type="email"
//                 required
//                 value={formData.email}
//                 onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="doctor@clinic.com"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 رقم الهاتف
//               </label>
//               <input
//                 type="tel"
//                 value={formData.phone}
//                 onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="+20123456789"
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 التخصص (عربي)
//               </label>
//               <input
//                 type="text"
//                 value={formData.specialty.ar}
//                 onChange={(e) => setFormData({ ...formData, specialty: { ...formData.specialty, ar: e.target.value } })}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="الأمراض الجلدية"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Specialty (English)
//               </label>
//               <input
//                 type="text"
//                 value={formData.specialty.en}
//                 onChange={(e) => setFormData({ ...formData, specialty: { ...formData.specialty, en: e.target.value } })}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="Dermatology"
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 التخصص الفرعي (عربي)
//               </label>
//               <input
//                 type="text"
//                 value={formData.subSpecialty.ar}
//                 onChange={(e) => setFormData({ ...formData, subSpecialty: { ...formData.subSpecialty, ar: e.target.value } })}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="جلدية تجميلية"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Sub-Specialty (English)
//               </label>
//               <input
//                 type="text"
//                 value={formData.subSpecialty.en}
//                 onChange={(e) => setFormData({ ...formData, subSpecialty: { ...formData.subSpecialty, en: e.target.value } })}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="Cosmetic Dermatology"
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 النبذة (عربي)
//               </label>
//               <textarea
//                 value={formData.bio.ar}
//                 onChange={(e) => setFormData({ ...formData, bio: { ...formData.bio, ar: e.target.value } })}
//                 rows={3}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="متخصص في أحدث تقنيات علاج البشرة"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Bio (English)
//               </label>
//               <textarea
//                 value={formData.bio.en}
//                 onChange={(e) => setFormData({ ...formData, bio: { ...formData.bio, en: e.target.value } })}
//                 rows={3}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="Specialist in advanced skin treatments"
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 التعليم (عربي)
//               </label>
//               <input
//                 type="text"
//                 value={formData.education.ar}
//                 onChange={(e) => setFormData({ ...formData, education: { ...formData.education, ar: e.target.value } })}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="جامعة القاهرة - كلية الطب"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Education (English)
//               </label>
//               <input
//                 type="text"
//                 value={formData.education.en}
//                 onChange={(e) => setFormData({ ...formData, education: { ...formData.education, en: e.target.value } })}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="Cairo University - Faculty of Medicine"
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 سنوات الخبرة
//               </label>
//               <input
//                 type="number"
//                 min="0"
//                 value={formData.experienceYears}
//                 onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 الجنس
//               </label>
//               <select
//                 value={formData.gender}
//                 onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               >
//                 <option value="male">ذكر</option>
//                 <option value="female">أنثى</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 رقم الغرفة
//               </label>
//               <input
//                 type="text"
//                 value={formData.clinicRoomNumber}
//                 onChange={(e) => setFormData({ ...formData, clinicRoomNumber: e.target.value })}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="Room 3"
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 اللغات (مفصولة بفاصلة)
//               </label>
//               <input
//                 type="text"
//                 value={formData.languages}
//                 onChange={(e) => setFormData({ ...formData, languages: e.target.value })}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="Arabic, English"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 رابط الصورة
//               </label>
//               <input
//                 type="url"
//                 value={formData.photoUrl}
//                 onChange={(e) => setFormData({ ...formData, photoUrl: e.target.value })}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="https://example.com/photo.jpg"
//               />
//             </div>
//           </div>

//           <div className="border-t pt-6">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">معلومات الحجز</h3>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   سعر الكشف
//                 </label>
//                 <input
//                   type="number"
//                   min="0"
//                   value={formData.consultationFee}
//                   onChange={(e) => setFormData({ ...formData, consultationFee: e.target.value })}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   العملة
//                 </label>
//                 <input
//                   type="text"
//                   value={formData.currency}
//                   onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   مدة الجلسة (دقيقة)
//                 </label>
//                 <input
//                   type="number"
//                   min="5"
//                   value={formData.slotDuration}
//                   onChange={(e) => setFormData({ ...formData, slotDuration: e.target.value })}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   وقت قبل (دقيقة)
//                 </label>
//                 <input
//                   type="number"
//                   min="0"
//                   value={formData.bufferBefore}
//                   onChange={(e) => setFormData({ ...formData, bufferBefore: e.target.value })}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   وقت بعد (دقيقة)
//                 </label>
//                 <input
//                   type="number"
//                   min="0"
//                   value={formData.bufferAfter}
//                   onChange={(e) => setFormData({ ...formData, bufferAfter: e.target.value })}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   مرضى لكل جلسة
//                 </label>
//                 <input
//                   type="number"
//                   min="1"
//                   value={formData.maxPatientsPerSlot}
//                   onChange={(e) => setFormData({ ...formData, maxPatientsPerSlot: e.target.value })}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   إشعار مسبق (دقيقة)
//                 </label>
//                 <input
//                   type="number"
//                   min="0"
//                   value={formData.minNoticeMinutes}
//                   onChange={(e) => setFormData({ ...formData, minNoticeMinutes: e.target.value })}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>
//             </div>

//             <div className="mt-4">
//               <label className="flex items-center gap-2">
//                 <input
//                   type="checkbox"
//                   checked={formData.allowOnlineBooking}
//                   onChange={(e) => setFormData({ ...formData, allowOnlineBooking: e.target.checked })}
//                   className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//                 />
//                 <span className="text-sm font-medium text-gray-700">السماح بالحجز الإلكتروني</span>
//               </label>
//             </div>
//           </div>

//           <div className="flex gap-4 pt-6 border-t">
//             <button
//               type="submit"
//               disabled={loading}
//               className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
//             >
//               {loading ? 'جاري الحفظ...' : 'حفظ'}
//             </button>
//             <button
//               type="button"
//               onClick={onClose}
//               className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
//             >
//               إلغاء
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
