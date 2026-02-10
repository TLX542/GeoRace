#!/usr/bin/env pwsh
# PowerShell script to generate GeoRace documentation files
# Windows equivalent of build_zip.sh

# Set strict mode
$ErrorActionPreference = "Stop"

# Get script directory
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
if (-not $ScriptDir) {
    $ScriptDir = Get-Location
}
$OUTDIR = $ScriptDir
$AUTHOR = "TLX542"

# Backup function
function Backup-IfExists {
    param([string]$FilePath)
    
    if (Test-Path $FilePath) {
        $timestamp = Get-Date -Format "yyyyMMddHHmmss"
        $backup = "$FilePath.bak.$timestamp"
        $fileName = Split-Path -Leaf $FilePath
        $backupName = Split-Path -Leaf $backup
        Write-Host "  Backing up existing file: $fileName -> $backupName"
        Move-Item -Path $FilePath -Destination $backup -Force
    }
}

Write-Host "Creating assets directory if needed..."
$assetsDir = Join-Path $OUTDIR "assets"
if (-not (Test-Path $assetsDir)) {
    New-Item -ItemType Directory -Path $assetsDir | Out-Null
}

Write-Host "Generating markdown and assets..."

# --- GeoRace.md ---
$georaceMdPath = Join-Path $OUTDIR "GeoRace.md"
Backup-IfExists $georaceMdPath

$georaceMdContent = @'
# GeoRace

## GeoRace (Competitive Running App)

> **GeoRace** est une **application mobile de course à pied compétitive en temps réel** qui transforme vos sorties running en duels spontanés contre d'autres coureurs à proximité.
> Elle crée des courses équitables vers un point d'arrivée équidistant, avec un système de classement ELO pour des matchs équilibrés.

**Phrase clé :**
*« GeoRace : Transformez chaque course en compétition. »*

---

## Pourquoi ce projet ?

La course à pied en solo souffre de plusieurs problèmes :

* **Démotivation** lorsqu'on court seul
* **Manque de défi** et d'objectifs concrets
* **Difficulté à mesurer ses progrès** face à d'autres coureurs
* **Absence d'interaction sociale** pendant l'entraînement

> Ces facteurs conduisent de nombreux coureurs à abandonner leurs objectifs sportifs.

---

## Ce que fait GeoRace (cœur du projet)

### 🏃 1. Duels de course en temps réel

GeoRace permet de :

* **Détecter automatiquement** les coureurs actifs à proximité
* **Proposer un duel** avec un point d'arrivée équidistant
* **Lancer la course simultanément** après acceptation mutuelle
* **Suivre la progression** en temps réel via GPS

✔ Chaque course devient une compétition
✔ Point d'arrivée équitable garanti
✔ Départ synchronisé pour tous les participants

---

### 📍 2. Système de point d'arrivée équitable

**Fonctionnement :**

1. **Détection** : L'app repère les coureurs dans un rayon défini (500m-2km)
2. **Calcul du point d'arrivée** : Algorithme trouve un point équidistant pour tous les participants
3. **Proposition** : Les coureurs reçoivent une notification de défi
4. **Acceptation** : Si tous acceptent, compte à rebours de 10 secondes
5. **Course** : Navigation GPS vers le point d'arrivée

> Le système garantit que chaque coureur parcourt la même distance, rendant la compétition équitable

---

### 🎯 3. Système de classement ELO

**Principe :**

* Chaque coureur a un **score ELO** (comme aux échecs)
* Victoire contre adversaire plus fort = **+points importants**
* Victoire contre adversaire plus faible = **+points faibles**
* Défaite = **perte de points proportionnelle**

**Résultat :**

✔ Matchs équilibrés entre coureurs de niveau similaire
✔ Progression mesurable et satisfaisante
✔ Motivation renforcée par l'amélioration du score

---

## Problème à résoudre (détail)

### 🚫 Problème 1 : Démotivation du running solo

**Constat :**

* 67% des nouveaux coureurs abandonnent dans les **6 premiers mois**
* Raison principale : **manque de motivation** et d'objectifs concrets
* Les apps actuelles (Strava, Nike Run Club) se concentrent sur le **tracking**, pas la **compétition**

> **Résultat :** Les coureurs débutants n'ont pas de raison de continuer après la phase d'enthousiasme initial.

---

### 🚫 Problème 2 : Absence de compétition en temps réel

