import { Building2, MapPin, Phone, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface ClinicCardProps {
  id: string;
  name: { en: string; ar: string };
  logo?: string;
  address?: { en: string; ar: string };
  phone?: string;
}

export default function ClinicCard({ id, name, logo, address, phone }: ClinicCardProps) {
  return (
    <div className="bg-white mb-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group border border-gray-100">
      <div className="relative h-64 bg-linear-to-br from-teal-50 to-emerald-50 flex items-center justify-center p-8">
        {logo ? (
          <div className="relative w-full h-full">
            <Image
              src={logo}
              alt={name.en}
              fill
              className="object-contain"
            />
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <Building2 size={80} className="text-teal-600" />
            <p className="text-teal-600 font-semibold">No Logo</p>
          </div>
        )}
      </div>
      
      <div className="p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">
          {name.en}
        </h3>
        <p className="text-base text-gray-600 mb-6">{name.ar}</p>
        
        <div className="space-y-3 mb-6">
          {address && (address.en || address.ar) && (
            <div className="flex items-start gap-3 text-base text-gray-600">
              <MapPin size={20} className="mt-1 shrink-0 text-teal-600" />
              <span>{address.en || address.ar}</span>
            </div>
          )}
          
          {phone && (
            <div className="flex items-center gap-3 text-base text-gray-600">
              <Phone size={20} className="text-teal-600" />
              <span>{phone}</span>
            </div>
          )}
        </div>

        <Link
          href={`/pages/clinics/${id}`}
          className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-linear-to-r from-teal-500 to-teal-600 text-white rounded-full hover:from-teal-600 hover:to-teal-700 transition-all font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          View Details
          <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}
