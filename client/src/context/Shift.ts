export type ShiftStatus = 'giving' | 'looking' | 'trading';

export const locationOptions = ["GOTG", "SSE", "MS", "TT"];

export interface Shift {
  _id?: string;        // Shift unique identifier
  location: string;      // e.g., "Guardians..."
  day: string;          // e.g., "Friday"
  startTime?: string;    // e.g., "3:30 PM"
  endTime?: string;      // e.g., "10:00 PM"
  status: ShiftStatus;
  perner: string;       // "Ryan A." (used by client)
  employee: string;     // "Ryan A." (used by server)
  notes?: string;        // optional free-text
}