**Limites des solutions actuelles :**

* **Strava** : Segments pré-définis, comparaison *asynchrone*
* **Nike Run Club** : Défis mensuels sans interaction directe
* **Zwift Run** : Simulation virtuelle, pas de course en extérieur

> Aucune app ne propose de **duels spontanés en temps réel** entre coureurs à proximité.

---

### 🚫 Problème 3 : Compétitions inéquitables

**Problème :**

* Les courses traditionnelles (marathons, 10km) ne tiennent pas compte du **niveau réel** des participants
* Un débutant se retrouve contre des coureurs élites
* Résultat : **frustration** et **démotivation**

> **GeoRace résout ce problème** avec le système ELO qui garantit des matchs équilibrés.

---

## Différenciation (par rapport à la concurrence)

| Caractéristique | Strava | Nike Run Club | Zwift Run | **GeoRace** |
|---|:---:|:---:|:---:|:---:|
| Compétition en temps réel | ❌ | ❌ | ✅ (virtuel) | ✅ |
| Point d'arrivée équidistant | ❌ | ❌ | ❌ | ✅ |
| Matchmaking ELO | ❌ | ❌ | ❌ | ✅ |
| Course en extérieur | ✅ | ✅ | ❌ | ✅ |
| Duels spontanés 1v1 | ❌ | ❌ | ❌ | ✅ |

> **GeoRace est la seule app combinant compétition en temps réel, course en extérieur et duels équitables.**

---

## Proposition de valeur (Unique Selling Proposition)

### 🎯 Pour le coureur débutant

**Avant GeoRace :**

* Court seul, se démotive rapidement
* Ne sait pas si ses progrès sont réels
* Pas de raison de continuer après 2-3 semaines

**Avec GeoRace :**

* Chaque sortie = **possibilité de duel**
* Score ELO mesure les progrès **objectivement**
* Matchmaking garantit des **adversaires de niveau similaire**

> **Résultat :** Motivation durable et progression constante

---

### 🏃 Pour le coureur régulier

**Avant GeoRace :**

* Strava offre des segments, mais comparaison asynchrone
* Pas de vraie compétition, juste des stats
* Courses organisées = coût élevé + contraintes logistiques

**Avec GeoRace :**

* Duels **instantanés** à chaque sortie
* Compétition **réelle** contre adversaires motivés
* **Gratuit** (3 duels/jour) ou abonnement modéré

> **Résultat :** Compétition accessible à chaque sortie, sans contraintes

---

## Marché cible

### 📊 Segments de marché

**1. Marché primaire : Coureurs réguliers**

* **Taille :** ~5M de coureurs réguliers en France
* **Fréquence :** 2-4 sorties/semaine
* **Besoins :** Motivation, défi, progression mesurable

**2. Marché secondaire : Coureurs occasionnels**

* **Taille :** ~12M de coureurs occasionnels en France
* **Fréquence :** 1-2 sorties/semaine
* **Besoins :** Fun, interaction sociale, objectifs simples

---

### 🎯 Persona principal : Emma, 29 ans

**Profil :**

* Coureuse régulière (3-4x/semaine)
* Utilise Strava mais trouve ça « ennuyeux »
* Cherche **motivation** et **interaction**

**Problèmes :**

* Se démotive quand elle court seule
* Veut mesurer ses progrès contre d'autres coureurs
* Aimerait un défi quotidien simple

**GeoRace pour Emma :**

* Duels spontanés chaque fois qu'elle court
* Score ELO qui augmente avec ses victoires
* Satisfaction immédiate après chaque course

> **Emma est le cœur de notre marché cible.**

---

## Modèle économique

### 💰 Freemium

**Gratuit :**

* 3 duels/jour
* ELO basique
* Historique 7 jours

**Premium (9,99€/mois) :**

* Duels illimités
* Stats avancées (VO2max, zones cardio)
* Historique illimité
* Badge exclusifs

**Conversion estimée :** 8-12% freemium → premium

---

### 📈 Projections (année 1)

**Hypothèses conservatrices :**

* 10 000 utilisateurs actifs mensuels (MAU) en fin d'année 1
* Taux de conversion : 10%
* Churn : 5%/mois

**Revenus estimés (an 1) :**

* Premium : **1000 abonnés × 9,99€ × 12 mois = ~120k€**
* Publicité ciblée (non intrusive) : ~20k€

