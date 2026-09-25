import type { ReactNode } from "react";

export interface NavLink {
  label: string;
  href: string;
}

interface NavbarProps {
  brand: string;
  links: NavLink[];
  /** Right-aligned slot, e.g. sign in / sign up controls */
  actions?: ReactNode;
}

export const Navbar = ({ brand, links, actions }: NavbarProps) => (
  <header className="nav">
    <div className="container">
      <a href="#top" className="logo">
        {brand}
      </a>
      <nav>
        <ul>
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>
      </nav>
      {actions}
    </div>
  </header>
);
