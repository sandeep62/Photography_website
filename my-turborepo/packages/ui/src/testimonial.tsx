interface TestimonialProps {
  quote: string;
  author: string;
}

export const Testimonial = ({ quote, author }: TestimonialProps) => (
  <section className="section alt">
    <div className="container quote">
      <blockquote>&ldquo;{quote}&rdquo;</blockquote>
      <cite>{author}</cite>
    </div>
  </section>
);
