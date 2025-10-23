import ShiftCard from '../components/ShiftCard';
import ShiftForm from '../components/ShiftForm';
// import AddShift from './AddShift';

export default function Home() {

const mockShifts = [
  {
    id: '1',
    location: 'Guardians of the Galaxy',
    timeDay: 'Friday 3:30 PM - 11:00 PM',
    status: 'giveaway' as const,
    postedBy: 'Alice B.',
    notes: 'Looking to trade for a morning shift.',
    createdAt: '2024-06-01T10:00:00Z',
  },
  {
    id: '2',
    location: 'Space Mountain',
    timeDay: 'Saturday 1:00 PM - 9:00 PM',
    status: 'trade' as const,
    postedBy: 'Bob C.',
    notes: '',
    createdAt: '2024-06-02T12:00:00Z',
  },
  {
    id: '3',
    location: 'Pirates of the Caribbean',
    timeDay: 'Sunday 10:00 AM - 6:00 PM',
    status: 'pickup' as const,
    postedBy: 'Charlie D.',
    notes: 'First-time picker, excited to help out!',
    createdAt: '2024-06-03T14:00:00Z',
  },
];

  return (
    <section className="home">
      <h2>Your Upcoming Shifts</h2>
      <div className="shift-grid">
        {mockShifts.map((shift) => (
          <ShiftCard key={shift.id} {...shift} />
        ))}
      </div>

      <ShiftForm />
    </section>
  );
}
