import ShiftForm from '../components/ShiftForm';
import { useNavigate } from 'react-router-dom';
import { Shift } from '../types/shift';

export default function AddShift() {
  const navigate = useNavigate();

  function handleAdd(shift: Shift) {
    console.log('Added shift:', shift);
    navigate('/');
  }

  return (
    <section>
      <h2>Add New Shift</h2>
      <ShiftForm onSubmit={handleAdd} />
    </section>
  );
}
