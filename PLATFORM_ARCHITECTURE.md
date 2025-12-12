# Architecture de la Plateforme Skillijob

## 📊 Vue d'ensemble

La plateforme Skillijob est maintenant structurée avec un schéma de base de données complet permettant de gérer :
- Les profils candidats détaillés
- Les profils entreprises
- Les offres d'emploi
- Les candidatures
- Les alertes emploi
- La messagerie
- Les notifications

---

## 🗄️ Structure de la Base de Données

### 1️⃣ Table `users` - Utilisateurs (Candidats & Entreprises)

**Informations de base :**
- `email` : Email de l'utilisateur (unique)
- `password` : Mot de passe haché (bcrypt)
- `userType` : Type d'utilisateur (`'candidate'` ou `'company'`)
- `firstName`, `lastName` : Nom et prénom
- `phone` : Téléphone
- `createdAt` : Date de création du compte

**Informations supplémentaires Candidat :**
- `address`, `city`, `postalCode`, `country` : Adresse complète
- `nationality` : Nationalité
- `drivingLicense` : Permis de conduire (array : `['B', 'C']`)
- `workPermit` : Autorisation de travail (boolean)
- `photoUrl` : URL de la photo de profil
- `linkedinUrl` : URL du profil LinkedIn
- `portfolioUrl` : URL du portfolio personnel
- `pitch` : Présentation professionnelle
- `careerObjectives` : Objectifs de carrière
- `interests` : Centres d'intérêt (array)

**Paramètres de confidentialité :**
- `profileVisibility` : `'public'`, `'recruiter_only'`, ou `'private'`
- `allowNotifications` : Autoriser les notifications
- `allowEmailAlerts` : Autoriser les alertes par email

**Informations supplémentaires Entreprise :**
- `companyName` : Nom de l'entreprise
- `position` : Fonction du contact RH

---

### 2️⃣ Table `candidateProfiles` - Profils Professionnels Candidats

**Situation actuelle :**
- `currentStatus` : `'employed'`, `'active_search'`, `'student'`, `'freelance'`, `'unemployed'`
- `availability` : Date de disponibilité ou `'immediate'`
- `noticePeriod` : Préavis (`'1 month'`, `'3 months'`, etc.)

**Préférences de recherche :**
- `desiredPositions` : Postes recherchés (array)
- `desiredSectors` : Secteurs d'activité (array)
- `contractTypes` : Types de contrat (`['CDI', 'CDD', 'Alternance', 'Freelance']`)
- `desiredSalaryMin`, `desiredSalaryMax` : Fourchette salariale
- `remotePreference` : `'full_remote'`, `'hybrid'`, `'on_site'`, `'flexible'`
- `willingToRelocate` : Mobilité géographique (boolean)
- `preferredLocations` : Villes préférées (array)

**Compétences :**
- `hardSkills` : Compétences techniques (array)
- `softSkills` : Soft skills (array)
- `languages` : Langues parlées avec niveaux
  ```javascript
  [{
    language: "Anglais",
    level: "fluent" // 'native', 'fluent', 'professional', 'intermediate', 'basic'
  }]
  ```

---

### 3️⃣ Table `experiences` - Expériences Professionnelles

- `userId` : Référence vers l'utilisateur
- `company` : Nom de l'entreprise
- `position` : Intitulé du poste
- `contractType` : Type de contrat
- `location` : Lieu de travail
- `startDate`, `endDate` : Dates de début/fin
- `isCurrent` : Poste actuel (boolean)
- `description` : Description du poste
- `achievements` : Réalisations (array de bullet points)
- `skills` : Compétences utilisées (array)

---

### 4️⃣ Table `educations` - Formations & Diplômes

- `userId` : Référence vers l'utilisateur
- `institution` : Nom de l'établissement
- `degree` : Diplôme obtenu
- `field` : Domaine d'études
- `location` : Ville
- `startDate`, `endDate` : Dates
- `grade` : Mention ou note
- `description` : Description

---

### 5️⃣ Table `certifications` - Certifications

- `userId` : Référence vers l'utilisateur
- `name` : Nom de la certification
- `issuer` : Organisme délivrant
- `issueDate` : Date d'obtention
- `expiryDate` : Date d'expiration (optionnel)
- `credentialId` : Numéro de certification
- `credentialUrl` : Lien de vérification

---

### 6️⃣ Table `documents` - Documents (CV, Lettres, etc.)

- `userId` : Référence vers l'utilisateur
- `name` : Nom du fichier
- `type` : `'cv'`, `'cover_letter'`, `'diploma'`, `'certificate'`, `'portfolio'`, `'other'`
- `fileUrl` : URL du fichier stocké
- `fileSize` : Taille du fichier
- `mimeType` : Type MIME
- `isPrimary` : CV principal (boolean)
- `uploadedAt` : Date d'upload

---

### 7️⃣ Table `jobOffers` - Offres d'Emploi

