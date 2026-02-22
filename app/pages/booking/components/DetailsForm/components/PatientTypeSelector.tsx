interface PatientTypeSelectorProps {
  patientType: 'new' | 'returning';
  setPatientType: (type: 'new' | 'returning') => void;
}

export default function PatientTypeSelector({ patientType, setPatientType }: PatientTypeSelectorProps) {
  return (
    <div className="mb-6">
      <div className="flex gap-4">
        <button
          onClick={() => setPatientType('new')}
          className={`flex-1 py-3 px-4 rounded-xl border-2 font-semibold transition-all ${
            patientType === 'new'
              ? 'border-teal-500 bg-teal-50 text-teal-700'
              : 'border-gray-200 text-gray-600 hover:border-gray-300'
          }`}
        >
          New Patient
        </button>
        <button
          onClick={() => setPatientType('returning')}
          className={`flex-1 py-3 px-4 rounded-xl border-2 font-semibold transition-all relative ${
            patientType === 'returning'
              ? 'border-teal-500 bg-teal-50 text-teal-700'
              : 'border-gray-200 text-gray-600 hover:border-gray-300'
          }`}
        >
          Returning Patient
          <span className="absolute -top-2 -right-2 bg-teal-500 text-white text-xs px-2 py-0.5 rounded-full">badge</span>
        </button>
      </div>
    </div>
  );
}
