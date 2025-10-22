import { useState } from 'react';
import { Shift } from '../types/shift';

interface Props {
  onSubmit: (shift: Shift) => void;
  initialData?: Shift;
}

export default function ShiftForm({ onSubmit, initialData }: Props) {
  const [formData, setFormData] = useState<Shift>(
    initialData || {
      id: crypto.randomUUID(),
      date: '',
      location: '',
      startTime: '',
      endTime: '',
      notes: '',
    }
  );

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(formData);
  }

  return (
    <form className="shift-form" onSubmit={handleSubmit}>
      <label>
        Date
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />
      </label>

      <label>
        Location
        <input type="text" name="location" value={formData.location} onChange={handleChange} required />
      </label>

      <label>
        Start Time
        <input type="time" name="startTime" value={formData.startTime} onChange={handleChange} required />
      </label>

      <label>
        End Time
        <input type="time" name="endTime" value={formData.endTime} onChange={handleChange} required />
      </label>

      <label>
        Notes
        <textarea name="notes" value={formData.notes} onChange={handleChange} placeholder="Optional..." />
      </label>

      <button type="submit">Save</button>
    </form>
  );
}
