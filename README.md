# SkilliApp

Une plateforme complète de recrutement et de recherche d'emploi construite avec React, Convex, et Vite.

## Architecture du Projet

```
skilli/
├── skillijob-react/          # Application principale React
│   ├── convex/              # Backend Convex
│   │   ├── _generated/      # Fichiers générés automatiquement
│   │   ├── auth.js         # Authentification et gestion utilisateurs
│   │   ├── schema.js       # Schéma de base de données
│   │   └── newsletter.js   # Gestion newsletter
│   ├── public/             # Assets statiques
│   ├── src/
│   │   ├── components/     # Composants réutilisables
│   │   │   ├── shared/     # Composants partagés (Button, Card, etc.)
│   │   │   ├── layout/     # Layout (Navbar, Footer, etc.)
│   │   │   ├── home/       # Composants page d'accueil
│   │   │   ├── forms/      # Composants de formulaires
│   │   │   ├── dashboard/  # Composants dashboard
│   │   │   └── pricing/    # Composants tarification
│   │   ├── pages/          # Pages de l'application
│   │   │   ├── LoginForm.jsx       # Page de connexion/inscription
│   │   │   ├── DashboardCandidat.jsx   # Dashboard candidat
│   │   │   ├── DashboardEntreprise.jsx # Dashboard entreprise
│   │   │   ├── Home.jsx              # Page d'accueil
│   │   │   └── [autres pages...]
│   │   ├── styles/         # Styles globaux et variables
│   │   ├── hooks/          # Hooks personnalisés
│   │   ├── utils/          # Utilitaires
│   │   └── data/           # Données statiques
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
├── backend/                # API backend (si nécessaire)
├── dashboards/            # Dashboard d'administration (Vite)
│   ├── src/
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Fonctionnalités

### Pour les Candidats
- Inscription et connexion sécurisées
- Profil candidat complet (CV, expériences, formations)
- Recherche d'offres d'emploi
- Suivi des candidatures
- Alertes emploi personnalisées
- Messagerie avec les recruteurs

### Pour les Entreprises
- Publication d'offres d'emploi
- Gestion des candidatures reçues
- Pipeline de recrutement
- Analytiques et statistiques
- Gestion d'équipe
- Base de candidats qualifiés

### Fonctionnalités Communes
- Authentification JWT
- Interface responsive
- Newsletter
- Support multilingue (FR/EN)

## Technologies Utilisées

### Frontend
- **React 18** - Bibliothèque JavaScript pour interfaces utilisateur
- **Vite** - Outil de build rapide
- **Framer Motion** - Animations
- **React Router** - Routage
- **CSS Modules** - Styles modulaires

### Backend
- **Convex** - Backend-as-a-Service
- **Authentication** - Gestion utilisateurs et sessions
- **Real-time Database** - Base de données temps réel

### Sécurité
- Hashage des mots de passe (PBKDF2)
- Rate limiting
- Validation des données
- Sessions sécurisées

## Installation et Configuration

### Prérequis
- Node.js 18+
- npm ou yarn
- Compte Convex

### Installation

1. **Cloner le repository**
```bash
git clone https://github.com/nabilmhl123/skilliapp.git
cd skilliapp
```

2. **Installer les dépendances**
```bash
# Application principale
cd skillijob-react
npm install

# Dashboard admin (optionnel)
cd ../dashboards
npm install
```

3. **Configuration Convex**
```bash
cd skillijob-react
npx convex dev
```

4. **Variables d'environnement**
Créer un fichier `.env` dans `skillijob-react/` :
```env
VITE_CONVEX_URL=votre_url_convex
```

5. **Démarrer l'application**
```bash
npm run dev
```

## Scripts Disponibles

### skillijob-react
- `npm run dev` - Démarre le serveur de développement
- `npm run build` - Build pour la production
- `npm run preview` - Prévisualisation du build
- `npm run convex:dev` - Démarre Convex en mode développement

### dashboards
- `npm run dev` - Démarre le dashboard admin

## Structure de la Base de Données

### Tables Convex
- `users` - Utilisateurs (candidats/entreprises)
- `sessions` - Sessions utilisateur
- `userProfiles` - Profils détaillés
- `jobOffers` - Offres d'emploi
- `applications` - Candidatures
- `messages` - Messagerie
- `notifications` - Notifications
- `newsletters` - Abonnements newsletter

## Déploiement

### Production
```bash
npm run build
npx convex deploy
```

### Plateformes Supportées
- Vercel
- Netlify
- Railway
- Self-hosted

## Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## Contact

Nabil MHL - nabil@example.com

Lien du projet: [https://github.com/nabilmhl123/skilliapp](https://github.com/nabilmhl123/skilliapp)