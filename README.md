# BIOSUN TRADE — Site Web

Ce dépôt contient le code du site web BIOSUN TRADE (Vite + React + TypeScript + Tailwind).

## Démarrage rapide

1. Installer les dépendances:

```bash
cd web
npm install
```

2. Lancer le serveur de développement:

```bash
npm run dev
```

3. Build de production:

```bash
npm run build
```

4. Prévisualisation du build:

```bash
npm run preview
```

## Architecture

- `web/src/modules/pages/*`: pages (Accueil, Produits, Détail produit, Contact, 404)
- `web/src/modules/home/*`: sections de la page d’accueil
- `web/src/modules/ui/*`: composants UI (boutons, modaux, globe, etc.)
- `web/src/data/products.ts`: chargement/normalisation des produits depuis `public/content.json`
- `web/public/fruits/*`: images des produits (couverture, galerie)

## Fonctionnalités clés

- Page d’accueil (Hero, About, Features, Galerie, Stats, FAQ, Carousel)
- Liste des produits + page détail produit
- Page 404 dédiée et stylée
- Bouton WhatsApp flottant
- Globe (canvas) avec masque continents (points seulement sur la terre)

## Détails techniques importants

### Couvertures produits
`loadProducts()` normalise les images:
- `image`: couverture principale (détecte `cover.*`/`couverture.*`)
- `secondaryCover`: couverture secondaire (détecte `cover-2.*`/`couverture-2.*`)
- `treeImage`: photo sur l’arbre (détectée depuis la galerie si le nom contient `arbre`)

Dans `ProductDetailPage.tsx`, l’image principale utilise `product.image` (fallback `secondaryCover`). La galerie exclut `image` et `treeImage` pour éviter les doublons.

### Globe (continents vs océans)
`DotGlobe.tsx` prend en charge:
- `showContinents`: active le masque de continents (via `landMaskUrl`)
- `hideWaterDots`: n’affiche que les points de continent
- `oceanColor`: personnalise la couleur de l’océan
- `continentColor` et `dotColor`: couleurs des points

`About.tsx` utilise `hideWaterDots` pour ne rendre que les continents, avec un dégradé d’océan doux.

## Déploiement

- Générer un build (`npm run build`), publier le contenu de `web/dist` sur l’hébergeur (Netlify, Vercel, S3, ...).

## Licence

Propriété de Biosun Trade.
