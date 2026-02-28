import { FaShieldAlt } from 'react-icons/fa';

export const PageHeader = () => {
  return (
    <>
      <div className="bg-linear-to-r from-teal-600 to-teal-700 rounded-2xl p-4 sm:p-6 lg:p-8 mb-6 lg:mb-8 shadow-xl">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">Medical Information</h1>
          <p className="text-teal-100 text-sm sm:text-base lg:text-lg">Manage your health records and medical history</p>
        </div>
      </div>

      <div className="bg-teal-50 border-l-4 border-teal-500 p-3 sm:p-4 mb-4 sm:mb-6 rounded-lg flex items-start gap-2 sm:gap-3">
        <FaShieldAlt className="text-teal-600 text-lg sm:text-xl mt-0.5 sm:mt-1 shrink-0" />
        <div>
          <h3 className="font-semibold text-teal-900 mb-1 text-sm sm:text-base">Privacy Notice</h3>
          <p className="text-teal-800 text-xs sm:text-sm">This information is private and only shared with your treating doctor. All fields are optional and can be updated anytime.</p>
        </div>
      </div>
    </>
  );
};
