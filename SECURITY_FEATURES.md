# Fonctionnalités de Sécurité et Gestion des Profils - Skillijob

## Améliorations Implémentées ✅

### 1. Hachage Sécurisé des Mots de Passe (bcrypt)

Les mots de passe sont maintenant **hashés avec bcrypt** avant d'être stockés dans la base de données, assurant une sécurité maximale.

**Fichier modifié:** [convex/auth.js](convex/auth.js)

#### Fonctionnalités ajoutées :
- **Hachage lors de l'inscription** : Les mots de passe sont hashés avec un salt de 10 rounds
- **Comparaison sécurisée lors de la connexion** : Utilisation de `bcrypt.compare()`
- **Validation d'email** : Vérification du format d'email avec regex
- **Validation de mot de passe** : Minimum 6 caractères requis
- **Normalisation des emails** : Conversion en minuscules pour éviter les doublons

```javascript
// Exemple d'utilisation
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);
```

---

### 2. Protection des Routes (ProtectedRoute)

Un composant de protection a été créé pour sécuriser l'accès aux pages sensibles.

**Fichier créé:** [src/components/ProtectedRoute.jsx](src/components/ProtectedRoute.jsx)

#### Fonctionnalités :
- ✅ Vérification automatique de l'authentification
- ✅ Redirection vers `/login` si non authentifié
- ✅ Vérification de la validité du token avec Convex
- ✅ Contrôle du type d'utilisateur (candidat/entreprise)
- ✅ Redirection vers le bon dashboard selon le type
- ✅ Affichage d'un loader pendant la vérification

#### Routes protégées :
- `/dashboard-candidat` - Réservé aux candidats uniquement
- `/dashboard-entreprise` - Réservé aux entreprises uniquement
- `/paiements` - Accessible à tous les utilisateurs authentifiés
- `/profile` - Accessible à tous les utilisateurs authentifiés

```jsx
// Exemple d'utilisation
<ProtectedRoute allowedUserTypes={['candidate']}>
  <DashboardCandidat />
</ProtectedRoute>
```

---

### 3. Gestion des Profils Utilisateur

Des mutations et queries complètes ont été ajoutées pour gérer les profils.

**Fichier modifié:** [convex/auth.js](convex/auth.js)

#### Nouvelles Mutations :

##### `updateProfile`
Met à jour les informations du profil utilisateur.

**Arguments :**
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

**Exemple :**
```javascript
const updateProfile = useMutation(api.auth.updateProfile);
await updateProfile({
  token: authToken,
  firstName: 'Jean',
  lastName: 'Dupont',
  phone: '06 12 34 56 78'
});
```

##### `changePassword`
Permet à l'utilisateur de changer son mot de passe.

**Arguments :**
```javascript
{
  token: string,
  currentPassword: string,
  newPassword: string
}
```

**Sécurité :**
- Vérification de l'ancien mot de passe
- Validation de la longueur du nouveau mot de passe (min 6 caractères)
- Hachage du nouveau mot de passe avec bcrypt

#### Nouvelles Queries :

##### `getUserProfile`
Récupère le profil complet d'un utilisateur par son ID.

**Arguments :**
```javascript
{
  userId: Id<"users">
}
```

---

### 4. Hook Personnalisé useAuth

Un hook React personnalisé simplifie l'utilisation de l'authentification dans toute l'application.

**Fichier créé:** [src/hooks/useAuth.js](src/hooks/useAuth.js)

#### API du Hook :

```javascript
const {
  currentUser,        // Données de l'utilisateur actuel (ou null)
  isAuthenticated,    // Boolean : true si authentifié
  isLoading,          // Boolean : true pendant la vérification
  signup,             // Mutation pour l'inscription
  signin,             // Mutation pour la connexion
  logout,             // Fonction de déconnexion
  updateProfile,      // Fonction de mise à jour du profil
  changePassword,     // Fonction de changement de mot de passe
} = useAuth();
```

#### Exemple d'utilisation :
```javascript
import { useAuth } from '../hooks/useAuth';

function MyComponent() {
  const { currentUser, logout, updateProfile } = useAuth();

  const handleUpdateProfile = async () => {
    await updateProfile({
      firstName: 'Jean',
      lastName: 'Dupont'
    });
  };

  return (
    <div>
      <h1>Bonjour {currentUser?.firstName}</h1>
      <button onClick={logout}>Déconnexion</button>
    </div>
  );
}
```

---

### 5. Page de Profil Utilisateur

Une page complète de gestion de profil a été créée.

**Fichier créé:** [src/pages/Profile.jsx](src/pages/Profile.jsx)

#### Fonctionnalités :
- 📝 Modification des informations personnelles
- 🔒 Changement de mot de passe sécurisé
- ✅ Validation des formulaires
- 💬 Messages de succès/erreur
- 🚪 Bouton de déconnexion

