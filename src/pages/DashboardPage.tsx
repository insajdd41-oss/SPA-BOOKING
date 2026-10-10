import { useEffect, useState } from 'react';
import type { Booking } from '../types/booking';
import { fetchBookingsMock } from '../mocks/bookings';
import PageHeader from '../components/PageHeader';
import StatsGrid from '../components/StatsGrid';
import BookingList from '../components/BookingList';

const TODAY = '2026-08-31';

function getStatusLabel(booking: Booking): string {
  if (booking.status === 'cancelled') return 'Отменена';
  if (booking.status === 'done') return 'Завершена';
  if (booking.date < TODAY) return 'Завершена';
  if (booking.status === 'confirmed') return 'Подтверждена';
  return 'Новая';
}

export default function DashboardPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    fetchBookingsMock()
      .then(data => {
        if (!isActive) return;
        setBookings(data);
        setIsLoading(false);
      })
      .catch(() => {
        if (!isActive) return;
        setError('Не удалось загрузить записи');
        setIsLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, []);

  if (isLoading) {
    return (
      <main className="app">
        <PageHeader title="SPA BOOKING" subtitle="Онлайн-запись в массажный салон" />
        <p className="empty">Загрузка записей...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="app">
        <PageHeader title="SPA BOOKING" subtitle="Онлайн-запись в массажный салон" />
        <p className="empty">{error}</p>
      </main>
    );
  }

  const total = bookings.length;
  const newCount = bookings.filter(b => getStatusLabel(b) === 'Новая').length;
  const confirmedCount = bookings.filter(b => getStatusLabel(b) === 'Подтверждена').length;
  const doneCount = bookings.filter(b => getStatusLabel(b) === 'Завершена').length;
  const cancelledCount = bookings.filter(b => getStatusLabel(b) === 'Отменена').length;

  const totalRevenue = bookings
    .filter(b => b.status !== 'cancelled')
    .reduce((sum, b) => sum + b.price, 0);

  const todayBookings = bookings.filter(b => b.date === TODAY);

  const upcoming = bookings
    .filter(b => b.date >= TODAY && b.status !== 'cancelled' && b.status !== 'done')
    .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));

  return (
    <main className="app">
      <PageHeader title="SPA BOOKING" subtitle="Онлайн-запись в массажный салон" />

      <StatsGrid
        total={total}
        newCount={newCount}
        confirmedCount={confirmedCount}
        doneCount={doneCount}
        cancelledCount={cancelledCount}
        totalRevenue={totalRevenue}
      />

      <section className="block">
        <h2>Записи на сегодня ({todayBookings.length})</h2>
        <BookingList
          bookings={todayBookings}
          getStatusLabel={getStatusLabel}
          emptyMessage="На сегодня записей нет."
        />
      </section>

      <section className="block">
        <h2>Ближайшие записи ({upcoming.length})</h2>
        <BookingList
          bookings={upcoming}
          getStatusLabel={getStatusLabel}
          emptyMessage="Ближайших записей нет."
        />
      </section>

      <section className="block">
        <h2>Все записи ({total})</h2>
        <BookingList
          bookings={bookings}
          getStatusLabel={getStatusLabel}
          emptyMessage="Записей пока нет."
        />
      </section>
    </main>
  );
}