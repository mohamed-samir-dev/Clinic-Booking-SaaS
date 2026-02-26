import { ClinicWorkingHours, EditData } from '../types';

export const getClinicDayData = (day: string, clinicHours: ClinicWorkingHours) => {
  const lowerDay = day.toLowerCase();
  const capitalizedDay = day.charAt(0).toUpperCase() + day.slice(1).toLowerCase();
  return clinicHours[lowerDay] || clinicHours[capitalizedDay] || clinicHours[day];
};

export const addTimeSlot = (day: string, editData: EditData, clinicHours: ClinicWorkingHours): EditData => {
  const clinicDay = getClinicDayData(day, clinicHours);
  if (!clinicDay?.isOpen) return editData;

  const daySchedule = editData.availability.find(a => a.day === day);
  const newSlot = { from: clinicDay.openTime, to: clinicDay.closeTime };

  if (daySchedule) {
    return {
      ...editData,
      availability: editData.availability.map(a =>
        a.day === day ? { ...a, slots: [...a.slots, newSlot] } : a
      )
    };
  } else {
    return {
      ...editData,
      availability: [...editData.availability, { day, slots: [newSlot] }]
    };
  }
};

export const removeTimeSlot = (day: string, slotIndex: number, editData: EditData): EditData => {
  return {
    ...editData,
    availability: editData.availability.map(a =>
      a.day === day ? { ...a, slots: a.slots.filter((_, i) => i !== slotIndex) } : a
    ).filter(a => a.slots.length > 0)
  };
};

export const updateTimeSlot = (
  day: string, 
  slotIndex: number, 
  field: 'from' | 'to', 
  value: string, 
  editData: EditData
): EditData => {
  return {
    ...editData,
    availability: editData.availability.map(a =>
      a.day === day
        ? {
            ...a,
            slots: a.slots.map((slot, i) =>
              i === slotIndex ? { ...slot, [field]: value } : slot
            )
          }
        : a
    )
  };
};

export const validateWorkingHours = (
  availability: Array<{ day: string; slots: Array<{ from: string; to: string }> }>,
  clinicHours: ClinicWorkingHours
): { valid: boolean; error?: string } => {
  for (const daySchedule of availability) {
    const clinicDay = getClinicDayData(daySchedule.day, clinicHours);
    
    if (!clinicDay || clinicDay.isOpen !== true) {
      return {
        valid: false,
        error: `Cannot set working hours on ${daySchedule.day}. The clinic is closed on this day.`
      };
    }
    
    for (const slot of daySchedule.slots) {
      if (slot.from < clinicDay.openTime || slot.to > clinicDay.closeTime) {
        return {
          valid: false,
          error: `Working hours on ${daySchedule.day} (${slot.from} - ${slot.to}) are outside clinic hours (${clinicDay.openTime} - ${clinicDay.closeTime})`
        };
      }
    }
  }
  
  return { valid: true };
};
