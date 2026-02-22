
import {PatientDemographicsProps}from '../types/types'
export default function PatientDemographics({ dateOfBirth, setDateOfBirth, gender, setGender }: PatientDemographicsProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="material-icons text-teal-600">personal_injury</span>
        <h3 className="text-lg font-bold text-gray-900">Patient Demographics</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-2">Date of Birth</label>
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-teal-500 focus:outline-none text-gray-900 text-base"
            placeholder="mm/dd/yyyy"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-2">Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-teal-500 focus:outline-none text-gray-900 text-base"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
    </div>
  );
}
