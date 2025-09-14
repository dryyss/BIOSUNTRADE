import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Modal } from '../ui/Modal';
import { FiMail, FiPhone, FiMapPin, FiFacebook, FiInstagram, FiLinkedin } from 'react-icons/fi';

export function Footer() {
  const [open, setOpen] = useState(false);
  return (
    <footer className="mt-20 bg-brand-black border-t border-white/10 text-gray-200">
      <div className="container-section py-16 grid md:grid-cols-4 gap-12">
        <div>
          <Link to="/" className="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-brand-green rounded-md">
            <img src="/logo2.png" alt="Biosun Trade logo" className="h-16 w-auto" />
            <span className="font-semibold text-white text-2xl">Biosun Trade</span>
          </Link>
          <p className="mt-4 text-lg text-white/80">Fruits exotiques de qualité, traçabilité et logistique maîtrisée.</p>
          <div className="mt-5 space-y-2 text-sm">
            <a className="block text-brand-yellow font-medium" href="https://wa.me/32471494048" target="_blank" rel="noreferrer">WhatsApp</a>
            <a className="block hover:text-white" href="mailto:contact@biosuntrade.com">contact@biosuntrade.com</a>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-white text-lg">Navigation</h4>
          <ul className="mt-4 space-y-2 text-lg">
            <li><Link to="/" className="hover:text-white">Accueil</Link></li>
            <li><Link to="/produits" className="hover:text-white">Produits</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white text-lg">Contact</h4>
          <ul className="mt-4 space-y-2 text-lg">
            <li className="flex items-start gap-2"><FiMapPin className="mt-0.5" /> Avenue Louise 367, 1050 Bruxelles</li>
            <li className="flex items-center gap-2"><FiPhone /> +32 471 49 40 48</li>
            <li className="flex items-center gap-2"><FiMail /> contact@biosuntrade.com</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white text-lg">Newsletter</h4>
          <p className="mt-2 text-lg">Recevez nos disponibilités et nouveautés.</p>
          <form onSubmit={(e)=>{e.preventDefault(); setOpen(true);}} className="mt-4 flex gap-3">
            <input type="email" required placeholder="Votre e‑mail" className="flex-1 px-4 py-3 rounded-md border border-white/20 bg-transparent" />
            <button className="px-5 py-3 rounded-md bg-brand-green text-white font-semibold">S’abonner</button>
          </form>
          <div className="mt-5 flex items-center gap-5 text-white/80 text-2xl">
            <a href="#" aria-label="Facebook" className="hover:text-white"><FiFacebook /></a>
            <a href="#" aria-label="Instagram" className="hover:text-white"><FiInstagram /></a>
            <a href="#" aria-label="LinkedIn" className="hover:text-white"><FiLinkedin /></a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-section py-8 text-base md:text-lg flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Biosun Trade. Tous droits réservés.</p>
          <p className="text-white/70">Made with care — Bruxelles, Belgique</p>
        </div>
      </div>
      <Modal open={open} onClose={()=>setOpen(false)} title="Inscription confirmée">
        Merci ! Vous recevrez nos disponibilités et nouveautés très bientôt.
      </Modal>
    </footer>
  );
}


