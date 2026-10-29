# 🏁 GeoRace

> **Transformez chaque course en compétition.**

GeoRace est une application mobile de course à pied compétitive qui transforme chaque sortie running en véritable compétition immersive. En courant contre le **fantôme enregistré** d'un autre coureur de votre niveau - votre **Ghost Race** - vous vivez l'adrénaline d'un duel réel, seul, à votre rythme, n'importe où et n'importe quand.

> 🏫 *Epitech Innovation Track*

---

## 📋 Table des matières

- [Concept](#-concept)
- [Fonctionnalités](#-fonctionnalités)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Roadmap](#-roadmap)
- [Modèle économique](#-modèle-économique)
- [Équipe](#-équipe)
- [Documentation](#-documentation)

---

## 👻 Concept

La course à pied solo souffre de plusieurs problèmes fondamentaux :

| Problème | Impact |
|---|---|
| 😔 Démotivation lorsqu'on court seul | Abandon des objectifs sportifs |
| 🎯 Manque de défi concret | Entraînements sans direction |
| 📊 Difficulté à mesurer ses progrès | Stagnation perçue |
| ❌ Pas d'interaction compétitive | Ennui, décrochage |

**GeoRace** résout cela avec une approche unique : la **Ghost Race asynchrone**.

```
  VOUS COUREZ        ON MATCHE            VOUS AFFRONTEZ      VOUS PROGRESSEZ
  ─────────────      ─────────────        ──────────────      ───────────────
  📱 GPS             🧠 Algorithme        👻 Son replay        📈 ELO mis à
  enregistre     →   trouve le ghost  →   sur votre carte →   jour instantané
  votre run          parfait (ELO)        en temps réel
```

> **Strava vous dit combien vous avez couru. GeoRace vous dit si vous avez GAGNÉ.**

---

## 🚀 Fonctionnalités

### 👻 Ghost Race - Le cœur du produit (CORE)

- Upload de votre run après chaque sortie
- **Matching automatique** avec un ghost de niveau ELO similaire et distance comparable
- Replay de sa trajectoire sur votre carte en temps réel
- Indicateur d'avance/retard en temps réel
- Calcul du résultat et mise à jour ELO à l'arrivée
- **Système de placement ELO** : option de classement basé sur la vitesse sur distance fixe ou moyenne des courses
- **Création de courses (UGC)** : capacité à créer et partager vos propres parcours de course
- **Différents types de courses** : sprint, marathon, etc. avec leaderboards dédiés pour chaque type

### ⚖️ Système ELO

| Rang | Score |
|------|-------|
| 🥉 Bronze | 0 – 1 000 |
| 🥈 Argent | 1 000 – 1 500 |
| 🥇 Or | 1 500 – 2 000 |
| 💎 Platine | 2 000+ |

- Victoire contre un ghost plus fort → gains ELO importants
- Matchmaking par tranche ELO + distance similaire + type de parcours

### ⚡ Duels Live *(module secondaire)*

- Détection de coureurs actifs à proximité
- Défi et départ synchronisé
- Suivi de position en temps réel (WebSocket)
- Mise à jour ELO à l'issue du duel

### 🏅 Social & Communauté

- Profils : statistiques détaillées, ELO, historique des ghost races
- Statistiques de fin de course et statistiques globales
- Classements locaux et globaux
- Leaderboards par type de course (sprint, marathon, etc.)
- Liste d'amis avec section dédiée pour le leaderboard amis
- Badges & achievements
- Événements communautaires hebdomadaires
- **Système de partage des courses** : capacité à partager vos parcours et défier vos amis
- **Système de revenge** : possibilité de prendre votre revanche après qu'un adversaire ait battu votre ghost

### 🛡️ Anti-triche

- Détection de vitesse anormale, téléportation GPS, accélération impossible
- Chaque run est validé avant injection dans la base de ghosts

---

## 🛠 Tech Stack

### 📱 Mobile

| Technologie | Usage |
|---|---|
| **React Native + Expo** | Cross-platform iOS & Android |
| `expo-location` | GPS tracking haute précision |
| `react-native-maps` + Mapbox SDK | Affichage carte & polyline ghost |
| `AsyncStorage` | Sauvegarde locale (PoC) |
| Zustand | State management |
| React Navigation v6 | Navigation |
| `socket.io-client` | WebSocket duels live (Phase 2) |

### 🖥 Backend *(Phase 2)*

| Technologie | Usage |
|---|---|
| **NestJS** (Node.js + TypeScript) | API REST + WebSocket |
| PostgreSQL 15 + **PostGIS** | Base de données géospatiale |
| Redis 7 + BullMQ | Queue asynchrone Ghost Worker |
| TypeORM | ORM + migrations |
| JWT + Passport.js | Authentification |

### ☁️ Infra & DevOps

| Technologie | Usage |
|---|---|
| **Hetzner CX21** (~6 €/mois) | VPS hébergement |
| Docker + Docker Compose | Conteneurisation |
| Nginx + Let's Encrypt | Reverse proxy + SSL |
| GitHub Actions | CI/CD |
| Backblaze B2 + pg_dump | Sauvegardes |
| Sentry + UptimeRobot | Monitoring |

---

## 🏗 Architecture

### PoC (2 semaines) - 100% local, 0 backend

```
  📱 React Native + Expo
  ├── expo-location        → GPS tracking temps réel
  ├── AsyncStorage         → Sauvegarde locale du run
  ├── react-native-maps    → Affichage carte + polyline ghost
  └── Ghost dummy JSON     → Run hardcodé dans l'app
```

### MVP Phase 2 - VPS Hetzner (~10-18 €/mois)

```
  📱 Mobile          🖥️ VPS (Hetzner DE)              ☁️ Externe
  ────────────       ────────────────────────          ──────────
  React Native   →   Nginx · NestJS · Redis        →   Mapbox
  GPS + Replay       Ghost Worker · PostgreSQL          FCM · OAuth
  WebSocket          PostGIS · BullMQ                   Backblaze B2
```

---

## 🗓 Roadmap

| Phase | Durée | Objectif | Cible |
|---|---|---|---|
| 🧪 **PoC** | 2 semaines | Valider l'engagement Ghost Race | 5 testeurs · score ≥ 3,5/5 |
| 🚀 **MVP** | Mois 1–6 | Ghost Matching + ELO + Anti-triche | 500 users · 2 villes |
| 🎮 **V2** | Mois 7–12 | Duel live + Badges + Gamification | 5 000 users · 5 villes |
| 🌍 **Scale** | An 2 | Premium + Tournois + Partenariats | 50 000 users · 10 villes |

### ⚠️ Phase 0 - PoC (2 semaines)

- ✅ GPS Tracking (enregistrement d'un run en temps réel)
- ✅ Ghost Replay (rejouer sa propre course, sauvegarde locale)
- ✅ Ghost dummy pré-intégré (run hardcodé à 5:30/km)
- ✅ Indicateur d'avance/retard en temps réel
- ❌ Pas d'auth · pas d'ELO · pas de backend · pas d'anti-triche

### Backend local

Le premier backend est disponible dans [`src/backend`](./src/backend). Il fournit
l'authentification et la synchronisation des runs avec PostgreSQL.

```bash
cp src/backend/.env.example .env
npm run db:up
# renseigner JWT_SECRET (au moins 32 caractères)
npm run backend:start
```

La base PostgreSQL est lancée par Docker et son schéma est initialisé par
[`src/backend/init.sql`](./src/backend/init.sql). Pour arrêter le conteneur :

```bash
npm run db:down
```

Routes disponibles : `POST /auth/register`, `POST /auth/login`, `GET /me`,
`POST /runs`, `GET /runs`, `GET /runs/:id` et `DELETE /runs/:id`.
Les routes protégées utilisent `Authorization: Bearer <token>`.

---

## 💰 Modèle économique

| 🟢 Gratuit | 🟡 Premium - 4,99 €/mois |
|---|---|
| 3 ghost races / jour | Ghost races **illimitées** |
| Classement ELO | Statistiques avancées |
| Événements communautaires | Ghost vs ses propres records · 0 pub |

| Phase | Infra/mois | Revenus potentiels* | Marge brute |
|---|---|---|---|
| PoC | **0 €** | 0 € | - |
| MVP (1 000 users) | ~45 € | ~400 € | **~89%** |
| Scale (10 000 users) | ~230 € | ~4 000 € | **~94%** |

*8% conversion Premium à 4,99 €/mois*

**Revenus additionnels :**
- Partenariats marques sportives (Nike, Adidas, Decathlon)
- Événements premium : ghost races thématiques avec récompenses
- Coaching personnalisé basé sur l'historique ELO

---

## 🔍 Comparatif marché

| Fonctionnalité | **GeoRace** | Strava | Nike Run Club | Runkeeper |
|---|:---:|:---:|:---:|:---:|
| 👻 Ghost Race asynchrone | ✅ **CORE** | ❌ | ❌ | ❌ |
| 🎯 Matchmaking ELO | ✅ | ❌ | ❌ | ❌ |
| ⚡ Sans adversaire simultané | ✅ | ❌ | ❌ | ❌ |
| 📍 N'importe quel parcours | ✅ | ❌ | ❌ | ❌ |
| 📍 Tracking GPS | ✅ | ✅ | ✅ | ✅ |
| 🏆 Création de courses (UGC) | ✅ | ❌ | ❌ | ❌ |
| 🏃‍♂️ Différents types de courses | ✅ (sprint, marathon, etc.) | ❌ | ❌ | ❌ |
| 📊 Stats détaillées & globales | ✅ | ❌ basiques | ❌ basiques | ❌ basiques |
| 👥 Leaderboards amis | ✅ | ❌ | ❌ | ❌ |
| 🔄 Système de partage & revenge | ✅ | ❌ | ❌ | ❌ |

> 🏆 **GeoRace occupe un angle mort du marché.** Les grands acteurs sont trop ancrés dans le tracking social pour pivoter.

### Principaux différenciateurs compétitifs

GeoRace se démarque nettement des applications de course existantes grâce à son approche unique de la compétition asynchrone :

| Fonctionnalité | **GeoRace** | Strava | Nike Run Club | Runkeeper | Avantages Clés |
|---|:---:|:---:|:---:|:---:|:---|
| 👻 **Course Fantôme Asynchrone** | ✅ **CENTRALE** | ⚠️ Segments | ⚠️ Guidés | ⚠️ Limité | Courir contre de VRAIS adversaires à tout moment, pas juste des segments ou des défis guidés |
| 🎯 **Correspondance ELO Dynamique** | ✅ **CENTRALE** | ⚠️ Classement | ⚠️ Niveaux | ⚠️ Variable | Adversaires toujours à votre niveau exact pour des défis justes et stimulants |
| 🗺️ **Tout Itinéraire Libre** | ✅ **CENTRALE** | ⚠️ Limité | ⚠️ Limité | ⚠️ Variable | Compétition sur N'IMPORTE QUEL parcours choisi, pas seulement des segments prédéfinis |
| 👻 **Visuel Fantôme Temps Réel** | ✅ **UNIQUE** | ❌ | ❌ | ❌ | Expérience immersive : voir votre adversaire en tête-à-tête pendant votre course |
| 🛡️ **Validation Anti-triche Proactive** | ✅ **CENTRALE** | ⚠️ Basique | ⚠️ Basique | ⚠️ Variable | Intégrité compétitive préservée grâce à la validation préalable de chaque performance |
| 🔄 **Système de Revanche Instantané** | ✅ **CENTRALE** | ❌ | ❌ | ❌ | Reprenez immédiatement un duel après une défaite pour maintenir l'engagement |
| 🏗️ **Créateur de Parcours UGC** | ✅ **CENTRALE** | ⚠️ Partage | ⚠️ Limité | ⚠️ Variable | Créez, sauvegardez et défiez sur VOS parcours préférés |
| 🏃‍♂️ **Types de Courses Spécialisés** | ✅ **CENTRALE** (Sprint, Marathon, etc.) | ⚠️ Génériques | ⚠️ Génériques | ⚠️ Génériques | Classements dédiés par type d'entraînement pour un suivi précis |
| 🎯 **Focus Pure Compétitif** | ✅ **CENTRALE** | ⚠️ Social | ⚠️ Motivational | ⚠️ Suivi | Transforme la course en VRAI sport compétitif, pas juste en suivi d'activité |
| ⏰ **Vraie Asynchronie Totale** | ✅ **CENTRALE** | ❌ | ❌ | ❌ | Compétition 24/7 sans coordination d'emploi du temps nécessaire |

---

## 👥 Équipe

| Rôle | Responsabilités principales |
|---|---|
| **Product Owner & Conformité** | Backlog, roadmap, RGPD, tests utilisateurs, présentations |
| **Dev Mobile** | React Native, GPS tracking, Ghost Replay Engine, UI |
| **Dev Backend & DevOps** | NestJS, VPS Hetzner, CI/CD, Ghost Worker Pipeline |
| **Dev Algorithmes & Sécurité** | Ghost Matching Engine, ELO, anti-triche, OWASP |

**Outils de gestion :**

| Besoin | Outil | Coût |
|---|---|---|
| Tâches & sprints | GitHub Projects | Gratuit |
| Communication | Discord | Gratuit |
| Documentation | Notion | Gratuit |
| Code & CI/CD | GitHub + GitHub Actions | Gratuit |
| Design | Figma | Gratuit |
| **Total** | | **0 €/mois** |

---

## 📊 Métriques de succès

| Indicateur | Cible | Pourquoi ? |
|---|---|---|
| Rétention J7 | > 40% | Preuve que le Ghost Mode accroche |
| Ghost races/semaine/user | 5–8 | Indicateur d'engagement |
| Croissance mensuelle | +20% | Viralité naturelle |
| Coefficient K | > 1,2 | Chaque user amène 1,2 nouveau |
| Conversion Premium | 8–12% | LTV/CAC > 3 |

---

## 📁 Documentation

Tous les documents de référence sont disponibles dans le dossier [`info/`](./info/) :

| Fichier | Contenu |
|---|---|
| [`GeoRace.md`](./info/GeoRace.md) | Présentation complète du projet |
| [`GeoRace_Presentation.md`](./info/GeoRace_Presentation.md) | Slides de présentation (Marp) |
| [`GeoRace_Team_Stack_&_Objectives.md`](./info/GeoRace_Team_Stack_%26_Objectives.md) | Stack technique, équipe & objectifs |
| [`Client_Needs_&_Functional_Scope.md`](./info/Client_Needs_%26_Functional_Scope.md) | Personas, user stories, backlog MoSCoW |
| [`Technical_&_Functional_Specifications.md`](./info/Technical_%26_Functional_Specifications.md) | Spécifications techniques & fonctionnelles |
| [`GeoRace_Costing_&_Technical_Sizing.md`](./info/GeoRace_Costing_%26_Technical_Sizing.md) | Coûts & dimensionnement technique |
| [`Impacts_Risks_&_Mitigation.md`](./info/Impacts_Risks_%26_Mitigation.md) | Impacts, risques & plan de mitigation |
| [`Context_Audit_&_Compliance.md`](./info/Context_Audit_%26_Compliance.md) | Contexte, audit & conformité RGPD |

---

> **GeoRace - Run. Ghost. Win.** 🏁