'use client';
import { useState } from 'react';
import { MapPin, Loader2 } from 'lucide-react';
import { ClinicFormData } from '../types';

interface Props {
  formData: ClinicFormData;
  setFormData: (data: ClinicFormData) => void;
}

export default function ContactInfo({ formData, setFormData }: Props) {
  const [geocoding, setGeocoding] = useState(false);
  const [geoError, setGeoError] = useState('');

  const handleGeocode = async () => {
    const address = formData.address.en || formData.address.ar;
    if (!address.trim()) {
      setGeoError('Please enter an address first');
      return;
    }
    setGeocoding(true);
    setGeoError('');
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`,
        { headers: { 'Accept-Language': 'en' } }
      );
      const data = await res.json();
      if (data.length === 0) {
        setGeoError('Address not found. Try a more specific address.');
        return;
      }
      const { lon, lat } = data[0];
      setFormData({
        ...formData,
        location: { coordinates: [parseFloat(lon), parseFloat(lat)] },
      });
    } catch {
      setGeoError('Failed to get coordinates. Please enter manually.');
    } finally {
      setGeocoding(false);
    }
  };

  return (
    <div className="bg-gray-700 rounded-xl p-6 space-y-4">
      <h2 className="text-xl font-bold text-white flex items-center gap-2">
        <span className="w-8 h-8 bg-teal-600 text-white rounded-lg flex items-center justify-center text-sm">3</span>
        Contact Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Address (English)</label>
          <input
            type="text"
            value={formData.address.en}
            onChange={(e) => setFormData({ ...formData, address: { ...formData.address, en: e.target.value } })}
            className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all text-white font-medium"
            placeholder="123 University Street, Nasr City"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Address (Arabic)</label>
          <input
            type="text"
            value={formData.address.ar}
            onChange={(e) => setFormData({ ...formData, address: { ...formData.address, ar: e.target.value } })}
            className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all text-white font-medium"
            placeholder="123 شارع الجامعة، مدينة نصر"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Phone Number</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all text-white font-medium"
            placeholder="+20123456789"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Email Address</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all text-white font-medium"
            placeholder="clinic@example.com"
          />
        </div>
      </div>

      {/* Location */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-semibold text-gray-300">Location Coordinates</label>
          <button
            type="button"
            onClick={handleGeocode}
            disabled={geocoding}
            className="flex items-center gap-2 px-3 py-1.5 bg-teal-600 hover:bg-teal-700 disabled:bg-gray-600 text-white text-sm rounded-lg transition-colors"
          >
            {geocoding ? <Loader2 size={14} className="animate-spin" /> : <MapPin size={14} />}
            {geocoding ? 'Getting...' : 'Get from Address'}
          </button>
        </div>
        {geoError && <p className="text-red-400 text-xs mb-2">{geoError}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-400 mb-1">Longitude</label>
            <input
              type="number"
              step="any"
              value={formData.location.coordinates[0]}
              onChange={(e) => setFormData({ ...formData, location: { ...formData.location, coordinates: [parseFloat(e.target.value) || 0, formData.location.coordinates[1]] } })}
              className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all text-white font-medium"
              placeholder="31.2357"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Latitude</label>
            <input
              type="number"
              step="any"
              value={formData.location.coordinates[1]}
              onChange={(e) => setFormData({ ...formData, location: { ...formData.location, coordinates: [formData.location.coordinates[0], parseFloat(e.target.value) || 0] } })}
              className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all text-white font-medium"
              placeholder="30.0444"
            />
          </div>
        </div>
        {formData.location.coordinates[0] !== 0 && formData.location.coordinates[1] !== 0 && (
          <p className="text-teal-400 text-xs mt-1">
            ✓ {formData.location.coordinates[1].toFixed(4)}, {formData.location.coordinates[0].toFixed(4)}
          </p>
        )}
      </div>
    </div>
  );
}
