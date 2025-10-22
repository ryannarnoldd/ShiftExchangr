export type ShiftStatus = 'giveaway' | 'trade' | 'pickup';

export interface Shift {
  id: string;            // uuid or short id
  location: string;      // e.g., "Guardians..."
  timeDay: string;       // combined string for now "Mon 3:30 PM - 10:00 PM"
  status: ShiftStatus;
  postedBy: string;      // "Ryan A."
  notes?: string;        // optional free-text
  createdAt?: string;    // ISO timestamp
  // future: day?: string; startTime?: string; endTime?: string;
}