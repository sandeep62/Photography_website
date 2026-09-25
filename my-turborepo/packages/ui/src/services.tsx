export interface Service {
  name: string;
  description: string;
  price: string;
}

interface ServicesProps {
  id?: string;
  eyebrow: string;
  title: string;
  services: Service[];
}

export const Services = ({ id, eyebrow, title, services }: ServicesProps) => (
  <section id={id} className="section alt">
    <div className="container">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <div className="cards">
        {services.map((s) => (
          <article key={s.name} className="card">
            <h3>{s.name}</h3>
            <p>{s.description}</p>
            <span className="price">{s.price}</span>
          </article>
        ))}
      </div>
    </div>
  </section>
);
