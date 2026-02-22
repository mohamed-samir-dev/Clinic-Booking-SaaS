export const convertTo24Hour = (time12h: string): { startTime24: string; endTime24: string } => {
  const [hours, minutes] = time12h.split(':');
  const isPM = time12h.includes('PM');
  const isAM = time12h.includes('AM');
  let hour24 = parseInt(hours);
  
  if (isPM && hour24 !== 12) hour24 += 12;
  if (isAM && hour24 === 12) hour24 = 0;
  
  const startTime24 = `${String(hour24).padStart(2, '0')}:${minutes.replace(/[^0-9]/g, '')}`;
  const endHour = (hour24 + 1) % 24;
  const endTime24 = `${String(endHour).padStart(2, '0')}:${minutes.replace(/[^0-9]/g, '')}`;

  return { startTime24, endTime24 };
};
