'use client';

import { useState, useEffect, useCallback } from 'react';
import { MedicalInfo } from '../types';

interface PatientMedicalModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientId: string;
  patientName: string;
  token: string;
  theme: 'light' | 'dark';
  locale: 'en' | 'ar';
}

export const PatientMedicalModal = ({ 
  isOpen, 
  onClose, 
  patientId, 
  patientName, 
  token,
  theme,
  locale 
}: PatientMedicalModalProps) => {
  const [medicalInfo, setMedicalInfo] = useState<MedicalInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasAccess, setHasAccess] = useState(true);

  const fetchMedicalInfo = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/appointments/patient-medical/${patientId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      const data = await response.json();
      
      if (response.ok && data.hasAccess) {
        setMedicalInfo(data.medicalInfo);
        setHasAccess(true);
      } else {
        setHasAccess(false);
      }
    } catch (error) {
      console.error('Error fetching medical info:', error);
      setHasAccess(false);
    } finally {
      setLoading(false);
    }
  }, [patientId, token]);

  useEffect(() => {
    if (isOpen && patientId) {
      fetchMedicalInfo();
    }
  }, [isOpen, patientId, fetchMedicalInfo]);

  if (!isOpen) return null;

  const calculateAge = (dob: string) => {
    if (!dob) return null;
    const birthDate = new Date(dob);
    const today = new Date();
    
    if (isNaN(birthDate.getTime())) return null;
    
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age >= 0 ? age : 0;
  };

  const calculateBMI = (height: number, weight: number) => {
    if (!height || !weight) return null;
    const heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(1);
  };

  const t = {
    en: {
      title: 'Patient Medical Information',
      loading: 'Loading medical information...',
      noAccess: 'No medical information available',
      basicInfo: 'Basic Information',
      age: 'Age',
      years: 'years',
      gender: 'Gender',
      male: 'Male',
      female: 'Female',
      bloodType: 'Blood Type',
      height: 'Height',
      weight: 'Weight',
      bmi: 'BMI',
      allergies: 'Allergies',
      noAllergies: 'No allergies recorded',
      chronicConditions: 'Chronic Conditions',
      noConditions: 'No chronic conditions',
      medications: 'Current Medications',
      noMedications: 'No current medications',
      dosage: 'Dosage',
      frequency: 'Frequency',
      notes: 'Notes for Doctor',
      noNotes: 'No additional notes',
      close: 'Close'
    },
    ar: {
      title: 'المعلومات الطبية للمريض',
      loading: 'جاري تحميل المعلومات الطبية...',
      noAccess: 'لا توجد معلومات طبية متاحة',
      basicInfo: 'المعلومات الأساسية',
      age: 'العمر',
      years: 'سنة',
      gender: 'الجنس',
      male: 'ذكر',
      female: 'أنثى',
      bloodType: 'فصيلة الدم',
      height: 'الطول',
      weight: 'الوزن',
      bmi: 'مؤشر كتلة الجسم',
      allergies: 'الحساسية',
      noAllergies: 'لا توجد حساسية مسجلة',
      chronicConditions: 'الأمراض المزمنة',
      noConditions: 'لا توجد أمراض مزمنة',
      medications: 'الأدوية الحالية',
      noMedications: 'لا توجد أدوية حالية',
      dosage: 'الجرعة',
      frequency: 'التكرار',
      notes: 'ملاحظات للطبيب',
      noNotes: 'لا توجد ملاحظات إضافية',
      close: 'إغلاق'
    }
  };

  const text = t[locale];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl animate-slideUp mx-auto ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        {/* Header */}
        <div className="sticky top-0 z-10 bg-linear-to-r from-teal-500 to-cyan-600 p-5 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <span className="material-icons text-white text-2xl">medical_information</span>
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-white">{text.title}</h2>
                <p className="text-xs sm:text-sm text-white/80">{patientName}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all"
            >
              <span className="material-icons text-white">close</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {text.loading}
              </p>
            </div>
          ) : !hasAccess || !medicalInfo ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-gray-100 to-gray-200 flex items-center justify-center mb-4">
                <span className="material-icons text-3xl text-gray-400">info</span>
              </div>
              <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {text.noAccess}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Basic Info */}
              <div className={`rounded-xl border p-5 ${
                theme === 'dark' ? 'bg-gray-750 border-gray-700' : 'bg-linear-to-br from-gray-50 to-white border-gray-200'
              }`}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="material-icons text-teal-500">person</span>
                  <h3 className={`text-base sm:text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {text.basicInfo}
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {medicalInfo.dateOfBirth && (
                  <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                    <p className={`text-xs font-medium mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      {text.age}
                    </p>
                    <p className={`text-base sm:text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {calculateAge(medicalInfo.dateOfBirth)} {text.years}
                    </p>
                  </div>
                )}
                  {medicalInfo.gender && (
                    <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                      <p className={`text-xs font-medium mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        {text.gender}
                      </p>
                      <p className={`text-base sm:text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {medicalInfo.gender?.toLowerCase() === 'male' ? text.male : text.female}
                      </p>
                    </div>
                  )}
                  {medicalInfo.bloodType && (
                    <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                      <p className={`text-xs font-medium mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        {text.bloodType}
                      </p>
                      <p className={`text-base sm:text-lg font-bold text-red-500`}>
                        {medicalInfo.bloodType}
                      </p>
                    </div>
                  )}
                  {medicalInfo.height && medicalInfo.weight && (
                    <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                      <p className={`text-xs font-medium mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        {text.bmi}
                      </p>
                      <p className={`text-base sm:text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {calculateBMI(medicalInfo.height, medicalInfo.weight)}
                      </p>
                    </div>
                  )}
                  {medicalInfo.height && (
                    <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                      <p className={`text-xs font-medium mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        {text.height}
                      </p>
                      <p className={`text-base sm:text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {medicalInfo.height} cm
                      </p>
                    </div>
                  )}
                  {medicalInfo.weight && (
                    <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                      <p className={`text-xs font-medium mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        {text.weight}
                      </p>
                      <p className={`text-base sm:text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {medicalInfo.weight} kg
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Allergies */}
              <div className={`rounded-xl border p-5 ${
                theme === 'dark' ? 'bg-gray-750 border-gray-700' : 'bg-linear-to-br from-orange-50 to-white border-orange-200'
              }`}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="material-icons text-orange-500">warning</span>
                  <h3 className={`text-base sm:text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {text.allergies}
                  </h3>
                </div>
                {medicalInfo.allergies && medicalInfo.allergies.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {medicalInfo.allergies.map((allergy, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 rounded-lg bg-linear-to-r from-orange-500 to-red-500 text-white text-sm font-medium"
                      >
                        {allergy}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {text.noAllergies}
                  </p>
                )}
              </div>

              {/* Chronic Conditions */}
              <div className={`rounded-xl border p-5 ${
                theme === 'dark' ? 'bg-gray-750 border-gray-700' : 'bg-linear-to-br from-blue-50 to-white border-blue-200'
              }`}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="material-icons text-blue-500">favorite</span>
                  <h3 className={`text-base sm:text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {text.chronicConditions}
                  </h3>
                </div>
                {medicalInfo.chronicConditions && medicalInfo.chronicConditions.length > 0 ? (
                  <div className="space-y-2">
                    {medicalInfo.chronicConditions.map((condition, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
                      >
                        <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          {condition}
                        </p>
                      </div>
                    ))}
                    {medicalInfo.chronicConditionsOther && (
                      <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                        <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          {medicalInfo.chronicConditionsOther}
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {text.noConditions}
                  </p>
                )}
              </div>

              {/* Medications */}
              <div className={`rounded-xl border p-5 ${
                theme === 'dark' ? 'bg-gray-750 border-gray-700' : 'bg-linear-to-br from-purple-50 to-white border-purple-200'
              }`}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="material-icons text-purple-500">medication</span>
                  <h3 className={`text-base sm:text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {text.medications}
                  </h3>
                </div>
                {medicalInfo.currentMedications && medicalInfo.currentMedications.length > 0 ? (
                  <div className="space-y-3">
                    {medicalInfo.currentMedications.map((med, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
                      >
                        <p className={`font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          {med.name}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                          {med.dosage && (
                            <div>
                              <span className={`font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                {text.dosage}:
                              </span>
                              <span className={`ml-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                                {med.dosage}
                              </span>
                            </div>
                          )}
                          {med.frequency && (
                            <div>
                              <span className={`font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                {text.frequency}:
                              </span>
                              <span className={`ml-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                                {med.frequency}
                              </span>
                            </div>
                          )}
                        </div>
                        {med.notes && (
                          <p className={`mt-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                            {med.notes}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {text.noMedications}
                  </p>
                )}
              </div>

              {/* Notes for Doctor */}
              {medicalInfo.notesForDoctor && (
                <div className={`rounded-xl border p-5 ${
                  theme === 'dark' ? 'bg-gray-750 border-gray-700' : 'bg-linear-to-br from-teal-50 to-white border-teal-200'
                }`}>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="material-icons text-teal-500">note</span>
                    <h3 className={`text-base sm:text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {text.notes}
                    </h3>
                  </div>
                  <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                    {medicalInfo.notesForDoctor}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={`sticky bottom-0 p-5 border-t ${
          theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
        }`}>
          <button
            onClick={onClose}
            className="w-full px-4 py-3 bg-linear-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-xl"
          >
            {text.close}
          </button>
        </div>
      </div>
    </div>
  );
};
