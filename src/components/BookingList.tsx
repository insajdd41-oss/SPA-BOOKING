import type { Booking } from '../types/booking';
import BookingCard from './BookingCard';
import EmptyState from './EmptyState';

interface BookingListProps {
  bookings: Booking[];
  getStatusLabel: (b: Booking) => string;
  emptyMessage: string;
}

export default function BookingList({ bookings, getStatusLabel, emptyMessage }: BookingListProps) {
  if (bookings.length === 0) {
    return <EmptyState message={emptyMessage} />;
  }

  return (
    <ul className="list">
      {bookings.map(b => (
        <BookingCard key={b.id} booking={b} statusLabel={getStatusLabel(b)} />
      ))}
    </ul>
  );
}