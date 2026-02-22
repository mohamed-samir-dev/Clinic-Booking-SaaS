export interface TimeSlot {
  from: string;
  to: string;
}

export interface DayAvailability {
  day: string;
  slots: TimeSlot[];
  workingHours?: {
    from: string;
    to: string;
  };
}

export interface CalendarDay {
  day: number;
  isCurrentMonth: boolean;
  isAvailable: boolean;
  isPast: boolean;
}
