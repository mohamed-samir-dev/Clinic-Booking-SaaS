'use client';
import { IconType } from 'react-icons';
import { IoInformationCircle } from 'react-icons/io5';
import Link from 'next/link';
import { useTheme } from '@/app/contexts/ThemeContext';

interface ServiceCardProps {
  icon: IconType;
  title: string;
  description: string;
  isSelected?: boolean;
}

export default function ServiceCard({ icon: Icon, title, description, isSelected = false }: ServiceCardProps) {
  const { theme } = useTheme();
  const slug = title.toLowerCase().replace(/\s+/g, '-');
  
  return (
    <div className={`mb-10 backdrop-blur-md p-[3px] rounded-xl shadow-xl transition-all ${
      isSelected ? 'border-2 border-teal-500' : theme === 'dark' ? 'bg-gray-800/40 border border-gray-700/50 hover:border-gray-600' : 'bg-white/20 border border-white/30 hover:border-white/50'
    }`}>
      <div className={`backdrop-blur-sm p-6 rounded-lg h-full relative ${theme === 'dark' ? 'bg-gray-800/95' : 'bg-white/95'}`}>
        <div className="absolute top-4 right-4">
          <IoInformationCircle className="text-teal-500 text-2xl" />
        </div>
        <div className="mb-3">
          <div className="w-14 h-14 bg-teal-500/10 rounded-full flex items-center justify-center">
            <Icon className="text-teal-600 text-2xl" />
          </div>
        </div>
        <h3 className={`text-base md:text-lg font-bold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>{title}</h3>
        <p className={`font-semibold text-xs md:text-sm mb-4 leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{description}</p>
        <Link href={`/pages/services/${slug}`}>
          <button className="bg-teal-500 hover:bg-teal-600 text-white px-5 py-2 rounded-lg transition-colors text-xs md:text-sm font-semibold">
            More Details
          </button>
        </Link>
      </div>
    </div>
  );
}
