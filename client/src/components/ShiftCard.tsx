import { Shift } from '../context/Shift'

interface ShiftCardProps {
  shift: Shift;
}

export const ShiftCard: React.FC<ShiftCardProps> = ({ shift }) => {
  return (
    <div className="shift-card">
      <h3>{shift.day ?? `${shift.day ?? ''}`.trim()}</h3>
      <p>
        <strong>When:</strong>{' '}
        {shift.startTime ? `${shift.day ?? ''} ${shift.startTime} - ${shift.endTime ?? ''}`.trim() : shift.day}
      </p>
      <p><strong>Location:</strong> {shift.location}</p>
      <p><strong>Status:</strong> {shift.status}</p>
      <p><strong>Posted by:</strong> {shift.employee ?? shift.employee}</p>
      {shift.notes && <p><strong>Notes:</strong> {shift.notes}</p>}
    </div>
  );
}
