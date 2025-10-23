export default interface IShiftInput {
  name: string;            // uuid or short id
  location: string;      // e.g., "Guardians..."
  timeDay: string;       // combined string for now "Mon 3:30 PM - 10:00 PM"
  status: string;
  postedBy: string;      // "Ryan A."
  notes?: string;        // optional free-text
  createdAt?: string;    // ISO timestamp
}