- `companyId` : Référence vers l'entreprise
- `title` : Titre du poste
- `description` : Description détaillée
- `contractType` : Type de contrat
- `location` : Localisation
- `remote` : `'full_remote'`, `'hybrid'`, `'on_site'`
- `salaryMin`, `salaryMax` : Fourchette salariale
- `requiredSkills` : Compétences requises (array)
- `experienceLevel` : `'junior'`, `'confirmed'`, `'senior'`
- `sector` : Secteur d'activité
- `status` : `'open'`, `'closed'`, `'draft'`
- `publishedAt`, `expiresAt` : Dates de publication/expiration

---

### 8️⃣ Table `applications` - Candidatures

- `candidateId` : Référence vers le candidat
- `jobOfferId` : Référence vers l'offre
- `cvId` : CV utilisé pour la candidature
- `coverLetter` : Lettre de motivation
- `status` : `'submitted'`, `'viewed'`, `'shortlisted'`, `'interview'`, `'rejected'`, `'accepted'`
- `appliedAt` : Date de candidature
- `lastStatusUpdate` : Dernière mise à jour du statut
- `notes` : Notes du recruteur

---

### 9️⃣ Table `jobAlerts` - Alertes Emploi

- `userId` : Référence vers l'utilisateur
- `name` : Nom de l'alerte
- `keywords` : Mots-clés recherchés (array)
- `locations` : Localisations (array)
- `contractTypes` : Types de contrat (array)
- `sectors` : Secteurs (array)
- `salaryMin` : Salaire minimum
- `remote` : Préférence télétravail
- `frequency` : `'instant'`, `'daily'`, `'weekly'`
- `isActive` : Alerte active (boolean)
- `lastSentAt` : Dernière alerte envoyée

---

### 🔟 Table `messages` - Messagerie

- `senderId` : Expéditeur
- `receiverId` : Destinataire
- `applicationId` : Lien avec une candidature (optionnel)
- `subject` : Sujet du message
- `content` : Contenu
- `isRead` : Lu/Non lu (boolean)
- `sentAt` : Date d'envoi

---

### 1️⃣1️⃣ Table `notifications` - Notifications

- `userId` : Référence vers l'utilisateur
- `type` : `'application_update'`, `'new_message'`, `'job_alert'`, `'profile_view'`
- `title` : Titre de la notification
- `message` : Message
- `link` : Lien vers la ressource
- `isRead` : Lu/Non lu (boolean)
- `createdAt` : Date de création

---

### 1️⃣2️⃣ Table `sessions` - Sessions d'Authentification

- `userId` : Référence vers l'utilisateur
- `token` : Token de session (UUID)
- `expiresAt` : Date d'expiration (7 jours)

---

## 🎨 Sections du Profil Candidat à Implémenter

### ✅ Déjà implémenté

1. **Informations de base** (dans ProfileSection)
   - Nom, prénom, email, téléphone
   - Modification sécurisée
   - Changement de mot de passe

### 🚧 À implémenter (structure créée, composants à développer)

2. **Informations personnelles complètes**
   - Adresse, ville, code postal, pays
   - Nationalité
   - Permis de conduire
   - Autorisation de travail
   - Photo de profil
   - LinkedIn, Portfolio

3. **Situation professionnelle**
   - Statut actuel
   - Disponibilité
   - Préavis

4. **Préférences de recherche**
   - Postes recherchés
   - Secteurs d'activité
   - Types de contrat
   - Salaire souhaité
   - Télétravail
   - Mobilité géographique
   - Villes préférées

5. **CV & Documents**
   - Upload de CV (multiple)
   - Lettres de motivation
   - Portfolio
   - Diplômes et certifications

6. **Parcours professionnel**
   - Expériences détaillées
   - Réalisations (KPIs)
   - Compétences par expérience

7. **Formation & Diplômes**
   - Cursus universitaire
   - Certifications
   - Formations continues

8. **Compétences**
   - Hard skills
   - Soft skills
   - Langues parlées

9. **Présentation personnelle**
   - Pitch professionnel
   - Objectifs de carrière
   - Centres d'intérêt

---

## 🎯 Espaces Fonctionnels à Implémenter

### 1. Tableau de bord
- Recommandations d'offres basées sur le profil
- Statistiques de candidatures
- Notifications récentes

### 2. Suivi des candidatures
- Liste complète des candidatures
- Filtres par statut
- Historique détaillé
- Messagerie avec recruteurs

### 3. Alertes emploi
- Création d'alertes personnalisées
- Gestion des alertes actives
- Fréquence de réception

### 4. Messagerie
- Conversations avec recruteurs
- Notifications de nouveaux messages

### 5. Notifications
- Centre de notifications
- Filtrage par type
- Marquage lu/non lu

### 6. Paramètres & Confidentialité
- Gestion du mot de passe ✅
- Visibilité du profil
- Consentements RGPD
- Export de données
- Suppression du compte

