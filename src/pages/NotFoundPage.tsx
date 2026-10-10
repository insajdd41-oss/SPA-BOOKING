import { Link } from 'react-router';

export default function NotFoundPage() {
  return (
    <section className="page">
      <h1>Страница не найдена</h1>
      <p>Такого адреса не существует.</p>
      <Link to="/">Вернуться на главную</Link>
    </section>
  );
}