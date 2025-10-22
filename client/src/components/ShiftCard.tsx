import { Shift } from '../context/Shift';

export default function ShiftCard(shift : Shift) {
  return (
    <div className="shift-card">
      <div className="shift-header">
        <h3>{shift.location}</h3>
        <span>{shift.timeDay}</span>
        </div>
        <div className="shift-body">
        <p>{shift.postedBy}</p>
        </div>
        <div className="shift-footer">
        </div>
        </div>
  );
}