---

## 🔧 Prochaines Étapes de Développement

### Phase 1 : Profil Candidat Complet
1. Créer `CandidatePersonalInfo.jsx` - Informations personnelles détaillées
2. Créer `CandidateProfessionalStatus.jsx` - Situation et préférences
3. Créer `CandidateDocuments.jsx` - Gestion des documents
4. Créer `CandidateExperience.jsx` - Expériences professionnelles
5. Créer `CandidateEducation.jsx` - Formations et certifications
6. Créer `CandidateSkills.jsx` - Compétences et langues
7. Créer `CandidatePitch.jsx` - Présentation personnelle

### Phase 2 : Fonctionnalités Principales
8. Implémenter le tableau de bord avec recommandations
9. Créer le système de candidatures
10. Implémenter les alertes emploi
11. Créer la messagerie
12. Implémenter les notifications

### Phase 3 : Côté Entreprise
13. Formulaire de création d'offres
14. Gestion des offres publiées
15. Consultation des candidatures
16. Tri et filtrage des candidats
17. Messagerie avec les candidats

### Phase 4 : Matching & Algorithmes
18. Algorithme de recommandation d'offres
19. Score de matching candidat/offre
20. Alertes automatiques basées sur le profil

---

## 📝 Mutations & Queries Convex à Créer

### Profil Candidat
- `candidateProfile.upsert` - Créer/Mettre à jour le profil
- `candidateProfile.get` - Récupérer le profil

### Expériences
- `experiences.create` - Ajouter une expérience
- `experiences.update` - Modifier une expérience
- `experiences.delete` - Supprimer une expérience
- `experiences.list` - Lister les expériences

### Formations
- `educations.create` - Ajouter une formation
- `educations.update` - Modifier une formation
- `educations.delete` - Supprimer une formation
- `educations.list` - Lister les formations

### Certifications
- `certifications.create` - Ajouter une certification
- `certifications.update` - Modifier une certification
- `certifications.delete` - Supprimer une certification
- `certifications.list` - Lister les certifications

### Documents
- `documents.upload` - Upload un document
- `documents.delete` - Supprimer un document
- `documents.setPrimary` - Définir le CV principal
- `documents.list` - Lister les documents

### Offres d'emploi
- `jobOffers.create` - Créer une offre
- `jobOffers.update` - Modifier une offre
- `jobOffers.delete` - Supprimer une offre
- `jobOffers.list` - Lister les offres
- `jobOffers.search` - Rechercher des offres
- `jobOffers.getRecommendations` - Recommandations basées sur le profil

### Candidatures
- `applications.create` - Postuler à une offre
- `applications.updateStatus` - Mettre à jour le statut
- `applications.list` - Lister les candidatures
- `applications.getByJobOffer` - Candidatures pour une offre

### Alertes
- `jobAlerts.create` - Créer une alerte
- `jobAlerts.update` - Modifier une alerte
- `jobAlerts.delete` - Supprimer une alerte
- `jobAlerts.toggleActive` - Activer/désactiver
- `jobAlerts.list` - Lister les alertes

### Messages
- `messages.send` - Envoyer un message
- `messages.markAsRead` - Marquer comme lu
- `messages.getConversation` - Récupérer une conversation
- `messages.list` - Lister les messages

### Notifications
- `notifications.create` - Créer une notification
- `notifications.markAsRead` - Marquer comme lue
- `notifications.markAllAsRead` - Tout marquer comme lu
- `notifications.list` - Lister les notifications
- `notifications.getUnreadCount` - Nombre de non lues

---

## 🎯 Avantages de cette Architecture

### ✅ Scalabilité
- Structure modulaire
- Séparation claire des responsabilités
- Index optimisés pour les requêtes

### ✅ Flexibilité
- Champs optionnels permettant l'évolution
- Système de types extensible
- Support multi-langues

### ✅ Performance
- Index sur les champs fréquemment recherchés
- Queries optimisées
- Pagination native avec Convex

### ✅ Sécurité
- Authentification par tokens
- Permissions basées sur le userType
- Données sensibles hashées (mot de passe)

### ✅ Expérience Utilisateur
- Profils riches et détaillés
- Recommandations personnalisées
- Notifications en temps réel
- Messagerie intégrée

---

## 📊 Dashboard Convex

Toutes les tables et index sont maintenant disponibles dans votre dashboard Convex :
**https://dashboard.convex.dev** → Projet "standing-chameleon-180"

Vous pouvez visualiser :
- Les 18 tables créées
- Les index de recherche
- Les données en temps réel
- Les logs des requêtes

---

## 🚀 Déploiement

Le schéma complet est déjà déployé sur Convex et opérationnel !

Pour de futurs déploiements :
```bash
npx convex deploy
```

---

**Date de création :** 27 octobre 2025
**Version :** 2.0.0
**Status :** ✅ Schéma déployé, Composants à développer
