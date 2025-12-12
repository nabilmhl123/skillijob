# Guide de Déploiement SkilliJob

Ce guide explique comment déployer votre application SkilliJob sur différentes plateformes d'hébergement.

## Table des matières
- [Prérequis](#prérequis)
- [Déploiement sur Netlify](#déploiement-sur-netlify)
- [Déploiement sur Vercel](#déploiement-sur-vercel)
- [Variables d'environnement](#variables-denvironnement)
- [Configuration Convex](#configuration-convex)
- [Vérifications post-déploiement](#vérifications-post-déploiement)

---

## Prérequis

Avant de déployer, assurez-vous d'avoir :

1. ✅ Un compte GitHub avec votre code pushé
2. ✅ Un compte Convex avec votre backend déployé
3. ✅ L'URL de production Convex (`VITE_CONVEX_URL`)

---

## Déploiement sur Netlify

### Étape 1 : Créer un compte Netlify

1. Allez sur [https://www.netlify.com](https://www.netlify.com)
2. Créez un compte (gratuit) ou connectez-vous

### Étape 2 : Importer le projet

1. Cliquez sur **"Add new site"** → **"Import an existing project"**
2. Choisissez **GitHub** et autorisez Netlify
3. Sélectionnez votre repository **skillijob-react**

### Étape 3 : Configurer le build

Netlify détectera automatiquement la configuration grâce au fichier `netlify.toml`.

Vérifiez que les paramètres sont :
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Node version**: `18`

### Étape 4 : Ajouter les variables d'environnement

Dans les **Site settings** → **Environment variables**, ajoutez :

```
VITE_CONVEX_URL=https://standing-chameleon-180.convex.cloud
```

### Étape 5 : Déployer

1. Cliquez sur **"Deploy site"**
2. Attendez la fin du build (2-3 minutes)
3. Votre site sera disponible sur une URL type : `https://skillijob-abc123.netlify.app`

### Étape 6 : Configurer un domaine personnalisé (optionnel)

1. Allez dans **Site settings** → **Domain management**
2. Cliquez sur **"Add custom domain"**
3. Suivez les instructions pour configurer votre DNS

---

## Déploiement sur Vercel

### Étape 1 : Créer un compte Vercel

1. Allez sur [https://vercel.com](https://vercel.com)
2. Créez un compte avec GitHub

### Étape 2 : Importer le projet

1. Cliquez sur **"Add New"** → **"Project"**
2. Importez votre repository **skillijob-react**

### Étape 3 : Configurer le build

Vercel détectera automatiquement Vite grâce au fichier `vercel.json`.

Paramètres automatiques :
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Étape 4 : Ajouter les variables d'environnement

Dans **Settings** → **Environment Variables**, ajoutez :

```
VITE_CONVEX_URL=https://standing-chameleon-180.convex.cloud
```

**Important** : Cochez les 3 environnements (Production, Preview, Development)

### Étape 5 : Déployer

1. Cliquez sur **"Deploy"**
2. Attendez la fin du build (1-2 minutes)
3. Votre site sera disponible sur : `https://skillijob.vercel.app`

---

## Variables d'environnement

### Variables requises

Voici les variables d'environnement nécessaires pour la production :

| Variable | Description | Exemple | Requis |
|----------|-------------|---------|--------|
| `VITE_CONVEX_URL` | URL du backend Convex | `https://standing-chameleon-180.convex.cloud` | ✅ Oui |
| `CONVEX_DEPLOY_KEY` | Clé de déploiement Convex (pour CI/CD) | `prod:standing-chameleon-180\|eyJ...` | ⚠️ Optionnel |

**Note importante** :
- `VITE_CONVEX_URL` est **nécessaire** pour que le frontend se connecte à Convex
- `CONVEX_DEPLOY_KEY` est **optionnel** et uniquement nécessaire si vous voulez déployer automatiquement les fonctions Convex depuis Netlify/Vercel

### Comment obtenir l'URL Convex

1. Allez sur [https://dashboard.convex.dev](https://dashboard.convex.dev)
2. Sélectionnez votre projet **skillijob**
3. Allez dans **Settings** → **URL & Deploy Key**
4. Copiez la **Deployment URL**

### Ajouter sur Netlify

**Variables minimales (Frontend uniquement)** :

```bash
# Via le dashboard
Site settings → Environment variables → Add a variable

Variable 1:
Key: VITE_CONVEX_URL
Value: https://standing-chameleon-180.convex.cloud

# Via CLI Netlify
netlify env:set VITE_CONVEX_URL "https://standing-chameleon-180.convex.cloud"
```

**Variables avec déploiement automatique Convex (optionnel)** :

```bash
Variable 2 (optionnel):
Key: CONVEX_DEPLOY_KEY
Value: prod:standing-chameleon-180|eyJ2MiI6ImY5ZTg5ZTYwMjA3NTRkNzA4ZmY0OGQ5Mjg0NGUyZGM2In0=

# Note: Gardez cette clé secrète ! Ne la partagez jamais publiquement.
```

### Ajouter sur Vercel

**Variables minimales (Frontend uniquement)** :

```bash
# Via le dashboard
Settings → Environment Variables → Add

Variable 1:
Name: VITE_CONVEX_URL
Value: https://standing-chameleon-180.convex.cloud
Environments: Production, Preview, Development

# Via CLI Vercel
vercel env add VITE_CONVEX_URL
```

**Variables avec déploiement automatique Convex (optionnel)** :

```bash
Variable 2 (optionnel):
Name: CONVEX_DEPLOY_KEY
Value: prod:standing-chameleon-180|eyJ2MiI6ImY5ZTg5ZTYwMjA3NTRkNzA4ZmY0OGQ5Mjg0NGUyZGM2In0=
Environments: Production

# Note: Gardez cette clé secrète !
```

---

## Configuration Convex

### Déployer le backend Convex en production

Si ce n'est pas déjà fait, déployez votre backend :

```bash
# Dans le terminal
npx convex deploy --prod

# Ou avec la commande standard
npx convex deploy
```

Cela déploiera :
- ✅ Toutes vos fonctions (auth, newsletter, etc.)
- ✅ Le schéma de base de données
- ✅ Les index

### Vérifier le déploiement Convex

1. Allez sur [https://dashboard.convex.dev](https://dashboard.convex.dev)
2. Vérifiez que les tables apparaissent :
   - `users`
   - `sessions`
   - `newsletters`
   - `passwordResetTokens`
   - `loginAttempts`

---

## Vérifications post-déploiement

Après le déploiement, testez ces fonctionnalités :

### ✅ Navigation

- [ ] La page d'accueil s'affiche correctement
- [ ] Les routes fonctionnent (`/candidats`, `/entreprises`, etc.)
- [ ] Le rafraîchissement de page ne donne pas d'erreur 404

### ✅ Newsletter

- [ ] Le popup newsletter apparaît après 2 secondes
- [ ] L'inscription enregistre bien l'email dans Convex
- [ ] Vérifiez sur `/newsletter-admin`

### ✅ Authentification

- [ ] L'inscription fonctionne
- [ ] La connexion fonctionne
- [ ] Les sessions persistent
- [ ] Le logout fonctionne

### ✅ Performance

- [ ] Le site charge rapidement (< 3 secondes)
- [ ] Les images sont optimisées
- [ ] Les CSS/JS sont minifiés

### ✅ Responsive

- [ ] Le site est responsive sur mobile
- [ ] Le site est responsive sur tablette
- [ ] Toutes les sections s'affichent correctement

---

## Commandes utiles

### Build local

```bash
# Build pour la production
npm run build

# Prévisualiser le build
npm run preview
```

### Test de build

Avant de déployer, testez toujours localement :

```bash
# 1. Build
npm run build

# 2. Servir le build localement
npm run preview

# 3. Ouvrir http://localhost:4173 et tester
```

---

## Déploiement continu (CI/CD)

### Avec Netlify

Netlify redéploie automatiquement à chaque push sur `main` :

```bash
git add .
git commit -m "Mise à jour"
git push origin main
# → Déploiement automatique sur Netlify
```

### Avec Vercel

Vercel redéploie automatiquement à chaque push :

```bash
git add .
git commit -m "Mise à jour"
git push origin main
# → Déploiement automatique sur Vercel
```

---

## Domaines personnalisés

### Configuration DNS

Pour utiliser votre propre domaine (ex: `www.skillijob.fr`) :

#### Pour Netlify

1. Ajoutez le domaine dans Netlify
2. Configurez les DNS de votre registrar :

```
Type: CNAME
Name: www
Value: skillijob-abc123.netlify.app
```

#### Pour Vercel

1. Ajoutez le domaine dans Vercel
2. Configurez les DNS :

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

---

## Dépannage

### Erreur : "Page not found" sur les routes

**Problème** : Les routes React Router donnent une erreur 404

**Solution** : Vérifiez que les fichiers de redirection existent :
- `netlify.toml` (pour Netlify)
- `vercel.json` (pour Vercel)
- `public/_redirects` (fallback)

### Erreur : "Convex URL not found"

**Problème** : L'application ne peut pas se connecter à Convex

**Solution** :
1. Vérifiez que `VITE_CONVEX_URL` est bien défini
2. Vérifiez l'URL sur [dashboard.convex.dev](https://dashboard.convex.dev)
3. Redéployez le site après avoir ajouté la variable

### Build échoue

**Problème** : Le build échoue avec des erreurs

**Solutions** :
1. Testez le build localement : `npm run build`
2. Vérifiez les erreurs de lint : `npm run lint`
3. Vérifiez que toutes les dépendances sont installées

---

## Support

Pour plus d'aide :
- **Netlify** : [https://docs.netlify.com](https://docs.netlify.com)
- **Vercel** : [https://vercel.com/docs](https://vercel.com/docs)
- **Convex** : [https://docs.convex.dev](https://docs.convex.dev)

---

## Résumé rapide

### Pour déployer sur Netlify :

```bash
1. Push votre code sur GitHub
2. Créer un compte sur netlify.com
3. Importer le projet GitHub
4. Ajouter VITE_CONVEX_URL dans les variables d'environnement
5. Déployer !
```

### Pour déployer sur Vercel :

```bash
1. Push votre code sur GitHub
2. Créer un compte sur vercel.com
3. Importer le projet GitHub
4. Ajouter VITE_CONVEX_URL dans les variables d'environnement
5. Déployer !
```

---

🎉 **Votre site SkilliJob est maintenant en ligne !**
