# GeoRace - Spécifications Techniques & Fonctionnelles

> **Epitech Innovation Track** | Architecture VPS self-hosted

---

## Scope MVP - PoC 2 Semaines

Le PoC livrable en 2 semaines est volontairement minimal.

### Inclus dans le PoC

- GPS Tracking en temps réel (enregistrement du run)
- Sauvegarde locale du run sur l'appareil (AsyncStorage)
- Ghost Replay : rejouer sa propre course après la fin
- 1 ghost dummy pré-intégré (run hardcodé dans l'app)
- Course contre le ghost dummy avec indicateur avance/retard

### Hors scope PoC (prévu Phase 2+)

- Authentification (OAuth, email/password)
- Backend / serveur / base de données
- Upload de runs vers un serveur
- Ghost Matching Engine réel
- Système ELO
- Anti-triche
- WebSocket / duels live
- Redis / BullMQ
- Notifications push
- Leaderboard
- Paiement Premium

### Stack technique PoC

| Technologie | Usage |
|-------------|-------|
| React Native + Expo | Framework mobile cross-platform |
| `expo-location` | GPS tracking |
| AsyncStorage | Stockage local des runs |
| `react-native-maps` | Affichage carte + polyline |
| Ghost dummy JSON | Run hardcodé, pas de backend |

---

## Partie 1 - Architecture Système (VPS Version)

### Modèle C4

---

#### Niveau 1 - Contexte

**Acteurs externes :**
- Utilisateurs (coureurs)
- Google / Apple (OAuth)
- Mapbox / Google Maps API
- Stripe (Premium futur)
- Apple Push / Firebase Cloud Messaging
- (Optionnel futur) Fédérations sportives

**GeoRace est :**
Une plateforme de compétition asynchrone immersive (Ghost Races) avec module duel live secondaire, hébergée initialement sur un VPS étudiant mais conçue pour être horizontalement scalable via conteneurisation et traitement asynchrone.

---

#### Niveau 2 - Containers

##### Mobile App (iOS / Android)
- React Native
- GPS tracking
- Mode Run Recorder
- Ghost Replay Engine
- WebSocket (duel live uniquement)

Application stateless, communique uniquement via REST + WebSocket.

##### Backend + Ghost Engine (Self-hosted VPS)
- REST API
- Auth JWT
- WebSocket (duel)
- Validation input
- Envoi jobs vers queue Redis

L'API est stateless → scalable horizontalement.

##### Ghost Worker Container (Scalable Unit)
Container indépendant :
- Nettoyage GPS
- Compression polyline
- Anti-cheat
- Calcul score
- Update ELO
- Génération replay

Consomme les jobs via Redis Queue. Peut être dupliqué si charge ↑.

##### Redis Container (Queue Layer)
- BullMQ
- Job queue asynchrone
- Découplage API / Worker

Permet : traitement non bloquant, parallélisation, scaling horizontal futur.

##### PostgreSQL + PostGIS Container
- Requêtes distance
- Indexation géospatiale
- Recherche ghost
- Analyse trajectoire

Peut être séparé sur autre VPS si charge ↑.

##### Nginx Reverse Proxy
- TLS
- Rate limiting
- Routage vers containers
- Sécurité de base

##### VPS Server (Phase 1)

| Caractéristique | Valeur |
|----------------|--------|
| vCPU | 1-2 |
| RAM | 2-4 GB |
| Moteur | Docker Engine |
| Coût estimé | ~5-15 €/mois |

Héberge : API container · Worker container · Redis · PostgreSQL · Nginx

---

#### Niveau 3 - Components (Backend)

| Module | Fonctionnalités |
|--------|----------------|
| **Auth Module** | OAuth · Email/password · JWT stateless |
| **User Service** | Profil · Stats · ELO · Certification |
| **Run Service (CENTRAL)** | Upload run · Validation · Compression · Stockage brut temporaire · Push job vers Redis · Suivi statut processing |
| **Ghost Worker** | Clean GPS noise · Vérification cohérence vitesse · Compression polyline · Calcul performance · Anti-cheat · Update DB · Trigger matchmaking |
| **Ghost Matching Service (CORE)** | Matching ELO · Matching distance · Matching type parcours · Sélection ghost optimal |
| **Replay Engine** | Reconstruction trajectoire · Interpolation position · Calcul différentiel distance · Génération data client-ready |
| **ELO Service** | Update après ghost race · Update après duel live · Pondération dynamique |
| **Duel Service (Secondaire)** | Création duel · Acceptation · Countdown · Finalisation |
| **Anti-Cheat Module (CRITIQUE)** | Analyse vitesse max · Détection téléportation GPS · Détection accélération impossible · Détection modification trace · Score suspicion |

---

### Défense du Stack Technique

| Technologie | Justification |
|-------------|---------------|
| **React Native** | Cross-platform · GPS support mature · Animations replay possibles |
| **Node.js + NestJS** | Architecture modulaire · Compatible microservices · Intégration simple Redis Queue · WebSocket duel uniquement |
| **Redis + BullMQ** | Découplage API / Processing · Traitement asynchrone scalable · Ajout simple de workers · Gestion retry automatique - **cœur de la scalabilité** |
| **PostgreSQL + PostGIS** | Indexation géospatiale · Recherche ghost efficace · Optimisé via indexes · Séparable sur VPS dédié futur |
| **Docker** | Isolation services · Portabilité · Migration future vers Kubernetes / Cloud · Déploiement reproductible |

**Stratégie VPS :**

```
  Phase 1 : Single VPS
  Phase 2 : Upgrade vertical
  Phase 3 : Split DB / Workers
  Phase 4 : Multi-node
  Sans refonte majeure
```

---

### Decision Record (PoC Version)

**Nous développons uniquement pour le PoC :**
- GPS Recorder (enregistrement + sauvegarde locale)
- Ghost Replay Engine (lecture locale du run sauvegardé)
- Ghost Dummy (run hardcodé, point de comparaison fixe)
- Race vs Ghost (indicateur temps réel avance/retard)

**Différé à la Phase 2 MVP :**
- Ghost Matching Engine
- Run Validation Engine
- Ghost Worker Pipeline
- ELO System
- Anti-Cheat
- Backend complet

> Le duel live reste une extension fonctionnelle non critique pour le MVP - il n'impacte pas l'architecture core.

---

## Partie 2 - Data & API Modeling

### Schéma de Base de Données (ERD simplifié)

#### USERS

| Field | Type |
|-------|------|
| id | UUID |
| email | string |
| password_hash | string |
| username | string |
| elo_score | integer |
| sexe | enum (optional) |
| height | float |
| weight | float |
| bmi | float |
| certified_sport | boolean |
| created_at | timestamp |

#### RUNS

| Field | Type |
|-------|------|
| id | UUID |
| user_id | FK |
| distance | float |
| duration | float |
| avg_speed | float |
| max_speed | float |
| elevation_gain | float |
| polyline | text (compressed) |
| validated | boolean |
| created_at | timestamp |

#### RUN_PROCESSING_JOBS

| Field | Type |
|-------|------|
| id | UUID |
| run_id | FK |
| status | enum (pending, processing, done, failed) |
| attempts | integer |
| created_at | timestamp |
| updated_at | timestamp |

> Permet : suivi état processing · Retry propre · Monitoring · Scalabilité worker

#### GHOST_MATCHES

| Field | Type |
|-------|------|
| id | UUID |
| run_id | FK |
| opponent_run_id | FK |
| result | enum (win/loss) |
| elo_delta | integer |
| created_at | timestamp |

#### DUELS (Secondaire)

| Field | Type |
|-------|------|
| id | UUID |
| status | enum |
| start_time | timestamp |
| end_time | timestamp |
| winner_id | UUID |

#### GPS_TRACKS (Stockage temporaire)

- Stockage brut temporaire
- Suppression après compression
- Réduction stockage

---

### Définition des APIs

#### Auth

```
POST /auth/login
POST /auth/oauth
POST /auth/register
```

#### Runs (Core)

```
POST /runs/upload    → Retourne run_id + status = "processing"
GET  /runs/:id       → Permet vérifier status
GET  /runs/me
```

#### Ghost

```
POST /ghost/match
GET  /ghost/:id
POST /ghost/:id/complete
```

#### Duel (Secondaire)

```
POST /duels/create
POST /duels/:id/accept
GET  /duels/:id
```

#### WebSocket (Duel uniquement)

**Client → Server :**
- `join_duel`
- `send_position`

**Server → Client :**
- `countdown`
- `position_update`
- `duel_finished`

---

## Partie 3 - Spécification UI / UX

### User Flow Principal

```
  1. Onboarding
       ↓
  2. Start Run (solo)
       ↓
  3. Finish Run
       ↓
  4. Upload → Écran "Analyse en cours..."
             → Animation
             → Notification push quand ready
       ↓
  5. Ghost Match automatique
       ↓
  6. Replay comparaison
       ↓
  7. Résultat + ELO update
```

> Le traitement asynchrone est invisible pour l'utilisateur.

---

### Écrans Clés

| # | Écran | Priorité |
|---|-------|----------|
| 1 | Login | MVP |
| 2 | Dashboard | MVP |
| 3 | Run recording | MVP |
| 4 | **Ghost replay screen** | MVP - **central** |
| 5 | Result + ELO | MVP |
| 6 | Duel live | Phase 2 - optionnel |

---

### Validation UX

**User Story :**
> *« Je veux ressentir une vraie compétition même en courant seul. »*

**Validation :**
→ Écran replay avec ghost dynamique + indicateur avance/retard.

---

## Résumé

> Le PoC tourne sans aucun serveur (React Native + Expo, 100% local). Le MVP Phase 2 tourne sur un seul VPS (API + Ghost + DB + WebSocket). Le duel live reste secondaire. Tout le traitement asynchrone (compression, scoring, ELO, replay) est central.

---

*Document réalisé dans le cadre du projet GeoRace - Epitech Innovation Track*
*PoC : React Native + Expo, 100% local | Phase 2 : VPS self-hosted, NestJS + PostgreSQL/PostGIS + React Native*
