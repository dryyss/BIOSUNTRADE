import { ReactNode } from 'react';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  autoCloseMs?: number;
};

export function Modal({ open, onClose, title, children, autoCloseMs }: ModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative w-full max-w-lg mx-auto rounded-2xl bg-brand-black border border-white/10 shadow-2xl p-6">
        {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
        <div className="text-sm text-white/90">{children}</div>
        <div className="mt-6 text-right">
          <button onClick={onClose} className="px-4 py-2 rounded-md bg-brand-green text-white">Fermer</button>
        </div>
      </div>
    </div>
  );
}