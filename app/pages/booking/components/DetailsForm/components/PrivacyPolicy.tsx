interface PrivacyPolicyProps {
  agreeToPolicy: boolean;
  setAgreeToPolicy: (value: boolean) => void;
}

export default function PrivacyPolicy({ agreeToPolicy, setAgreeToPolicy }: PrivacyPolicyProps) {
  return (
    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
      <input
        type="checkbox"
        id="privacy-policy"
        checked={agreeToPolicy}
        onChange={(e) => setAgreeToPolicy(e.target.checked)}
        className="mt-1 w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
      />
      <label htmlFor="privacy-policy" className="text-sm text-gray-900 leading-relaxed font-medium">
        I agree to the <span className="text-teal-600 font-bold cursor-pointer hover:underline">privacy policy</span> and the <span className="text-teal-600 font-bold cursor-pointer hover:underline">cancellation & rescheduling policies</span>. I understand that my data is protected under healthcare regulations.
      </label>
    </div>
  );
}
