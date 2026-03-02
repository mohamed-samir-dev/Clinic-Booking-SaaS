import { Shield } from 'lucide-react';
import { ManagerFormData } from '../types';
import { PERMISSION_ITEMS } from '../utils/constants';

interface PermissionsSectionProps {
  formData: Partial<ManagerFormData>;
  setFormData: (data: Partial<ManagerFormData>) => void;
}

export const PermissionsSection = ({ formData, setFormData }: PermissionsSectionProps) => (
  <div className="bg-gray-700/50 p-5 rounded-xl border border-gray-600">
    <div className="flex items-center gap-3 mb-4">
      <div className="bg-teal-600 p-2 rounded-lg">
        <Shield size={18} className="text-white" />
      </div>
      <h3 className="text-lg font-bold text-white">Permissions</h3>
    </div>
    <div className="space-y-3">
      {PERMISSION_ITEMS.map((perm) => (
        <label
          key={perm.key}
          className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg border-2 border-gray-600 cursor-pointer hover:bg-gray-700 transition-all"
        >
          <input
            type="checkbox"
            checked={formData.permissions?.[perm.key as keyof typeof formData.permissions] || false}
            onChange={(e) =>
              setFormData({
                ...formData,
                permissions: {
                  ...formData.permissions!,
                  [perm.key]: e.target.checked,
                },
              })
            }
            className="w-5 h-5 text-teal-600 border-gray-500 rounded focus:ring-teal-500"
          />
          <span className="text-sm font-semibold text-gray-300">{perm.label}</span>
        </label>
      ))}
    </div>
  </div>
);
