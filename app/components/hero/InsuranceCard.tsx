import { FaShieldAlt } from 'react-icons/fa';

export default function InsuranceCard() {
  return (
    <div className="bg-white/20 backdrop-blur-md p-[3px] rounded-xl md:rounded-2xl shadow-xl border border-white/30">
      <div className="bg-white/95 backdrop-blur-sm p-3 rounded-lg md:rounded-xl shadow-lg h-full flex items-center lg:w-80 xl:w-[400px]">
        <div className="flex items-center gap-2 md:gap-3 w-full">
          <div className="w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 bg-green-100 rounded-full flex items-center justify-center shrink-0">
            <FaShieldAlt className="text-green-600 text-lg md:text-xl" />
          </div>
          <div className="flex-1">
            <p className="text-xs md:text-sm text-gray-900 font-semibold">Insurance Accepted:</p>
            <h2 className="text-sm md:text-base lg:text-lg xl:text-[20px] text-gray-900 font-bold mt-0.5">Major plan & Network</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
