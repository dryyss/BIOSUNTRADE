import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin, FiFacebook, FiInstagram, FiLinkedin } from 'react-icons/fi';

export function Footer() {
  return (
    <footer className="mt-16 bg-brand-black border-t border-white/10 text-gray-300">
      <div className="container-section py-12 grid md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-full bg-brand-green" />
            <span className="font-semibold text-white text-lg">Biosun Trade</span>
          </div>
          <p className="mt-4 text-sm">Fruits exotiques de qualité, traçabilité et logistique maîtrisée.</p>
          <div className="mt-4 space-y-2 text-sm">
            <a className="block text-brand-yellow" href="https://wa.me/32471494048" target="_blank" rel="noreferrer">WhatsApp</a>
            <a className="block hover:text-white" href="mailto:contact@biosuntrade.com">contact@biosuntrade.com</a>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-white">Navigation</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white">Accueil</Link></li>
            <li><Link to="/produits" className="hover:text-white">Produits</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white">Contact</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li className="flex items-start gap-2"><FiMapPin className="mt-0.5" /> Avenue Louise 367, 1050 Bruxelles</li>
            <li className="flex items-center gap-2"><FiPhone /> +32 471 49 40 48</li>
            <li className="flex items-center gap-2"><FiMail /> contact@biosuntrade.com</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white">Newsletter</h4>
          <p className="mt-2 text-sm">Recevez nos disponibilités et nouveautés.</p>
          <form onSubmit={(e)=>{e.preventDefault(); alert('Merci ! Nous vous tiendrons informé.');}} className="mt-4 flex gap-2">
            <input type="email" required placeholder="Votre e‑mail" className="flex-1 px-4 py-3 rounded-md border border-white/20 bg-transparent" />
            <button className="px-4 py-3 rounded-md bg-brand-green text-white font-medium">S’abonner</button>
          </form>
          <div className="mt-4 flex items-center gap-4 text-white/80">
            <a href="#" aria-label="Facebook" className="hover:text-white"><FiFacebook /></a>
            <a href="#" aria-label="Instagram" className="hover:text-white"><FiInstagram /></a>
            <a href="#" aria-label="LinkedIn" className="hover:text-white"><FiLinkedin /></a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-section py-6 text-xs flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Biosun Trade. Tous droits réservés.</p>
          <p className="text-white/60">Made with care — Bruxelles, Belgique</p>
        </div>
      </div>
    </footer>
  );
}


