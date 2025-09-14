import { Contact } from '../home/Contact';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { Helmet } from 'react-helmet-async';

export function ContactPage() {
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  return (
    <>
      <Helmet>
        <title>Contact — Biosun Trade</title>
        <meta name="description" content="Contactez Biosun Trade pour vos besoins en fruits exotiques: disponibilités, calibres, packaging et délais." />
        <link rel="canonical" href={`${origin}/contact`} />
        <meta property="og:url" content={`${origin}/contact`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Contact — Biosun Trade" />
        <meta property="og:description" content="Parlons de vos besoins en fruits exotiques." />
      </Helmet>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{background: 'radial-gradient(circle at 20% 20%, #66BB2E22, transparent 40%), radial-gradient(circle at 80% 30%, #F5A62322, transparent 40%)'}} />
        <div className="container-section py-20 text-center relative">
          <motion.h1 initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:.6}} className="text-4xl md:text-5xl font-extrabold">
            Entrons en contact
          </motion.h1>
          <motion.p initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:.1, duration:.6}} className="mt-4 text-gray-300 max-w-2xl mx-auto">
            Un besoin, un devis, une question logistique ? Notre équipe vous répond rapidement.
          </motion.p>
          <div className="mt-8 flex justify-center gap-4">
            <Button to="https://wa.me/32471494048" variant="yellow">WhatsApp</Button>
            <Button to="mailto:contact@biosuntrade.com" variant="outline">Envoyer un e‑mail</Button>
          </div>
        </div>
      </section>
      <motion.div initial={{opacity:0, scale:.98}} animate={{opacity:1, scale:1}} transition={{duration:.4}}>
        <Contact />
      </motion.div>
      <section className="container-section pb-20">
        <div className="rounded-2xl overflow-hidden border border-white/10">
          <iframe title="map" className="w-full h-[320px]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=Avenue%20Louise%20367%2C%201050%20Bruxelles&output=embed" />
        </div>
      </section>
    </>
  );
}


