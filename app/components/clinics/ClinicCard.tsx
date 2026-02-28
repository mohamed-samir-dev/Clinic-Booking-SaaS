'use client';

import { Building2, MapPin, Phone, ArrowRight, Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useLanguage } from '@/app/contexts/LanguageContext';
import translations from '@/messages/translations';
import { useFavoriteClinics } from '@/app/hooks/useFavoriteClinics';

interface ClinicCardProps {
  id: string;
  name: { en: string; ar: string };
  logo?: string;
  address?: { en: string; ar: string };
  phone?: string;
}

export default function ClinicCard({ id, name, logo, address, phone }: ClinicCardProps) {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const t = translations[locale].clinics;
  const { toggleFavorite, isFavorite: checkIsFavorite, isAuthenticated } = useFavoriteClinics();
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  
  const displayName = locale === 'ar' && name.ar ? name.ar : name.en;
  const displayAddress = address ? (locale === 'ar' && address.ar ? address.ar : address.en) : '';
  const isFavorited = checkIsFavorite(id);

  const handleFavoriteClick = async () => {
    if (!isAuthenticated) {
      setMessage(locale === 'ar' ? 'يجب تسجيل الدخول كمريض لإضافة العيادات للمفضلة' : 'You must login as a patient to add clinics to favorites');
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
      return;
    }

    const result = await toggleFavorite(id);
    if (result) {
      const isAdding = !isFavorited;
      setMessage(
        isAdding 
          ? (locale === 'ar' ? '✓ تمت إضافة العيادة للمفضلة' : '✓ Clinic added to favorites')
          : (locale === 'ar' ? '✓ تمت إزالة العيادة من المفضلة' : '✓ Clinic removed from favorites')
      );
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
    }
  };
  
  return (
    <div className={`mb-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group border relative ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-100'}`}>
      {showMessage && (
        <div className={`fixed top-20 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-lg shadow-2xl animate-bounce ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} border-2 ${theme === 'dark' ? 'border-teal-500' : 'border-teal-400'}`}>
          <p className="text-sm font-bold flex items-center gap-2">
            <span className="text-green-500 text-lg">✓</span>
            {message}
          </p>
        </div>
      )}
      <button 
        onClick={handleFavoriteClick}
        className={`absolute top-4 ${locale === 'ar' ? 'left-4' : 'right-4'} z-10 transition-all duration-300 ${isFavorited ? 'text-red-500 scale-110' : 'text-gray-400 hover:text-red-500'}`}
      >
        <Heart className={`w-6 h-6 ${isFavorited ? 'fill-current' : ''}`} />
      </button>
      <div className={`relative h-64 flex items-center justify-center p-8 ${theme === 'dark' ? 'bg-gray-800' : 'bg-linear-to-br from-teal-50 to-emerald-50'}`}>
        {logo ? (
          <div className="relative w-full h-full">
            <Image
              src={logo}
              alt={displayName}
              fill
              className="object-contain"
            />
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <Building2 size={80} className="text-teal-600" />
            <p className="text-teal-600 font-semibold">{t.noLogo}</p>
          </div>
        )}
      </div>
      
      <div className="p-8">
        <h3 className={`text-2xl font-bold mb-4 group-hover:text-teal-600 transition-colors ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          {displayName}
        </h3>
        
        <div className="space-y-3 mb-6">
          {displayAddress && (
            <div className={`flex items-start gap-3 text-base ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              <MapPin size={20} className="mt-1 shrink-0 text-teal-600" />
              <span>{displayAddress}</span>
            </div>
          )}
          
          {phone && (
            <div className={`flex items-center gap-3 text-base ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              <Phone size={20} className="text-teal-600" />
              <span>{phone}</span>
            </div>
          )}
        </div>

        <Link
          href={`/pages/clinics/${id}`}
          className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-linear-to-r from-teal-500 to-teal-600 text-white rounded-full hover:from-teal-600 hover:to-teal-700 transition-all font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          {t.viewDetails}
          <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}
