import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bars3Icon } from '@heroicons/react/24/outline';
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
      <div className="container-section h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-brand-green rounded-md">
          <img src="/logo.jpg" alt="Biosun Trade logo" className="h-10 w-auto" />
          <span className="font-semibold text-lg md:text-xl">Biosun Trade</span>
        </Link>
        <nav className="hidden md:flex gap-8">
          {navItems.map((it) => (
            <Link
              key={it.to}
              to={it.to}
              className={`text-base font-semibold hover:text-brand-green ${location.pathname === it.to ? 'text-brand-green' : ''}`}
            >
              {it.label}
            </Link>
          ))}
        </nav>
        <button className="md:hidden" onClick={() => setOpen((v) => !v)} aria-label="Menu">
          <Bars3Icon className="h-7 w-7" />
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


