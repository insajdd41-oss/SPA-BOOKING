interface StatsGridProps {
  total: number;
  newCount: number;
  confirmedCount: number;
  doneCount: number;
  cancelledCount: number;
  totalRevenue: number;
}

export default function StatsGrid({
  total,
  newCount,
  confirmedCount,
  doneCount,
  cancelledCount,
  totalRevenue,
}: StatsGridProps) {
  return (
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
  );
}