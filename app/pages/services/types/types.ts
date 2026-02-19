import { IconType } from 'react-icons';

export interface ServiceHeroProps {
    service: {
      title: string;
      description: string;
      icon: IconType;
    };
    duration: string;
    price: string;
  }
  

  export interface Doctor {
    _id: string;
    name: { en: string; ar: string };
    specialty: { en: string; ar: string };
    bio: { en: string; ar: string };
    experienceYears: number;
    photoUrl?: string;
    ratingAverage: number;
    reviewsCount: number;
  }
  