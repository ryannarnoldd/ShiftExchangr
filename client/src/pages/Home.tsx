import { ShiftCard } from '../components/ShiftCard';
import ShiftForm from '../components/ShiftForm';
import { useQuery } from '@apollo/client';
import { ALL_SHIFTS } from '../utils/queries';
import { Shift } from '../context/Shift';

export default function Home() {
  const { data, loading, error } = useQuery(ALL_SHIFTS);

  if (data) {
    console.log('Shifts data:', data);
  }

  if (loading) return <p>Loading shifts...</p>;
  if (error) return <p>Error loading shifts: {error.message}</p>;

  return (
    <section className="home">
      <h2>these are shifts</h2>
      <div className="shift-grid">
        {(data?.all_shifts as Shift[]).map((shift) => (
          <ShiftCard shift={shift} />
        ))}
          
      </div>

      <ShiftForm />
    </section>
  );
}
