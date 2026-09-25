interface HeroProps {
  eyebrow: string;
  title: string;
  highlight: string;
  subtitle: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}

export const Hero = ({
  eyebrow,
  title,
  highlight,
  subtitle,
  primaryCta,
  secondaryCta,
}: HeroProps) => (
  <section className="hero">
    <div className="container">
      <p className="eyebrow">{eyebrow}</p>
      <h1>
        {title} <em>{highlight}</em>
      </h1>
      <p>{subtitle}</p>
      <a href={primaryCta.href} className="btn primary">
        {primaryCta.label}
      </a>
      <a href={secondaryCta.href} className="btn ghost">
        {secondaryCta.label}
      </a>
    </div>
  </section>
);
