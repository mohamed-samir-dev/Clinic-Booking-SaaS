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

export const getNextAvailableDay = (availability: DaySchedule[]) => {
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
        return { day: dayName, isToday: i === 0, workingHours: hours };
      }
    }
  }
  return null;
};

export const getDoctorName = (name: string | LocalizedString) => typeof name === 'object' ? name.en : name;
export const getDoctorSpecialty = (specialty: string | LocalizedString) => typeof specialty === 'object' ? specialty.en : specialty;
