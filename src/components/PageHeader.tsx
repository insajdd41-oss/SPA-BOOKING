interface PageHeaderProps {
  title: string;
  subtitle: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <header className="header">
      <h1>{title}</h1>
      <p className="subtitle">{subtitle}</p>
    </header>
  );
}