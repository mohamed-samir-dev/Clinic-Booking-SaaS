import { FaStethoscope, FaBaby, FaSpa, FaTooth, FaFemale, FaBone, FaHeartbeat } from 'react-icons/fa';
import { GiEarbuds } from 'react-icons/gi';

export const services = [
  {
    icon: FaStethoscope,
    key: 'generalMedicine',
    searchTerms: ['general', 'medicine', 'عام', 'طب']
  },
  {
    icon: FaBaby,
    key: 'pediatrics',
    searchTerms: ['pediatrics', 'children', 'baby', 'أطفال', 'طفل']
  },
  {
    icon: FaSpa,
    key: 'dermatology',
    searchTerms: ['dermatology', 'skin', 'جلدية', 'بشرة']
  },
  {
    icon: FaTooth,
    key: 'dentistry',
    searchTerms: ['dentistry', 'dental', 'teeth', 'tooth', 'أسنان', 'سن']
  },
  {
    icon: FaFemale,
    key: 'gynecology',
    searchTerms: ['gynecology', 'women', 'نساء', 'حمل']
  },
  {
    icon: FaBone,
    key: 'orthopedics',
    searchTerms: ['orthopedics', 'bone', 'عظام', 'مفاصل']
  },
  {
    icon: FaHeartbeat,
    key: 'cardiology',
    searchTerms: ['cardiology', 'heart', 'قلب', 'قلوب']
  },
  {
    icon: GiEarbuds,
    key: 'ent',
    searchTerms: ['ent', 'ear', 'nose', 'throat', 'أنف', 'أذن', 'حنجرة']
  }
];