**Total an 1 :** ~140k€

---

## Architecture technique (MVP)

### 🏗️ Stack technique

**Mobile :**

* React Native (TypeScript)
* Expo pour déploiement rapide
* React Native Maps + GPS tracking

**Backend :**

* Node.js / Go (microservices)
* WebSocket pour positions temps réel
* Redis Streams / Kafka pour messages
* PostgreSQL + PostGIS pour géospatial
* Docker + Kubernetes

**Ops :**

* GitHub Actions (CI/CD)
* Prometheus + Grafana (monitoring)
* Sentry (error tracking)

---

### 🔒 Sécurité & Anti-triche

**Problèmes à adresser :**

1. **Spoofing GPS :** Coureurs trichant en simulant leur position
2. **Fuite de position :** Risque de stalking ou harcèlement
3. **DDoS :** Attaques sur l'infrastructure

**Solutions :**

* **Anti-cheat GPS :** Détection d'anomalies (vitesse impossible, sauts de position)
* **Chiffrement bout-en-bout** : Positions chiffrées en transit
* **Rate limiting** : Protection contre DDoS
* **RGPD compliance** : Consentement explicite pour partage position

---

## Périmètre fonctionnel (MVP)

### ✅ Phase 1 : MVP (6 mois)

**Fonctionnalités core :**

1. Détection coureurs à proximité (rayon 500m-2km)
2. Calcul point d'arrivée équidistant
3. Système de duel 1v1
4. Départ synchronisé
5. Tracking GPS temps réel
6. Classement ELO basique
7. Anti-cheat basique

**Périmètre géographique :** 2-3 villes pilotes (Paris, Lyon, Marseille)

**Cible utilisateurs :** 500-1000 early adopters

---

### 🚀 Phase 2 : Croissance (6-12 mois)

**Nouvelles fonctionnalités :**

1. Duels multi-joueurs (2v2, 3v3)
2. Classements nationaux/globaux
3. Intégration wearables (Apple Watch, Garmin)
4. Badges et achievements
5. Mode entraînement guidé

**Expansion géographique :** France entière + villes européennes

**Cible utilisateurs :** 10 000+ MAU

---

## Coûts & Financement

### 💸 Budget MVP (6 mois)

**Équipe :**

* 2 développeurs fullstack (50k€ × 2 × 6 mois) : **100k€**
* 1 designer UX/UI (40k€ × 6 mois) : **40k€**
* 1 product manager (45k€ × 6 mois) : **45k€**
* 1 DevOps/SRE (50k€ × 6 mois) : **50k€**

**Infrastructure :**

* Cloud (AWS/GCP) : **12k€** (2k€/mois)
* Outils (GitHub, Sentry, etc.) : **3k€**

**Marketing :**

* Beta testing : **10k€**
* Campagne lancement : **20k€**

**Total MVP :** **~280k€**

---

### 💰 Sources de financement

**Options :**

