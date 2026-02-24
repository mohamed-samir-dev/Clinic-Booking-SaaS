interface TimeSlot {
  from: string;
  to: string;
}

interface DaySchedule {
  day: string;
  workingHours?: TimeSlot;
  slots?: TimeSlot[];
}

interface LocalizedString {
  en: string;
  ar?: string;
}

const daysArabic: Record<string, string> = {
  'sunday': 'الأحد',
  'monday': 'الإثنين',
  'tuesday': 'الثلاثاء',
  'wednesday': 'الأربعاء',
  'thursday': 'الخميس',
  'friday': 'الجمعة',
  'saturday': 'السبت'
};

export const getNextAvailableDay = (availability: DaySchedule[], locale: string = 'en') => {
  if (!availability || availability.length === 0) return null;
  const daysOrder = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const today = new Date().getDay();
  for (let i = 0; i < 7; i++) {
    const dayIndex = (today + i) % 7;
    const dayName = daysOrder[dayIndex];
    const daySchedule = availability.find((a) => a.day === dayName);
    if (daySchedule) {
      let hours = daySchedule.workingHours;
      if (!hours && daySchedule.slots && daySchedule.slots.length > 0) {
        const validSlot = daySchedule.slots.find((slot) => slot.from && slot.to);
        if (validSlot) hours = validSlot;
      }
      if (hours && hours.from && hours.to) {
        return { 
          day: dayName,
          dayDisplay: locale === 'ar' ? daysArabic[dayName] : dayName.charAt(0).toUpperCase() + dayName.slice(1),
          isToday: i === 0, 
          workingHours: hours 
        };
      }
    }
  }
  return null;
};

export const getDoctorName = (name: string | LocalizedString, locale: string = 'en') => {
  if (typeof name === 'object') {
    return locale === 'ar' && name.ar ? name.ar : name.en;
  }
  return name;
};

export const getDoctorSpecialty = (specialty: string | LocalizedString, locale: string = 'en') => {
  if (typeof specialty === 'object') {
    return locale === 'ar' && specialty.ar ? specialty.ar : specialty.en;
  }
  return specialty;
};
