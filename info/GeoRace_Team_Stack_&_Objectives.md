# GeoRace - Stack Technique, Outils de Gestion & Objectifs par Phase

> **Epitech Innovation Track**
> Architecture de référence : PoC local → MVP VPS self-hosted → Scale

---

## Table des matières

1. [Stack Technique](#1-stack-technique)
2. [Outils de Gestion de Projet](#2-outils-de-gestion-de-projet)
3. [Rôles de l'équipe](#3-rôles-de-léquipe)
4. [Objectifs par Phase](#4-objectifs-par-phase)

---

## 1. Stack Technique

### 1.1 Mobile - React Native + Expo

| Choix | Technologie | Justification |
|-------|-------------|---------------|
| **Framework mobile** | React Native + Expo | Cross-platform iOS & Android depuis une seule codebase · Expo Go permet la distribution instantanée sans App Store pendant le PoC |
| **GPS Tracking** | `expo-location` | API GPS native haute précision · Mode `BestForNavigation` · Gestion des permissions iOS/Android intégrée |
| **Carte & Polylines** | `react-native-maps` + Mapbox SDK | Affichage de la trace GPS · Rendu du ghost en temps réel · Migration vers OSM/Leaflet prévue à 2 000 users |
| **Stockage local (PoC)** | `AsyncStorage` | Sauvegarde des runs 100% locale · Zéro backend requis pour le PoC |
| **State management** | Zustand | Léger · Pas de boilerplate Redux · Idéal pour gérer l'état du run en cours et du ghost |
| **Navigation** | React Navigation v6 | Standard de facto React Native · Stack + Tab navigators |
| **WebSocket (Phase 2)** | `socket.io-client` | Communication temps réel pour les duels live · Compatible NestJS |
| **Notifications push** | Expo Notifications + FCM/APNs | Alertes "run prêt" après traitement ghost · Gratuit |

---

### 1.2 Backend - NestJS (Phase 2)

| Choix | Technologie | Justification |
|-------|-------------|---------------|
| **Framework backend** | NestJS (Node.js) | Architecture modulaire · Injection de dépendances · Compatible microservices · WebSocket intégré |
| **Langage** | TypeScript | Typage statique · Meilleure maintenabilité · Partagé avec le frontend React Native |
| **API** | REST + WebSocket | REST pour les opérations CRUD · WebSocket uniquement pour les duels live |
| **Authentification** | JWT (stateless) + Passport.js | Scalabilité horizontale · OAuth Google/Apple + email/bcrypt en fallback |
| **Queue asynchrone** | Redis + BullMQ | Découplage API / Ghost Worker · Traitement non-bloquant · Retry automatique |
| **Validation** | class-validator + class-transformer | Validation des inputs API · Protection contre les injections |
| **ORM** | TypeORM | Migrations versionnées · Compatible PostgreSQL/PostGIS · Requêtes typées |

---

### 1.3 Base de Données

| Choix | Technologie | Justification |
|-------|-------------|---------------|
| **Base principale** | PostgreSQL 15 | Robuste · Mature · Large écosystème · Séparable sur VPS dédié si besoin |
| **Extension géospatiale** | PostGIS | Calcul de distances · Index spatiaux · Recherche de ghosts par zone · Requêtes de proximité |
| **Cache & Queue** | Redis 7 | BullMQ pour la queue Ghost Workers · Pub/Sub WebSocket · Persistance `appendonly` |
| **Stockage runs/replays** | Disque VPS + Backblaze B2 | Polylines compressées sur disque local · Sauvegardes quotidiennes automatiques |

---

### 1.4 Infrastructure & DevOps

| Choix | Technologie | Justification |
|-------|-------------|---------------|
| **Hébergement** | Hetzner CX21 (Nuremberg, DE) | ~6 €/mois · 2 vCPU / 4 GB RAM · 20 TB bande passante · Énergie renouvelable · RGPD natif |
| **Conteneurisation** | Docker + Docker Compose | Isolation des services · Restart automatique · Portabilité |
| **Reverse proxy** | Nginx | TLS/HTTPS · Rate limiting · Routage vers les conteneurs |
| **SSL** | Let's Encrypt (Certbot) | Gratuit · Renouvellement automatique |
| **CI/CD** | GitHub Actions | 2 000 min/mois gratuits · Lint + Tests + Build + Déploiement |
| **Monitoring erreurs** | Sentry (plan Free) | Tracking erreurs backend & mobile · 5 000 erreurs/mois gratuitement |
| **Uptime monitoring** | UptimeRobot (plan Free) | Surveillance VPS toutes les 5 min · Alerte en cas de panne |
| **Backup** | Backblaze B2 + pg_dump | 0,006 USD/GB · API S3-compatible · Rétention 7j + 4 semaines |

---

### 1.5 Récapitulatif Stack par Phase

```
  PoC (2 semaines)                MVP Phase 2 (Mois 1-6)          Scale (Mois 7+)
  ─────────────────────────────   ──────────────────────────────   ─────────────────────
  React Native + Expo             + NestJS + TypeORM               + VPS upgrade (CCX23)
  expo-location (GPS)             + PostgreSQL + PostGIS           + VPS WebSocket dédié
  AsyncStorage (local)            + Redis + BullMQ                 + OSM self-hosted
  react-native-maps               + Docker Compose + Nginx         + Monitoring avancé
  Ghost dummy JSON                + GitHub Actions CI/CD           + Sentry Team
  Expo Go (distribution)          + Backblaze B2 backup            + CDN tuiles
  Zustand (state)                 + Sentry Free + UptimeRobot
  Coût infra : 0 €/mois           Coût infra : ~10-18 €/mois       Coût : ~100-230 €/mois
```

---

## 2. Outils de Gestion de Projet

### 2.1 Suivi des tâches - GitHub Projects

**Choix : GitHub Projects (Kanban)**

| Avantage | Détail |
|----------|--------|
| **Intégration native** | Issues, PRs et tâches au même endroit que le code |
| **Gratuit** | Inclus dans GitHub Free |
| **Automatisation** | Les PRs merged passent automatiquement en "Done" |
| **Vues multiples** | Kanban · Tableau · Roadmap timeline |

**Colonnes du board :**
```
  📋 Backlog  →  🎯 Sprint actuel  →  🔧 En cours  →  👀 En review  →  ✅ Done
```

> Jira est écarté : surdimensionné pour une équipe de 4 personnes.

---

### 2.2 Communication - Discord

**Choix : Discord (serveur dédié GeoRace)**

| Canal | Usage |
|-------|-------|
| `#général` | Annonces et discussions générales |
| `#dev-mobile` | Questions React Native / Expo / GPS |
| `#dev-backend` | Questions NestJS / PostgreSQL / Redis |
| `#algo-ghost` | Discussions algorithme matching + ELO |
| `#bugs` | Signalement rapide de bugs hors GitHub |
| `#standup` | Daily async (fait / en cours / bloqué) |
| `#tests-terrain` | Retours des sessions de test GPS outdoor |

---

### 2.3 Documentation - Notion

**Choix : Notion (workspace partagé)**

| Page | Contenu |
|------|---------|
| 📌 **Roadmap** | Vision globale, phases, jalons |
| 📋 **Backlog produit** | MoSCoW détaillé, user stories |
| 🏗️ **Architecture** | Schémas C4, décisions techniques (ADR) |
| 🔒 **RGPD & Legal** | CGU draft, politique de confidentialité, checklist CNIL |
| 🧪 **Tests utilisateurs** | Résultats questionnaires PoC, feedback terrain |
| 📊 **Métriques** | Dashboard KPIs (rétention J7, ELO distribution, conversion) |

---

### 2.4 Versioning & Collaboration Code - GitHub

| Pratique | Détail |
|----------|--------|
| **Branching** | `main` (stable) · `develop` (intégration) · `feature/xxx` |
| **Pull Requests** | Review obligatoire par 1 membre avant merge |
| **Conventional Commits** | `feat:` · `fix:` · `chore:` · `docs:` |
| **GitHub Actions** | CI automatique sur chaque PR |
| **Releases** | Tags semver (`v0.1.0`, `v1.0.0`) par phase |

---

### 2.5 Design & Prototypage - Figma

| Usage | Détail |
|-------|--------|
| **Wireframes** | Maquettes basse fidélité des écrans clés |
| **Prototype interactif** | Flow de démo pour les jurys sans dev |
| **Design system** | Couleurs, typographie, composants réutilisables |
| **Écrans prioritaires** | Run recording · Ghost replay · Résultat + ELO · Dashboard |

---

### 2.6 Récapitulatif des Outils

| Besoin | Outil | Coût |
|--------|-------|------|
| Gestion des tâches & sprints | GitHub Projects | Gratuit |
| Communication d'équipe | Discord | Gratuit |
| Documentation | Notion | Gratuit |
| Code & CI/CD | GitHub + GitHub Actions | Gratuit |
| Design & prototypage | Figma | Gratuit |
| Monitoring erreurs | Sentry | Gratuit |
| Uptime VPS | UptimeRobot | Gratuit |
| **Total outils** | | **0 €/mois** |

---

## 3. Rôles de l'Équipe

### 👤 Rôle 1 - Product Owner & Conformité

**Responsabilités produit :**
- Maintenir et prioriser le **backlog produit** (MoSCoW)
- Définir les **critères d'acceptation** de chaque feature et valider les livrables
- Coordonner les sprints, animer les **daily standups** et les rétrospectives
- Être l'**interlocuteur principal** pour les jurys, présentations et démos
- Gérer la **roadmap** et arbitrer les décisions de scope

**Responsabilités conformité :**
- Rédiger et maintenir les **CGU et la Politique de Confidentialité** conformes au RGPD
- Coordonner la consultation **CNIL** avant le lancement Phase 2
- Superviser les **tests utilisateurs** du PoC et analyser les questionnaires post-course
- Assurer la conformité **WCAG 2.1 AA** (accessibilité) sur les écrans principaux

**Compétences clés :** Vision produit · Communication · RGPD · Gestion de priorités · Personas utilisateurs

---

### 👤 Rôle 2 - Développeur Mobile (React Native)

**Responsabilités :**
- Développer l'**application mobile** iOS & Android (React Native + Expo)
- Implémenter le **GPS tracking** temps réel (`expo-location`, mode `BestForNavigation`)
- Construire le **Ghost Replay Engine** (affichage polyline + indicateur avance/retard)
- Intégrer le **ghost dummy** hardcodé pour le PoC (JSON statique)
- Gérer la **sauvegarde locale** des runs (AsyncStorage)
- Implémenter l'**interface utilisateur** (run recording, replay, résultat, dashboard)
- Assurer la **compatibilité multi-appareils** et conduire les tests terrain GPS

**Compétences clés :** React Native · Expo · GPS mobile · `react-native-maps` · Zustand · UX mobile

---

### 👤 Rôle 3 - Développeur Backend & DevOps

**Responsabilités :**
- Construire et maintenir le **backend NestJS** (API REST + WebSocket) en Phase 2
- Configurer et administrer le **VPS Hetzner** (Docker Compose, Nginx, SSL)
- Développer le **Ghost Worker Pipeline** (nettoyage GPS, compression polyline, score, ELO)
- Gérer **PostgreSQL + PostGIS** et les migrations TypeORM
- Mettre en place le **pipeline CI/CD** (GitHub Actions)
- Assurer les **sauvegardes automatiques** (pg_dump → Backblaze B2) et tester les restaurations
- Configurer le **monitoring** (UptimeRobot, Sentry) et rédiger le runbook de restauration

**Compétences clés :** NestJS · PostgreSQL/PostGIS · Docker · Redis/BullMQ · Linux · GitHub Actions

---

### 👤 Rôle 4 - Développeur Algorithmes & Sécurité

**Responsabilités :**
- Concevoir et implémenter le **Ghost Matching Engine** (sélection du ghost optimal : ELO + distance + type de parcours)
- Développer et affiner le **système ELO** (calcul des gains/pertes, pondération dynamique, tranches de niveau)
- Implémenter le **module anti-triche** (score de suspicion, détection vitesse anormale, téléportation GPS)
- Concevoir l'**algorithme de nettoyage GPS** (filtre de Kalman, Douglas-Peucker, gestion des lacunes)
- Réaliser les **audits de sécurité** du backend (OWASP Top 10 : injections SQL, JWT, rate limiting)
- Tester la **résistance aux attaques** courantes (spoofing GPS, abus API, brute force auth)
- Documenter les **décisions algorithmiques** (ADR) et maintenir leur lisibilité pour l'équipe

**Compétences clés :** Algorithmique · Théorie ELO · Géospatial (PostGIS) · Sécurité applicative · OWASP · Analyse GPS

---

## 4. Objectifs par Phase

### 🧪 Phase 0 - PoC (2 semaines)

**Objectif central :** Valider que la mécanique de Ghost Race est engageante avant tout investissement backend.

| Livrable | Critère de succès |
|----------|------------------|
| GPS tracking fonctionnel | Run de ~1 km enregistré sans perte de signal sur 3 appareils |
| Sauvegarde locale du run | Run consultable après fermeture et réouverture de l'app |
| Ghost replay de sa propre course | Trace du run précédent affichée correctement sur la carte |
| Ghost dummy intégré | Run hardcodé (~1 km à 5:30/km) visible sur la carte pendant la course |
| Indicateur avance/retard | Visible en temps réel pendant la course contre le ghost |
| Tests utilisateurs | Minimum 5 personnes testent en conditions réelles |
| Score d'engagement | Score moyen ≥ 3,5/5 sur le questionnaire post-course |

**Absent volontairement :** Auth · Backend · ELO · Anti-triche · Matchmaking · Serveur

---

### 🚀 Phase 1 - MVP (Mois 1 à 6)

**Objectif central :** Lancer un produit fonctionnel avec de vrais utilisateurs dans 1-2 villes pilotes.

| Domaine | Objectif | Critère de succès |
|---------|----------|------------------|
| **Produit** | Ghost Matching Engine opérationnel | Upload d'un run → ghost réel reçu automatiquement |
| **Produit** | Système ELO fonctionnel | Score ELO mis à jour après chaque ghost race |
| **Produit** | Anti-triche basique actif | Runs à vitesse anormale rejetés avant injection dans le pool |
| **Infra** | VPS Hetzner opérationnel | Uptime > 95% · Restauration testée < 30 min |
| **Infra** | CI/CD en place | Chaque merge sur `main` déclenche un déploiement automatique |
| **Légal** | RGPD conforme | CGU + Politique de confidentialité publiées · Droit à l'effacement implémenté |
| **Traction** | Utilisateurs actifs | 500 users actifs dans 1-2 villes pilotes |
| **Engagement** | Rétention J7 | > 40% |
| **Engagement** | Ghost races / semaine / user | 5 à 8 |

---

### 🎮 Phase 2 - Gamification & Social (Mois 7 à 12)

**Objectif central :** Fidéliser la base existante et activer la croissance virale.

| Domaine | Objectif | Critère de succès |
|---------|----------|------------------|
| **Produit** | Module duel live activé | Duels temps réel avec latence < 500ms |
| **Produit** | Badges & achievements | 10+ badges · 30% des users ont ≥ 1 badge débloqué |
| **Produit** | Classements locaux | Leaderboard par ville mis à jour en temps réel |
| **Produit** | Profils détaillés | Historique ghost races · Progression ELO graphique · Ratio V/D |
| **Croissance** | Utilisateurs actifs | 5 000 users · Expansion 5 villes |
| **Croissance** | Coefficient K | > 1,2 |
| **Croissance** | Croissance mensuelle | +20% nouveaux utilisateurs |
| **Infra** | Stabilité à l'échelle | VPS upgradé si > 2 000 users simultanés |

---

### 🌍 Phase 3 - Scale & Monétisation (An 2)

**Objectif central :** Atteindre la rentabilité et préparer l'expansion nationale.

| Domaine | Objectif | Critère de succès |
|---------|----------|------------------|
| **Monétisation** | Version Premium lancée | 4,99 €/mois · Conversion 8-12% |
| **Monétisation** | LTV / CAC | > 3 · Marge brute infra > 90% |
| **Produit** | Ghost races multi-coureurs | Replay de peloton 3-5 coureurs fonctionnel |
| **Produit** | Tournois & ligues saisonnières | 1 tournoi officiel GeoRace organisé |
| **Partenariats** | Marques sportives | ≥ 1 accord de sponsoring (Nike / Adidas / Decathlon) |
| **Infra** | Migration OSM self-hosted | Zéro coût API cartographique |
| **Traction** | Utilisateurs actifs | 50 000 users · 10+ villes |
| **Traction** | Abonnés Premium | 4 000+ abonnés → ~20 000 €/mois |

---

## Récapitulatif Visuel

```
  PHASE 0          PHASE 1              PHASE 2              PHASE 3
  ─────────────    ─────────────────    ─────────────────    ─────────────────
  PoC 2 semaines   MVP Mois 1-6         Gamification 7-12    Scale An 2
  ─────────────    ─────────────────    ─────────────────    ─────────────────
  0 € infra        ~10-18 €/mois        ~45-100 €/mois       ~230 €/mois
  0 backend        VPS Hetzner          VPS upgradé          OSM self-hosted
  Local only       Ghost réel + ELO     Duel live + badges   Premium + tournois
  5 testeurs       500 users · 2 villes 5 000 users · 5v     50 000 users · 10v
  ─────────────    ─────────────────    ─────────────────    ─────────────────
  Valider          Prouver              Fidéliser            Monétiser
  l'engagement     la traction          et viraliser         et scaler
```

---

*Document réalisé dans le cadre du projet GeoRace - Epitech Innovation Track*
*Stack : React Native · NestJS · PostgreSQL/PostGIS · Redis · Docker · Hetzner*