import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';

const navItems = [
  { to: '/', label: 'Accueil' },
  { to: '/produits', label: 'Produits' },
  { to: '/contact', label: 'Contact' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-brand-black/80 backdrop-blur border-b border-white/10">
      <div className="container-section h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-brand-green" />
          <span className="font-semibold">Biosun Trade</span>
        </div>
        <nav className="hidden md:flex gap-6">
          {navItems.map((it) => (
            <Link
              key={it.to}
              to={it.to}
              className={`text-sm font-medium hover:text-brand-green ${location.pathname === it.to ? 'text-brand-green' : ''}`}
            >
              {it.label}
            </Link>
          ))}
        </nav>
        <button className="md:hidden" onClick={() => setOpen((v) => !v)}>
          <FiMenu size={22} />
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-gray-100 dark:border-white/10">
          <div className="container-section py-2 flex flex-col">
            {navItems.map((it) => (
              <Link key={it.to} to={it.to} className="py-2" onClick={() => setOpen(false)}>
                {it.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}


