import { Camera } from 'lucide-react';

interface PhotoSectionProps {
  photoUrl: string;
  onChange: (url: string) => void;
}

export default function PhotoSection({ photoUrl, onChange }: PhotoSectionProps) {
  return (
    <div className="bg-gray-700/50 p-5 rounded-xl border border-gray-600">
      <div className="flex items-center gap-3 mb-3">
        <div className="bg-teal-600 p-2 rounded-lg">
          <Camera size={18} className="text-white" />
        </div>
        <h3 className="text-lg font-bold text-white">Profile Photo</h3>
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-300 mb-2">Photo URL</label>
        <input
          type="url"
          value={photoUrl}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white"
          placeholder="https://example.com/doctor-photo.jpg"
        />
        <p className="text-xs text-gray-500 mt-2">Enter a direct link to the doctor&apos;s professional photo</p>
      </div>
    </div>
  );
}
