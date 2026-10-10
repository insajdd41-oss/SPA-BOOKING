import { NavLink } from 'react-router';

export default function Menu() {
  return (
    <nav className="menu">
      <NavLink to="/" end>Дашборд</NavLink>
      <NavLink to="/bookings">Все записи</NavLink>
      <NavLink to="/analytics">Аналитика</NavLink>
      <NavLink to="/schedule">Расписание</NavLink>
    </nav>
  );
}
