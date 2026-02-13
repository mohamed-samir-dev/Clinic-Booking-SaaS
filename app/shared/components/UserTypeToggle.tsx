import { UserType } from '../types/auth.types';

interface UserTypeToggleProps {
  userType: UserType;
  onUserTypeChange: (type: UserType) => void;
}

export default function UserTypeToggle({ userType, onUserTypeChange }: UserTypeToggleProps) {
  const userTypes: { value: UserType; label: string }[] = [
    { value: 'patient', label: 'Patient' },
    { value: 'staff', label: 'Staff' },
    { value: 'doctor', label: 'Doctor' },
    { value: 'manager', label: 'Manager' },
    { value: 'owner', label: 'Owner' }
  ];

  return (
    <div className="grid grid-cols-5 gap-2 mb-6">
      {userTypes.map(({ value, label }) => (
        <button
          key={value}
          type="button"
          onClick={() => onUserTypeChange(value)}
          className={`py-2 rounded-lg font-semibold transition ${
            userType === value
              ? 'bg-teal-500 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
