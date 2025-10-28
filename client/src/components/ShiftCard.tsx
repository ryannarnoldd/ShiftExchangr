import { Shift } from '../context/Shift'

interface ShiftCardProps {
  shift: Shift;
}

const locationsMap: { [key: string]: string } = {
  'GOTG': 'Guardians of the Galaxy: Cosmic Rewind',
  'SSE': 'Spaceship Earth',
  'MS': 'Mission Space',
  'TT': 'Test Track'
};

export const ShiftCard: React.FC<ShiftCardProps> = ({ shift }) => {
  const statusClass = shift.status?.toLowerCase() === 'open' ? 'status-open' : 'status-closed';

  return (
    <div className="shift-card">
      <h3>{'GIVING'}</h3>
      <p>
        <strong>When:</strong>{' '}
        {shift.startTime ? `${shift.startTime} - ${shift.endTime ?? ''}` : 'TBD'}
      </p>
      <p>
        <strong>Day:</strong> {shift.day}
      </p>
      <p><strong>Location:</strong> {locationsMap[shift.location]}</p>
      <p>
        <strong>Status:</strong>{' '}
        <span className={`shift-status ${statusClass}`}>{shift.status}</span>
      </p>
      <p><strong>Posted by:</strong> {shift.employee ?? 'Unknown'}</p>
      {shift.notes && <p><strong>Notes:</strong> {shift.notes}</p>}
    </div>
  );
}
