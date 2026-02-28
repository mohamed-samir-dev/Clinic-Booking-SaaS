import { FaMapMarkerAlt } from 'react-icons/fa';
import { FormData } from '../types';

interface AddressInfoProps {
  formData: FormData;
  isEditing: boolean;
  onChange: (data: FormData) => void;
}

export const AddressInfo = ({ formData, isEditing, onChange }: AddressInfoProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center shrink-0">
          <FaMapMarkerAlt className="text-orange-600 text-lg" />
        </div>
        <div className="flex-1">
          <p className="text-xs text-gray-500 font-medium mb-3">Address</p>
          {isEditing ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input type="text" placeholder="Street" value={formData.address.street} onChange={(e) => onChange({...formData, address: {...formData.address, street: e.target.value}})} className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900" />
              <input type="text" placeholder="City" value={formData.address.city} onChange={(e) => onChange({...formData, address: {...formData.address, city: e.target.value}})} className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900" />
              <input type="text" placeholder="State" value={formData.address.state} onChange={(e) => onChange({...formData, address: {...formData.address, state: e.target.value}})} className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900" />
              <input type="text" placeholder="Zip Code" value={formData.address.zipCode} onChange={(e) => onChange({...formData, address: {...formData.address, zipCode: e.target.value}})} className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900" />
            </div>
          ) : (
            <p className="text-gray-900 font-semibold leading-relaxed">
              {formData.address.street || formData.address.city || formData.address.state || formData.address.zipCode
                ? (
                  <>
                    {formData.address.street && <span className="block">{formData.address.street}</span>}
                    {(formData.address.city || formData.address.state || formData.address.zipCode) && (
                      <span className="block">{[formData.address.city, formData.address.state, formData.address.zipCode].filter(Boolean).join(', ')}</span>
                    )}
                  </>
                )
                : 'Not provided'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
