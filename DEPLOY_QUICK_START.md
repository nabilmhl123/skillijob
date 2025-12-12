# 🚀 Déploiement Rapide - SkilliJob

Guide ultra-rapide pour déployer votre site en 5 minutes !

---

## ⚡ Option 1 : Netlify (Recommandé)

### 1️⃣ Push votre code sur GitHub

```bash
git add .
git commit -m "Prêt pour le déploiement"
git push origin main
```

### 2️⃣ Créer un compte Netlify

- Allez sur : https://www.netlify.com
- Cliquez "Sign up" avec GitHub

### 3️⃣ Importer le projet

1. Cliquez **"Add new site"** → **"Import an existing project"**
2. Choisissez **GitHub**
3. Sélectionnez votre repo **skillijob-react**

### 4️⃣ Configurer (détecté automatiquement ✅)

Netlify détecte tout automatiquement grâce au fichier `netlify.toml` :
- Build command : `npm run build` ✅
- Publish directory : `dist` ✅
- Node version : `18` ✅

### 5️⃣ Ajouter les variables d'environnement

Dans **Site settings** → **Environment variables** :

```
Key: VITE_CONVEX_URL
Value: https://standing-chameleon-180.convex.cloud
```

**Optionnel** - Pour le déploiement auto Convex :
```
Key: CONVEX_DEPLOY_KEY
Value: prod:standing-chameleon-180|eyJ2MiI6ImY5ZTg5ZTYwMjA3NTRkNzA4ZmY0OGQ5Mjg0NGUyZGM2In0=
```

### 6️⃣ Déployer !

Cliquez **"Deploy site"** → Attendez 2-3 minutes ⏱️

🎉 **Votre site est en ligne !**

URL temporaire : `https://skillijob-xxxxx.netlify.app`

---

## ⚡ Option 2 : Vercel

### 1️⃣ Push votre code sur GitHub

```bash
git add .
git commit -m "Prêt pour le déploiement"
git push origin main
```

### 2️⃣ Créer un compte Vercel

- Allez sur : https://vercel.com
- Cliquez "Sign up" avec GitHub

### 3️⃣ Importer le projet

1. Cliquez **"Add New"** → **"Project"**
2. Sélectionnez votre repo **skillijob-react**

### 4️⃣ Configurer (détecté automatiquement ✅)

Vercel détecte tout automatiquement grâce au fichier `vercel.json` :
- Framework : Vite ✅
- Build command : `npm run build` ✅
- Output directory : `dist` ✅

### 5️⃣ Ajouter les variables d'environnement

Dans **Settings** → **Environment Variables** :

```
Name: VITE_CONVEX_URL
Value: https://standing-chameleon-180.convex.cloud
Environments: ✅ Production ✅ Preview ✅ Development
```

**Optionnel** - Pour le déploiement auto Convex :
```
Name: CONVEX_DEPLOY_KEY
Value: prod:standing-chameleon-180|eyJ2MiI6ImY5ZTg5ZTYwMjA3NTRkNzA4ZmY0OGQ5Mjg0NGUyZGM2In0=
Environments: ✅ Production only
```

### 6️⃣ Déployer !

Cliquez **"Deploy"** → Attendez 1-2 minutes ⏱️

🎉 **Votre site est en ligne !**

URL : `https://skillijob.vercel.app`

---

## 📋 Checklist de vérification

Après le déploiement, vérifiez :

- [ ] La page d'accueil s'affiche
- [ ] Les routes fonctionnent (`/candidats`, `/entreprises`)
- [ ] Le popup newsletter apparaît après 2 secondes
- [ ] La newsletter enregistre dans la base de données
- [ ] L'inscription/connexion fonctionne
- [ ] Le responsive fonctionne sur mobile

---

## 🔄 Déploiement automatique

Une fois configuré, chaque fois que vous faites un push sur GitHub :

```bash
git add .
git commit -m "Nouvelle fonctionnalité"
git push origin main
# → Déploiement automatique ! 🚀
```

Netlify et Vercel redéploient automatiquement votre site.

---

## 🌐 Domaine personnalisé

### Sur Netlify

1. **Site settings** → **Domain management**
2. Cliquez **"Add custom domain"**
3. Entrez votre domaine (ex: `www.skillijob.fr`)
4. Configurez votre DNS :

```
Type: CNAME
Name: www
Value: skillijob-xxxxx.netlify.app
```

### Sur Vercel

1. **Settings** → **Domains**
2. Cliquez **"Add"**
3. Entrez votre domaine (ex: `www.skillijob.fr`)
4. Configurez votre DNS :

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

---

## ❓ Problèmes courants

### Erreur 404 sur les routes

**Solution** : Vérifiez que les fichiers existent :
- ✅ `netlify.toml` à la racine
- ✅ `public/_redirects` dans le dossier public

### Erreur "Convex URL not found"

**Solution** : Vérifiez que vous avez bien ajouté `VITE_CONVEX_URL` dans les variables d'environnement.

### Build échoue

**Solution** : Testez localement d'abord :
```bash
npm run build
npm run preview
```

---

## 📚 Documentation complète

Pour plus de détails, consultez : [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)

---

## 🎯 Résumé en 1 minute

```
1. Push sur GitHub
2. Créer un compte Netlify/Vercel
3. Importer le projet
4. Ajouter VITE_CONVEX_URL dans les variables
5. Déployer !
```

**C'est tout ! 🎉**
