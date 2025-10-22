// src/data/mockShifts.ts
import { Shift } from '../context/Shift';
import { v4 as uuid } from 'uuid';

export const mockShifts: Shift[] = [
  {
    id: uuid(),
    location: 'Guardians of the Galaxy: Cosmic Rewind',
    timeDay: 'Friday 3:30 PM - 11:00 PM',
    status: 'giveaway',
    postedBy: 'Ryan A.',
    notes: 'Prefer someone comfortable with loading guests.',
    createdAt: new Date().toISOString()
  },
  {
    id: uuid(),
    location: 'Soarin’',
    timeDay: 'Saturday 8:00 AM - 4:30 PM',
    status: 'trade',
    postedBy: 'Ava M.',
    createdAt: new Date().toISOString()
  },
  {
    id: uuid(),
    location: 'Test Track',
    timeDay: 'Monday 2:00 PM - 10:00 PM',
    status: 'pickup',
    postedBy: 'Sam R.'
  }
];
