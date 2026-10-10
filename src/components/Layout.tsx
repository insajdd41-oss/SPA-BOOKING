import { Outlet } from 'react-router';
import Menu from './Menu';

export default function Layout() {
  return (
    <>
      <header className="app-header">
        <h1 className="app-logo">SPA BOOKING</h1>
        <Menu />
      </header>

      <main className="app-main">
        <Outlet />
      </main>

      <footer className="app-footer">
        Учебный проект — SPA BOOKING
      </footer>
    </>
  );
}