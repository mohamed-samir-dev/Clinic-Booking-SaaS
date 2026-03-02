import { User, RefreshCw, Eye, EyeOff } from 'lucide-react';
import { FormData } from '../types';
import { useState } from 'react';

interface PersonalInfoSectionProps {
  formData: FormData;
  onUpdate: (data: Partial<FormData>) => void;
  onGeneratePassword?: () => void;
  isEditMode?: boolean;
}

export default function PersonalInfoSection({ formData, onUpdate, onGeneratePassword, isEditMode = false }: PersonalInfoSectionProps) {
  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <div className="bg-gray-700/50 p-5 rounded-xl border border-gray-600">
      <div className="flex items-center gap-3 mb-3">
        <div className="bg-teal-600 p-2 rounded-lg">
          <User size={18} className="text-white" />
        </div>
        <h3 className="text-lg font-bold text-white">المعلومات الشخصية - Personal Information</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">الاسم الأول - First Name *</label>
          <input
            type="text"
            required
            value={formData.firstName}
            onChange={(e) => onUpdate({ firstName: e.target.value })}
            className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white"
            placeholder="Ahmed"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">اسم العائلة - Last Name *</label>
          <input
            type="text"
            required
            value={formData.lastName}
            onChange={(e) => onUpdate({ lastName: e.target.value })}
            className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white"
            placeholder="Hassan"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">الاسم بالإنجليزية - Name (English)</label>
          <input
            type="text"
            value={formData.name.en}
            onChange={(e) => onUpdate({ name: { ...formData.name, en: e.target.value } })}
            className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white"
            placeholder="Dr. Ahmed Hassan"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">الاسم بالعربية - Name (Arabic)</label>
          <input
            type="text"
            value={formData.name.ar}
            onChange={(e) => onUpdate({ name: { ...formData.name, ar: e.target.value } })}
            className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white"
            placeholder="د. أحمد حسن"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">اللقب - Title *</label>
          <select
            required
            value={formData.title}
            onChange={(e) => onUpdate({ title: e.target.value })}
            className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white"
          >
            <option value="Dr">Dr</option>
            <option value="Prof">Prof</option>
            <option value="Consultant">Consultant</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">الجنس - Gender</label>
          <select
            value={formData.gender}
            onChange={(e) => onUpdate({ gender: e.target.value })}
            className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">البريد الإلكتروني - Email *</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => onUpdate({ email: e.target.value })}
            className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white"
            placeholder="doctor@clinic.com"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">الهاتف - Phone</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => onUpdate({ phone: e.target.value })}
            className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white"
            placeholder="+20123456789"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            كلمة المرور - Password {!isEditMode && '*'}
            {isEditMode && <span className="text-xs text-gray-500 ml-2">(اتركه فارغاً إذا لم ترد التغيير)</span>}
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type={showPassword ? 'text' : 'password'}
                required={!isEditMode}
                value={formData.password}
                onChange={(e) => onUpdate({ password: e.target.value })}
                className="w-full px-4 py-3 pr-12 bg-gray-800 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white"
                placeholder={isEditMode ? "أدخل كلمة مرور جديدة" : "Enter or generate password"}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {!isEditMode && onGeneratePassword && (
              <button
                type="button"
                onClick={onGeneratePassword}
                className="px-4 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-all flex items-center gap-2 font-semibold"
                title="Generate strong password"
              >
                <RefreshCw size={18} />
                Generate
              </button>
            )}
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">فصيلة الدم - Blood Type</label>
          <div className="relative">
            <select
              value={formData.bloodType}
              onChange={(e) => onUpdate({ bloodType: e.target.value })}
              className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white appearance-none"
            >
              <option value="">-- Select Blood Type --</option>
              <option value="A+">🩸 A+</option>
              <option value="A-">🩸 A-</option>
              <option value="B+">🩸 B+</option>
              <option value="B-">🩸 B-</option>
              <option value="AB+">🩸 AB+</option>
              <option value="AB-">🩸 AB-</option>
              <option value="O+">🩸 O+</option>
              <option value="O-">🩸 O-</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">Optional: Doctor&rsquo;s blood type for medical records</p>
        </div>
      </div>
    </div>
  );
}
