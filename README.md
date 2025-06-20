# 📚 Bibliotheque_Num

> Cette application mobile permet de centraliser les livres et de gérer efficacement leur gestion (emprunts, utilisateurs, etc.).

---

## 📁 Structure du projet

BIBLIOTHEQUE_NUM/
│
├── database/ # Base de données et création des tables
├── Admin.js # Interface pour les administrateurs (création & gestion des comptes)
├── Bibliothecaire.js # Interface bibliothécaire
├── DetailsLivre.js # Détails d’un livre
├── Inscription.js # Formulaire d’inscription
├── Lecteur.js # Interface lecteur (emprunts, consultation)
├── Login.js # Page de connexion principale


---

## ⚙️ Technologies utilisées

- **React Native** — Framework pour le développement mobile
- **Expo** — Pour lancer et tester l’application rapidement
- **SQLite** — Base de données locale
- **VS Code** — Éditeur de code
- **Git** — Gestion de versions

---

## 🚀 Installation & Lancement

### 1. Prérequis

- Application mobile **Expo Go** installée sur le téléphone (disponible sur iOS et Android)

### 2. Installer Expo CLI

```bash
npm install -g expo-cli
```
### 3. Lancer le projet
```bash
npx expo start --tunnel
```

Tu peux accéder à l’application en ligne via le lien Expo suivant (après un eas update) :

https://expo.dev/accounts/djok2021/projects/bibliotheque_num/updates/d35e1d87-a157-4ac3-88a4-70c5c48f1e47