import type { Booking } from '../types/booking';

interface BookingCardProps {
  booking: Booking;
  statusLabel: string;
}

export default function BookingCard({ booking, statusLabel }: BookingCardProps) {
  return (
    <li className="card">
      <div className="card-top">
        <strong>{booking.date} в {booking.time}</strong> — {booking.serviceTitle}
        <span className={`badge badge-${booking.status}`}>{statusLabel}</span>
      </div>
      <div className="card-info">
        {booking.clientName} · мастер {booking.masterName} · {booking.durationMin} мин · {booking.price} ₽
        {booking.isPaid ? ' · оплачено' : ''}
      </div>
    </li>
  );
}