# Guide d'Implémentation Frontend - Profil Candidat Complet

## 🎯 Vue d'ensemble

J'ai créé l'infrastructure backend complète avec :
- ✅ 12 tables Convex déployées
- ✅ 20+ mutations et queries opérationnelles
- ✅ Structure de données professionnelle

## 📁 Fichiers Créés

### Backend (Convex)
1. `convex/schema.js` - Schéma complet (12 tables)
2. `convex/candidate.js` - Mutations et queries pour le profil candidat
3. `convex/auth.js` - Authentification (déjà existant)

### Frontend (React)
4. `src/components/dashboard/ProfileSection.jsx` - Profil de base (déjà créé)
5. `src/components/dashboard/ProfileSection.css` - Styles (déjà créé)

## 🚀 Structure Recommandée pour l'Implémentation Complète

### Option 1 : Extension Progressive (Recommandée)

Créer des composants séparés pour chaque section et les intégrer progressivement :

```
src/components/candidate/
├── PersonalInfoForm.jsx        # Informations personnelles étendues
├── ProfessionalStatusForm.jsx  # Situation professionnelle
├── ExperienceList.jsx          # Liste des expériences
├── ExperienceForm.jsx          # Formulaire expérience
├── EducationList.jsx           # Liste des formations
├── EducationForm.jsx           # Formulaire formation
├── SkillsManager.jsx           # Gestion des compétences
├── PitchEditor.jsx             # Présentation personnelle
├── DocumentsManager.jsx        # Gestion des documents (à implémenter)
└── styles/
    └── CandidateProfile.css    # Styles communs
```

### Option 2 : Composant Tout-en-Un

Créer un composant `CandidateProfileComplete.jsx` avec des onglets pour chaque section.

## 📝 Mutations Convex Disponibles

### Profil Candidat
- ✅ `candidate.upsertProfile` - Créer/MAJ le profil professionnel
- ✅ `candidate.getProfile` - Récupérer le profil

### Expériences
- ✅ `candidate.addExperience` - Ajouter
- ✅ `candidate.updateExperience` - Modifier
- ✅ `candidate.deleteExperience` - Supprimer
- ✅ `candidate.listExperiences` - Lister

### Formations
- ✅ `candidate.addEducation` - Ajouter
- ✅ `candidate.updateEducation` - Modifier
- ✅ `candidate.deleteEducation` - Supprimer
- ✅ `candidate.listEducations` - Lister

### Certifications
- ✅ `candidate.addCertification` - Ajouter
- ✅ `candidate.deleteCertification` - Supprimer
- ✅ `candidate.listCertifications` - Lister

### Informations Personnelles
- ✅ `candidate.updatePersonalInfo` - MAJ infos étendues
- ✅ `candidate.updatePitch` - MAJ présentation

### Authentification (déjà existant)
- ✅ `auth.updateProfile` - MAJ nom, prénom, téléphone
- ✅ `auth.getCurrentUser` - Obtenir l'utilisateur actuel

## 🎨 Exemple d'Utilisation des Mutations

### Ajouter une Expérience

```javascript
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { getAuthToken } from '../utils/auth';

const MyComponent = () => {
  const addExperience = useMutation(api.candidate.addExperience);

  const handleSubmit = async (data) => {
    const token = getAuthToken();

    try {
      await addExperience({
        token,
        company: data.company,
        position: data.position,
        startDate: data.startDate,
        endDate: data.endDate,
        isCurrent: data.isCurrent,
        description: data.description,
        achievements: data.achievements, // array de strings
        skills: data.skills, // array de strings
      });

      alert('Expérience ajoutée !');
    } catch (error) {
      alert(error.message);
    }
  };
};
```

### Lister les Expériences

```javascript
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { getAuthToken } from '../utils/auth';

const MyComponent = () => {
  const token = getAuthToken();
  const experiences = useQuery(
    api.candidate.listExperiences,
    token ? { token } : "skip"
  );

  if (!experiences) return <div>Chargement...</div>;

  return (
    <div>
      {experiences.map(exp => (
        <div key={exp._id}>
          <h3>{exp.position} chez {exp.company}</h3>
          <p>{exp.startDate} - {exp.endDate || 'Présent'}</p>
        </div>
      ))}
    </div>
  );
};
```

