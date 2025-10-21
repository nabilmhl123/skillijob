# 🚀 Instructions de démarrage - Skillijob React

## ⚡ Démarrage rapide (5 minutes)

### 1. Ouvrir un terminal

Ouvrez un terminal dans le dossier `skillijob-react`

### 2. Installer les dépendances

```bash
npm install
```

Cette commande va installer toutes les bibliothèques nécessaires (React, React Router, Framer Motion, etc.)

**⏱️ Temps estimé : 2-3 minutes**

### 3. Lancer le serveur de développement

```bash
npm run dev
```

**✅ Le site sera accessible sur : http://localhost:3000**

Appuyez sur `Ctrl + Clic` sur le lien dans le terminal pour ouvrir automatiquement le site.

---

## 📋 Checklist avant le premier lancement

### ✅ Images à ajouter (optionnel mais recommandé)

Copiez ces images dans le dossier `public/` :

1. **Logo** : `public/logo-skillijob.png` (200x200px recommandé)
2. **Image Hero** : `public/hero-image.png` (800x600px recommandé)
3. **Favicon** : `public/favicon.ico` (32x32px)

**Note** : Si vous n'ajoutez pas ces images, des placeholders s'afficheront automatiquement.

### 📝 Configuration (optionnel)

Copiez `.env.example` en `.env` et modifiez si nécessaire :

```bash
cp .env.example .env
```

---

## 🎨 Personnalisation

### Modifier les couleurs

Éditez le fichier : `src/styles/variables.css`

```css
:root {
  --primary: #6C00FF;        /* Votre couleur principale */
  --secondary: #F59E0B;      /* Votre couleur secondaire */
}
```

### Modifier les textes

- **Page d'accueil** : `src/pages/Home.jsx`
- **Page Candidats** : `src/pages/Candidates.jsx`
- **Page Entreprises** : `src/pages/Companies.jsx`

### Modifier le footer

Éditez : `src/components/layout/Footer.jsx`

---

## 🛠️ Commandes utiles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Lance le serveur de développement |
| `npm run build` | Crée un build optimisé pour la production |
| `npm run preview` | Prévisualise le build de production |
| `npm run lint` | Vérifie la qualité du code |

---

## 📱 Tester le site

### Sur votre ordinateur

1. Lancez `npm run dev`
2. Ouvrez http://localhost:3000
3. Testez la navigation entre les pages
4. Testez le menu mobile (réduisez la fenêtre)

### Sur votre téléphone (même réseau Wi-Fi)

1. Trouvez votre IP locale :
   - Windows : `ipconfig` dans le terminal
   - Mac/Linux : `ifconfig` dans le terminal

2. Sur votre téléphone, accédez à : `http://VOTRE-IP:3000`

Exemple : `http://192.168.1.100:3000`

---

## 🚀 Déploiement en production

### Option 1 : Netlify (Recommandé - Gratuit)

1. Créez un compte sur [netlify.com](https://netlify.com)
2. Lancez `npm run build`
3. Glissez-déposez le dossier `dist/` sur Netlify
4. Votre site est en ligne ! 🎉

### Option 2 : Vercel (Gratuit)

```bash
npm install -g vercel
npm run build
vercel --prod
```

### Option 3 : Serveur classique

1. Lancez `npm run build`
2. Uploadez le contenu du dossier `dist/` sur votre serveur
3. Configurez votre serveur pour rediriger toutes les routes vers `index.html`

---

## ❓ Problèmes courants

### Le site ne démarre pas

```bash
# Solution : Réinstaller les dépendances
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Erreur "Cannot find module"

```bash
# Solution : Vérifier que toutes les dépendances sont installées
npm install
```

### Les images ne s'affichent pas

- Vérifiez que les images sont bien dans le dossier `public/`
- Vérifiez que les noms correspondent (sensible à la casse)

### Port 3000 déjà utilisé

Le serveur utilisera automatiquement le port 3001, 3002, etc.

---

## 📚 Structure du projet expliquée

```
skillijob-react/
├── public/              ← Mettez vos images ici
├── src/
│   ├── components/      ← Composants réutilisables
│   │   ├── layout/      ← Header, Footer, ChatBot
│   │   ├── home/        ← Composants de la page d'accueil
│   │   └── shared/      ← Boutons, Cartes, Modals
│   ├── pages/           ← Les pages du site
│   ├── styles/          ← Styles CSS
│   ├── App.jsx          ← Configuration des routes
│   └── main.jsx         ← Point d'entrée
├── index.html           ← Template HTML
└── package.json         ← Dépendances du projet
```

---

## 🎯 Prochaines étapes

### Fonctionnalités à ajouter :

1. **Système d'authentification**
   - Connexion candidat/entreprise
   - Gestion des sessions

2. **Dashboard utilisateur**
   - Profil candidat
   - Tableau de bord entreprise

3. **Système de paiement**
   - Intégration Stripe
   - Page de paiement

4. **Backend API**
   - Base de données
   - API REST

---

## 💡 Conseils

### Performance

- Les images sont automatiquement optimisées par Vite
- Le code est automatiquement minifié en production
- Les animations utilisent Framer Motion pour des performances optimales

### SEO

- Toutes les meta tags sont configurées dans `index.html`
- Utilisez des balises `<h1>`, `<h2>`, etc. de manière hiérarchique
- Ajoutez du texte alt à toutes les images

### Accessibilité

- Utilisez les attributs `aria-label` pour les boutons icônes
- Testez la navigation au clavier (Tab, Enter)
- Vérifiez le contraste des couleurs

---

## 📞 Besoin d'aide ?

- **Documentation React** : [react.dev](https://react.dev)
- **Documentation Vite** : [vitejs.dev](https://vitejs.dev)
- **Documentation Framer Motion** : [framer.com/motion](https://www.framer.com/motion/)

---

## ✅ Checklist finale

- [ ] J'ai installé les dépendances (`npm install`)
- [ ] Le serveur démarre sans erreur (`npm run dev`)
- [ ] Je vois le site sur http://localhost:3000
- [ ] La navigation fonctionne (/, /candidats, /entreprises)
- [ ] Le site est responsive (tester sur mobile)
- [ ] Les animations fonctionnent
- [ ] Le chatbot s'affiche

**🎉 Si toutes les cases sont cochées, félicitations ! Votre site React est opérationnel !**

---

**Développé pour Skillijob | © 2025**
