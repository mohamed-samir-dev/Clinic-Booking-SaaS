
import {BasicInformationProps}from '../types/types'
export default function BasicInformation({ fullName, setFullName, phone, setPhone, email, setEmail }: BasicInformationProps) {
  const isPhoneValid = phone.length === 10;
  const isEmailValid = email.endsWith('@gmail.com') && email.length > 10;

  return (
    <div className="mb-4 sm:mb-6">
      <div className="flex items-center gap-2 mb-3 sm:mb-4">
        <span className="material-icons text-teal-600 text-lg sm:text-xl">person</span>
        <h3 className="text-base sm:text-lg font-bold text-gray-900">Basic Information</h3>
      </div>
      <div className="space-y-3 sm:space-y-4">
        <div>
          <label className="block text-xs sm:text-sm font-bold text-gray-900 mb-1.5 sm:mb-2">Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border-2 border-gray-200 focus:border-teal-500 focus:outline-none text-gray-900 text-sm sm:text-base"
            placeholder="Johnathan Doe"
          />
        </div>
        <div>
          <label className="block text-xs sm:text-sm font-bold text-gray-900 mb-1.5 sm:mb-2">Phone Number</label>
          <div className="flex gap-1.5 sm:gap-2">
            <div className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 rounded-xl border-2 border-gray-200 bg-gray-50 text-gray-900 text-xs sm:text-sm md:text-base font-semibold shrink-0 whitespace-nowrap">
              🇪🇬 +20
            </div>
            <input
              type="tel"
              value={phone}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                if (value.length <= 10) setPhone(value);
              }}
              className={`flex-1 min-w-0 px-2 sm:px-3 md:px-4 py-2 sm:py-3 rounded-xl border-2 focus:outline-none text-gray-900 text-sm sm:text-base ${
                phone && !isPhoneValid ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-teal-500'
              }`}
              placeholder="1012345678"
              maxLength={10}
            />
          </div>
          {phone && !isPhoneValid && (
            <p className="text-[10px] sm:text-xs text-red-500 mt-1">⚠ Phone number must be exactly 10 digits</p>
          )}
          {(!phone || isPhoneValid) && (
            <p className="text-[10px] sm:text-xs text-gray-500 mt-1">Please enter 10 digits only</p>
          )}
        </div>
        <div>
          <label className="block text-xs sm:text-sm font-bold text-gray-900 mb-1.5 sm:mb-2">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              const value = e.target.value.replace(/[\u0600-\u06FF]/g, '');
              setEmail(value);
            }}
            className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border-2 focus:outline-none text-gray-900 text-sm sm:text-base ${
              email && !isEmailValid ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-teal-500'
            }`}
            placeholder="john.doe@gmail.com"
          />
          {email && !isEmailValid && (
            <p className="text-[10px] sm:text-xs text-red-500 mt-1">⚠ Email must end with @gmail.com</p>
          )}
          {(!email || isEmailValid) && (
            <p className="text-[10px] sm:text-xs text-gray-500 mt-1">Must be a valid Gmail address</p>
          )}
        </div>
      </div>
    </div>
  );
}
