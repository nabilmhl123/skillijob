# Intégration Convex - Skillijob

## Configuration

Convex a été intégré avec succès dans votre projet pour gérer l'authentification et la base de données en temps réel.

### Fichiers créés

1. **convex/schema.js** - Définit la structure de la base de données (tables users et sessions)
2. **convex/auth.js** - Contient les mutations et queries pour l'authentification
3. **src/utils/auth.js** - Utilitaires pour gérer l'authentification côté client
4. **.env.local** - Variables d'environnement pour la connexion à Convex
5. **.env** - Configuration de déploiement Convex

### Configuration de l'environnement

Le fichier `.env.local` contient votre URL Convex :
```
VITE_CONVEX_URL=https://standing-chameleon-180.convex.cloud
```

⚠️ **IMPORTANT** : Ne partagez JAMAIS votre clé API Convex publiquement !

## Structure de la base de données

### Table `users`
- `email` (string) - Email de l'utilisateur
- `password` (string) - Mot de passe (⚠️ À hasher en production !)
- `userType` (string) - Type d'utilisateur ('candidate' ou 'company')
- `firstName` (string, optionnel) - Prénom
- `lastName` (string, optionnel) - Nom
- `companyName` (string, optionnel) - Nom de l'entreprise
- `phone` (string, optionnel) - Téléphone
- `position` (string, optionnel) - Fonction dans l'entreprise
- `createdAt` (number) - Date de création

### Table `sessions`
- `userId` (id) - Référence vers l'utilisateur
- `token` (string) - Token de session
- `expiresAt` (number) - Date d'expiration

## Fonctionnalités disponibles

### Mutations

1. **signup** - Inscription d'un nouvel utilisateur
   - Vérifie que l'email n'existe pas déjà
   - Crée un nouvel utilisateur
   - Génère un token de session
   - Retourne userId, token et userType

2. **signin** - Connexion d'un utilisateur
   - Vérifie les identifiants
   - Génère un nouveau token de session
   - Retourne les informations utilisateur

3. **signout** - Déconnexion
   - Supprime la session active

### Queries

1. **getCurrentUser** - Récupère l'utilisateur actuel à partir du token
   - Vérifie la validité du token
   - Retourne les informations utilisateur

## Utilisation dans le code

### Inscription
```javascript
const signup = useMutation(api.auth.signup);
const result = await signup({
  email: 'user@example.com',
  password: 'password123',
  userType: 'candidate',
  firstName: 'John',
  lastName: 'Doe'
});
```

### Connexion
```javascript
const signin = useMutation(api.auth.signin);
const result = await signin({
  email: 'user@example.com',
  password: 'password123'
});
```

### Vérifier l'authentification
```javascript
import { isAuthenticated, getAuthToken } from './utils/auth';

if (isAuthenticated()) {
  const token = getAuthToken();
  // Utiliser le token pour les requêtes
}
```

## Prochaines étapes

### Sécurité (⚠️ IMPORTANT pour la production)

1. **Hasher les mots de passe** :
   - Installer bcrypt : `npm install bcrypt`
   - Modifier `convex/auth.js` pour hasher les mots de passe avant stockage
   - Comparer les hash lors de la connexion

2. **Validation des données** :
   - Ajouter une validation d'email côté serveur
   - Vérifier la force des mots de passe
   - Limiter les tentatives de connexion

3. **Protection CSRF** :
   - Implémenter des tokens CSRF pour les requêtes sensibles

### Fonctionnalités supplémentaires

1. **Réinitialisation de mot de passe** :
   - Créer une mutation pour générer un token de réinitialisation
   - Envoyer un email avec le lien de réinitialisation
   - Créer une page de réinitialisation

2. **Vérification d'email** :
   - Ajouter un champ `emailVerified` dans la table users
   - Envoyer un email de vérification lors de l'inscription

3. **Profils utilisateur** :
   - Créer des mutations pour mettre à jour le profil
   - Ajouter une query pour récupérer le profil complet

4. **Protection des routes** :
   - Créer un composant ProtectedRoute
   - Vérifier l'authentification avant d'accéder aux dashboards

## Déploiement

Le backend Convex est déjà déployé sur :
```
https://standing-chameleon-180.convex.cloud
```

Pour déployer des modifications :
```bash
npx convex deploy
```

## Support

Pour plus d'informations sur Convex :
- Documentation : https://docs.convex.dev
- Dashboard : https://dashboard.convex.dev
