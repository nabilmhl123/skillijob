# Skillijob - Site Web React.js

Site web moderne et performant pour Skillijob, la plateforme qui connecte candidats et entreprises.

## 🚀 Technologies utilisées

- **React 18** - Bibliothèque JavaScript pour l'interface utilisateur
- **React Router DOM** - Gestion de la navigation
- **Framer Motion** - Animations fluides et modernes
- **Vite** - Build tool ultra-rapide
- **CSS3** - Styles personnalisés avec variables CSS
- **Convex** - Backend-as-a-Service pour l'authentification et la base de données
- **bcrypt.js** - Hachage sécurisé des mots de passe

## 📁 Structure du projet

```
skillijob-react/
├── public/                  # Fichiers statiques
│   ├── logo-skillijob.png
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── layout/         # Composants de mise en page
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── ChatBot.jsx
│   │   ├── home/           # Composants de la page d'accueil
│   │   │   ├── Hero.jsx
│   │   │   ├── ProblemSection.jsx
│   │   │   └── SectorsSection.jsx
│   │   └── shared/         # Composants réutilisables
│   │       ├── Button.jsx
│   │       ├── Card.jsx
│   │       └── Modal.jsx
│   ├── pages/              # Pages principales
│   │   ├── Home.jsx
│   │   ├── Candidates.jsx
│   │   └── Companies.jsx
│   ├── styles/             # Styles globaux
│   │   ├── globals.css
│   │   └── variables.css
│   ├── App.jsx             # Composant principal
│   └── main.jsx            # Point d'entrée
├── index.html              # Template HTML
├── package.json            # Dépendances
├── vite.config.js          # Configuration Vite
└── README.md
```

## 🛠️ Installation

### Prérequis

- Node.js (version 16 ou supérieure)
- npm ou yarn

### Étapes d'installation

1. **Installer les dépendances**

```bash
cd skillijob-react
npm install
```

2. **Lancer le serveur de développement**

```bash
npm run dev
```

Le site sera accessible sur `http://localhost:3000`

3. **Build pour la production**

```bash
npm run build
```

Les fichiers optimisés seront générés dans le dossier `dist/`

4. **Prévisualiser le build de production**

```bash
npm run preview
```

## 🎨 Personnalisation

### Couleurs

Les couleurs sont définies dans `/src/styles/variables.css` :

```css
:root {
  --primary: #6C00FF;        /* Violet principal */
  --primary-2: #6334AF;      /* Violet foncé */
  --secondary: #F59E0B;      /* Orange/Or */
  --secondary-2: #EAB308;    /* Jaune doré */
}
```

### Images

Placez vos images dans le dossier `/public/` :

- `logo-skillijob.png` - Logo principal (recommandé : 200x200px)
- `hero-image.png` - Image de la section hero
- `favicon.ico` - Icône du site

## 📄 Pages disponibles

### Pages Publiques
- `/` - Page d'accueil
- `/candidats` - Page dédiée aux candidats
- `/entreprises` - Page dédiée aux entreprises
- `/login` - Connexion et inscription

### Pages Protégées (Authentification requise)
- `/dashboard-candidat` - Dashboard pour les candidats
- `/dashboard-entreprise` - Dashboard pour les entreprises
- `/profile` - Gestion du profil utilisateur
- `/paiements` - Gestion des paiements

Pour plus d'informations sur l'authentification, voir [SECURITY_FEATURES.md](SECURITY_FEATURES.md)

## 🧩 Composants principaux

### Button

Bouton réutilisable avec plusieurs variantes :

```jsx
<Button variant="primary" size="large">
  Cliquez ici
</Button>
```

Variants : `primary`, `secondary`, `outline`, `ghost`
Sizes : `small`, `medium`, `large`

### Card

Carte avec animations et sous-composants :

```jsx
<Card gradient hover>
  <Card.Header>
    <Card.Label>Titre</Card.Label>
  </Card.Header>
  <Card.Body>
    <p>Contenu</p>
  </Card.Body>
</Card>
```

### Modal

Modal avec animations :

```jsx
<Modal isOpen={isOpen} onClose={handleClose} title="Titre">
  Contenu du modal
</Modal>
```

## 🎯 Fonctionnalités

### ✅ Implémenté

- Navigation responsive avec menu mobile
- Animations fluides avec Framer Motion
- Chatbot intégré avec Jotform
- Design moderne et professionnel
- SEO optimisé
- Performance optimisée

### ✅ Nouvellement ajouté (v1.1.0)

- **Système d'authentification complet** avec Convex
- **Hachage sécurisé des mots de passe** (bcrypt)
- **Dashboard candidat/entreprise** avec protection des routes
- **Espace de gestion des profils** avec modification et changement de mot de passe
- **Hook personnalisé useAuth** pour une utilisation simplifiée
- **Protection avancée des routes** par type d'utilisateur

### 🔜 À venir

- Page de paiement
- Upload de CV pour les candidats
- Publication d'offres pour les entreprises
- Système de matching candidat/entreprise
- Messagerie interne

## 📱 Responsive Design

Le site est entièrement responsive et optimisé pour :

- Desktop (> 1024px)
- Tablette (768px - 1024px)
- Mobile (< 768px)

## 🚀 Déploiement

### Netlify

```bash
npm run build
# Déployez le dossier dist/
```

### Vercel

```bash
npm run build
vercel --prod
```

### Serveur traditionnel

1. Build le projet : `npm run build`
2. Uploadez le contenu du dossier `dist/` sur votre serveur
3. Configurez votre serveur pour rediriger toutes les routes vers `index.html`

## 🔧 Scripts disponibles

- `npm run dev` - Lance le serveur de développement
- `npm run build` - Crée un build de production
- `npm run preview` - Prévisualise le build de production
- `npm run lint` - Vérifie le code avec ESLint

## 📞 Support

Pour toute question ou assistance :

- Email : contact@skillijob.com
- Téléphone : 09 70 19 67 02

## 📝 Licence

© 2025 Skillijob. Tous droits réservés.

---

## 🎨 Guide de contribution

### Ajout d'une nouvelle page

1. Créez un fichier dans `/src/pages/NouvelePage.jsx`
2. Créez le fichier CSS correspondant `/src/pages/NouvelePage.css`
3. Ajoutez la route dans `/src/App.jsx`

### Ajout d'un nouveau composant

1. Créez le fichier dans le bon dossier (`layout/`, `shared/`, etc.)
2. Créez le fichier CSS correspondant
3. Importez et utilisez le composant

### Conventions de code

- Utilisez des composants fonctionnels avec hooks
- Suivez la convention de nommage PascalCase pour les composants
- Utilisez des noms descriptifs pour les variables et fonctions
- Commentez le code complexe

## 🐛 Débogage

### Le site ne démarre pas

```bash
# Supprimez node_modules et package-lock.json
rm -rf node_modules package-lock.json
# Réinstallez
npm install
```

### Images ne s'affichent pas

- Vérifiez que les images sont dans le dossier `/public/`
- Vérifiez les chemins (doivent commencer par `/`)

### Erreurs de build

```bash
# Nettoyez le cache
npm run build -- --force
```

---

**Développé avec ❤️ pour Skillijob**
