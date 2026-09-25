interface FooterProps {
  left: string;
  right: string;
}

export const Footer = ({ left, right }: FooterProps) => (
  <footer className="footer">
    <div className="container">
      <span>{left}</span>
      <span>{right}</span>
    </div>
  </footer>
);
