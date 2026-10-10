import { useParams } from 'react-router';

export default function BookingDetailPage() {
  const { id } = useParams();

  return (
    <section className="page">
      <h1>Запись {id}</h1>
      <p>Здесь будет подробная информация об одной записи.</p>
    </section>
  );
}