# 🚀 DÉMARRER RAPIDEMENT

## ⚡ EN 3 ÉTAPES (5 MINUTES)

### 1️⃣ Installer les dépendances

```bash
npm install
```

⏱️ Patientez 2-3 minutes pendant l'installation...

### 2️⃣ Lancer le serveur

```bash
npm run dev
```

### 3️⃣ Ouvrir le navigateur

Ouvrez votre navigateur sur : **http://localhost:3000**

✅ **C'est tout ! Votre site est en ligne !**

---

## 📚 Documentation complète

Pour plus d'informations, consultez :

1. **INSTRUCTIONS.md** - Guide de démarrage détaillé
2. **README.md** - Documentation technique complète
3. **PROJET-COMPLET.md** - Récapitulatif du projet
4. **ARBORESCENCE.txt** - Structure du projet

---

## 🎨 Personnalisation rapide

### Changer les couleurs

Éditez `src/styles/variables.css` :

```css
:root {
  --primary: #6C00FF;      /* Votre couleur principale */
  --secondary: #F59E0B;    /* Votre couleur secondaire */
}
```

### Ajouter votre logo

1. Copiez votre logo dans `public/`
2. Nommez-le `logo-skillijob.png`
3. Rechargez la page

### Modifier les textes

- Page d'accueil → `src/pages/Home.jsx`
- Page Candidats → `src/pages/Candidates.jsx`
- Page Entreprises → `src/pages/Companies.jsx`

---

## ❓ Problèmes ?

### Le site ne démarre pas

```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Les images ne s'affichent pas

- Placez vos images dans le dossier `public/`
- Vérifiez les noms de fichiers

---

## 🌐 Tester sur téléphone

1. Trouvez votre IP locale :
   ```bash
   # Windows
   ipconfig

   # Mac/Linux
   ifconfig
   ```

2. Sur votre téléphone (même Wi-Fi), ouvrez :
   ```
   http://VOTRE-IP:3000
   ```

---

## 📞 Besoin d'aide ?

- 📖 Lisez **INSTRUCTIONS.md**
- 📧 contact@skillijob.com
- 📞 09 70 19 67 02

---

**🎉 Bienvenue dans votre nouveau site React !**
