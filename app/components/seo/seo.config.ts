export type LocaleKey = 'en' | 'ar';

interface PageSeo {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
}

type SeoMap = Record<string, Record<LocaleKey, PageSeo>>;

export const seoConfig: SeoMap = {
  '/': {
    en: {
      title: 'CareSync – Book Doctor Appointments Online | Clinic Booking Platform',
      description:
        'CareSync is a modern clinic booking platform. Book appointments with top doctors, browse medical services, and manage your healthcare online — fast, easy, and secure.',
    },
    ar: {
      title: 'CareSync – احجز موعد طبيب اونلاين | منصة حجز العيادات',
      description:
        'CareSync منصة حجز عيادات حديثة. احجز مواعيد مع أفضل الأطباء، تصفح الخدمات الطبية، وأدر رعايتك الصحية اونلاين — بسرعة وسهولة وأمان.',
    },
  },
  '/pages/about': {
    en: {
      title: 'About Us | CareSync',
      description:
        'Learn about CareSync — our mission, story, and the team behind the leading clinic booking platform. 10+ years of healthcare excellence.',
    },
    ar: {
      title: 'من نحن | CareSync',
      description:
        'تعرف على CareSync — مهمتنا وقصتنا والفريق وراء منصة حجز العيادات الرائدة. أكثر من 10 سنوات من التميز في الرعاية الصحية.',
    },
  },
  '/pages/doctors': {
    en: {
      title: 'Our Doctors | CareSync',
      description:
        'Browse our qualified doctors across all specialties. Filter by specialty, availability, and experience. Book your appointment today.',
    },
    ar: {
      title: 'أطباؤنا | CareSync',
      description:
        'تصفح أطباءنا المؤهلين في جميع التخصصات. فلتر حسب التخصص والتوفر والخبرة. احجز موعدك اليوم.',
    },
  },
  '/pages/services': {
    en: {
      title: 'Medical Services | CareSync',
      description:
        'Explore our comprehensive medical services including Cardiology, Dentistry, Dermatology, Pediatrics, Orthopedics, and more.',
    },
    ar: {
      title: 'الخدمات الطبية | CareSync',
      description:
        'اكتشف خدماتنا الطبية الشاملة بما في ذلك أمراض القلب، طب الأسنان، الأمراض الجلدية، طب الأطفال، العظام، والمزيد.',
    },
  },
  '/pages/contact': {
    en: {
      title: 'Contact Us | CareSync',
      description:
        'Get in touch with CareSync. Find our location, working hours, and send us a message.',
    },
    ar: {
      title: 'تواصل معنا | CareSync',
      description:
        'تواصل مع CareSync. اعرف موقعنا وساعات العمل وابعتلنا رسالة.',
    },
  },
  '/pages/booking': {
    en: {
      title: 'Book an Appointment | CareSync',
      description:
        'Book your doctor appointment online in minutes. Choose your preferred doctor, date, and time.',
    },
    ar: {
      title: 'احجز موعد | CareSync',
      description:
        'احجز موعد طبيبك اونلاين في دقائق. اختار الدكتور والتاريخ والوقت المناسب.',
    },
  },
  '/pages/login': {
    en: {
      title: 'Login | CareSync',
      description: 'Sign in to your CareSync account to manage appointments.',
    },
    ar: {
      title: 'تسجيل الدخول | CareSync',
      description: 'سجل دخولك لحسابك على CareSync لإدارة مواعيدك.',
    },
  },
  '/pages/register': {
    en: {
      title: 'Register | CareSync',
      description: 'Create your CareSync account to book doctor appointments online.',
    },
    ar: {
      title: 'إنشاء حساب | CareSync',
      description: 'أنشئ حسابك على CareSync لحجز مواعيد الأطباء اونلاين.',
    },
  },
};

export function getPageSeo(pathname: string, locale: LocaleKey): PageSeo {
  const exact = seoConfig[pathname];
  if (exact) return exact[locale];

  // fallback to root
  return seoConfig['/'][locale];
}
