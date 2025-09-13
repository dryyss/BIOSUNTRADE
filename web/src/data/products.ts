export type Product = {
  slug: string;
  name: string;
  description: string;
  image: string; // chemin depuis /public
};

export const PRODUCTS: Product[] = [
  {
    slug: 'fruit-de-la-passion',
    name: 'Fruits de la passion',
    description: 'Arômes intenses, idéal pour jus et desserts. Disponibilité quasi annuelle.',
    // Exemple d’image locale ajoutée par toi (espace accepté). Modifie si besoin.
    image: '/fruits/fruit dela passion/granadilla-1-280x238.jpg',
  },
  {
    slug: 'mangue',
    name: 'Mangue',
    description: 'Variétés export, pulpe juteuse et sucrée. Maturité contrôlée.',
    image: '/fruits/mangue/cover.jpg',
  },
  {
    slug: 'gingembre',
    name: 'Gingembre',
    description: 'Racines fraîches, calibre export, forte teneur en huile essentielle.',
    image: '/fruits/gingembre/cover.jpg',
  },
  {
    slug: 'citron-vert',
    name: 'Citron vert',
    description: 'Limes acidulées, riche en jus, qualité cocktail et industrie.',
    image: '/fruits/citron-vert/cover.jpg',
  },
  {
    slug: 'papaye',
    name: 'Papaye',
    description: 'Chair orangée, texture fondante, idéale consommation et processing.',
    image: '/fruits/papaye/cover.jpg',
  },
  {
    slug: 'grenade',
    name: 'Grenade',
    description: 'Arilles croquants riches en antioxydants, multiple calibres.',
    image: '/fruits/grenade/cover.jpg',
  },
];



