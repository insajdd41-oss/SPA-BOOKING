import { mockBookings } from './data/mockBookings';
import './App.css';

// Фиксированная «сегодняшняя» дата для стабильной демонстрации
const TODAY = '2026-08-31';

// Вычисляем статус записи с учётом даты
function getStatusLabel(booking: typeof mockBookings[number]): string {
  if (booking.status === 'cancelled') return 'Отменена';
  if (booking.status === 'done') return 'Завершена';
  if (booking.date < TODAY) return 'Завершена';
  if (booking.status === 'confirmed') return 'Подтверждена';
  return 'Новая';
}

function App() {
  const total = mockBookings.length;
  const newCount = mockBookings.filter(b => getStatusLabel(b) === 'Новая').length;
  const confirmedCount = mockBookings.filter(b => getStatusLabel(b) === 'Подтверждена').length;
  const doneCount = mockBookings.filter(b => getStatusLabel(b) === 'Завершена').length;
  const cancelledCount = mockBookings.filter(b => getStatusLabel(b) === 'Отменена').length;

  const totalRevenue = mockBookings
    .filter(b => b.status !== 'cancelled')
    .reduce((sum, b) => sum + b.price, 0);

  const upcoming = mockBookings
    .filter(b => b.date >= TODAY && b.status !== 'cancelled' && b.status !== 'done')
    .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));

  const todayBookings = mockBookings.filter(b => b.date === TODAY);

  return (
    <main className="app">
      <header className="header">
        <h1>SPA BOOKING</h1>
        <p className="subtitle">Онлайн-запись в массажный салон</p>
      </header>

      <section className="stats">
        <div className="stat-card">
          <span className="stat-value">{total}</span>
          <span className="stat-label">Всего записей</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{newCount}</span>
          <span className="stat-label">Новые</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{confirmedCount}</span>
          <span className="stat-label">Подтверждены</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{doneCount}</span>
          <span className="stat-label">Завершены</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{cancelledCount}</span>
          <span className="stat-label">Отменены</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{totalRevenue.toLocaleString('ru-RU')} ₽</span>
          <span className="stat-label">Сумма записей</span>
        </div>
      </section>

      <section className="block">
        <h2>Записи на сегодня ({todayBookings.length})</h2>
        {todayBookings.length === 0 ? (
          <p className="empty">На сегодня записей нет.</p>
        ) : (
          <ul className="list">
            {todayBookings.map(b => (
              <li key={b.id} className="card">
                <div className="card-top">
                  <strong>{b.time}</strong> — {b.serviceTitle}
                  <span className={`badge badge-${b.status}`}>{getStatusLabel(b)}</span>
                </div>
                <div className="card-info">
                  {b.clientName} · мастер {b.masterName} · {b.durationMin} мин · {b.price} ₽
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="block">
        <h2>Ближайшие записи ({upcoming.length})</h2>
        {upcoming.length === 0 ? (
          <p className="empty">Ближайших записей нет.</p>
        ) : (
          <ul className="list">
            {upcoming.map(b => (
              <li key={b.id} className="card">
                <div className="card-top">
                  <strong>{b.date}</strong> в {b.time} — {b.serviceTitle}
                  <span className={`badge badge-${b.status}`}>{getStatusLabel(b)}</span>
                </div>
                <div className="card-info">
                  {b.clientName} · мастер {b.masterName} · {b.durationMin} мин · {b.price} ₽
                  {b.isPaid ? ' · оплачено' : ''}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="block">
        <h2>Все записи ({total})</h2>
        <ul className="list">
          {mockBookings.map(b => (
            <li key={b.id} className="card">
              <div className="card-top">
                <strong>{b.id}</strong> — {b.serviceTitle}
                <span className={`badge badge-${b.status}`}>{getStatusLabel(b)}</span>
              </div>
              <div className="card-info">
                {b.clientName} · {b.date} {b.time} · мастер {b.masterName} · {b.price} ₽
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default App;