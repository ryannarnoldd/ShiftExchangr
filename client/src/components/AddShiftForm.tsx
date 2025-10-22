// src/components/AddShiftForm.tsx
import React, { useState } from 'react';
import { Shift } from '../context/Shift';
import { v4 as uuid } from 'uuid';

type Props = {
  onAdd: (shift: Shift) => void;
  defaultPoster?: string;
};

export const AddShiftForm: React.FC<Props> = ({ onAdd, defaultPoster = 'You' }) => {
  const [location, setLocation] = useState('');
  const [timeDay, setTimeDay] = useState('');
  const [status, setStatus] = useState<Shift['status']>('giveaway');
  const [notes, setNotes] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!location || !timeDay) return;
    const newShift: Shift = {
      id: uuid(),
      location,
      timeDay,
      status,
      postedBy: defaultPoster,
      notes,
      createdAt: new Date().toISOString()
    };
    onAdd(newShift);
    setLocation('');
    setTimeDay('');
    setNotes('');
  };

  return (
    <form onSubmit={submit} className="space-y-3 p-4 rounded-lg border bg-white">
      <div>
        <label className="block text-sm">Location</label>
        <input value={location} onChange={e => setLocation(e.target.value)} className="mt-1 block w-full rounded-md border p-2" placeholder="e.g., Guardians of the Galaxy" />
      </div>
      <div>
        <label className="block text-sm">Time & Day</label>
        <input value={timeDay} onChange={e => setTimeDay(e.target.value)} className="mt-1 block w-full rounded-md border p-2" placeholder="e.g., Friday 3:30 PM - 11:00 PM" />
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm">Status</label>
        <select value={status} onChange={e => setStatus(e.target.value as any)} className="p-2 border rounded-md">
          <option value="giveaway">Giveaway</option>
          <option value="trade">Trade</option>
          <option value="pickup">Pickup</option>
        </select>
      </div>

      <div>
        <label className="block text-sm">Notes (optional)</label>
        <input value={notes} onChange={e => setNotes(e.target.value)} className="mt-1 block w-full rounded-md border p-2" />
      </div>

      <div className="flex justify-end">
        <button type="submit" className="px-4 py-2 rounded-md bg-blue-600 text-white">Post Shift</button>
      </div>
    </form>
  );
};
