'use client';

import { useState, useRef, useEffect } from 'react';
import { useTheme } from '@/app/contexts/ThemeContext';

interface PrivacyPolicyProps {
  agreeToPolicy: boolean;
  setAgreeToPolicy: (value: boolean) => void;
}

export default function PrivacyPolicy({ agreeToPolicy, setAgreeToPolicy }: PrivacyPolicyProps) {
  const { theme } = useTheme();
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showCancellationModal, setShowCancellationModal] = useState(false);
  const [hasReadPrivacy, setHasReadPrivacy] = useState(false);
  const [hasReadCancellation, setHasReadCancellation] = useState(false);
  const privacyScrollRef = useRef<HTMLDivElement>(null);
  const cancellationScrollRef = useRef<HTMLDivElement>(null);

  const handlePrivacyScroll = () => {
    const element = privacyScrollRef.current;
    if (element) {
      const isAtBottom = element.scrollHeight - element.scrollTop <= element.clientHeight + 10;
      if (isAtBottom) setHasReadPrivacy(true);
    }
  };

  const handleCancellationScroll = () => {
    const element = cancellationScrollRef.current;
    if (element) {
      const isAtBottom = element.scrollHeight - element.scrollTop <= element.clientHeight + 10;
      if (isAtBottom) setHasReadCancellation(true);
    }
  };

  const canAgree = hasReadPrivacy && hasReadCancellation;

  useEffect(() => {
    if (canAgree && !agreeToPolicy) {
      setAgreeToPolicy(true);
    } else if (!canAgree && agreeToPolicy) {
      setAgreeToPolicy(false);
    }
  }, [canAgree, agreeToPolicy, setAgreeToPolicy]);

  return (
    <>
      <div className={`p-3 sm:p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="privacy-policy"
              checked={agreeToPolicy}
              onChange={(e) => setAgreeToPolicy(e.target.checked)}
              disabled={!canAgree}
              className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
            />
            <label htmlFor="privacy-policy" className={`text-xs sm:text-sm font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
              I agree to the policies:
            </label>
          </div>
          <button
            type="button"
            onClick={() => setShowPrivacyModal(true)}
            className={`text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all ${
              hasReadPrivacy 
                ? 'bg-green-100 text-green-700 border-2 border-green-500' 
                : 'bg-teal-50 text-teal-600 hover:bg-teal-100 border-2 border-teal-200'
            }`}
          >
            {hasReadPrivacy ? '✓ Privacy Policy' : 'Read Privacy Policy'}
          </button>
          <button
            type="button"
            onClick={() => setShowCancellationModal(true)}
            className={`text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all ${
              hasReadCancellation 
                ? 'bg-green-100 text-green-700 border-2 border-green-500' 
                : 'bg-teal-50 text-teal-600 hover:bg-teal-100 border-2 border-teal-200'
            }`}
          >
            {hasReadCancellation ? '✓ Cancellation Policy' : 'Read Cancellation Policy'}
          </button>
        </div>
        {!canAgree && (
          <p className={`text-[10px] sm:text-xs mt-2 font-medium ${theme === 'dark' ? 'text-amber-400' : 'text-amber-600'}`}>⚠ Please read both policies to the end before agreeing</p>
        )}
      </div>

      {/* Privacy Policy Modal */}
      {showPrivacyModal && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4">
          <div className={`rounded-2xl max-w-2xl w-full max-h-[85vh] sm:max-h-[80vh] flex flex-col ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <div className={`p-4 sm:p-6 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
              <h3 className={`text-xl sm:text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Privacy Policy</h3>
            </div>
            <div 
              ref={privacyScrollRef}
              onScroll={handlePrivacyScroll}
              className={`p-4 sm:p-6 overflow-y-auto flex-1 leading-relaxed text-sm sm:text-base ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
            >
              <h4 className="font-bold text-lg mb-3">1. Information Collection</h4>
              <p className="mb-4">We collect personal information including your name, contact details, date of birth, and medical history to provide you with quality healthcare services. This information is essential for appointment scheduling, medical consultations, and maintaining accurate health records.</p>

              <h4 className="font-bold text-lg mb-3">2. Data Usage</h4>
              <p className="mb-4">Your personal and medical information will be used exclusively for healthcare purposes, including diagnosis, treatment planning, appointment management, and communication regarding your health. We may also use your contact information to send appointment reminders and important health updates.</p>

              <h4 className="font-bold text-lg mb-3">3. Data Protection</h4>
              <p className="mb-4">We implement industry-standard security measures to protect your data from unauthorized access, disclosure, or misuse. All medical records are stored in encrypted databases with restricted access limited to authorized healthcare professionals directly involved in your care.</p>

              <h4 className="font-bold text-lg mb-3">4. Information Sharing</h4>
              <p className="mb-4">Your medical information will only be shared with healthcare providers directly involved in your treatment. We will never sell, rent, or share your personal information with third parties for marketing purposes without your explicit consent.</p>

              <h4 className="font-bold text-lg mb-3">5. Patient Rights</h4>
              <p className="mb-4">You have the right to access, review, and request corrections to your medical records. You may also request a copy of your health information or ask us to restrict certain uses of your data, subject to legal and medical requirements.</p>

              <h4 className="font-bold text-lg mb-3">6. Data Retention</h4>
              <p className="mb-4">We retain your medical records in accordance with healthcare regulations and legal requirements. Your data will be securely stored for the minimum period required by law and medical best practices.</p>

              <h4 className="font-bold text-lg mb-3">7. Cookies and Tracking</h4>
              <p className="mb-4">Our website uses cookies to enhance your browsing experience and maintain session security. These cookies do not store sensitive medical information and can be managed through your browser settings.</p>

              <h4 className="font-bold text-lg mb-3">8. Policy Updates</h4>
              <p className="mb-4">We may update this privacy policy periodically to reflect changes in our practices or legal requirements. Significant changes will be communicated to you via email or through our website.</p>

              <div className="h-20"></div>
            </div>
            <div className={`p-4 sm:p-6 border-t flex flex-col sm:flex-row justify-between items-center gap-2 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
              {!hasReadPrivacy && (
                <p className="text-xs sm:text-sm text-amber-600 font-medium">↓ Scroll to the bottom to continue</p>
              )}
              {hasReadPrivacy && (
                <p className="text-xs sm:text-sm text-green-600 font-medium">✓ You have read this policy</p>
              )}
              <button
                onClick={() => setShowPrivacyModal(false)}
                disabled={!hasReadPrivacy}
                className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm"
              >
                {hasReadPrivacy ? 'Close' : 'Read to Continue'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancellation & Rescheduling Policy Modal */}
      {showCancellationModal && (
        <div className="fixed inset-0 backdrop-blur flex items-center justify-center z-50 p-3 sm:p-4">
          <div className={`rounded-2xl max-w-2xl w-full max-h-[85vh] sm:max-h-[80vh] flex flex-col ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <div className={`p-4 sm:p-6 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
              <h3 className={`text-xl sm:text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Cancellation & Rescheduling Policy</h3>
            </div>
            <div 
              ref={cancellationScrollRef}
              onScroll={handleCancellationScroll}
              className={`p-4 sm:p-6 overflow-y-auto flex-1 leading-relaxed text-sm sm:text-base ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
            >
              <h4 className="font-bold text-lg mb-3">1. Cancellation Notice Period</h4>
              <p className="mb-4">Appointments must be cancelled at least 24 hours in advance to avoid cancellation fees. We understand that emergencies occur, but advance notice helps us serve other patients who may be waiting for appointments.</p>

              <h4 className="font-bold text-lg mb-3">2. Late Cancellation Fee</h4>
              <p className="mb-4">Cancellations made less than 24 hours before your scheduled appointment will incur a fee of 50% of the consultation cost. This fee compensates for the reserved time slot that could have been offered to another patient.</p>

              <h4 className="font-bold text-lg mb-3">3. No-Show Policy</h4>
              <p className="mb-4">Failure to attend your scheduled appointment without prior notice will result in a full consultation fee charge. Repeated no-shows may result in restrictions on future booking privileges.</p>

              <h4 className="font-bold text-lg mb-3">4. Rescheduling Appointments</h4>
              <p className="mb-4">You may reschedule your appointment up to 12 hours before the scheduled time without any fees. Rescheduling requests made within 12 hours of the appointment are subject to availability and may incur a rescheduling fee.</p>

              <h4 className="font-bold text-lg mb-3">5. Emergency Situations</h4>
              <p className="mb-4">We understand that genuine emergencies happen. If you need to cancel due to a medical emergency or unforeseen circumstances, please contact us as soon as possible. We will review each case individually and may waive fees at our discretion.</p>

              <h4 className="font-bold text-lg mb-3">6. How to Cancel or Reschedule</h4>
              <p className="mb-4">To cancel or reschedule your appointment, please contact our clinic via phone, email, or through your patient portal. You will receive a confirmation once your request has been processed.</p>

              <h4 className="font-bold text-lg mb-3">7. Refund Policy</h4>
              <p className="mb-4">If you have prepaid for your appointment and cancel within the allowed timeframe, you will receive a full refund within 5-7 business days. Late cancellations will receive a partial refund as per our fee structure.</p>

              <h4 className="font-bold text-lg mb-3">8. Doctor Cancellations</h4>
              <p className="mb-4">In the rare event that your doctor needs to cancel or reschedule your appointment, we will notify you immediately and offer alternative time slots. You will not be charged any fees for doctor-initiated cancellations.</p>

              <h4 className="font-bold text-lg mb-3">9. Weather and Emergencies</h4>
              <p className="mb-4">In case of severe weather conditions or clinic emergencies, we may need to cancel appointments. We will contact you as soon as possible to reschedule without any penalties.</p>

              <div className="h-20"></div>
            </div>
            <div className={`p-4 sm:p-6 border-t flex flex-col sm:flex-row justify-between items-center gap-2 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
              {!hasReadCancellation && (
                <p className="text-xs sm:text-sm text-amber-600 font-medium">↓ Scroll to the bottom to continue</p>
              )}
              {hasReadCancellation && (
                <p className="text-xs sm:text-sm text-green-600 font-medium">✓ You have read this policy</p>
              )}
              <button
                onClick={() => setShowCancellationModal(false)}
                disabled={!hasReadCancellation}
                className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm"
              >
                {hasReadCancellation ? 'Close' : 'Read to Continue'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
