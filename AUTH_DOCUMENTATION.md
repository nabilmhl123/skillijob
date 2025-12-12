# 🔐 Documentation du Système d'Authentification Skillijob

## Vue d'ensemble

Le système d'authentification de Skillijob est construit sur **Convex** et offre une solution complète et sécurisée pour gérer les utilisateurs, candidats et entreprises.

---

## 📊 Structure de la Base de Données

### Table `users`
Stocke les informations principales des utilisateurs.

```javascript
{
  email: string,              // Email unique (lowercase, indexé)
  password: string,           // Hash sécurisé du mot de passe (10000 itérations)
  userType: string,           // 'candidate' ou 'company'
  firstName?: string,
  lastName?: string,
  companyName?: string,
  phone?: string,
  position?: string,
  createdAt: number           // Timestamp de création
}
```

**Index** : `by_email`

---

### Table `sessions`
Gère les sessions actives des utilisateurs.

```javascript
{
  userId: Id<"users">,        // Référence vers l'utilisateur
  token: string,              // Token UUID unique (indexé)
  expiresAt: number          // Timestamp d'expiration (7 jours)
}
```

**Index** : `by_token`, `by_userId`

---

### Table `loginAttempts`
Suit les tentatives de connexion pour le rate limiting.

```javascript
{
  identifier: string,         // Email de l'utilisateur (indexé)
  timestamp: number          // Timestamp de la tentative
}
```

**Index** : `by_identifier`

**Règle** : Maximum 5 tentatives par période de 5 minutes

---

### Table `passwordResetTokens`
Gère les tokens de réinitialisation de mot de passe.

```javascript
{
  userId: Id<"users">,        // Référence vers l'utilisateur
  token: string,              // Token UUID unique (indexé)
  expiresAt: number,         // Timestamp d'expiration (1 heure)
  used: boolean              // Indique si le token a été utilisé
}
```

**Index** : `by_token`, `by_userId`

---

## 🔑 API d'Authentification

### 1. Inscription (`signup`)

**Type** : Mutation

**Paramètres** :
```javascript
{
  email: string,
  password: string,           // Min 6 caractères
  userType: string,           // 'candidate' ou 'company'
  firstName?: string,
  lastName?: string,
  companyName?: string,
  phone?: string,
  position?: string
}
```

**Retour** :
```javascript
{
  userId: Id<"users">,
  token: string,
  userType: string
}
```

**Processus** :
1. Validation du format email
2. Vérification de la force du mot de passe (min 6 caractères)
3. Vérification de l'unicité de l'email
4. Hash du mot de passe (10000 itérations)
5. Création de l'utilisateur
6. Création d'une session (token valide 7 jours)

---

### 2. Connexion (`signin`)

**Type** : Mutation

**Paramètres** :
```javascript
{
  email: string,
  password: string
}
```

**Retour** :
```javascript
{
  userId: Id<"users">,
  token: string,
  userType: string,
  email: string,
  firstName?: string,
  lastName?: string,
  companyName?: string
}
```

**Processus** :
1. ✅ **Rate Limiting** : Vérifie les tentatives récentes (max 5/5min)
2. Recherche de l'utilisateur par email
3. Vérification du mot de passe hashé
4. Création d'une nouvelle session
5. Retour du token et des infos utilisateur

**Erreurs possibles** :
- "Trop de tentatives. Réessayez dans X minute(s)."
- "Email ou mot de passe incorrect"

---

### 3. Obtenir l'Utilisateur Actuel (`getCurrentUser`)

**Type** : Query

**Paramètres** :
```javascript
{
  token: string
}
```

**Retour** :
```javascript
{
  userId: Id<"users">,
  email: string,
  userType: string,
  firstName?: string,
  lastName?: string,
  companyName?: string,
  phone?: string,
  position?: string
} | null
```

**Processus** :
1. Recherche de la session par token
2. Vérification de l'expiration
3. Récupération des données utilisateur

