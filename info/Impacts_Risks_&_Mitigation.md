# GeoRace - Workshop : Impacts, Risques & Mitigation

> **Epitech Innovation Track** | Basé sur l'architecture VPS & le système Ghost Race
> ⚠️ **Note de scope :** La matrice distingue les risques du **PoC 2 semaines** (scope actuel) et ceux du **MVP Phase 2** (backend, ELO, matchmaking). Les risques hors scope PoC sont signalés et différés.

---

## Table des matières

1. [Partie 1 - Gestion des Risques](#partie-1--gestion-des-risques)
2. [Partie 2 - Impact Environnemental (GreenIT)](#partie-2--impact-environnemental-greenit)
3. [Partie 3 - Déploiement & Résilience](#partie-3--déploiement--résilience)

---

## Partie 1 - Gestion des Risques

> Focus : **Risques projet & opérationnels** - les risques stratégiques business sont traités dans l'analyse SWOT.

### 1.1 Matrice des Risques

| # | Risque | Scope | Catégorie | Probabilité | Impact | Criticité | Stratégie |
|---|--------|-------|-----------|-------------|--------|-----------|-----------|
| R1 | Qualité GPS insuffisante sur les appareils de test | PoC | Technique | Élevée | Élevé | 🔴 Critique | Réduire |
| R2 | Ghost dummy mal calibré → expérience nulle | PoC | Produit | Élevée | Élevé | 🔴 Critique | Réduire |
| R3 | Mécanique Ghost Race pas engageante → pivot nécessaire | PoC | Produit | Moyenne | Élevé | 🔴 Critique | Accepter |
| R4 | Dépassement des 2 semaines de développement | PoC | Projet | Élevée | Moyen | 🟠 Majeur | Réduire |
| R5 | VPS unique point de défaillance (crash/redémarrage) | MVP Phase 2 | Technique / Infra | Moyenne | Élevé | 🔴 Critique | Réduire + Accepter |
| R6 | Pool de ghosts vide au lancement | MVP Phase 2 | Produit | Élevée | Élevé | 🔴 Critique | Réduire + Éviter |
| R7 | Qualité GPS trop faible pour générer des ghosts valides | MVP Phase 2 | Technique / Produit | Élevée | Élevé | 🔴 Critique | Réduire |
| R8 | Contournement de l'anti-triche / inflation ELO | MVP Phase 2 | Technique / Sécurité | Moyenne | Élevé | 🔴 Critique | Réduire |
| R9 | Dérapage des coûts Mapbox | Scale | Financier | Moyenne | Moyen | 🟠 Majeur | Réduire + Transférer |
| R10 | Non-conformité RGPD | MVP Phase 2 | Légal | Faible | Élevé | 🟠 Majeur | Réduire |
| R11 | Breaking changes React Native entre versions majeures | MVP Phase 2 | Technique | Élevée | Moyen | 🟠 Majeur | Accepter + Réduire |
| R12 | Surcharge WebSocket sur VPS unique lors des duels | MVP Phase 2 | Technique / Infra | Moyenne | Moyen | 🟠 Majeur | Réduire |
| R13 | Manque de compétences équipe (RGPD, sécurité, accessibilité) | MVP Phase 2 | Projet | Élevée | Moyen | 🟠 Majeur | Réduire |
| R14 | Perte de données accidentelle (corruption DB, absence de backup) | MVP Phase 2 | Technique / Infra | Faible | Élevé | 🟠 Majeur | Réduire |
| R15 | Blessure utilisateur due à un sur-effort | Légal / Sécurité | Légal | Faible | Moyen | 🟡 Modéré | Réduire + Transférer |
| R16 | Indisponibilité d'un fournisseur OAuth (Google / Apple) | MVP Phase 2 | Technique / Externe | Faible | Moyen | 🟡 Modéré | Réduire + Accepter |

> **Échelle de criticité :** 🔴 Critique = menace immédiate | 🟠 Majeur = risque significatif | 🟡 Modéré = gérable

---

### 1.2 Plans de Mitigation

---

### 🧪 RISQUES PoC - 2 SEMAINES

---

#### R1 - Qualité GPS Insuffisante sur les Appareils de Test

**Description :** Les traces GPS enregistrées sur mobile peuvent être imprécises, bruitées ou incohérentes selon l'appareil, l'environnement (buildings, arbres) ou les conditions météo. Un ghost replay basé sur une trace corrompue brise complètement la démo.

**Stratégie : Réduire**

- 📱 Tester sur **minimum 3 appareils différents** (au moins 1 iOS + 1 Android) en conditions réelles extérieures avant toute démo.
- 🎯 Utiliser `expo-location` avec le mode de précision **`BestForNavigation`** pour maximiser la qualité GPS.
- 🚫 Ignorer automatiquement tout point GPS avec une précision déclarée **> 30 mètres**.
- 🗺️ Définir un **parcours de test connu à l'avance** (ex. : tour d'un parc de ~1 km) pour valider visuellement la cohérence de la trace.
- 🔄 En cas de signal GPS faible, afficher un **indicateur de qualité GPS** à l'écran et bloquer le démarrage de la course si la précision est insuffisante.

---

#### R2 - Ghost Dummy Mal Calibré

**Description :** Si le ghost dummy est trop rapide, l'utilisateur se décourage immédiatement. S'il est trop lent, il n'y a aucun challenge. Une mauvaise calibration rend la démo inutile pour valider l'hypothèse d'engagement.

**Stratégie : Réduire**

- 🏃 Calibrer le ghost dummy sur une **allure de 5:30/km** comme valeur par défaut.
- 🎚️ Prévoir **3 niveaux de ghost** sélectionnables dans les paramètres :
  - 🟢 Débutant : 6:30/km
  - 🟡 Intermédiaire : 5:30/km (défaut)
  - 🔴 Avancé : 4:30/km
- 📏 Baser le ghost dummy sur un **parcours réel de ~1 km** testé par l'équipe.
- 🧪 Faire tester le ghost par **5 personnes externes** à l'équipe avant la démo finale.

---

#### R3 - Mécanique Ghost Race Pas Engageante

**Description :** L'hypothèse centrale de GeoRace est que courir contre un ghost est motivant et crée de l'adrénaline. Si les premiers testeurs ne ressentent pas cette émotion, le concept entier doit être réévalué avant d'investir 6 mois de développement.

**Stratégie : Accepter**

- ✅ C'est précisément **l'hypothèse que le PoC doit tester** - c'est son seul objectif réel.
- 📋 Préparer un **questionnaire de 5 questions** à faire remplir immédiatement après chaque test :
  1. As-tu ressenti de la compétition pendant la course ? (1-5)
  2. As-tu eu envie de recommencer pour battre le ghost ? (1-5)
  3. L'indicateur avance/retard était-il clair ? (1-5)
  4. Qu'est-ce qui t'a le plus motivé / démotivé ?
  5. Utiliserais-tu cette app régulièrement ?
- 📊 Seuil de validation : score moyen **≥ 3,5/5** sur les 3 premières questions = hypothèse validée.
- 🔄 Si score < 3,5/5 → session de débrief équipe pour identifier le problème avant de conclure à un pivot.

---

#### R4 - Dépassement des 2 Semaines de Développement

**Description :** Des imprévus techniques peuvent faire déraper le planning.

**Stratégie : Réduire**

| Sprint | Livrable | Critère de succès |
|--------|---------|-------------------|
| **Semaine 1** | GPS tracking + sauvegarde locale + replay de sa propre course | On peut enregistrer un run et le revoir sur la carte |
| **Semaine 2** | Ghost dummy intégré + indicateur avance/retard + tests terrain | On peut courir contre le ghost et voir si on est en avance ou en retard |

- ✂️ **Règle de coupe** : si Semaine 2 dépasse → supprimer l'indicateur avance/retard et livrer uniquement le ghost visuel.
- 🚫 Aucune feature hors scope pendant ces 2 semaines.
- 🔧 Utiliser **Expo Go** pour éviter toute configuration native complexe.

---

### 🚀 RISQUES MVP PHASE 2 & SCALE

---

#### R5 - VPS Unique Point de Défaillance

**Description :** L'ensemble du système tourne sur un seul VPS Hetzner. Un crash arrête toute l'application.

**Stratégie : Réduire + Accepter**

- 🐳 **Docker Compose** avec `restart: always` sur tous les conteneurs.
- 📊 **UptimeRobot** (gratuit) : alerte en moins de 5 minutes en cas de panne.
- 💾 **Snapshots quotidiens Backblaze B2** pour restauration rapide.
- 📋 **Runbook documenté** : procédure de restauration < 30 min.
- ⚠️ Accepter l'absence de SLA en MVP/Alpha. Communiquer les maintenances aux testeurs.

**Mitigation future :** Séparer la DB sur un VPS dédié à partir de 5 000 users.

---

#### R6 - Démarrage à Froid : Pool de Ghosts Vide

**Description :** Au lancement du MVP Phase 2, il n'y a aucun ghost réel. Sans ghosts, pas de Ghost Races.

**Stratégie : Réduire + Éviter**

- 🤖 **Ghosts synthétiques** pré-générés (OpenStreetMap, segments publics) pour pré-remplir le pool.
- 🏙️ Focus sur **1-2 villes pilotes** pour densifier le pool sur une zone réduite.
- 🔁 **Ghost vs soi-même** disponible en fallback quand aucun ghost correspondant n'existe.
- 📢 **Bonus ELO** pour les utilisateurs dont les runs sont sélectionnés comme ghosts.

---

#### R7 - Qualité GPS Insuffisante pour les Ghosts Réels

**Description :** Les traces GPS peuvent contenir du bruit, de la dérive ou des téléportations.

**Stratégie : Réduire**

- 🧹 **Pipeline de nettoyage GPS** dans le Ghost Worker : suppression des points > 30m de précision, interpolation des lacunes < 5s, filtre de Kalman / Douglas-Peucker.
- ✅ **Seuil qualité minimum** : run rejeté si > 10% de points invalides.
- 🗓️ Stockage brut temporaire (`GPS_TRACKS`) → promotion dans le pool uniquement après validation.

---

#### R8 - Contournement Anti-Triche / Inflation ELO

**Description :** Un utilisateur falsifiant ses GPS gonfle son ELO et corrompt le pool de ghosts.

**Stratégie : Réduire**

| Méthode | Implémentation |
|---------|---------------|
| Vitesse maximale | Rejet si > 35 km/h pendant > 10s |
| Téléportation GPS | Saut > 50m en < 1s → run flagué |
| Accélération impossible | Variation > 10 m/s² → suspicion |
| Score de suspicion | 0-100 · Revue manuelle si > 70 |

- 🛡️ Runs promus dans le pool uniquement avec `validated: true`.
- 🚨 Utilisateurs signalés : ELO gelé + runs en quarantaine.
- 👁️ **Tableau de bord admin** pour révision pendant l'Alpha.

---

#### R9 - Dérapage des Coûts Mapbox

**Description :** À grande échelle, l'usage intensif de la carte peut générer 1 000-1 500 $/mois.

**Stratégie : Réduire + Transférer**

- 📦 **Cache tuiles agressif** côté client (7 jours).
- 🗺️ Pendant le Ghost Replay : streamer uniquement la polyline compressée, pas les tuiles complètes.
- 🔄 Migration vers **OpenStreetMap + Leaflet + OSRM self-hosted** dès 2 000 users actifs.
- 📊 **Alertes usage Mapbox** à 80% du seuil gratuit.

---

#### R10 - Non-Conformité RGPD

**Description :** GeoRace collecte des données sensibles : traces GPS, IMC, poids, taille.

**Stratégie : Réduire**

| Donnée | Mitigation |
|--------|-----------|
| Traces GPS | Visibles uniquement pendant un run actif · Pseudonymisées dans le pool ghost |
| IMC / Poids / Taille | Optionnels · Jamais partagés · Stats sportives uniquement |
| Email | Haché dans les logs · Jamais exposé via l'API |
| Droit à l'effacement | `DELETE /users/me` → suppression totale garantie dès le MVP |

- 📄 **CGU + Politique de Confidentialité** conformes au droit français avant tout lancement public.
- 🔒 Consultation **CNIL** avant le lancement MVP Phase 2.

> ⚠️ Le certificat médical sportif a été **définitivement retiré du scope** à toutes les phases.

---

#### R11 - Breaking Changes React Native

**Stratégie : Accepter + Réduire**

- 📌 Figer React Native sur une **version stable** au démarrage. Ne pas mettre à jour en cours de MVP.
- 🧪 **Branche de test dédiée** aux mises à jour du framework.
- 🗓️ **1 sprint par mise à jour majeure** budgété dans la roadmap (Phase 2+).

---

#### R12 - Surcharge WebSocket (Duels Live)

**Stratégie : Réduire**

- 🏗️ L'architecture Ghost Race async réduit intrinsèquement la dépendance au WebSocket.
- ⚖️ **Limite de connexion** : max 1 session WebSocket active par utilisateur.
- 📉 **Redis pub/sub** pour découpler le routing WebSocket du processus API.
- 🔧 **VPS WebSocket dédié** (Hetzner CX21, ~6€/mois) à partir de 2 000 users simultanés.

---

#### R13 - Manque de Compétences Équipe

**Stratégie : Réduire**

| Lacune | Action |
|--------|--------|
| RGPD / Juridique | Conseiller RGPD ou Legalstart.fr |
| Sécurité | Auto-formation OWASP Top 10 + test de pénétration basique |
| Accessibilité (WCAG 2.1 AA) | Responsable accessibilité dédié + Axe DevTools |
| Marketing / Communauté | Partenariat club running local dans la ville pilote |

---

#### R14 - Perte de Données Accidentelle

**Stratégie : Réduire**

- 🕐 **Sauvegarde quotidienne** PostgreSQL → Backblaze B2 (pg_dump + cron, 3h00 CET).
- 🗓️ **Rétention** : 7 quotidiennes + 4 hebdomadaires.
- 🧪 **Test de restauration trimestriel**.
- 🔒 **Permissions restreintes** : pas de DROP ni TRUNCATE pour l'utilisateur API.
- 📸 **Snapshot VPS** avant chaque déploiement majeur.

---

#### R15 - Blessure Utilisateur / Sur-Effort

**Stratégie : Réduire + Transférer**

- ⚠️ **Alerte d'allure** si l'utilisateur court > 20% au-dessus de sa moyenne historique.
- 🛑 **Mode « Course Prudente »** pour les débutants (ghost 10% en dessous du niveau).
- 📋 **CGU de sécurité** acceptées au premier lancement.
- 📝 CGU limitant clairement la responsabilité de GeoRace en cas d'accident physique.

---

#### R16 - Indisponibilité d'un Fournisseur OAuth

**Stratégie : Réduire + Accepter**

- 🔐 **Double authentification** dès le MVP : OAuth (Google/Apple) + email/bcrypt en fallback.
- 📲 Inciter l'utilisateur OAuth à définir un **mot de passe de secours** lors de l'onboarding.
- 🖥️ Message automatique si OAuth échoue : *« Connexion Google indisponible. Connectez-vous avec votre email. »*
- ⚠️ Accepter le risque résiduel : pannes OAuth rares (SLA > 99,9%) et de courte durée.

---

## Partie 2 - Impact Environnemental (GreenIT)

### 2.1 Hébergement : Intensité Carbone des Datacenters

| Choix | Détail | Impact Environnemental |
|-------|--------|----------------------|
| **PoC - 0 infrastructure** | Tout tourne localement sur l'appareil mobile | 🟢 Empreinte carbone nulle côté serveur |
| **Hetzner (Nuremberg, DE)** | VPS principal Phase 2 | 🟢 Énergie renouvelable (hydraulique + éolien) · RGPD natif |
| **Backblaze B2** | Stockage de sauvegarde | 🟡 Infrastructure US · Empreinte modérée |
| **Let's Encrypt** | SSL | 🟢 Compute négligeable · Gratuit et automatisé |

---

### 2.2 Optimisation des Transferts de Données

| Optimisation | Méthode | Économies |
|-------------|---------|-----------|
| **Compression GPS (Phase 2)** | Google Encoded Polyline (Douglas-Peucker) | ~90% (1,5 Mo → 5-15 Ko) |
| **Streaming Ghost Replay** | Positions delta uniquement | ~60-70% charge WebSocket |
| **Cache tuiles cartographiques** | Cache client 7 jours | ~80% requêtes Mapbox |
| **Notifications push** | FCM payload JSON < 4 Ko | Minimal |
| **Pagination API** | Page par défaut 20 éléments | Prévient le sur-chargement |
| **Absence de médias lourds** | Pas de vidéo, photo, stories | Zéro transfert lourd |

---

### 2.3 Efficacité du Calcul

| Choix | Impact Écologique |
|-------|-----------------|
| **PoC 100% local** | Aucun serveur actif → empreinte serveur nulle |
| **Ghost Worker asynchrone** | CPU inactif entre les jobs |
| **API REST stateless** | RAM réduite par requête |
| **PostgreSQL + index PostGIS** | Pas de full table scan |
| **Matching à la demande** | Pas de polling cron |

---

### 2.4 Estimation de l'Éco-Score

| Métrique | PoC (2 semaines) | MVP Phase 2 (500 users) |
|----------|-----------------|------------------------|
| Infrastructure serveur | **0 kWh** | ~3-5 kWh/mois |
| CO2eq | **0 kg** | ~1,2-2,0 kg CO2eq/mois |
| Grade EcoIndex estimé | **A** | **A – B** |

---

### 2.5 Récapitulatif des Actions GreenIT

| Action | Statut |
|--------|--------|
| PoC sans serveur (empreinte nulle) | ✅ Implémenté |
| Datacenter énergie verte (Hetzner DE) | ✅ Planifié Phase 2 |
| Compression polylines GPS (−90%) | ✅ Planifié Phase 2 |
| Traitement asynchrone (workers inactifs) | ✅ Planifié Phase 2 |
| Cache tuiles cartographiques client | ✅ Planifié Phase 2 |
| Pas de médias lourds (par conception) | ✅ Permanent |
| Migration OSM self-hosted (scale) | 🔄 Planifié Scale |
| Monitoring CO2 (Cloud Carbon Footprint) | 📋 À implémenter Phase 3 |

---

## Partie 3 - Déploiement & Résilience

### 3.1 Déploiement PoC (2 semaines) - Zéro Infrastructure

```
  DÉVELOPPEMENT PoC
  ─────────────────────────────────────────────────
  IDE (VS Code)
  └── React Native + Expo
       ├── Développement local
       ├── Test via Expo Go sur appareils physiques
       └── Distribution démo via Expo EAS (gratuit)
            → QR code partagé aux testeurs
            → Pas d'App Store, pas de déploiement serveur
```

**Coût total : 0 €**

---

### 3.2 Pipeline CI/CD - MVP Phase 2

```
  ◀── Push feature branch ──▶     ◀────── Merge sur main ──────▶

  ✅ Lint (ESLint + Prettier)  →   🐳 Build image Docker
  ✅ Tests unitaires (Jest)        📤 Push vers registry
  ✅ Tests intégration PostGIS     🔐 SSH → VPS Hetzner
  ✅ Build Docker                  🔄 docker-compose up -d
                                   🗄️  Migration DB (TypeORM)
                                   ❌  Échec ? → Rollback auto
```

| Décision | Justification |
|----------|--------------|
| Docker Compose | Zéro vendor lock-in · Portable · Reproductible |
| GitHub Actions (tier gratuit) | 2 000 min/mois suffisants pour le MVP |
| Rollback automatique | Health check post-déploiement → retour image précédente si échec |
| Blue-Green (Phase 3) | Releases sans interruption de service |

---

### 3.3 Stratégie de Migration de Base de Données

```
  V1.0 → V1.1 (ex. : ajout colonne ELO dans USERS)

  1. Migration TypeORM écrite : AddEloToUsers_V1_1.ts
     ALTER TABLE users ADD COLUMN elo_score INTEGER DEFAULT 1000;

  2. Migration versionnée dans /migrations.

  3. CD pipeline exécute AVANT les nouveaux conteneurs :
     npm run migration:run

  4. Échec → pipeline s'arrête · Anciens conteneurs actifs.

  5. Règle stricte : migrations ADDITIVES uniquement.
     Colonnes supprimées uniquement après 1 cycle de release.
```

---

### 3.4 Analyse des Points de Défaillance Uniques (SPOF)

| Composant | SPOF ? | Conséquence | Mitigation |
|-----------|--------|-------------|------------|
| **Appareil mobile (PoC)** | 🟡 Local | App inutilisable sur cet appareil | Tests sur 3 appareils minimum |
| **VPS Hetzner (Phase 2)** | 🔴 Oui | Panne totale | Docker restart:always · UptimeRobot · SLA 99,9% |
| **PostgreSQL (Phase 2)** | 🔴 Oui | Données inaccessibles | Backup B2 quotidien · RTO < 30 min |
| **Redis (Phase 2)** | 🟠 Partiel | File en pause | appendonly yes · BullMQ retry auto |
| **Ghost Worker (Phase 2)** | 🟡 Faible | Pas de nouveaux ghosts | Docker restart auto |
| **Nginx (Phase 2)** | 🟠 Partiel | Aucun trafic entrant | Docker restart · Config versionnée Git |
| **Mapbox API (Phase 2)** | 🟡 Faible | Tuiles manquantes | Cache client 7j · Fallback OSM planifié |
| **OAuth Google/Apple** | 🟡 Faible | Login OAuth échoue | Email/password toujours disponible |

---

### 3.5 Politique de Sauvegarde (Phase 2)

| Type | Fréquence | Rétention | Stockage | RTO | RPO |
|------|-----------|-----------|---------|-----|-----|
| `pg_dump` PostgreSQL | Quotidien 3h00 | 7j + 4 semaines | Backblaze B2 | **< 30 min** | **< 24h** |
| Snapshot VPS Hetzner | Avant chaque déploiement | 3 snapshots | Hetzner interne | < 15 min | Dernier état |
| État Redis | Shutdown (appendonly) | Dernier état | Disque local VPS | Immédiat | Dernière écriture |

---

### 3.6 Stratégie de Mode Dégradé

> **Principe :** *La boucle Ghost Race fonctionne indépendamment de toute fonctionnalité secondaire.*

| Scénario de panne | Impact | Comportement dégradé |
|------------------|--------|---------------------|
| **WebSocket hors ligne** | Duels live indisponibles | Ghost Race async continue · Bannière info |
| **Redis hors ligne** | File d'upload en attente | Runs acceptés HTTP 202 · Traitement repris au redémarrage |
| **Ghost Worker hors ligne** | Pas de nouveaux ghosts | Pool existant disponible · Restart auto |
| **Mapbox hors ligne** | Tuiles manquantes | Replay via cache + polyline · App utilisable |
| **Push notifications hors ligne** | Pas d'alertes | Vérification manuelle depuis le Dashboard |
| **Stripe hors ligne** | Premium en échec | Tier gratuit pleinement fonctionnel |

---

## Récapitulatif & Checklist des Livrables

| Livrable | Statut |
|----------|--------|
| ✅ **Matrice des Risques** - 16 risques (PoC + MVP + Scale) avec probabilité, impact, criticité, stratégie | Fait |
| ✅ **GreenIT** - PoC à empreinte nulle · Hetzner green energy · Compression GPS 90% · Workers async | Fait |
| ✅ **Résilience PoC** - Distribution Expo Go · 0 infrastructure · Tests multi-appareils | Fait |
| ✅ **Résilience Phase 2** - Backup quotidien (RPO < 24h, RTO < 30 min) · SPOF analysés · Mode dégradé | Fait |
| ✅ **CI/CD Phase 2** - GitHub Actions · Docker Compose · Migrations TypeORM · Rollback automatique | Fait |

---

*Document réalisé dans le cadre du **Workshop : Impacts, Risques & Mitigation** - Epitech Innovation Track*
*PoC : React Native + Expo, 100% local | Phase 2 : VPS self-hosted, NestJS + PostgreSQL/PostGIS + Redis + BullMQ*