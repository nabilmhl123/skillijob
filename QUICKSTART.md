# Guide de Démarrage Rapide - Skillijob

## 🚀 Démarrage en 3 étapes

### 1. Installation
```bash
npm install
```

### 2. Configuration
Le fichier `.env.local` est déjà configuré avec votre URL Convex :
```env
VITE_CONVEX_URL=https://standing-chameleon-180.convex.cloud
```

### 3. Lancement
```bash
npm run dev
```

✅ L'application est maintenant accessible sur [http://localhost:3000](http://localhost:3000)

---

## 🧪 Tester l'authentification

### Créer un compte candidat
1. Allez sur [http://localhost:3000/login](http://localhost:3000/login)
2. Cliquez sur l'onglet "Candidat"
3. Cliquez sur "Créer un compte"
4. Remplissez le formulaire :
   - Prénom : Jean
   - Nom : Dupont
   - Email : jean.dupont@example.com
   - Téléphone : 06 12 34 56 78 (optionnel)
   - Mot de passe : minimum 6 caractères
5. Cliquez sur "S'inscrire"
6. Vous serez automatiquement redirigé vers `/dashboard-candidat`

### Créer un compte entreprise
1. Allez sur [http://localhost:3000/login](http://localhost:3000/login)
2. Cliquez sur l'onglet "Entreprise"
3. Cliquez sur "Créer un compte"
4. Remplissez le formulaire :
   - Nom de l'entreprise : Tech Corp
   - Prénom du contact : Marie
   - Nom du contact : Martin
   - Fonction : Responsable RH
   - Email : contact@techcorp.com
   - Téléphone : 01 23 45 67 89
   - Mot de passe : minimum 6 caractères
5. Cliquez sur "S'inscrire"
6. Vous serez automatiquement redirigé vers `/dashboard-entreprise`

### Se connecter
1. Allez sur [http://localhost:3000/login](http://localhost:3000/login)
2. Entrez votre email et mot de passe
3. Cliquez sur "Se connecter"
4. Vous serez redirigé vers votre dashboard

---

## 🔐 Tester la gestion du profil

### Accéder à votre profil
1. Connectez-vous à votre compte
2. Allez sur [http://localhost:3000/profile](http://localhost:3000/profile)

### Modifier votre profil
1. Sur la page de profil, cliquez sur "Modifier"
2. Changez vos informations (prénom, nom, téléphone, etc.)
3. Cliquez sur "Enregistrer"
4. Un message de succès s'affiche

### Changer votre mot de passe
1. Sur la page de profil, cliquez sur "Changer le mot de passe"
2. Entrez votre mot de passe actuel
3. Entrez votre nouveau mot de passe (minimum 6 caractères)
4. Confirmez le nouveau mot de passe
5. Cliquez sur "Changer le mot de passe"
6. Un message de succès s'affiche

### Se déconnecter
1. Sur la page de profil, cliquez sur "Déconnexion"
2. Vous serez redirigé vers `/login`

---

## 🛡️ Tester la protection des routes

### Accès sans authentification
1. **Sans être connecté**, essayez d'accéder à :
   - [http://localhost:3000/dashboard-candidat](http://localhost:3000/dashboard-candidat)
   - [http://localhost:3000/dashboard-entreprise](http://localhost:3000/dashboard-entreprise)
   - [http://localhost:3000/profile](http://localhost:3000/profile)
2. ✅ Vous devez être **automatiquement redirigé vers `/login`**

### Accès avec mauvais type d'utilisateur
1. Connectez-vous avec un compte **candidat**
2. Essayez d'accéder à [http://localhost:3000/dashboard-entreprise](http://localhost:3000/dashboard-entreprise)
3. ✅ Vous devez être **automatiquement redirigé vers `/dashboard-candidat`**

4. Déconnectez-vous et connectez-vous avec un compte **entreprise**
5. Essayez d'accéder à [http://localhost:3000/dashboard-candidat](http://localhost:3000/dashboard-candidat)
6. ✅ Vous devez être **automatiquement redirigé vers `/dashboard-entreprise`**

---

## 🔍 Vérifier la sécurité

### Vérifier le hachage des mots de passe
1. Ouvrez le [Dashboard Convex](https://dashboard.convex.dev)
2. Accédez à votre projet "standing-chameleon-180"
3. Allez dans l'onglet "Data"
4. Cliquez sur la table "users"
5. Regardez le champ `password` de n'importe quel utilisateur
6. ✅ Le mot de passe doit être **haché** (commence par `$2a$` ou `$2b$`)
   - Exemple : `$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy`

### Vérifier les sessions
1. Dans le Dashboard Convex, cliquez sur la table "sessions"
2. Vous devriez voir les sessions actives
3. Chaque session a :
   - Un `token` (UUID)
   - Un `userId` (référence vers l'utilisateur)
   - Un `expiresAt` (timestamp d'expiration)
4. ✅ Les sessions expirent automatiquement après **7 jours**

---

## 📊 Dashboard Convex

### Accéder au Dashboard
1. Allez sur [https://dashboard.convex.dev](https://dashboard.convex.dev)
2. Connectez-vous (si ce n'est pas déjà fait)
3. Sélectionnez votre projet "standing-chameleon-180"

### Explorer les données
- **Tables** : `users`, `sessions`
- **Functions** : `auth.signup`, `auth.signin`, `auth.signout`, `auth.updateProfile`, `auth.changePassword`
- **Queries** : `auth.getCurrentUser`, `auth.getUserProfile`

### Voir les logs en temps réel
1. Dans le Dashboard, allez dans "Logs"
2. Vous verrez tous les appels aux mutations et queries en temps réel
3. Utile pour le débogage !

---

## 🛠️ Commandes Utiles

```bash
# Démarrer le serveur de développement
npm run dev

# Build pour la production
npm run build

# Déployer les fonctions Convex
npx convex deploy

# Voir les logs Convex en temps réel
npx convex dev

# Linter
npm run lint
```

---

## 🐛 Dépannage Rapide

### Le serveur ne démarre pas
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Erreur "Cannot find module 'convex/react'"
```bash
npm install convex
```

### Erreur "Cannot find module 'bcryptjs'"
```bash
npm install bcryptjs
```

### Erreur Convex "Deployment not found"
Vérifiez que le fichier `.env.local` contient bien :
```env
VITE_CONVEX_URL=https://standing-chameleon-180.convex.cloud
```

### Session expirée
Si vous êtes déconnecté automatiquement, c'est normal après **7 jours**.
Reconnectez-vous simplement.

---

## 📚 Documentation Complète

Pour en savoir plus :
- [README.md](README.md) - Documentation principale
- [SECURITY_FEATURES.md](SECURITY_FEATURES.md) - Fonctionnalités de sécurité
- [CONVEX_INTEGRATION.md](CONVEX_INTEGRATION.md) - Intégration Convex

---

## ✅ Checklist de Test

- [ ] Inscription candidat
- [ ] Inscription entreprise
- [ ] Connexion candidat
- [ ] Connexion entreprise
- [ ] Accès au dashboard candidat
- [ ] Accès au dashboard entreprise
- [ ] Modification du profil
- [ ] Changement de mot de passe
- [ ] Déconnexion
- [ ] Protection des routes (redirection si non authentifié)
- [ ] Protection par type d'utilisateur
- [ ] Vérification du hachage bcrypt dans le Dashboard Convex
- [ ] Vérification des sessions dans le Dashboard Convex

---

**Tout fonctionne ? Vous êtes prêt à développer ! 🚀**
