import { IconType } from 'react-icons';
import { IoInformationCircle } from 'react-icons/io5';
import Link from 'next/link';

interface ServiceCardProps {
  icon: IconType;
  title: string;
  description: string;
  isSelected?: boolean;
}

export default function ServiceCard({ icon: Icon, title, description, isSelected = false }: ServiceCardProps) {
  const slug = title.toLowerCase().replace(/\s+/g, '-');
  
  return (
    <div className={`bg-white/20 mb-10 backdrop-blur-md p-[3px] rounded-xl shadow-xl transition-all ${
      isSelected ? 'border-2 border-teal-500' : 'border border-white/30 hover:border-white/50'
    }`}>
      <div className="bg-white/95 backdrop-blur-sm p-6 rounded-lg h-full relative">
        <div className="absolute top-4 right-4">
          <IoInformationCircle className="text-teal-500 text-2xl" />
        </div>
        <div className="mb-3">
          <div className="w-14 h-14 bg-teal-500/10 rounded-full flex items-center justify-center">
            <Icon className="text-teal-600 text-2xl" />
          </div>
        </div>
        <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 font-semibold text-xs md:text-sm mb-4 leading-relaxed">{description}</p>
        <Link href={`/pages/services/${slug}`}>
          <button className="bg-teal-500 hover:bg-teal-600 text-white px-5 py-2 rounded-lg transition-colors text-xs md:text-sm font-semibold">
            More Details
          </button>
        </Link>
      </div>
    </div>
  );
}