### Mettre à Jour le Profil Professionnel

```javascript
const updateProfile = useMutation(api.candidate.upsertProfile);

const handleSave = async (data) => {
  const token = getAuthToken();

  await updateProfile({
    token,
    currentStatus: 'active_search', // ou 'employed', 'student', etc.
    availability: 'immediate', // ou une date
    desiredPositions: ['Développeur Full Stack', 'Tech Lead'],
    desiredSectors: ['Tech', 'Finance'],
    contractTypes: ['CDI', 'Freelance'],
    desiredSalaryMin: 50000,
    desiredSalaryMax: 70000,
    remotePreference: 'hybrid',
    willingToRelocate: true,
    preferredLocations: ['Paris', 'Lyon'],
    hardSkills: ['React', 'Node.js', 'Python'],
    softSkills: ['Leadership', 'Communication'],
    languages: [
      { language: 'Français', level: 'native' },
      { language: 'Anglais', level: 'fluent' }
    ]
  });
};
```

## 🎯 Sections à Implémenter - Checklist

### ✅ Déjà Implémenté
- [x] Authentification (signup, signin, logout)
- [x] Profil de base (nom, prénom, email, téléphone)
- [x] Changement de mot de passe
- [x] Menu utilisateur dans la Navbar
- [x] Protection des routes

### 🚧 À Implémenter - Frontend

#### 1️⃣ Informations Personnelles Complètes
- [ ] Formulaire d'adresse (rue, ville, code postal, pays)
- [ ] Sélection de nationalité
- [ ] Checkboxes permis de conduire (A, B, C, etc.)
- [ ] Toggle autorisation de travail
- [ ] Upload photo de profil
- [ ] Champs LinkedIn et Portfolio URL
- [ ] Tags centres d'intérêt

#### 2️⃣ Situation Professionnelle
- [ ] Select statut actuel (en poste, en recherche, étudiant, etc.)
- [ ] Date picker disponibilité
- [ ] Select préavis (1 mois, 3 mois, etc.)

#### 3️⃣ Préférences de Recherche
- [ ] Multi-select postes recherchés
- [ ] Multi-select secteurs d'activité
- [ ] Checkboxes types de contrat
- [ ] Range slider salaire souhaité
- [ ] Radio buttons préférence télétravail
- [ ] Toggle mobilité géographique
- [ ] Multi-select villes préférées

#### 4️⃣ Expériences Professionnelles
- [ ] Liste des expériences avec actions (modifier/supprimer)
- [ ] Modal/Formulaire d'ajout d'expérience
- [ ] Champs : entreprise, poste, dates, description
- [ ] Liste de réalisations (bullets points)
- [ ] Tags compétences utilisées
- [ ] Checkbox "Poste actuel"

#### 5️⃣ Formations & Diplômes
- [ ] Liste des formations
- [ ] Modal/Formulaire d'ajout
- [ ] Champs : établissement, diplôme, domaine, dates
- [ ] Mention/Note

#### 6️⃣ Certifications
- [ ] Liste des certifications
- [ ] Modal/Formulaire d'ajout
- [ ] Champs : nom, organisme, dates, ID, URL
- [ ] Badge d'expiration

#### 7️⃣ Compétences
- [ ] Liste des hard skills avec suppression
- [ ] Input + bouton pour ajouter
- [ ] Liste des soft skills
- [ ] Section langues avec niveaux

#### 8️⃣ Présentation Personnelle
- [ ] Textarea pitch professionnel (500 caractères)
- [ ] Textarea objectifs de carrière
- [ ] Tags centres d'intérêt

#### 9️⃣ Documents (nécessite storage)
- [ ] Upload de CV (PDF)
- [ ] Upload lettres de motivation
- [ ] Sélection CV principal
- [ ] Liste des documents avec preview
- [ ] Suppression de documents

## 🎨 Design Pattern Recommandé

### Structure d'un Composant de Section