---

### 4. Déconnexion (`signout`)

**Type** : Mutation

**Paramètres** :
```javascript
{
  token: string
}
```

**Retour** :
```javascript
{
  success: boolean
}
```

**Processus** :
1. Recherche de la session
2. Suppression de la session de la base de données

---

### 5. Mise à Jour du Profil (`updateProfile`)

**Type** : Mutation

**Paramètres** :
```javascript
{
  token: string,
  firstName?: string,
  lastName?: string,
  companyName?: string,
  phone?: string,
  position?: string
}
```

**Retour** : Profil utilisateur mis à jour

**Processus** :
1. Vérification de la session
2. Mise à jour des champs fournis uniquement
3. Retour du profil complet

---

### 6. Changement de Mot de Passe (`changePassword`)

**Type** : Mutation

**Paramètres** :
```javascript
{
  token: string,
  currentPassword: string,
  newPassword: string          // Min 6 caractères
}
```

**Retour** :
```javascript
{
  success: boolean
}
```

**Processus** :
1. Vérification de la session
2. Validation de l'ancien mot de passe
3. Hash du nouveau mot de passe
4. Mise à jour dans la base de données

---

## 🔄 Récupération de Mot de Passe

### 7. Demande de Réinitialisation (`requestPasswordReset`)

**Type** : Mutation

**Paramètres** :
```javascript
{
  email: string
}
```

**Retour** :
```javascript
{
  success: boolean,
  message: string,
  resetToken: string          // ⚠️ Dev uniquement, à supprimer en prod
}
```

**Processus** :
1. Recherche de l'utilisateur par email
2. Invalidation des anciens tokens
3. Génération d'un nouveau token (UUID, valide 1h)
4. Stockage du token dans `passwordResetTokens`
5. TODO : Envoi d'un email avec le lien de réinitialisation

**Note de sécurité** : Même si l'email n'existe pas, retourne un succès pour ne pas révéler l'existence du compte.

---

### 8. Vérification du Token (`verifyResetToken`)

**Type** : Query

**Paramètres** :
```javascript
{
  token: string
}
```

**Retour** :
```javascript
{
  valid: boolean,
  message?: string
}
```

**Vérifications** :
- Token existe
- Token non utilisé
- Token non expiré

---

### 9. Réinitialisation du Mot de Passe (`resetPassword`)

**Type** : Mutation

**Paramètres** :
```javascript
{
  token: string,
  newPassword: string          // Min 6 caractères
}
```

**Retour** :
```javascript
{
  success: boolean,
  message: string
}
```

**Processus** :
1. Vérification de la validité du token
2. Hash du nouveau mot de passe
3. Mise à jour du mot de passe
4. Marquage du token comme utilisé
5. ✅ **Invalidation de toutes les sessions existantes** (sécurité)

---

## 🔒 Sécurité

### Hash des Mots de Passe

```javascript
- Algorithme : djb2 amélioré
- Itérations : 10000 (PBKDF2-like)
- Salt : "skillijob_2025_secure_salt"
- Format : Hexadécimal + Base36 + longueur
```

**⚠️ Note** : Pour la production, envisagez d'utiliser une bibliothèque de hash plus robuste si compatible avec Convex.

---

### Rate Limiting

- **Limite** : 5 tentatives de connexion maximum
- **Période** : 5 minutes glissantes
- **Nettoyage** : Automatique des anciennes tentatives
- **Message** : Indique le temps restant avant de pouvoir réessayer

---

### Tokens et Sessions

| Type | Validité | Format | Usage |
|------|----------|--------|-------|
| Session Token | 7 jours | UUID | Authentification des requêtes |
| Reset Token | 1 heure | UUID | Réinitialisation mot de passe |

---

## 🚀 Utilisation Frontend

### Exemple : Inscription

