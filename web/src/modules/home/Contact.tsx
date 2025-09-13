import { useState } from 'react';
import { FloatingInput, FloatingTextarea } from '../ui/FloatingField';

export function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    try {
      // Placeholder: intégration EmailJS ou endpoint plus tard
      await new Promise((r) => setTimeout(r, 800));
      setStatus('sent');
      (e.currentTarget as HTMLFormElement).reset();
    } catch (_) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="container-section py-16">
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">Contact</h2>
          <p className="mt-4 text-gray-300">
            Laissez-nous un message, nous revenons vers vous rapidement.
          </p>
          <div className="mt-6 text-sm text-gray-600 dark:text-gray-300">
            <p>Biosun Trade</p>
            <p>Avenue Louise 367, 1050 Bruxelles</p>
            <p>TEL: +32 471 49 40 48</p>
            <p>Email: contact@biosuntrade.com</p>
            <p>TVA: 0785627249</p>
            <a href="https://wa.me/32471494048" target="_blank" rel="noreferrer" className="inline-block mt-3 text-brand-yellow">WhatsApp</a>
          </div>
        </div>
        <form onSubmit={onSubmit} className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur shadow-xl">
          <div className="grid grid-cols-1 gap-4">
            <FloatingInput required name="name" label="Nom" />
            <FloatingInput required name="email" type="email" label="Email" />
            <FloatingInput name="phone" label="Téléphone" />
            <FloatingTextarea required name="message" label="Message" rows={5} />
            <button disabled={status==='sending'} className="mt-2 px-5 py-3 rounded-md bg-brand-green text-white font-medium">
              {status === 'sending' ? 'Envoi…' : 'Envoyer'}
            </button>
            {status === 'sent' && <p className="text-green-600">Message envoyé. Merci !</p>}
            {status === 'error' && <p className="text-red-600">Erreur, réessayez plus tard.</p>}
          </div>
        </form>
      </div>
    </section>
  );
}