```javascript
import { useState } from 'react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { getAuthToken } from '../utils/auth';

const ExperienceSection = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});

  const token = getAuthToken();
  const experiences = useQuery(api.candidate.listExperiences, { token });
  const addExperience = useMutation(api.candidate.addExperience);
  const updateExperience = useMutation(api.candidate.updateExperience);
  const deleteExperience = useMutation(api.candidate.deleteExperience);

  const handleAdd = async () => {
    await addExperience({ token, ...formData });
    setIsAdding(false);
    setFormData({});
  };

  const handleEdit = async (id) => {
    await updateExperience({ token, experienceId: id, ...formData });
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    if (confirm('Supprimer cette expérience ?')) {
      await deleteExperience({ token, experienceId: id });
    }
  };

  return (
    <div className="experience-section">
      <div className="section-header">
        <h2>Expériences Professionnelles</h2>
        <button onClick={() => setIsAdding(true)}>+ Ajouter</button>
      </div>

      {/* Liste des expériences */}
      {experiences?.map(exp => (
        <ExperienceCard
          key={exp._id}
          experience={exp}
          onEdit={() => setEditingId(exp._id)}
          onDelete={() => handleDelete(exp._id)}
        />
      ))}

      {/* Modal d'ajout */}
      {isAdding && (
        <ExperienceForm
          onSubmit={handleAdd}
          onCancel={() => setIsAdding(false)}
        />
      )}
    </div>
  );
};
```

## 🎨 Styles CSS Recommandés

```css
/* Structure générale */
.profile-complete {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.profile-tabs {
  display: flex;
  gap: 8px;
  border-bottom: 2px solid #e5e7eb;
  margin-bottom: 24px;
}

.tab-button {
  padding: 12px 24px;
  border: none;
  background: none;
  cursor: pointer;
  color: #6b7280;
  font-weight: 600;
  transition: all 0.3s;
}

.tab-button.active {
  color: #6C00FF;
  border-bottom: 3px solid #6C00FF;
}

/* Sections */
.section {
  background: white;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

/* Cartes d'éléments (expériences, formations) */
.item-card {
  background: #f9fafb;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  border-left: 4px solid #6C00FF;
}

.item-card-header {
  display: flex;
  justify-content: space-between;
  align-items: start;
}

.item-actions {
  display: flex;
  gap: 8px;
}

.btn-icon {
  padding: 6px;
  border: none;
  background: none;
  cursor: pointer;
  color: #6b7280;
  transition: color 0.2s;
}

.btn-icon:hover {
  color: #6C00FF;
}

/* Tags/Pills */
.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
}

.tag {
  padding: 4px 12px;
  background: #e0d4ff;
  color: #6C00FF;
  border-radius: 16px;
  font-size: 13px;
  font-weight: 500;
}

/* Boutons principaux */
.btn-primary {
  padding: 10px 20px;
  background: linear-gradient(135deg, #6C00FF, #8B5CF6);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(108, 0, 255, 0.3);
}
```

## 💡 Conseils d'Implémentation

### 1. Commencer Simple
Implémentez d'abord une section complète (par exemple les expériences) puis répliquez le pattern pour les autres.

### 2. Réutiliser les Composants
Créez des composants réutilisables :
- `<FormField />` pour les champs de formulaire
- `<Modal />` pour les pop-ups
- `<ItemCard />` pour afficher les éléments de liste
- `<TagInput />` pour les listes de tags

### 3. Gestion d'État
Utilisez `useState` pour l'état local et Convex queries pour les données.

### 4. Validation
Ajoutez de la validation côté client avant d'appeler les mutations.

### 5. Feedback Utilisateur
- Messages de succès/erreur
- Loaders pendant les mutations
- Confirmation avant suppression

## 🚀 Ordre d'Implémentation Recommandé

1. **Expériences** (pattern CRUD complet)
2. **Formations** (même pattern)
3. **Compétences** (plus simple, bonne pratique)
4. **Informations Personnelles** (formulaire simple)
5. **Préférences** (selects multiples)
6. **Présentation** (textareas)
7. **Certifications**
8. **Documents** (nécessite Convex File Storage)

## 📦 Prochaine Étape

Voulez-vous que je crée :
1. Un composant complet avec toutes les sections en onglets ?
2. Les composants séparés section par section ?
3. Un exemple complet pour une section (ex: Expériences) que vous pourrez répliquer ?

Dites-moi votre préférence et je génère le code ! 🚀
