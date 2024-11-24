<p align="center">
  <img src="./public/castle.png" alt="Logo du projet" width="250">
</p>

# 🎮 Projet de Jeu RPG en TypeScript

Plongez dans **The Hyrule Castle**, un **jeu RPG captivant** développé en TypeScript. Dans cette aventure, vous incarnez des héros courageux qui doivent explorer les profondeurs du château de Hyrule. Votre mission : **combattre des ennemis redoutables**, **monter en niveau**, et relever des défis toujours plus intenses pour atteindre le boss final et **sauver votre village menacé**. 

Avec son système modulaire, ce projet offre une expérience évolutive, permettant l'ajout de nouveaux contenus et fonctionnalités au fil du temps. Préparez-vous à une aventure inoubliable où exploration et héroïsme seront vos meilleurs alliés !

---

## 🏆 Objectifs

- Concevoir un jeu RPG interactif en TypeScript.
- Implémenter un système modulaire pour faciliter l'ajout de **mods** et **fonctionnalités personnalisées**.
- Exploiter le design pattern **factory** pour une gestion optimisée des personnages, équipements et actions.
- Renforcer les compétences en TypeScript, notamment la gestion des types et la modularité.

---

## 📚 Structure du Projet

### 📂 Arborescence du projet

```plaintext
📂 hyrule-castle
├── 📂 public
├── 📂 src
│   ├── 📂 base_game              # Fonctions et classes de base pour le jeu
│   │   └── hyrule_castle.ts      # Gestion de la logique principale du jeu
│   ├── 📂 classes
│   │   ├── 📂 character          # Classes liées aux personnages
│   │   └── 📂 room               # Classes liées aux salles
│   ├── 📂 interfaces             # Interfaces TypeScript utilisées dans le projet
│   ├── 📂 lib                    # Bibliothèques utilitaires
│   ├── 📂 mods                   # Mods pour différents niveaux de difficulté
│   │   ├── 📂 easy               # Mod facile
│   │   ├── 📂 intermediate       # Mod intermédiaire
│   │   └── 📂 hard               # Mod difficile
│   ├── 📂 utils                  # Utilitaires partagés
│   └── 📄 main.ts                # Point d'entrée principal du projet

```

## ⚙️ **Installation**
### 1. Pré-requis
Assurez-vous que les outils suivants sont installés sur votre machine :
- Node.js : Version 16 ou plus récente.
- TypeScript : Version 5 ou plus récente.


### 2. **Installation**
1. **Cloner le dépôt** :
```bash
  git clone <url_du_dépôt>
  cd <nom_du_projet>
```
2. **Installez les dépendances :**
```bash
  npm install
```

## 🚀 **Lancement**
### **1. Lancer le projet**
```bash
  npm start
```

## **🛠️ Fonctionnalités**
- **Gestion des salles et des interactions** via des classes spécifiques (Room, Character).
- **Modifications dynamiques de gameplay** grâce aux mods (easy, intermediate, hard).
- **Utilisation d'ESLint** pour un code propre et maintenable.
- **Évolutivité facilitée** grâce à une architecture modulaire.


## 🌟 Ressources Utilisées
- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/fr)
- [ts-node](https://github.com/TypeStrong/ts-node)
- [eslint](https://github.com/eslint/eslint)


# 🏰 Plongez dans l'aventure et prouvez que vous êtes digne de Hyrule Castle ! ⚔️
