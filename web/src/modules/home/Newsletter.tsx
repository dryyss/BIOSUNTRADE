import { useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';
import { FloatingInput } from '../ui/FloatingField';
import { Modal } from '../ui/Modal';

export function Newsletter() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [open, setOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (open && status === 'sent') {
      const t = setTimeout(() => setOpen(false), 2500);
      return () => clearTimeout(t);
    }
  }, [open, status]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg(null);
    try {
      const form = e.currentTarget as HTMLFormElement;
      const email = (form.elements.namedItem('email') as HTMLInputElement)?.value?.trim();
      if (!email) throw new Error('Veuillez saisir une adresse e‑mail valide');

      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;
      const templateId = (import.meta.env.VITE_EMAILJS_NEWSLETTER_TEMPLATE_ID as string) || (import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string);
      if (!serviceId || !templateId || !publicKey) {
        throw new Error('Configuration manquante: VITE_EMAILJS_*');
      }

      const params = {
        subscriber_email: email,
        source: 'homepage_newsletter',
      } as Record<string, string>;

      const resp = await emailjs.send(serviceId, templateId, params, { publicKey });
      if ((resp as any)?.status === 200) {
        setStatus('sent');
        form.reset();
      } else {
        throw new Error((resp as any)?.text || 'Réponse inattendue du service');
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'Erreur inconnue');
      setStatus('error');
    } finally {
      setOpen(true);
    }
  };

  return (
    <section className="container-section py-14">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 backdrop-blur">
        <h2 className="text-2xl md:text-3xl font-bold">Newsletter</h2>
        <p className="mt-2 text-gray-300">Recevez nos disponibilités et nouveautés (1 à 2 emails/mois).</p>
        <form onSubmit={onSubmit} className="mt-6 grid sm:grid-cols-[1fr_auto] gap-3 items-center">
          <FloatingInput required name="email" type="email" label="Votre e‑mail" className="sm:col-start-1" />
          <button disabled={status==='sending'} className="sm:col-start-2 px-5 py-3 rounded-md bg-brand-green text-white font-medium">
            {status === 'sending' ? 'Inscription…' : "S'inscrire"}
          </button>
        </form>
        <p className="mt-3 text-xs text-white/60">En vous inscrivant, vous acceptez notre politique de confidentialité.</p>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={status==='sent' ? 'Inscription confirmée' : 'Erreur'}>
        {status==='sent' ? (
          <p>Merci ! Vous êtes bien inscrit(e) à notre newsletter.</p>
        ) : (
          <div>
            <p>Impossible de traiter votre inscription pour le moment.</p>
            {errorMsg && <p className="mt-2 text-xs text-white/70">Détail: {errorMsg}</p>}
          </div>
        )}
      </Modal>
    </section>
  );
}






