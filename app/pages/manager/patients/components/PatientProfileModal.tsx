import { X, Phone, Mail, Calendar, User, Droplet, MapPin, Activity, Ruler, Weight, AlertCircle, Pill, FileText, CheckCircle, XCircle } from 'lucide-react';
import { Patient } from '../page';

type Language = 'ar' | 'en';

const translations = {
  ar: {
    patientProfile: 'ملف المريض',
    patientId: 'رقم المريض',
    contactInfo: 'معلومات الاتصال',
    phone: 'الهاتف',
    email: 'البريد الإلكتروني',
    personalInfo: 'المعلومات الشخصية',
    dateOfBirth: 'تاريخ الميلاد',
    gender: 'الجنس',
    bloodType: 'فصيلة الدم',
    height: 'الطول',
    weight: 'الوزن',
    address: 'العنوان',
    medicalInfo: 'المعلومات الطبية',
    allergies: 'الحساسية',
    chronicConditions: 'الأمراض المزمنة',
    other: 'أخرى',
    medicalHistory: 'التاريخ الطبي',
    currentMedications: 'الأدوية الحالية',
    dosage: 'الجرعة',
    frequency: 'التكرار',
    notes: 'ملاحظات',
    notesForDoctor: 'ملاحظات للطبيب',
    visitStats: 'إحصائيات الزيارات',
    totalVisits: 'إجمالي الزيارات',
    completed: 'مكتمل',
    upcoming: 'قادم',
    lastVisit: 'آخر زيارة',
    accountInfo: 'معلومات الحساب',
    registered: 'تاريخ التسجيل',
    lastLogin: 'آخر تسجيل دخول',
    emailStatus: 'حالة البريد',
    verified: 'موثق',
    notVerified: 'غير موثق',
    accountStatus: 'حالة الحساب',
    active: 'نشط',
    inactive: 'غير نشط',
    close: 'إغلاق',
    male: 'ذكر',
    female: 'أنثى',
    cm: 'سم',
    kg: 'كجم'
  },
  en: {
    patientProfile: 'Patient Profile',
    patientId: 'Patient ID',
    contactInfo: 'Contact Information',
    phone: 'Phone',
    email: 'Email',
    personalInfo: 'Personal Information',
    dateOfBirth: 'Date of Birth',
    gender: 'Gender',
    bloodType: 'Blood Type',
    height: 'Height',
    weight: 'Weight',
    address: 'Address',
    medicalInfo: 'Medical Information',
    allergies: 'Allergies',
    chronicConditions: 'Chronic Conditions',
    other: 'Other',
    medicalHistory: 'Medical History',
    currentMedications: 'Current Medications',
    dosage: 'Dosage',
    frequency: 'Frequency',
    notes: 'Notes',
    notesForDoctor: 'Notes for Doctor',
    visitStats: 'Visit Statistics',
    totalVisits: 'Total Visits',
    completed: 'Completed',
    upcoming: 'Upcoming',
    lastVisit: 'Last Visit',
    accountInfo: 'Account Information',
    registered: 'Registered',
    lastLogin: 'Last Login',
    emailStatus: 'Email Status',
    verified: 'Verified',
    notVerified: 'Not Verified',
    accountStatus: 'Account Status',
    active: 'Active',
    inactive: 'Inactive',
    close: 'Close',
    male: 'Male',
    female: 'Female',
    cm: 'cm',
    kg: 'kg'
  }
};

interface PatientProfileModalProps {
  patient: Patient;
  onClose: () => void;
  language?: Language;
}

