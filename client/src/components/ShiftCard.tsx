import { useMutation } from '@apollo/client';
import { DELETE_SHIFT } from '../utils/mutations';
import { Shift } from '../context/Shift';

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
  const [delShift] = useMutation(DELETE_SHIFT);

  const statusClass = shift.status?.toLowerCase() === 'open' ? 'status-open' : 'status-closed';

  const handledelShift = async () => {
    try {
      console.log('Deleting Shift with ID:', shift._id);
      await delShift({ variables: { shiftId: shift._id } });
    } catch (err) {
      console.error('Error deleting Shift:', err);
    }
  };

  return (
    <div className="shift-card" key={shift._id}>
      <h3>{'GIVING'}</h3>
      <h1>{shift._id}</h1>
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

      <button 
        className="request-shift-button"
        onClick={handledelShift}>X</button>
    </div>
  );
}
