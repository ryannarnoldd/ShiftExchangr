export type ShiftStatus = 'giveaway' | 'trade' | 'pickup';

export interface Shift {
  location: string;      // e.g., "Guardians..."
  day: string;          // e.g., "Friday"
  startTime: string;    // e.g., "3:30 PM"
  endTime: string;      // e.g., "10:00 PM"
  status: ShiftStatus;
  employee: string;     // "Ryan A." (used by server)
  notes?: string;        // optional free-text
}