export const PatientProfileModal = ({ patient, onClose, language = 'ar' }: PatientProfileModalProps) => {
  const t = translations[language];
  const isRTL = language === 'ar';
  
  const getGender = (gender?: string) => {
    if (!gender) return 'N/A';
    if (language === 'ar') {
      return gender.toLowerCase() === 'male' ? t.male : gender.toLowerCase() === 'female' ? t.female : gender;
    }
    return gender.charAt(0).toUpperCase() + gender.slice(1);
  };
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="bg-gray-800 rounded-xl border border-gray-700 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-4 sm:p-6 flex items-center justify-between">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">{t.patientProfile}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Patient Info */}
          <div className={`flex items-center gap-3 sm:gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-teal-500/20 flex items-center justify-center shrink-0">
              <span className="text-teal-400 font-bold text-2xl sm:text-3xl">{patient.name.charAt(0)}</span>
            </div>
            <div className={`min-w-0 ${isRTL ? 'text-right' : ''}`}>
              <h3 className="text-xl sm:text-2xl font-bold text-white truncate">{patient.name}</h3>
              <p className="text-gray-400 text-xs sm:text-sm truncate">{t.patientId}: {patient._id}</p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gray-750 rounded-lg p-3 sm:p-4">
            <h4 className={`text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4 ${isRTL ? 'text-right' : ''}`}>{t.contactInfo}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className={`flex items-center gap-2 sm:gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Phone size={18} className="text-teal-400 shrink-0" />
                <div className={`min-w-0 ${isRTL ? 'text-right' : ''}`}>
                  <p className="text-xs text-gray-400">{t.phone}</p>
                  <p className="text-white text-sm sm:text-base">{patient.phone}</p>
                </div>
              </div>
              {patient.email && (
                <div className={`flex items-center gap-2 sm:gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Mail size={18} className="text-teal-400 shrink-0" />
                  <div className={`min-w-0 ${isRTL ? 'text-right' : ''}`}>
                    <p className="text-xs text-gray-400">{t.email}</p>
                    <p className="text-white text-sm sm:text-base truncate">{patient.email}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Personal Information */}
          <div className="bg-gray-750 rounded-lg p-3 sm:p-4">
            <h4 className={`text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4 ${isRTL ? 'text-right' : ''}`}>{t.personalInfo}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {patient.dateOfBirth && (
                <div className={`flex items-center gap-2 sm:gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Calendar size={18} className="text-teal-400 shrink-0" />
                  <div className={isRTL ? 'text-right' : ''}>
                    <p className="text-xs text-gray-400">{t.dateOfBirth}</p>
                    <p className="text-white text-sm sm:text-base">{new Date(patient.dateOfBirth).toLocaleDateString()}</p>
                  </div>
                </div>
              )}
              {patient.gender && (
                <div className={`flex items-center gap-2 sm:gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <User size={18} className="text-teal-400 shrink-0" />
                  <div className={isRTL ? 'text-right' : ''}>
                    <p className="text-xs text-gray-400">{t.gender}</p>
                    <p className="text-white text-sm sm:text-base">{getGender(patient.gender)}</p>
                  </div>
                </div>
              )}
              {patient.bloodType && (
                <div className={`flex items-center gap-2 sm:gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Droplet size={18} className="text-red-400 shrink-0" />
                  <div className={isRTL ? 'text-right' : ''}>
                    <p className="text-xs text-gray-400">{t.bloodType}</p>
                    <p className="text-white font-semibold text-sm sm:text-base">{patient.bloodType}</p>
                  </div>
                </div>
              )}
              {patient.height && (
                <div className={`flex items-center gap-2 sm:gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Ruler size={18} className="text-teal-400 shrink-0" />
                  <div className={isRTL ? 'text-right' : ''}>
                    <p className="text-xs text-gray-400">{t.height}</p>
                    <p className="text-white text-sm sm:text-base">{patient.height} {t.cm}</p>
                  </div>
                </div>
              )}
              {patient.weight && (
                <div className={`flex items-center gap-2 sm:gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Weight size={18} className="text-teal-400 shrink-0" />
                  <div className={isRTL ? 'text-right' : ''}>
                    <p className="text-xs text-gray-400">{t.weight}</p>
                    <p className="text-white text-sm sm:text-base">{patient.weight} {t.kg}</p>
                  </div>
                </div>
              )}
              {patient.address && (
                <div className={`flex items-start gap-2 sm:gap-3 sm:col-span-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <MapPin size={18} className="text-teal-400 shrink-0 mt-1" />
                  <div className={`min-w-0 ${isRTL ? 'text-right' : ''}`}>
                    <p className="text-xs text-gray-400">{t.address}</p>
                    <p className="text-white text-sm sm:text-base">
                      {typeof patient.address === 'string' 
                        ? patient.address 
                        : `${patient.address.street || ''}, ${patient.address.city || ''}`}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Medical Information */}
          {(patient.allergies?.length || patient.chronicConditions?.length || patient.medicalHistory?.length) && (
            <div className="bg-gray-750 rounded-lg p-3 sm:p-4">
              <h4 className={`text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4 ${isRTL ? 'text-right' : ''}`}>{t.medicalInfo}</h4>
              
              {patient.allergies && patient.allergies.length > 0 && (
                <div className="mb-3 sm:mb-4">
                  <div className={`flex items-center gap-2 mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <AlertCircle size={18} className="text-red-400" />
                    <p className="text-xs sm:text-sm font-semibold text-white">{t.allergies}</p>
                  </div>
                  <div className={`flex flex-wrap gap-2 ${isRTL ? 'justify-end' : ''}`}>
                    {patient.allergies.map((allergy, index) => (
                      <span key={index} className="px-2 sm:px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-xs sm:text-sm">
                        {allergy}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {patient.chronicConditions && patient.chronicConditions.length > 0 && (
                <div className="mb-3 sm:mb-4">
                  <div className={`flex items-center gap-2 mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <FileText size={18} className="text-orange-400" />
                    <p className="text-xs sm:text-sm font-semibold text-white">{t.chronicConditions}</p>
                  </div>
                  <div className={`flex flex-wrap gap-2 ${isRTL ? 'justify-end' : ''}`}>
                    {patient.chronicConditions.map((condition, index) => (
                      <span key={index} className="px-2 sm:px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-xs sm:text-sm">
                        {condition}
                      </span>
                    ))}
                  </div>
                  {patient.chronicConditionsOther && (
                    <p className={`text-gray-300 text-xs sm:text-sm mt-2 ${isRTL ? 'text-right' : ''}`}>{t.other}: {patient.chronicConditionsOther}</p>
                  )}
                </div>
              )}

              {patient.medicalHistory && patient.medicalHistory.length > 0 && (
                <div>
                  <div className={`flex items-center gap-2 mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <FileText size={18} className="text-blue-400" />
                    <p className="text-xs sm:text-sm font-semibold text-white">{t.medicalHistory}</p>
                  </div>
                  <ul className={`list-disc ${isRTL ? 'list-inside text-right' : 'list-inside'} text-gray-300 text-xs sm:text-sm space-y-1`}>
                    {patient.medicalHistory.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Current Medications */}
          {patient.currentMedications && patient.currentMedications.length > 0 && (
            <div className="bg-gray-750 rounded-lg p-3 sm:p-4">
              <div className={`flex items-center gap-2 mb-3 sm:mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Pill size={18} className="text-purple-400" />
                <h4 className="text-base sm:text-lg font-semibold text-white">{t.currentMedications}</h4>
              </div>
              <div className="space-y-2 sm:space-y-3">
                {patient.currentMedications.map((med, index) => (
                  <div key={index} className="bg-gray-800 rounded-lg p-2 sm:p-3">
                    <p className={`text-white font-semibold text-sm sm:text-base ${isRTL ? 'text-right' : ''}`}>{med.name}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 text-xs sm:text-sm">
                      <p className={`text-gray-400 ${isRTL ? 'text-right' : ''}`}>{t.dosage}: <span className="text-white">{med.dosage}</span></p>
                      <p className={`text-gray-400 ${isRTL ? 'text-right' : ''}`}>{t.frequency}: <span className="text-white">{med.frequency}</span></p>
                    </div>
                    {med.notes && (
                      <p className={`text-gray-300 text-xs sm:text-sm mt-2 ${isRTL ? 'text-right' : ''}`}>{t.notes}: {med.notes}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notes for Doctor */}
          {patient.notesForDoctor && (
            <div className="bg-gray-750 rounded-lg p-3 sm:p-4">
              <div className={`flex items-center gap-2 mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <FileText size={18} className="text-teal-400" />
                <h4 className="text-base sm:text-lg font-semibold text-white">{t.notesForDoctor}</h4>
              </div>
              <p className={`text-gray-300 text-sm sm:text-base ${isRTL ? 'text-right' : ''}`}>{patient.notesForDoctor}</p>
            </div>
          )}

          {/* Visit Statistics */}
          <div className="bg-gray-750 rounded-lg p-3 sm:p-4">
            <h4 className={`text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4 ${isRTL ? 'text-right' : ''}`}>{t.visitStats}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="bg-gray-800 rounded-lg p-3 sm:p-4">
                <div className={`flex items-center gap-2 mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Activity size={18} className="text-teal-400" />
                  <p className="text-xs text-gray-400">{t.totalVisits}</p>
                </div>
                <p className="text-xl sm:text-2xl font-bold text-white">{patient.totalVisits}</p>
              </div>
              <div className="bg-gray-800 rounded-lg p-3 sm:p-4">
                <div className={`flex items-center gap-2 mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Activity size={18} className="text-green-400" />
                  <p className="text-xs text-gray-400">{t.completed}</p>
                </div>
                <p className="text-xl sm:text-2xl font-bold text-white">{patient.completedVisits}</p>
              </div>
              <div className="bg-gray-800 rounded-lg p-3 sm:p-4">
                <div className={`flex items-center gap-2 mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Activity size={18} className="text-blue-400" />
                  <p className="text-xs text-gray-400">{t.upcoming}</p>
                </div>
                <p className="text-xl sm:text-2xl font-bold text-white">{patient.upcomingVisits}</p>
              </div>
            </div>
          </div>

          {/* Last Visit */}
          {patient.lastAppointment && (
            <div className="bg-gray-750 rounded-lg p-3 sm:p-4">
              <h4 className={`text-base sm:text-lg font-semibold text-white mb-2 ${isRTL ? 'text-right' : ''}`}>{t.lastVisit}</h4>
              <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Calendar size={18} className="text-teal-400" />
                <p className="text-white text-sm sm:text-base">{new Date(patient.lastAppointment).toLocaleDateString()}</p>
              </div>
            </div>
          )}

          {/* Registration Date */}
          <div className="bg-gray-750 rounded-lg p-3 sm:p-4">
            <h4 className={`text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4 ${isRTL ? 'text-right' : ''}`}>{t.accountInfo}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {patient.registeredAt && (
                <div className={`flex items-center gap-2 sm:gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Calendar size={18} className="text-teal-400 shrink-0" />
                  <div className={isRTL ? 'text-right' : ''}>
                    <p className="text-xs text-gray-400">{t.registered}</p>
                    <p className="text-white text-sm sm:text-base">{new Date(patient.registeredAt).toLocaleDateString()}</p>
                  </div>
                </div>
              )}
              {patient.lastLoginAt && (
                <div className={`flex items-center gap-2 sm:gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Calendar size={18} className="text-teal-400 shrink-0" />
                  <div className={isRTL ? 'text-right' : ''}>
                    <p className="text-xs text-gray-400">{t.lastLogin}</p>
                    <p className="text-white text-sm sm:text-base">{new Date(patient.lastLoginAt).toLocaleDateString()}</p>
                  </div>
                </div>
              )}
              <div className={`flex items-center gap-2 sm:gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                {patient.emailVerified ? (
                  <CheckCircle size={18} className="text-green-400 shrink-0" />
                ) : (
                  <XCircle size={18} className="text-red-400 shrink-0" />
                )}
                <div className={isRTL ? 'text-right' : ''}>
                  <p className="text-xs text-gray-400">{t.emailStatus}</p>
                  <p className={`text-sm sm:text-base ${patient.emailVerified ? "text-green-400" : "text-red-400"}`}>
                    {patient.emailVerified ? t.verified : t.notVerified}
                  </p>
                </div>
              </div>
              <div className={`flex items-center gap-2 sm:gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                {patient.isActive ? (
                  <CheckCircle size={18} className="text-green-400 shrink-0" />
                ) : (
                  <XCircle size={18} className="text-red-400 shrink-0" />
                )}
                <div className={isRTL ? 'text-right' : ''}>
                  <p className="text-xs text-gray-400">{t.accountStatus}</p>
                  <p className={`text-sm sm:text-base ${patient.isActive ? "text-green-400" : "text-red-400"}`}>
                    {patient.isActive ? t.active : t.inactive}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-gray-800 border-t border-gray-700 p-4 sm:p-6">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors text-sm sm:text-base"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