```javascript
import { useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';

const signup = useMutation(api.auth.signup);

const handleSignup = async (formData) => {
  try {
    const result = await signup({
      email: formData.email,
      password: formData.password,
      userType: 'candidate',
      firstName: formData.firstName,
      lastName: formData.lastName
    });

    // Stocker le token
    localStorage.setItem('authToken', result.token);

    // Rediriger vers le dashboard
    navigate('/dashboard');
  } catch (error) {
    console.error('Erreur inscription:', error.message);
  }
};
```

---

### Exemple : Connexion

```javascript
import { useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';

const signin = useMutation(api.auth.signin);

const handleLogin = async (email, password) => {
  try {
    const result = await signin({ email, password });
    localStorage.setItem('authToken', result.token);
    navigate('/dashboard');
  } catch (error) {
    if (error.message.includes('tentatives')) {
      // Afficher message de rate limiting
      alert(error.message);
    } else {
      alert('Email ou mot de passe incorrect');
    }
  }
};
```

---

### Exemple : Vérifier l'Utilisateur Connecté

```javascript
import { useQuery } from 'convex/react';
import { api } from '../convex/_generated/api';

const MyComponent = () => {
  const token = localStorage.getItem('authToken');
  const currentUser = useQuery(
    api.auth.getCurrentUser,
    token ? { token } : "skip"
  );

  if (!currentUser) {
    return <div>Veuillez vous connecter</div>;
  }

  return <div>Bonjour {currentUser.firstName} !</div>;
};
```

---

### Exemple : Réinitialisation de Mot de Passe

```javascript
// Étape 1 : Demander le token
const requestReset = useMutation(api.auth.requestPasswordReset);

const handleForgotPassword = async (email) => {
  const result = await requestReset({ email });
  console.log('Token (dev):', result.resetToken);
  // En production, l'utilisateur recevrait un email
};

// Étape 2 : Vérifier le token
const verifyToken = useQuery(api.auth.verifyResetToken, { token: resetToken });

// Étape 3 : Réinitialiser
const resetPassword = useMutation(api.auth.resetPassword);

const handleResetPassword = async (token, newPassword) => {
  const result = await resetPassword({ token, newPassword });
  alert(result.message);
  navigate('/login');
};
```

---

## 📝 Fichiers Concernés

- [convex/auth.js](convex/auth.js) - Toutes les fonctions d'authentification
- [convex/schema.js](convex/schema.js) - Schéma de la base de données
- [src/utils/auth.js](src/utils/auth.js) - Utilitaires frontend (getAuthToken, etc.)
- [src/pages/LoginForm.jsx](src/pages/LoginForm.jsx) - Formulaire de connexion
- [src/components/ProtectedRoute.jsx](src/components/ProtectedRoute.jsx) - Protection des routes

---

## ✅ Fonctionnalités Complètes

- ✅ Inscription avec validation
- ✅ Connexion sécurisée
- ✅ Rate limiting (5 tentatives / 5 min)
- ✅ Hash sécurisé des mots de passe (10000 itérations)
- ✅ Sessions avec expiration (7 jours)
- ✅ Mise à jour du profil
- ✅ Changement de mot de passe
- ✅ Réinitialisation de mot de passe
- ✅ Vérification des tokens
- ✅ Déconnexion
- ✅ Protection contre les attaques par force brute

---

## 🔮 Améliorations Futures

- [ ] Envoi d'emails pour la réinitialisation de mot de passe
- [ ] Authentification à deux facteurs (2FA)
- [ ] Tokens de rafraîchissement (refresh tokens)
- [ ] Option "Se souvenir de moi"
- [ ] Historique des connexions
- [ ] Notifications de sécurité (nouvelle connexion détectée)
- [ ] Support OAuth (Google, LinkedIn, etc.)

---

## 📞 Support

Pour toute question ou suggestion concernant le système d'authentification, contactez l'équipe de développement Skillijob.

**Version** : 1.0.0
**Dernière mise à jour** : 28 octobre 2025
