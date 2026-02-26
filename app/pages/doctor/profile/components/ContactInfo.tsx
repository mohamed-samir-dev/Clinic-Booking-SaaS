import { Mail, Phone, MapPin, Edit2, Check, X } from 'lucide-react';
import { ContactInfoProps } from '../types';



export const ContactInfo = ({ profile, editingField, editData, setEditData, onEdit, onSave, onCancel, saving }: ContactInfoProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-linear-to-br from-green-500 to-green-600 flex items-center justify-center">
          <span className="material-icons text-white text-sm">contact_mail</span>
        </div>
        Contact Info
      </h3>
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-linear-to-br from-blue-50 to-blue-100 flex items-center justify-center shrink-0">
            <Mail className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-500 font-semibold">Email</p>
              {editingField !== 'email' && (
                <button
                  onClick={() => onEdit('email')}
                  className="p-1.5 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors group"
                  title="Edit Email"
                >
                  <Edit2 className="w-4 h-4 text-blue-600 group-hover:text-blue-700" />
                </button>
              )}
            </div>
            {editingField === 'email' ? (
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="email"
                  value={editData.email}
                  onChange={(e) => setEditData({...editData, email: e.target.value})}
                  className="flex-1 px-3 py-2 border-2 border-blue-400 rounded-lg text-sm font-semibold text-gray-900 focus:outline-none focus:border-blue-600 bg-white shadow-md"
                />
                <button
                  onClick={() => onSave('email')}
                  disabled={saving}
                  className="p-1.5 bg-green-500 hover:bg-green-600 text-white rounded disabled:opacity-50"
                >
                  <Check className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onCancel('email')}
                  disabled={saving}
                  className="p-1.5 bg-red-500 hover:bg-red-600 text-white rounded disabled:opacity-50"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <p className="text-sm text-gray-900 font-medium mt-1">{profile.email}</p>
            )}
          </div>
        </div>

        {profile.phone && (
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-linear-to-br from-green-50 to-green-100 flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500 font-semibold">Phone</p>
                {editingField !== 'phone' && (
                  <button
                    onClick={() => onEdit('phone')}
                    className="p-1.5 bg-green-100 hover:bg-green-200 rounded-lg transition-colors group"
                    title="Edit Phone"
                  >
                    <Edit2 className="w-4 h-4 text-green-600 group-hover:text-green-700" />
                  </button>
                )}
              </div>
              {editingField === 'phone' ? (
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="tel"
                    value={editData.phone}
                    onChange={(e) => setEditData({...editData, phone: e.target.value})}
                    className="flex-1 px-3 py-2 border-2 border-green-400 rounded-lg text-sm font-semibold text-gray-900 focus:outline-none focus:border-green-600 bg-white shadow-md"
                  />
                  <button
                    onClick={() => onSave('phone')}
                    disabled={saving}
                    className="p-1.5 bg-green-500 hover:bg-green-600 text-white rounded disabled:opacity-50"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onCancel('phone')}
                    disabled={saving}
                    className="p-1.5 bg-red-500 hover:bg-red-600 text-white rounded disabled:opacity-50"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <p className="text-sm text-gray-900 font-medium mt-1">{profile.phone}</p>
              )}
            </div>
          </div>
        )}

        {profile.location?.address && (
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-linear-to-br from-orange-50 to-orange-100 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-orange-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500 font-semibold">Location</p>
                {editingField !== 'location' && (
                  <button
                    onClick={() => onEdit('location')}
                    className="p-1.5 bg-orange-100 hover:bg-orange-200 rounded-lg transition-colors group"
                    title="Edit Location"
                  >
                    <Edit2 className="w-4 h-4 text-orange-600 group-hover:text-orange-700" />
                  </button>
                )}
              </div>
              {editingField === 'location' ? (
                <div className="space-y-2 mt-1">
                  <input
                    type="text"
                    value={editData.location.address}
                    onChange={(e) => setEditData({...editData, location: {...editData.location, address: e.target.value}})}
                    className="w-full px-3 py-2 border-2 border-orange-400 rounded-lg text-sm font-semibold text-gray-900 focus:outline-none focus:border-orange-600 bg-white shadow-md"
                    placeholder="Address"
                  />
                  <input
                    type="text"
                    value={editData.location.city}
                    onChange={(e) => setEditData({...editData, location: {...editData.location, city: e.target.value}})}
                    className="w-full px-3 py-2 border-2 border-orange-400 rounded-lg text-sm font-semibold text-gray-900 focus:outline-none focus:border-orange-600 bg-white shadow-md"
                    placeholder="City"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => onSave('location')}
                      disabled={saving}
                      className="flex-1 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg disabled:opacity-50 font-semibold flex items-center justify-center gap-2"
                    >
                      <Check className="w-4 h-4" /> Save
                    </button>
                    <button
                      onClick={() => onCancel('location')}
                      disabled={saving}
                      className="flex-1 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg disabled:opacity-50 font-semibold flex items-center justify-center gap-2"
                    >
                      <X className="w-4 h-4" /> Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-sm text-gray-900 font-medium mt-1">{profile.location.address}</p>
                  {profile.location.city && (
                    <p className="text-xs text-gray-600 mt-1">{profile.location.city}</p>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
