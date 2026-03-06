import { useState, useEffect } from 'react';
import { X, Search } from 'lucide-react';
import toast from 'react-hot-toast';

interface AddDoctorModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

interface AvailableDoctor {
  _id: string;
  name: string | { en: string; ar: string };
  specialty: string;
  experience: number;
  email: string;
}

export const AddDoctorModal = ({ onClose, onSuccess }: AddDoctorModalProps) => {
  const [availableDoctors, setAvailableDoctors] = useState<AvailableDoctor[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState<string>('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchAvailableDoctors();
  }, []);

  const fetchAvailableDoctors = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/manager/doctors/available', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setAvailableDoctors(data);
      }
    } catch {
      toast.error('Failed to load available doctors');
    } finally {
      setLoading(false);
    }
  };

  const handleAssign = async () => {
    if (!selectedDoctor) {
      toast.error('Please select a doctor');
      return;
    }

    if (!message.trim()) {
      toast.error('Please write a message to the doctor');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/manager/transfer-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ doctorId: selectedDoctor, message }),
      });

      if (response.ok) {
        toast.success('Transfer request sent successfully');
        onSuccess();
        onClose();
      } else {
        toast.error('Failed to send transfer request');
      }
    } catch {
      toast.error('Failed to send transfer request');
    }
  };

  const getName = (name: string | { en: string; ar: string }) => 
    typeof name === 'string' ? name : name.en;

  const filteredDoctors = availableDoctors.filter(doc =>
    getName(doc.name).toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl border border-gray-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-white">Add Doctor to Clinic</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-400 mb-4">
            Select an existing doctor from the system to send a transfer request
          </p>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search doctors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500"
            />
          </div>

          {/* Message Textarea */}
          <div className="mb-4">
            <label className="block text-gray-300 mb-2 text-sm font-medium">
              Message to Doctor *
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message to the doctor explaining why you want them to join your clinic..."
              rows={4}
              maxLength={1000}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500 resize-none"
            />
            <p className="text-gray-500 text-xs mt-1">{message.length}/1000 characters</p>
          </div>

          {/* Doctors List */}
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-400 mx-auto"></div>
              <p className="text-gray-400 mt-4">Loading doctors...</p>
            </div>
          ) : filteredDoctors.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              No available doctors found
            </div>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredDoctors.map((doctor) => (
                <div
                  key={doctor._id}
                  onClick={() => setSelectedDoctor(doctor._id)}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedDoctor === doctor._id
                      ? 'bg-teal-500/20 border-teal-500'
                      : 'bg-gray-750 border-gray-700 hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-semibold">{getName(doctor.name)}</h3>
                      <p className="text-gray-400 text-sm">{doctor.specialty}</p>
                      <p className="text-gray-500 text-xs mt-1">{doctor.experience} years experience</p>
                    </div>
                    {selectedDoctor === doctor._id && (
                      <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-700">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleAssign}
            disabled={!selectedDoctor || !message.trim()}
            className="px-6 py-2 bg-teal-600 hover:bg-teal-700 rounded-lg text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send Request
          </button>
        </div>
      </div>
    </div>
  );
};
