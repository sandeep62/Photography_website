export interface Stat {
  value: string;
  label: string;
}

interface AboutProps {
  id?: string;
  eyebrow: string;
  title: string;
  paragraphs: string[];
  stats: Stat[];
  /** Portrait image URL; a gradient placeholder is shown when omitted */
  portraitSrc?: string;
}

export const About = ({
  id,
  eyebrow,
  title,
  paragraphs,
  stats,
  portraitSrc,
}: AboutProps) => (
  <section id={id} className="section">
    <div className="container about">
      <div
        className="portrait"
        role="img"
        aria-label="Portrait of the photographer"
        style={
          portraitSrc
            ? { background: `url("${portraitSrc}") center/cover` }
            : undefined
        }
      />
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        {paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
        <div className="stats">
          {stats.map((s) => (
            <div key={s.label}>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
