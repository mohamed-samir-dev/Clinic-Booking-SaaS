import { Building2, Mail, Phone, MapPin, FileText, Plus, X } from 'lucide-react';
import { ClinicData } from '../page';
import { useState } from 'react';

type Language = 'ar' | 'en';

const translations = {
  ar: {
    clinicInfo: 'معلومات العيادة',
    clinicName: 'اسم العيادة',
    phone: 'رقم الهاتف',
    email: 'البريد الإلكتروني',
    address: 'العنوان',
    description: 'الوصف',
    facilities: 'المرافق',
    addFacilityPlaceholder: 'إضافة مرفق (مثل: موقف سيارات، واي فاي)'
  },
  en: {
    clinicInfo: 'Clinic Information',
    clinicName: 'Clinic Name',
    phone: 'Phone Number',
    email: 'Email',
    address: 'Address',
    description: 'Description',
    facilities: 'Facilities',
    addFacilityPlaceholder: 'Add facility (e.g., Parking, WiFi)'
  }
};

interface ClinicInfoFormProps {
  clinicData: ClinicData;
  setClinicData: (data: ClinicData) => void;
  language?: Language;
}

export const ClinicInfoForm = ({ clinicData, setClinicData, language = 'ar' }: ClinicInfoFormProps) => {
  const [newFacility, setNewFacility] = useState('');
  const t = translations[language];

  const getName = (value: string | { en: string; ar: string }) => 
    typeof value === 'string' ? value : value[language];

  const handleChange = (field: keyof ClinicData, value: ClinicData[keyof ClinicData]) => {
    setClinicData({ ...clinicData, [field]: value });
  };

  const addFacility = () => {
    if (newFacility.trim()) {
      // Add as multilingual object
      const facilityObj = { en: newFacility.trim(), ar: newFacility.trim() };
      handleChange('facilities', [...clinicData.facilities, facilityObj]);
      setNewFacility('');
    }
  };

  const removeFacility = (index: number) => {
    const updated = clinicData.facilities.filter((_, i) => i !== index);
    handleChange('facilities', updated);
  };

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 p-4 sm:p-5 md:p-6">
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <Building2 className="text-teal-400" size={20} />
        <h2 className="text-lg sm:text-xl font-bold text-white">{t.clinicInfo}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-400 mb-2">{t.clinicName}</label>
          <input
            type="text"
            value={getName(clinicData.name)}
            onChange={(e) => {
              const newValue = typeof clinicData.name === 'object' 
                ? { ...clinicData.name, [language]: e.target.value }
                : { en: e.target.value, ar: e.target.value };
              handleChange('name', newValue);
            }}
            className="w-full px-3 sm:px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-teal-500 text-sm sm:text-base"
          />
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-400 mb-2">
            <div className="flex items-center gap-2">
              <Phone size={14} className="sm:w-4 sm:h-4" />
              {t.phone}
            </div>
          </label>
          <input
            type="tel"
            value={clinicData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className="w-full px-3 sm:px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-teal-500 text-sm sm:text-base"
          />
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-400 mb-2">
            <div className="flex items-center gap-2">
              <Mail size={14} className="sm:w-4 sm:h-4" />
              {t.email}
            </div>
          </label>
          <input
            type="email"
            value={clinicData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className="w-full px-3 sm:px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-teal-500 text-sm sm:text-base"
          />
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-400 mb-2">
            <div className="flex items-center gap-2">
              <MapPin size={14} className="sm:w-4 sm:h-4" />
              {t.address}
            </div>
          </label>
          <input
            type="text"
            value={getName(clinicData.address)}
            onChange={(e) => {
              const newValue = typeof clinicData.address === 'object'
                ? { ...clinicData.address, [language]: e.target.value }
                : { en: e.target.value, ar: e.target.value };
              handleChange('address', newValue);
            }}
            className="w-full px-3 sm:px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-teal-500 text-sm sm:text-base"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs sm:text-sm font-medium text-gray-400 mb-2">
            <div className="flex items-center gap-2">
              <FileText size={14} className="sm:w-4 sm:h-4" />
              {t.description}
            </div>
          </label>
          <textarea
            value={getName(clinicData.description)}
            onChange={(e) => {
              const newValue = typeof clinicData.description === 'object'
                ? { ...clinicData.description, [language]: e.target.value }
                : { en: e.target.value, ar: e.target.value };
              handleChange('description', newValue);
            }}
            rows={4}
            className="w-full px-3 sm:px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-teal-500 text-sm sm:text-base"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs sm:text-sm font-medium text-gray-400 mb-2">{t.facilities}</label>
          <div className="flex flex-col sm:flex-row gap-2 mb-3">
            <input
              type="text"
              value={newFacility}
              onChange={(e) => setNewFacility(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addFacility()}
              placeholder={t.addFacilityPlaceholder}
              className="flex-1 px-3 sm:px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-teal-500 text-sm sm:text-base"
            />
            <button
              onClick={addFacility}
              className="px-4 py-2 bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors w-full sm:w-auto"
            >
              <Plus size={18} className="text-white mx-auto sm:w-5 sm:h-5" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {clinicData.facilities.map((facility, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-2.5 sm:px-3 py-1 bg-gray-700 rounded-lg text-white text-xs sm:text-sm"
              >
                <span>{getName(facility)}</span>
                <button
                  onClick={() => removeFacility(index)}
                  className="text-red-400 hover:text-red-300"
                >
                  <X size={14} className="sm:w-4 sm:h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
