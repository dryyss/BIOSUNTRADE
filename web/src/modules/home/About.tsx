export function About() {
  return (
    <section id="about" className="container-section py-16">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">Pourquoi Biosun Trade</h2>
          <p className="mt-4 text-gray-300">
            Nous sourçons des fruits exotiques qui ont réellement mûri sur l’arbre, auprès de petits 
            producteurs de confiance. Résultat: plus de goût, plus de nutriments et zéro traitement 
            post‑récolte. Notre équipe pilote la qualité et la logistique pour livrer en quelques jours 
            des produits prêts à consommer ou à transformer.
          </p>
          <ul className="mt-6 grid sm:grid-cols-2 gap-3 text-sm">
            <li className="p-3 rounded-md bg-white/5 border border-white/10">Mûris sur l’arbre</li>
            <li className="p-3 rounded-md bg-white/5 border border-white/10">Traçabilité 100%</li>
            <li className="p-3 rounded-md bg-white/5 border border-white/10">Expédition express</li>
            <li className="p-3 rounded-md bg-white/5 border border-white/10">Certifs BIO/GlobalG.A.P.</li>
          </ul>
        </div>
        <div className="aspect-[4/3] rounded-xl bg-[url('https://images.unsplash.com/photo-1513040935293-e4780a46b5eb?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center" />
      </div>
    </section>
  );
}



