import { Header } from './layout/Header';
import { Footer } from './layout/Footer';
import { FloatingWhatsApp } from './ui/FloatingWhatsApp';
import { Outlet } from 'react-router-dom';
import { Hero } from './home/Hero';
import { About } from './home/About';
import { Products } from './home/Products';
import { Contact } from './home/Contact';
import { Values } from './home/Values';

export function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}


