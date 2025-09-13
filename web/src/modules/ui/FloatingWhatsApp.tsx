import { FaWhatsapp } from 'react-icons/fa';

export function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/32471494048"
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp"
      className="fixed bottom-5 right-5 z-50 h-12 w-12 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center shadow-xl"
    >
      <FaWhatsapp size={22} />
    </a>
  );
}