**Accès :** [http://localhost:3000/profile](http://localhost:3000/profile)

---

## Structure des Fichiers Créés/Modifiés

```
src/
├── components/
│   └── ProtectedRoute.jsx          ✨ Nouveau
├── hooks/
│   └── useAuth.js                  ✨ Nouveau
├── pages/
│   ├── LoginForm.jsx               ✏️ Modifié
│   └── Profile.jsx                 ✨ Nouveau
├── utils/
│   └── auth.js                     ✏️ Existant
├── App.jsx                         ✏️ Modifié
└── main.jsx                        ✏️ Modifié

convex/
├── auth.js                         ✏️ Modifié (bcrypt + mutations)
└── schema.js                       ✏️ Existant
```

---

## Flux d'Authentification

### Inscription
1. L'utilisateur remplit le formulaire sur `/login`
2. Validation côté client (email, mot de passe)
3. La mutation `signup` est appelée
4. Validation serveur (format email, longueur mot de passe, email unique)
5. Le mot de passe est **haché avec bcrypt**
6. L'utilisateur est créé dans la base de données
7. Un token de session est généré
8. L'utilisateur est redirigé vers son dashboard

### Connexion
1. L'utilisateur entre email et mot de passe
2. La mutation `signin` est appelée
3. Recherche de l'utilisateur par email (en minuscules)
4. **Vérification du mot de passe avec bcrypt.compare()**
5. Génération d'un nouveau token de session
6. Redirection vers le dashboard approprié

### Accès aux Pages Protégées
1. Le composant `ProtectedRoute` vérifie le token dans localStorage
2. La query `getCurrentUser` vérifie la validité du token
3. Si invalide → redirection vers `/login`
4. Si valide mais mauvais type d'utilisateur → redirection vers le bon dashboard
5. Si tout est OK → affichage du contenu

---

## Sécurité Implémentée ✅

| Fonctionnalité | Status | Description |
|---------------|--------|-------------|
| Hachage bcrypt | ✅ | Mots de passe hashés avec 10 rounds de salt |
| Validation email | ✅ | Regex pour vérifier le format |
| Validation mot de passe | ✅ | Minimum 6 caractères |
| Protection routes | ✅ | Vérification authentification + type utilisateur |
| Sessions sécurisées | ✅ | Tokens UUID avec expiration (7 jours) |
| Normalisation email | ✅ | Conversion en minuscules |

---

## Améliorations Futures Recommandées

### Sécurité Avancée
- [ ] Limitation des tentatives de connexion (rate limiting)
- [ ] Vérification d'email (envoi d'un lien de confirmation)
- [ ] Réinitialisation de mot de passe par email
- [ ] Authentification à deux facteurs (2FA)
- [ ] Détection d'activité suspecte
- [ ] Session unique (déconnexion automatique des autres appareils)

### Expérience Utilisateur
- [ ] Affichage de la force du mot de passe
- [ ] Suggestions de mots de passe forts
- [ ] Upload de photo de profil
- [ ] Historique des connexions
- [ ] Gestion des préférences utilisateur

### Fonctionnalités Métier
- [ ] CV et compétences pour les candidats
- [ ] Logo et description pour les entreprises
- [ ] Notifications en temps réel
- [ ] Messagerie interne
- [ ] Système de matching candidat/entreprise

---

## Tests Recommandés

### Tests Manuels
1. ✅ Inscription avec mot de passe valide
2. ✅ Inscription avec mot de passe trop court (< 6 caractères)
3. ✅ Inscription avec email invalide
4. ✅ Inscription avec email déjà utilisé
5. ✅ Connexion avec bonnes informations
6. ✅ Connexion avec mauvais mot de passe
7. ✅ Accès à une route protégée sans authentification
8. ✅ Accès au dashboard candidat avec un compte entreprise
9. ✅ Modification du profil
10. ✅ Changement de mot de passe

### Tests Automatisés (à implémenter)
- Tests unitaires pour les mutations Convex
- Tests d'intégration pour le flux d'authentification
- Tests E2E avec Cypress ou Playwright

---

## Utilisation des Nouvelles Fonctionnalités

### Dans un Composant React

```javascript
import { useAuth } from '../hooks/useAuth';

function Dashboard() {
  const {
    currentUser,
    isAuthenticated,
    isLoading,
    logout
  } = useAuth();

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (!isAuthenticated) {
    return <div>Non authentifié</div>;
  }

  return (
    <div>
      <h1>Bienvenue {currentUser.firstName}</h1>
      <p>Email: {currentUser.email}</p>
      <p>Type: {currentUser.userType}</p>
      <button onClick={logout}>Déconnexion</button>
    </div>
  );
}
```

### Mise à Jour du Profil

```javascript
import { useAuth } from '../hooks/useAuth';

function EditProfile() {
  const { updateProfile } = useAuth();
  const [formData, setFormData] = useState({ firstName: '', lastName: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      alert('Profil mis à jour !');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="firstName"
        value={formData.firstName}
        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
      />
      <button type="submit">Enregistrer</button>
    </form>
  );
}
```

---

## Support et Documentation

- **Convex Documentation:** https://docs.convex.dev
- **bcrypt Documentation:** https://www.npmjs.com/package/bcryptjs
- **React Router:** https://reactrouter.com

---

## Notes Importantes ⚠️

1. **Ne jamais partager** votre clé API Convex publiquement
2. **Les tokens de session** expirent après 7 jours
3. **Les mots de passe** sont maintenant sécurisés avec bcrypt
4. **Toujours valider** les données côté serveur ET côté client
5. **Logs de sécurité** : Pensez à implémenter un système de logs pour les actions sensibles

---

Dernière mise à jour : 27 octobre 2025
