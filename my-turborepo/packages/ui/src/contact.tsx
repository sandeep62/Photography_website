interface ContactProps {
  id?: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  /** Where the enquiry is sent, e.g. "mailto:you@example.com" */
  action: string;
  projectTypes: string[];
}

export const Contact = ({
  id,
  eyebrow,
  title,
  subtitle,
  action,
  projectTypes,
}: ContactProps) => (
  <section id={id} className="section contact">
    <div className="container">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p>{subtitle}</p>
      <form
        className="form"
        action={action}
        method="post"
        encType="text/plain"
      >
        <input name="name" placeholder="Your name" required />
        <input
          name="email"
          type="email"
          placeholder="Email address"
          required
        />
        <select name="type" defaultValue={projectTypes[0]}>
          {projectTypes.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
        <textarea name="message" rows={5} placeholder="Tell me about your plans" />
        <button type="submit" className="btn primary">
          Send enquiry
        </button>
      </form>
    </div>
  </section>
);
