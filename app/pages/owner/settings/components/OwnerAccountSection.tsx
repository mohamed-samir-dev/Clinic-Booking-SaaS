import { useState } from 'react';
import { Building2, Save, Edit2, X, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import { OwnerData } from '../types';
import { useLanguage } from '@/app/contexts/LanguageContext';

const t = {
  ar: {
    title: 'حساب المالك',
    edit: 'تعديل',
    save: 'حفظ',
    saving: 'جاري الحفظ...',
    cancel: 'إلغاء',
    ownerName: 'اسم المالك',
    ownerEmail: 'البريد الإلكتروني',
    ownerPhone: 'رقم الهاتف',
    changePassword: 'تغيير كلمة المرور',
    newPassword: 'كلمة المرور الجديدة',
    confirmPassword: 'تأكيد كلمة المرور',
    passwordPlaceholder: 'اتركه فارغاً للإبقاء على الحالية',
    confirmPlaceholder: 'تأكيد كلمة المرور الجديدة',
    passwordMin: 'كلمة المرور يجب أن تكون 8 أحرف على الأقل',
    passwordsNotMatch: 'كلمات المرور غير متطابقة',
    updateSuccess: 'تم تحديث حساب المالك بنجاح',
    updateError: 'فشل تحديث حساب المالك',
  },
  en: {
    title: 'Owner Account',
    edit: 'Edit',
    save: 'Save',
    saving: 'Saving...',
    cancel: 'Cancel',
    ownerName: 'Owner Name',
    ownerEmail: 'Owner Email',
    ownerPhone: 'Owner Phone',
    changePassword: 'Change Owner Password',
    newPassword: 'New Password',
    confirmPassword: 'Confirm Password',
    passwordPlaceholder: 'Leave blank to keep current',
    confirmPlaceholder: 'Confirm new password',
    passwordMin: 'Password must be at least 8 characters',
    passwordsNotMatch: 'Passwords do not match',
    updateSuccess: 'Owner account updated successfully',
    updateError: 'Failed to update owner account',
  },
} as const;

interface OwnerAccountSectionProps {
  ownerData: OwnerData;
  setOwnerData: (data: OwnerData) => void;
  fetchData: () => void;
}

export const OwnerAccountSection = ({ ownerData, setOwnerData, fetchData }: OwnerAccountSectionProps) => {
  const [editingSection, setEditingSection] = useState(false);
  const [savingSection, setSavingSection] = useState(false);
  const [ownerPassword, setOwnerPassword] = useState({ new: '', confirm: '' });
  const [showPassword, setShowPassword] = useState({ new: false, confirm: false });
  const { locale } = useLanguage();
  const tr = t[locale as 'ar' | 'en'];

  const handleSaveOwner = async () => {
    setSavingSection(true);
    try {
      const token = localStorage.getItem('token');
      const ownerUpdateData: OwnerData & { password?: string } = {
        name: ownerData.name,
        email: ownerData.email,
        phone: ownerData.phone,
      };

      if (ownerPassword.new) {
        if (ownerPassword.new.length < 8) {
          toast.error(tr.passwordMin);
          setSavingSection(false);
          return;
        }
        if (ownerPassword.new !== ownerPassword.confirm) {
          toast.error(tr.passwordsNotMatch);
          setSavingSection(false);
          return;
        }
        ownerUpdateData.password = ownerPassword.new;
      }

      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/owner/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(ownerUpdateData),
      });

      setOwnerPassword({ new: '', confirm: '' });
      toast.success(tr.updateSuccess);
      setEditingSection(false);
    } catch {
      toast.error(tr.updateError);
    } finally {
      setSavingSection(false);
    }
  };

  return (
    <div className="bg-gray-800 rounded-2xl shadow-xl border border-gray-700 overflow-hidden">
      <div className="bg-linear-to-r from-teal-600 to-cyan-600 p-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Building2 size={28} className="text-white" />
          <h3 className="text-xl font-semibold text-white">{tr.title}</h3>
        </div>
        {!editingSection ? (
          <button
            onClick={() => setEditingSection(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white text-teal-600 rounded-lg hover:bg-gray-100 transition-colors font-medium"
          >
            <Edit2 size={18} />
            {tr.edit}
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleSaveOwner}
              disabled={savingSection}
              className="flex items-center gap-2 px-4 py-2 bg-white text-teal-600 rounded-lg hover:bg-gray-100 transition-colors font-medium disabled:opacity-50"
            >
              <Save size={18} />
              {savingSection ? tr.saving : tr.save}
            </button>
            <button
              onClick={() => {
                setEditingSection(false);
                fetchData();
              }}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
            >
              <X size={18} />
              {tr.cancel}
            </button>
          </div>
        )}
      </div>
      <div className="p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">{tr.ownerName}</label>
          <input
            type="text"
            value={ownerData.name}
            onChange={(e) => setOwnerData({ ...ownerData, name: e.target.value })}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
            disabled={!editingSection}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">{tr.ownerEmail}</label>
            <input
              type="email"
              value={ownerData.email}
              onChange={(e) => setOwnerData({ ...ownerData, email: e.target.value })}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
              disabled={!editingSection}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">{tr.ownerPhone}</label>
            <input
              type="tel"
              value={ownerData.phone}
              onChange={(e) => setOwnerData({ ...ownerData, phone: e.target.value })}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
              disabled={!editingSection}
            />
          </div>
        </div>
        <div className="border-t border-gray-600 pt-4 mt-4">
          <h4 className="text-lg font-medium text-white mb-3">{tr.changePassword}</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">{tr.newPassword}</label>
              <div className="relative">
                <input
                  type={showPassword.new ? 'text' : 'password'}
                  value={ownerPassword.new}
                  onChange={(e) => setOwnerPassword({ ...ownerPassword, new: e.target.value })}
                  className="w-full px-4 py-3 pr-12 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  placeholder={tr.passwordPlaceholder}
                  disabled={!editingSection}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword({ ...showPassword, new: !showPassword.new })}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword.new ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">{tr.confirmPassword}</label>
              <div className="relative">
                <input
                  type={showPassword.confirm ? 'text' : 'password'}
                  value={ownerPassword.confirm}
                  onChange={(e) => setOwnerPassword({ ...ownerPassword, confirm: e.target.value })}
                  className="w-full px-4 py-3 pr-12 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  placeholder={tr.confirmPlaceholder}
                  disabled={!editingSection}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword({ ...showPassword, confirm: !showPassword.confirm })}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword.confirm ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
