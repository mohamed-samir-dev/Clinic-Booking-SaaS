interface PasswordRequirementsProps {
  password: string;
}

export const PasswordRequirements = ({ password }: PasswordRequirementsProps) => (
  <div className="mt-3 bg-blue-50 border border-blue-200 rounded-lg p-3">
    <p className="text-xs font-semibold text-blue-900 mb-2">Password Requirements:</p>
    <ul className="space-y-1">
      <li className={`text-xs flex items-center gap-2 ${password.length >= 8 ? 'text-teal-600' : 'text-gray-600'}`}>
        <span>{password.length >= 8 ? '✓' : '○'}</span>
        At least 8 characters
      </li>
      <li className={`text-xs flex items-center gap-2 ${/[a-z]/.test(password) && /[A-Z]/.test(password) ? 'text-teal-600' : 'text-gray-600'}`}>
        <span>{/[a-z]/.test(password) && /[A-Z]/.test(password) ? '✓' : '○'}</span>
        Uppercase & lowercase letters
      </li>
      <li className={`text-xs flex items-center gap-2 ${/[0-9]/.test(password) ? 'text-teal-600' : 'text-gray-600'}`}>
        <span>{/[0-9]/.test(password) ? '✓' : '○'}</span>
        At least one number
      </li>
      <li className={`text-xs flex items-center gap-2 ${/[^a-zA-Z0-9]/.test(password) ? 'text-teal-600' : 'text-gray-600'}`}>
        <span>{/[^a-zA-Z0-9]/.test(password) ? '✓' : '○'}</span>
        Special character (@#$%^&*)
      </li>
    </ul>
  </div>
);
