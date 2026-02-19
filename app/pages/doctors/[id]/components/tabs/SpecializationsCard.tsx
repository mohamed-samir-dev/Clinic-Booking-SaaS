import { FaStethoscope, FaHeartbeat, FaBrain, FaBone, FaEye, FaTooth, FaChild, FaAllergies, FaHospital, FaPrescriptionBottle, FaVirus, FaLungs, FaXRay, FaTint } from 'react-icons/fa';

interface SpecializationsCardProps {
  specializations: string[];
}

const getIconForSpecialization = (specialization: string) => {
  const specLower = specialization.toLowerCase();
  if (specLower.includes('heart') || specLower.includes('cardio') || specLower.includes('قلب')) return FaHeartbeat;
  if (specLower.includes('brain') || specLower.includes('neuro') || specLower.includes('مخ') || specLower.includes('أعصاب')) return FaBrain;
  if (specLower.includes('bone') || specLower.includes('ortho') || specLower.includes('عظام')) return FaBone;
  if (specLower.includes('eye') || specLower.includes('ophthal') || specLower.includes('عيون')) return FaEye;
  if (specLower.includes('tooth') || specLower.includes('dental') || specLower.includes('أسنان')) return FaTooth;
  if (specLower.includes('child') || specLower.includes('pediatric') || specLower.includes('أطفال')) return FaChild;
  if (specLower.includes('derma') || specLower.includes('skin') || specLower.includes('جلد')) return FaAllergies;
  if (specLower.includes('surgery') || specLower.includes('جراح')) return FaHospital;
  if (specLower.includes('pharma') || specLower.includes('drug') || specLower.includes('صيدل')) return FaPrescriptionBottle;
  if (specLower.includes('infect') || specLower.includes('virus') || specLower.includes('معد')) return FaVirus;
  if (specLower.includes('lung') || specLower.includes('pulmo') || specLower.includes('رئة') || specLower.includes('صدر')) return FaLungs;
  if (specLower.includes('xray') || specLower.includes('radio') || specLower.includes('أشعة')) return FaXRay;
  if (specLower.includes('blood') || specLower.includes('دم')) return FaTint;
  return FaStethoscope;
};

export default function SpecializationsCard({ specializations }: SpecializationsCardProps) {
  if (!specializations || specializations.length === 0) return null;

  return (
    <div className="bg-linear-to-br from-teal-50 via-cyan-50 to-blue-50 rounded-xl sm:rounded-2xl shadow-lg border border-teal-200 p-5 sm:p-6 md:p-8 mt-4 sm:mt-6">
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-linear-to-br from-teal-500 to-cyan-500 flex items-center justify-center shadow-md">
          <FaStethoscope className="text-white text-lg sm:text-xl" />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Specializations</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
        {specializations.map((spec, index) => {
          const Icon = getIconForSpecialization(spec);
          
          return (
            <div 
              key={index} 
              className="group flex items-center gap-2 sm:gap-3 px-4 sm:px-5 md:px-6 py-3 sm:py-4 bg-white border-2 border-teal-400 rounded-lg sm:rounded-xl hover:border-teal-600 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-linear-to-br from-teal-500 to-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Icon className="text-white text-base sm:text-lg" />
              </div>
              <span className="text-gray-800 font-bold text-sm sm:text-base">{spec}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
