
import {BasicInformationProps}from '../types/types'
export default function BasicInformation({ fullName, setFullName, phone, setPhone, email, setEmail }: BasicInformationProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="material-icons text-teal-600">person</span>
        <h3 className="text-lg font-bold text-gray-900">Basic Information</h3>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-2">Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-teal-500 focus:outline-none text-gray-900 text-base"
            placeholder="Johnathan Doe"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-2">Phone Number</label>
          <div className="flex gap-2">
            <div className="px-4 py-3 rounded-xl border-2 border-gray-200 bg-gray-50 text-gray-900 text-base font-semibold">
              🇪🇬 +20
            </div>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-teal-500 focus:outline-none text-gray-900 text-base"
              placeholder="1012345678"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-2">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-teal-500 focus:outline-none text-gray-900 text-base"
            placeholder="john.doe@example.com"
          />
        </div>
      </div>
    </div>
  );
}
