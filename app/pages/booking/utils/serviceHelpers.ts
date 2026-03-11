import translations from '@/messages/translations';
import { services } from '@/app/components/services/servicesdata';

export const getServiceName = (serviceKey: string, locale: 'en' | 'ar', doctorSpecialty?: { en: string; ar: string }): string => {
  if (!serviceKey) {
    return doctorSpecialty ? (locale === 'ar' ? doctorSpecialty.ar : doctorSpecialty.en) : (locale === 'ar' ? 'استشارة عامة' : 'General Consultation');
  }

  // البحث عن الخدمة بناءً على المفتاح
  const service = services.find(s => s.key === serviceKey);
  
  if (service) {
    const t = translations[locale].services;
    const translation = t[service.key as keyof typeof t];
    return typeof translation === 'object' && 'title' in translation ? translation.title : serviceKey;
  }

  // إذا لم يتم العثور على الخدمة، نحاول البحث في مصطلحات البحث
  const serviceBySearchTerm = services.find(s => 
    s.searchTerms?.some(term => 
      term.toLowerCase() === serviceKey.toLowerCase()
    )
  );

  if (serviceBySearchTerm) {
    const t = translations[locale].services;
    const translation = t[serviceBySearchTerm.key as keyof typeof t];
    return typeof translation === 'object' && 'title' in translation ? translation.title : serviceKey;
  }

  // إذا لم يتم العثور على أي شيء، نعيد تخصص الدكتور أو القيمة الأصلية
  return doctorSpecialty ? (locale === 'ar' ? doctorSpecialty.ar : doctorSpecialty.en) : serviceKey;
};

export const getServiceKeyFromSpecialty = (specialtyEn: string): string => {
  // محاولة العثور على الخدمة من خلال مصطلحات البحث
  const service = services.find(s => 
    s.searchTerms?.some(term => 
      term.toLowerCase() === specialtyEn.toLowerCase()
    )
  );

  // إذا وجدنا الخدمة، نعيد المفتاح، وإلا نعيد التخصص الأصلي
  return service ? service.key : specialtyEn;
};
