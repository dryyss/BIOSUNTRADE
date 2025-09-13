import { useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Modal } from '../ui/Modal';
import { FloatingInput, FloatingTextarea } from '../ui/FloatingField';

export function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [open, setOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  // auto-fermeture du succès
  useEffect(() => {
    if (open && status === 'sent') {
      const t = setTimeout(() => setOpen(false), 3000);
      return () => clearTimeout(t);
    }
  }, [open, status]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg(null);
    try {
      const form = e.currentTarget as HTMLFormElement;
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;
      const formData = {
        from_name: (form.elements.namedItem('name') as HTMLInputElement)?.value,
        from_email: (form.elements.namedItem('email') as HTMLInputElement)?.value,
        phone: (form.elements.namedItem('phone') as HTMLInputElement)?.value,
        message: (form.elements.namedItem('message') as HTMLTextAreaElement)?.value,
      };
      if (!serviceId || !templateId || !publicKey) {
        throw new Error('Configuration manquante: vérifie VITE_EMAILJS_SERVICE_ID / TEMPLATE_ID / PUBLIC_KEY');
      }
      if (!formData.from_email) {
        throw new Error('Adresse e‑mail invalide');
      }
      const resp = await emailjs.send(serviceId, templateId, formData, { publicKey });
      if ((resp as any)?.status === 200) {
        setStatus('sent');
      } else {
        throw new Error((resp as any)?.text || 'Réponse inattendue du service');
      }
      setOpen(true);
      form.reset();
    } catch (err: any) {
      console.error('EmailJS error:', err);
      setErrorMsg(err?.text || err?.message || 'Erreur inconnue');
      setStatus('error');
      setOpen(true);
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
          </div>
        </form>
      </div>
      <Modal open={open} onClose={()=>setOpen(false)} title={status==='sent' ? 'Message envoyé' : 'Erreur'}>
        {status==='sent' ? (
          <div className="flex items-start gap-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-green-400">
              <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <animate attributeName="stroke-dasharray" from="0,20" to="20,0" dur="0.6s" fill="freeze" />
              </path>
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" opacity="0.3" />
            </svg>
            <p>Merci, votre demande a bien été envoyée. Nous revenons vers vous très vite.</p>
          </div>
        ) : (
          <div>
            <p>Un problème est survenu. Veuillez vérifier votre configuration.</p>
            {errorMsg && <p className="mt-2 text-xs text-white/70">Détail: {errorMsg}</p>}
          </div>
        )}
      </Modal>
    </section>
  );
}