1. **Love money :** 50-100k€
2. **Business angels :** 100-200k€
3. **BPI France :** Prêt innovation (jusqu'à 200k€)
4. **Incubateurs/Accélérateurs :** Y Combinator, Station F

**Stratégie recommandée :**

* Lever 200-300k€ en pré-seed
* Démontrer traction (1000+ MAU)
* Lever seed round (1-2M€) pour scaling

---

## Risques & Mitigation

| Risque | Probabilité | Impact | Mitigation |
|---|:---:|:---:|---|
| Faible densité de coureurs | **Élevé** | **Moyen** | Lancement ciblé (grandes villes) + bots intelligents (ghost-runners) |
| Triche GPS | **Élevé** | **Élevé** | Anti-cheat robuste + signalement communautaire |
| Fuite de position | **Moyen** | **Élevé** | Chiffrement + consentement explicite + anonymisation |
| Rejet Apple/Google Store | **Moyen** | **Élevé** | Conformité RGPD + justification GPS background |
| Abandon utilisateurs | **Élevé** | **Moyen** | Onboarding soigné + gamification + notifications intelligentes |

---

## Roadmap & KPIs

### 📅 Timeline

**Mois 1-2 :** Conception + prototypage
**Mois 3-4 :** Développement MVP
**Mois 5 :** Tests bêta (100 utilisateurs)
**Mois 6 :** Lancement public (3 villes)

**KPIs Phase MVP :**

* **500+ utilisateurs actifs** en fin de mois 6
* **Rétention D7 > 40%**
* **3+ duels/utilisateur/semaine**
* **< 5% taux de triche détecté**

---

## Points clés à retenir

✅ **Concept unique** : duels de course en temps réel avec point équidistant
✅ **Motivation** : transforme la course solo en compétition sociale
✅ **Équité** : système ELO garantit des matchs équilibrés
✅ **Marché** : coureurs cherchant motivation et interaction
✅ **Différenciation forte** : aucune app ne propose cette mécanique de duel spontané
'@

Set-Content -Path $georaceMdPath -Value $georaceMdContent -Encoding UTF8

Write-Host "GeoRace.md created."

# --- GeoRace_ppt.md ---
$georacePptPath = Join-Path $OUTDIR "GeoRace_ppt.md"
Backup-IfExists $georacePptPath

$georacePptContent = @'
### 🟦 Slide 1 - Titre

# GeoRace
**Run. Race. Win.**

*L'app qui transforme chaque course en compétition*

---

### 🟦 Slide 2 - Problème

## Le problème

❌ **67% des coureurs abandonnent** dans les 6 premiers mois  
❌ **Course solo = démotivation**  
❌ **Apps actuelles = tracking, pas compétition**

> La course à pied manque d'interaction et de défi en temps réel

---

### 🟦 Slide 3 - Solution

## GeoRace : La solution

✅ **Duels spontanés** avec coureurs à proximité  
✅ **Point d'arrivée équidistant** = compétition équitable  
✅ **Système ELO** = matchs entre coureurs de niveau similaire

> Transformez chaque sortie en compétition motivante

---

### 🟦 Slide 4 - Comment ça marche

## Fonctionnement

1. **Détection** : L'app repère les coureurs actifs (500m-2km)
2. **Match** : Proposition de duel avec point équidistant
3. **Course** : Départ synchronisé, tracking GPS temps réel
4. **Résultat** : Mise à jour du score ELO

> 3 étapes simples pour un duel équitable

---

### 🟦 Slide 5 - Différenciation

## VS Concurrence

| Feature | Strava | Nike RC | Zwift | **GeoRace** |
|---|:---:|:---:|:---:|:---:|
| Compét. temps réel | ❌ | ❌ | ✅ | ✅ |
| Course extérieur | ✅ | ✅ | ❌ | ✅ |
| Duels 1v1 spontanés | ❌ | ❌ | ❌ | ✅ |
| ELO matchmaking | ❌ | ❌ | ❌ | ✅ |

> **Seule app combinant compétition réelle + duels équitables**

---

### 🟦 Slide 6 - Marché

## Marché cible

📊 **5M coureurs réguliers en France**  
📊 **12M coureurs occasionnels**

**Persona principal :**  
Emma, 29 ans, coureuse 3x/semaine  
→ Cherche motivation + interaction + progression mesurable

---

### 🟦 Slide 7 - Modèle économique

## Business Model : Freemium

**Gratuit :**  
✅ 3 duels/jour  
✅ ELO basique

**Premium (9,99€/mois) :**  
✅ Duels illimités  
✅ Stats avancées  
✅ Badges exclusifs

**Projection an 1 :** 10k MAU → 1k premium → **~120k€**

---

### 🟦 Slide 8 - Architecture

## Stack technique MVP

**Mobile :** React Native + Expo  
**Backend :** Node.js/Go + WebSocket + PostGIS  
**Ops :** Kubernetes + GitHub Actions

**Sécurité :**  
✅ Anti-cheat GPS  
✅ Chiffrement positions  
✅ Conformité RGPD

---

### 🟦 Slide 9 - Roadmap

## Roadmap

**Phase 1 (6 mois) — MVP**  
→ Duels 1v1, ELO, 3 villes pilotes  
→ Cible : 500-1000 early adopters

**Phase 2 (6-12 mois) — Croissance**  
→ Duels multi-joueurs, wearables, France entière  
→ Cible : 10k+ MAU

---

### 🟦 Slide 10 - Financement

## Financement MVP

💸 **Budget total : 280k€** (6 mois)

**Équipe :** 235k€  
**Infra :** 15k€  
**Marketing :** 30k€

**Stratégie :**  
→ Lever 200-300k€ (pré-seed)  
→ Démontrer traction → Seed (1-2M€)

---

### 🟦 Slide 11 - KPIs

## KPIs Phase MVP

✅ **500+ utilisateurs actifs** (fin mois 6)  
✅ **Rétention D7 > 40%**  
✅ **3+ duels/utilisateur/semaine**  
✅ **< 5% taux de triche**

---

### 🟦 Slide 12 - Risques

## Risques principaux

⚠️ **Faible densité** → Lancement ciblé + ghost-runners  
⚠️ **Triche GPS** → Anti-cheat robuste  
⚠️ **Fuite position** → Chiffrement + consentement RGPD

---

### 🟦 Slide 13 - Vision

## Vision long-terme

🚀 **Devenir la référence mondiale** des courses compétitives en temps réel

**Expansion :**  
→ Europe (an 2)  
→ USA/Asie (an 3-4)

**Nouvelles features :**  
→ Marathons virtuels globaux  
→ Ligues professionnelles  
→ Partenariats équipementiers

---

### 🟦 Slide 14 - Call to Action

## Pourquoi maintenant ?

✅ **Marché mature** (tracking apps) mais **besoin non satisfait** (compétition)  
✅ **Tech disponible** (GPS précis, WebSocket, cloud scalable)  
✅ **Adoption mobile** massive post-COVID

> **Le moment est idéal pour lancer GeoRace**

---

### 🟦 Slide 15 - Closing

# GeoRace

> Chaque course est un duel.  
> Chaque duel est une victoire ou une leçon.  
> La motivation ne vient pas du tracking.  
> Elle vient de la COMPÉTITION.

**Êtes-vous prêt à courir pour GAGNER ?**

🏁 **GeoRace - Run. Race. Win.**
'@

Set-Content -Path $georacePptPath -Value $georacePptContent -Encoding UTF8

Write-Host "GeoRace_ppt.md created."

# --- Other MD files ---
$georacePersonasPath = Join-Path $OUTDIR "GeoRace_Personas.md"
Backup-IfExists $georacePersonasPath

$georacePersonasContent = @'
# Personas GeoRace

## Persona 1 — Emma, 29 ans
- Coureuse régulière (4x/semaine)
- Objectif : motivation, compétition équitable
- Besoins : duels 1v1, ELO, badges

## Persona 2 — Lucas, 35 ans
- Coureur occasionnel (1-2x/semaine)
- Objectif : fun, social
- Besoins : interface simple, 3 duels/jour gratuit

## Persona 3 — Amina, 24 ans
- Coureuse compétitive
- Objectif : tester sa forme
- Besoins : stats avancées, anti-triche robuste
'@

Set-Content -Path $georacePersonasPath -Value $georacePersonasContent -Encoding UTF8

$georacePBSPath = Join-Path $OUTDIR "GeoRace_PBS.md"
Backup-IfExists $georacePBSPath

$georacePBSContent = @'
# PBS — Périmètre fonctionnel

## MVP (Phase 1)
- Mobile cross-platform
- Détection coureurs (500m-2km)
- Point d'arrivée équidistant (1v1)
- Départ synchronisé
- Tracking GPS temps réel
- ELO basique
- Anti-cheat basique
- Tests 2-3 villes
'@

Set-Content -Path $georacePBSPath -Value $georacePBSContent -Encoding UTF8

$georaceBenchmarkPath = Join-Path $OUTDIR "GeoRace_Benchmark_Matrix.md"
Backup-IfExists $georaceBenchmarkPath

$georaceBenchmarkContent = @'
# Benchmark concurrents

| App | Compét RT | Point équi | ELO | Duels 1v1 |
|---|:---:|:---:|:---:|:---:|
| Strava | Non | Non | Non | Non |
| Nike Run Club | Non | Non | Non | Non |
| Zwift Run | Virtuel | Non | Non | Non |
| **GeoRace** | **Oui** | **Oui** | **Oui** | **Oui** |
'@

Set-Content -Path $georaceBenchmarkPath -Value $georaceBenchmarkContent -Encoding UTF8

$georaceContextePath = Join-Path $OUTDIR "GeoRace_Contexte_Securite.md"
Backup-IfExists $georaceContextePath

$georaceContexteContent = @'
# Contexte & Sécurité

## Marché
- Strava, NRC : asynchrones
- Zwift : virtuel
- Carto : Mapbox, OSM

## Règles légales
- RGPD : consentement, chiffrement
- Background GPS : justification stricte
- Responsabilité : T&C, assurance

## Risques
- Fuite position
- Triche GPS
- DDoS gateway
'@

Set-Content -Path $georaceContextePath -Value $georaceContexteContent -Encoding UTF8

# --- Architecture ---
$archMmdPath = Join-Path $assetsDir "architecture.mmd"
Backup-IfExists $archMmdPath

$archMmdContent = @'
flowchart LR
  A[App Mobile] -->|WebSocket| GW[Gateway]
  A -->|REST| API[API]
  GW --> Broker[Broker]
  API --> Broker
  Broker --> Match[Matchmaking]
  Broker --> ELO[ELO]
  Broker --> Race[Orchestrator]
  Race --> DB[(PostGIS)]
'@

Set-Content -Path $archMmdPath -Value $archMmdContent -Encoding UTF8

$georaceArchPath = Join-Path $OUTDIR "GeoRace_Architecture.md"
Backup-IfExists $georaceArchPath

$georaceArchContent = @'
# Architecture MVP

![Architecture](assets/architecture.png)

- WebSocket pour positions haute fréquence
- PostGIS pour géospatial
- Kubernetes auto-scaling
'@

Set-Content -Path $georaceArchPath -Value $georaceArchContent -Encoding UTF8

$georaceStackPath = Join-Path $OUTDIR "GeoRace_Stack_Justification.md"
Backup-IfExists $georaceStackPath

$georaceStackContent = @'
# Stack technique

## Mobile
- React Native (TypeScript)

## Backend
- Node.js/Go
- WebSocket
- Kafka/Redis Streams
- Postgres + PostGIS

## Ops
- Kubernetes
- Prometheus/Grafana
- GitHub Actions
'@

Set-Content -Path $georaceStackPath -Value $georaceStackContent -Encoding UTF8

$georaceWireframesPath = Join-Path $OUTDIR "GeoRace_Wireframes.md"
Backup-IfExists $georaceWireframesPath

$georaceWireframesContent = @'
# Wireframes

## Home

![Home](assets/wireframe_home.svg)

## Duel Modal

![Duel](assets/wireframe_duel_modal.svg)

## Live Race

![Live](assets/wireframe_live.svg)

## Résultat

![Result](assets/wireframe_result.svg)
'@

Set-Content -Path $georaceWireframesPath -Value $georaceWireframesContent -Encoding UTF8

$georaceCoutsPath = Join-Path $OUTDIR "GeoRace_Couts_Table.md"
Backup-IfExists $georaceCoutsPath

$georaceCoutsContent = @'
# Chiffrage MVP (6 mois)

## Humains: 215.5k EUR
## Infra: 57k EUR
## Autres: 30k EUR

**Total: ~302.5k EUR**
'@

Set-Content -Path $georaceCoutsPath -Value $georaceCoutsContent -Encoding UTF8

$georaceEtudePath = Join-Path $OUTDIR "GeoRace_Etude_Comparative.md"
Backup-IfExists $georaceEtudePath

$georaceEtudeContent = @'
# Étude hébergement

## Cloud managed (recommandé)
- AWS/GCP
- Déploiement rapide

## Self-host
- CAPEX moindre
- Time-to-market lent

**Choix: Cloud managed**
'@

Set-Content -Path $georaceEtudePath -Value $georaceEtudeContent -Encoding UTF8

$georaceRisquesPath = Join-Path $OUTDIR "GeoRace_Risques_Mitigation.md"
Backup-IfExists $georaceRisquesPath

$georaceRisquesContent = @'
# Matrice risques

| Risque | Prob | Impact | Mitigation |
|---|:---:|:---:|---|
| Fuite position | M | H | Chiffrement |
| Triche | H | H | Anti-cheat |
| Densité faible | H | M | Ghost-runners |
| Rejet Store | M | H | Flow onboarding |
'@

Set-Content -Path $georaceRisquesPath -Value $georaceRisquesContent -Encoding UTF8

$georaceEcoPath = Join-Path $OUTDIR "GeoRace_EcoScore.md"
Backup-IfExists $georaceEcoPath

$georaceEcoContent = @'
# Éco-score

## Empreinte MVP
- 300-800 kg CO2e/an

## Optimisations
- Adaptive GPS
- Compression
- Cloud green

**Cible: <500 kg CO2e/an**
'@

Set-Content -Path $georaceEcoPath -Value $georaceEcoContent -Encoding UTF8

# --- SVG files ---
$wireframeHomePath = Join-Path $assetsDir "wireframe_home.svg"
Backup-IfExists $wireframeHomePath

$wireframeHomeContent = @'
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500">
  <rect width="100%" height="100%" fill="#fff"/>
  <rect x="20" y="20" width="760" height="140" fill="#eee" stroke="#ccc"/>
  <text x="30" y="50" font-family="Arial" font-size="20">Carte mini</text>
  <rect x="20" y="180" width="760" height="280" fill="#fafafa" stroke="#ddd"/>
  <text x="30" y="210" font-family="Arial" font-size="18">Liste coureurs</text>
  <rect x="600" y="420" width="160" height="50" rx="8" fill="#007bff"/>
  <text x="620" y="450" font-family="Arial" font-size="16" fill="#fff">Démarrer run</text>
</svg>
'@

Set-Content -Path $wireframeHomePath -Value $wireframeHomeContent -Encoding UTF8

$wireframeDuelPath = Join-Path $assetsDir "wireframe_duel_modal.svg"
Backup-IfExists $wireframeDuelPath

$wireframeDuelContent = @'
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="360">
  <rect width="100%" height="100%" fill="#fff"/>
  <rect x="40" y="30" width="520" height="300" fill="#f6f6f6" stroke="#ddd"/>
  <text x="60" y="70" font-family="Arial" font-size="20">Duel proposé</text>
  <rect x="80" y="220" width="100" height="40" fill="#28a745"/>
  <text x="100" y="245" font-family="Arial" font-size="14" fill="#fff">Accepter</text>
  <rect x="220" y="220" width="100" height="40" fill="#dc3545"/>
  <text x="245" y="245" font-family="Arial" font-size="14" fill="#fff">Refuser</text>
</svg>
'@

Set-Content -Path $wireframeDuelPath -Value $wireframeDuelContent -Encoding UTF8

$wireframeLivePath = Join-Path $assetsDir "wireframe_live.svg"
Backup-IfExists $wireframeLivePath

$wireframeLiveContent = @'
<svg xmlns="http://www.w3.org/2000/svg" width="900" height="500">
  <rect width="100%" height="100%" fill="#fff"/>
  <rect x="20" y="20" width="860" height="360" fill="#eef6ff" stroke="#cfe2ff"/>
  <text x="40" y="60" font-family="Arial" font-size="18">Live Race</text>
  <rect x="720" y="420" width="140" height="50" rx="8" fill="#ff4136"/>
  <text x="755" y="450" font-family="Arial" font-size="16" fill="#fff">Sécurité</text>
</svg>
'@

Set-Content -Path $wireframeLivePath -Value $wireframeLiveContent -Encoding UTF8

$wireframeResultPath = Join-Path $assetsDir "wireframe_result.svg"
Backup-IfExists $wireframeResultPath

$wireframeResultContent = @'
<svg xmlns="http://www.w3.org/2000/svg" width="700" height="420">
  <rect width="100%" height="100%" fill="#fff"/>
  <text x="40" y="60" font-family="Arial" font-size="22">Résultat</text>
  <text x="40" y="110" font-family="Arial" font-size="18">1. Vous</text>
  <text x="40" y="200" font-family="Arial" font-size="16">+25 ELO</text>
  <rect x="460" y="320" width="160" height="50" fill="#007bff"/>
  <text x="510" y="350" font-family="Arial" font-size="14" fill="#fff">Partager</text>
</svg>
'@

Set-Content -Path $wireframeResultPath -Value $wireframeResultContent -Encoding UTF8

Write-Host "Assets created."

# Note: Mermaid and Pandoc conversion skipped in PowerShell version
# Users can run these tools separately if needed

Write-Host ""
Write-Host "✅ Build complete!"
Write-Host ""
Write-Host "Files generated in repository root:"
Write-Host ""
Write-Host "Generated markdown files:"
Get-ChildItem -Path $OUTDIR -Filter "*.md" -File | Select-Object -ExpandProperty Name | ForEach-Object { Write-Host "  - $_" }
Write-Host ""
Write-Host "Generated assets:"
if (Test-Path $assetsDir) {
    Get-ChildItem -Path $assetsDir -File | Select-Object -ExpandProperty Name | ForEach-Object { Write-Host "  - assets/$_" }
}
Write-Host ""
