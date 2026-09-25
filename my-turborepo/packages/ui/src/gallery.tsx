export interface Photo {
  title: string;
  /** Layout hint in the grid */
  size?: "tall" | "wide";
  /** Image URL, e.g. "/photos/one.jpg" (served from apps/web/public) */
  src?: string;
  /** CSS background used when no src is provided */
  background?: string;
}

interface GalleryProps {
  id?: string;
  eyebrow: string;
  title: string;
  photos: Photo[];
}

export const Gallery = ({ id, eyebrow, title, photos }: GalleryProps) => (
  <section id={id} className="section">
    <div className="container">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <div className="gallery">
        {photos.map((p) => (
          <div
            key={p.title}
            className={`tile ${p.size ?? ""}`}
            style={{
              background: p.src
                ? `url("${p.src}") center/cover`
                : p.background,
            }}
            role={p.src ? "img" : undefined}
            aria-label={p.src ? p.title : undefined}
          >
            <span>{p.title}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);
