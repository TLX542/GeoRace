# GeoRace - Workshop Costing & Technical Sizing

> **Epitech Innovation Track** | Analyse économique & dimensionnement technique

---

## Sommaire

1. [Identification des ressources](#1-identification-des-ressources)
2. [Benchmark financier](#2-benchmark-financier)
3. [Budget CAPEX & OPEX](#3-budget-capex--opex)
4. [Scénarios de montée en charge](#4-scénarios-de-montée-en-charge)
5. [Coûts de maintenance & maintenabilité](#5-coûts-de-maintenance--maintenabilité)
6. [Synthèse & viabilité économique](#6-synthèse--viabilité-économique)

---

## 1. Identification des ressources

### 1.1 Infrastructure & Services Cloud

L'architecture retenue est un **VPS self-hosted** (choix étudiant / budget maîtrisé), avec des APIs externes pour la cartographie et les notifications.

| Catégorie | Service | Rôle |
|-----------|---------|------|
| Compute | VPS (1-2 vCPU, 2-4 GB RAM) | Backend NestJS + WebSocket + Ghost Engine |
| Base de données | PostgreSQL + PostGIS (on VPS) | Données utilisateurs, runs, matchs ELO |
| Stockage local | Disque VPS (SSD, 20-50 GB) | Polylines compressées, replays |
| Backup | Backblaze B2 (S3-compatible) | Sauvegardes automatiques quotidiennes |
| Domaine | Nom de domaine (.io ou .app) | Accès public à l'API |
| SSL | Let's Encrypt (gratuit) | Certificat HTTPS/WSS |

---

### 1.2 APIs externes

| API | Usage | Modèle de tarification |
|-----|-------|----------------------|
| Mapbox | Affichage carte, tuiles, navigation | Pay-as-you-go |
| Google Maps SDK | Alternative / géocodage | Pay-as-you-go |
| Firebase Cloud Messaging (FCM) | Notifications push iOS/Android | Gratuit (Google) |
| Apple Push Notification Service (APNs) | Notifications iOS | Gratuit (inclus Developer Program) |
| OAuth (Google / Apple) | Authentification | Gratuit |
| Stripe | Paiement Premium (futur) | 1,4% + 0,25 € par transaction EU |

---

### 1.3 DevOps & Outillage

| Outil | Rôle | Coût |
|-------|------|------|
| GitHub Actions | CI/CD (build, tests, déploiement) | Gratuit (2 000 min/mois sur plan Free) |
| Sentry | Monitoring erreurs backend & mobile | Gratuit jusqu'à 5 000 erreurs/mois |
| UptimeRobot | Surveillance uptime VPS | Gratuit (1 moniteur toutes les 5 min) |
| Apple Developer Program | Publication App Store iOS | 99 USD/an |
| Google Play Console | Publication Play Store Android | 25 USD (one-time) |

---

### 1.4 Équipements physiques (développement)

Pas d'IoT ni de matériel spécifique pour GeoRace. Pour les tests GPS réels :

| Équipement | Besoin | Coût estimé |
|------------|--------|-------------|
| Smartphones de test (iOS + Android) | Validation GPS & UX terrain | Déjà possédés ou ~200-400 EUR d'occasion |
| Abonnement data mobile (tests terrain) | Connexion GPS en extérieur | ~10 EUR/mois |

---

### 1.5 Coûts cachés à anticiper

- **Egress de données** : le VPS facture les Go sortants au-delà du quota inclus
- **Overage Mapbox** : au-delà des quotas gratuits, la facturation est immédiate
- **TVA française** : +20% sur tous les services B2C non-domiciliés en France
- **Sauvegardes** : espace de stockage B2 cumulatif dans le temps

---

## 2. Benchmark Financier

### 2.1 Hébergement VPS - Comparatif

Critères d'évaluation : prix/Go RAM, bande passante incluse, localisation datacenter (RGPD Europe), scalabilité, support.

| Fournisseur | Offre | vCPU | RAM | Stockage | Bande passante | Prix/mois | Datacenter EU |
|-------------|-------|------|-----|----------|----------------|-----------|---------------|
| DigitalOcean | Basic Droplet | 1 | 2 GB | 50 GB SSD | 2 TB | ~12 USD | Amsterdam, Frankfurt |
| OVHcloud | VPS Starter | 1 | 2 GB | 40 GB SSD | Illimitée | ~6 EUR | Gravelines (FR) |
| **Hetzner** | **CX21** | **2** | **4 GB** | **40 GB SSD** | **20 TB** | **~4,5 EUR** | **Nuremberg (DE)** |
| AWS EC2 | t3.small | 2 | 2 GB | EBS 20 GB | 1 TB | ~20 USD | Paris eu-west-3 |
| Scaleway | DEV1-S | 2 | 2 GB | 20 GB SSD | 200 Mbps illimité | ~4 EUR | Paris / Amsterdam |

> **Verdict :** Pour le MVP, **Hetzner CX21 (~4,5 EUR/mois)** offre le meilleur rapport performance/prix. Datacenter allemand = conformité RGPD native. 20 TB de bande passante largement suffisants.
>
> **Choix retenu : Hetzner CX21 à ~6 EUR/mois** (avec marge pour snapshot/backup)

---

### 2.2 API Cartographie - Comparatif

#### Mapbox

| Usage | Gratuit/mois | Prix au-delà |
|-------|-------------|--------------|
| Map Loads (tuiles web/mobile) | 50 000 loads | 0,50 USD / 1 000 loads |
| Static Maps | 50 000 requêtes | 0,20 USD / 1 000 requêtes |
| Directions API | 100 000 requêtes | 1,00 USD / 1 000 requêtes |
| Geocoding | 100 000 requêtes | 0,50 USD / 1 000 requêtes |

#### Google Maps Platform

| Usage | Gratuit/mois | Prix au-delà |
|-------|-------------|--------------|
| Maps SDK Mobile | Gratuit (attribution) | Gratuit |
| Directions API | 200 USD de crédit/mois | 5,00 USD / 1 000 requêtes |
| Distance Matrix | 200 USD de crédit/mois | 5,00 USD / 1 000 requêtes |
| Geocoding | 200 USD de crédit/mois | 5,00 USD / 1 000 requêtes |

#### OpenStreetMap + Leaflet (alternative open-source)

| Usage | Coût |
|-------|------|
| Tuiles OSM (usage modéré) | Gratuit (fair use) |
| Auto-hébergement tuiles | ~5-10 EUR/mois de VPS supplémentaire |
| Routing (OSRM self-hosted) | Gratuit (compute inclus dans VPS) |

> **Verdict :**
> - MVP (< 1 000 users) : Mapbox tier gratuit suffit. **Coût : 0 EUR.**
> - Scale (1 000-10 000 users) : migration vers **OpenStreetMap + Leaflet + OSRM** auto-hébergé recommandée.
> - Google Maps déconseillé à l'échelle (coûts élevés, CGU limitent le cache).
>
> **Choix retenu : Mapbox (MVP) → OSM/Leaflet self-hosted (Scale)**

---

### 2.3 Stockage Backup - Comparatif

| Service | Stockage | Egress | Prix/mois (10 GB) |
|---------|----------|--------|-------------------|
| **Backblaze B2** | **0,006 USD/GB** | **0,01 USD/GB** | **~0,06 USD** |
| AWS S3 | 0,023 USD/GB | 0,09 USD/GB | ~0,23 USD |
| OVH Object Storage | 0,0099 EUR/GB | Gratuit dans EU | ~0,10 EUR |

> **Choix retenu : Backblaze B2** (10x moins cher qu'AWS S3, API S3-compatible)

---

## 3. Budget CAPEX & OPEX

### 3.1 CAPEX - Coûts d'acquisition (one-time)

| Poste | Détail | Coût estimé |
|-------|--------|-------------|
| Apple Developer Program | Publication App Store | 99 USD (~90 EUR) |
| Google Play Console | Publication Play Store | 25 USD (~23 EUR) |
| Nom de domaine (.io ou .app) | Achat 1 an | ~15-30 EUR/an |
| Smartphones de test | iOS + Android (si pas possédés) | 0-400 EUR |
| **TOTAL CAPEX** | | **~130-550 EUR** |

> Le CAPEX est très faible grâce à l'architecture self-hosted et open-source.

---

### 3.2 OPEX - Coûts de fonctionnement (récurrents)

#### PoC (2 semaines) - 0 infrastructure

| Poste | Service | Coût/mois |
|-------|---------|-----------|
| Application | React Native + Expo | 0 EUR |
| Stockage | Local uniquement (AsyncStorage) | 0 EUR |
| Ghost dummy | Hardcodé dans l'app | 0 EUR |
| Backend | Aucun | 0 EUR |
| **TOTAL OPEX PoC** | | **0 EUR/mois** |

#### MVP Phase (< 500 utilisateurs actifs, 1 ville pilote)

| Poste | Service | Coût/mois |
|-------|---------|-----------|
| VPS | Hetzner CX21 | 6 EUR |
| Backup | Backblaze B2 (~5 GB) | < 0,10 USD |
| Domaine | (annualisé) | ~2 EUR |
| Mapbox | Tier gratuit (< 50k loads) | 0 EUR |
| FCM / APNs | Gratuit | 0 EUR |
| Sentry | Plan Free | 0 EUR |
| CI/CD GitHub Actions | Plan Free | 0 EUR |
| Abonnement data test | Terrain | 10 EUR |
| **TOTAL OPEX MVP** | | **~18 EUR/mois** |

---

## 4. Scénarios de montée en charge

### Hypothèses de dimensionnement

- 1 utilisateur actif = ~3 runs/semaine en moyenne
- 1 run = ~1 session GPS de 30 min, ~3 000 points GPS bruts compressés en polyline (~5 KB)
- 1 ghost match = lecture d'un run + calcul scoring + ELO update
- 1 duel live = connexion WebSocket ~30 min, positions toutes les 2-3 secondes
- Map load = 1 ouverture de l'app = ~2-3 tuiles Mapbox

---

### Scénario 0 - PoC 2 semaines

| Poste | Estimation | Coût/mois |
|-------|-----------|-----------|
| Application | React Native + Expo, 1 plateforme | 0 EUR |
| Stockage | Local uniquement (AsyncStorage) | 0 EUR |
| Ghost dummy | Hardcodé dans l'app | 0 EUR |
| Backend | Aucun | 0 EUR |
| **Total** | | **0 EUR** |

**Répartition des 2 semaines :**

| Semaine | Livrables |
|---------|-----------|
| **Semaine 1** | Mise en place React Native + Expo · GPS tracking · Sauvegarde locale · Replay de sa propre course |
| **Semaine 2** | Intégration ghost dummy · Affichage ghost temps réel · Indicateur avance/retard · Tests terrain |

---

### Scénario 1 - MVP / Alpha : 100 utilisateurs actifs

| Poste | Estimation | Coût/mois |
|-------|-----------|-----------|
| VPS Hetzner CX21 | CPU < 10%, RAM < 1 GB | 6 EUR |
| Stockage runs | 100 users × 12 runs/mois × 5 KB = ~6 MB | < 1 EUR |
| Backup B2 | ~100 MB total | < 0,01 USD |
| Mapbox | 2 000 loads → tier gratuit | 0 EUR |
| Domaine + SSL | Let's Encrypt gratuit | 2 EUR |
| **Total** | | **~8-10 EUR/mois** |

> Durée estimée de développement : **4-6 mois** (équipe de 3-5 développeurs étudiants)

---

### Scénario 2 - Beta : 1 000 utilisateurs actifs

| Poste | Estimation | Coût/mois |
|-------|-----------|-----------|
| VPS Hetzner CX31 (upgrade) | 2 vCPU, 8 GB RAM | 15 EUR |
| Stockage runs | ~60 MB/mois, cumul ~1 GB | < 1 EUR |
| Backup B2 | ~1 GB total | < 0,10 USD |
| Mapbox | 20 000 loads → tier gratuit | 0 EUR |
| Domaine | | 2 EUR |
| Sentry (si dépassement Free) | Plan Team | 26 USD |
| **Total** | | **~40-45 EUR/mois** |

> Coût par utilisateur actif : **~0,04 EUR/mois** - très viable

---

### Scénario 3 - Scale : 5 000 utilisateurs actifs

À ce stade, le VPS unique atteint ses limites pour les WebSockets simultanés.

| Poste | Estimation | Coût/mois |
|-------|-----------|-----------|
| VPS principal Hetzner CCX23 | 4 vCPU, 16 GB RAM | 50 EUR |
| VPS secondaire (WebSocket duel) | 2 vCPU, 4 GB (optionnel) | 15 EUR |
| Stockage runs (cumul 6 mois) | ~15 GB | ~5 EUR |
| Backup B2 | ~15 GB | ~0,10 USD |
| Mapbox (dépassement quota) | 100 000 loads | ~25 USD |
| **OU** migration OSM self-hosted | Tuiles + OSRM sur VPS | 0 EUR |
| Domaine + monitoring | UptimeRobot Pro | 7 USD |
| Sentry Team | | 26 USD |
| **Total (avec Mapbox)** | | **~130 EUR/mois** |
| **Total (avec OSM self-hosted)** | | **~100 EUR/mois** |

> Coût par utilisateur actif : **~0,02 EUR/mois** - excellent ratio

---

### Scénario 4 - Scale : 10 000 utilisateurs actifs

| Poste | Estimation | Coût/mois |
|-------|-----------|-----------|
| VPS principal Hetzner CCX33 | 8 vCPU, 32 GB RAM | 100 EUR |
| VPS WebSocket duel | 2 vCPU, 4 GB | 15 EUR |
| Stockage runs (cumul 1 an) | ~80 GB SSD additionnel | 20 EUR |
| Backup B2 | ~80 GB | ~0,50 USD |
| OSM + OSRM self-hosted | Inclus dans VPS | 0 EUR |
| Domaine + Monitoring | | 10 EUR |
| Sentry Business | | 80 USD |
| **Total** | | **~230 EUR/mois** |

> **Point de rentabilité :** 8% de conversion Premium à 4,99 EUR/mois → 800 abonnés × 4,99 EUR = **3 992 EUR/mois** pour 230 EUR de coûts infra → **marge brute infrastructure > 94%**

---

### Tableau récapitulatif des scénarios

| Scénario | Utilisateurs actifs | Durée dev estimée | Infra/mois | Coût/user/mois | Revenu potentiel* | Marge brute* |
|----------|--------------------|--------------------|------------|----------------|-------------------|--------------|
| PoC | - | 2 semaines | **0 EUR** | 0 EUR | 0 EUR | - |
| Alpha MVP | 100 | 4-6 mois | ~10 EUR | 0,10 EUR | 0 EUR | - |
| Beta | 1 000 | +3-4 mois | ~45 EUR | 0,045 EUR | ~400 EUR | ~89% |
| Scale 1 | 5 000 | +6-8 mois | ~100 EUR | 0,020 EUR | ~2 000 EUR | ~95% |
| Scale 2 | 10 000 | +6 mois | ~230 EUR | 0,023 EUR | ~4 000 EUR | ~94% |

*Revenu estimé basé sur 8% de taux de conversion Premium à 4,99 EUR/mois*

---

## 5. Coûts de maintenance & maintenabilité

### 5.1 Maintenance technique récurrente

| Type de maintenance | Fréquence | Temps estimé | Coût (si externalisé) |
|--------------------|-----------|--------------|----------------------|
| Mises à jour sécurité (OS, dépendances npm) | Mensuelle | 2-3h | ~50-100 EUR |
| Monitoring et résolution d'incidents | Continue | ~2h/semaine | - |
| Backup vérification & test de restauration | Trimestrielle | 1-2h | ~30 EUR |
| Migrations de base de données | À chaque release | 1-3h | ~50 EUR |
| Renouvellement SSL (Let's Encrypt auto) | Automatique | 0h | 0 EUR |
| Revue RGPD & données | Semestrielle | 2-4h | ~50-100 EUR |

> Coût maintenance technique estimé (interne, équipe étudiante) : **~10-15h/mois**

---

### 5.2 Maintenance applicative

| Activité | Fréquence | Temps estimé |
|----------|-----------|--------------|
| Corrections de bugs production | Continu | 5-10h/mois |
| Mise à jour React Native (breaking changes) | Tous les 3-6 mois | 4-8h |
| Adaptation aux nouvelles versions iOS/Android | Annuelle | 5-10h |
| Évolution API Mapbox / dépendances externes | Variable | 2-5h/an |
| Gestion anti-cheat (ajustement heuristiques) | Continue | 2-3h/mois |

---

### 5.3 Maintenabilité du code - Analyse de l'architecture

| Décision architecturale | Impact maintenabilité |
|------------------------|-----------------------|
| NestJS (modules découplés) | Facilite l'ajout de features sans casser le core |
| PostgreSQL + PostGIS | Technologie stable, nombreuses ressources disponibles |
| React Native | Breaking changes fréquents entre versions majeures |
| VPS unique (MVP) | Pas de haute disponibilité, downtime possible en maintenance |
| Self-hosted sans orchestration | Pas de rolling update automatique (Docker Compose recommandé dès le début) |

---

### 5.4 Dette technique anticipée

| Risque | Probabilité | Impact | Coût estimé de correction |
|--------|-------------|--------|--------------------------|
| Refonte VPS unique → multi-instances | Moyenne (si > 5k users) | Élevé | 2-4 semaines-dev |
| Migration Mapbox → OSM self-hosted | Haute (si scale) | Moyen | 1-2 semaines-dev |
| Refonte anti-cheat (heuristiques trop simples) | Moyenne | Moyen | 1 semaine-dev |
| Goulot d'étranglement DB (index PostGIS) | Faible (si bien indexé dès le départ) | Élevé | 1-2 jours-dev |

---

## 6. Synthèse & Viabilité économique

### 6.1 Résumé des choix techniques (justification économique)

| Choix | Pourquoi | Économie réalisée vs alternative |
|-------|----------|----------------------------------|
| Hetzner VPS vs AWS EC2 | 4,5 EUR vs ~20 USD/mois, datacenter EU, RGPD natif | ~75% d'économie |
| Mapbox tier gratuit (MVP) | 50 000 loads/mois gratuits suffisent au démarrage | 0 EUR vs ~50 USD/mois Google Maps |
| OSM self-hosted (scale) | Zéro coût API cartographique à grande échelle | 100-500 EUR/mois d'économie |
| Backblaze B2 vs AWS S3 | 0,006 USD/GB vs 0,023 USD/GB | 75% d'économie sur le stockage |
| Let's Encrypt | SSL gratuit et automatisé | ~100 EUR/an d'économie |
| FCM/APNs natifs | Push gratuits | ~50 USD/mois vs solutions payantes |

---

### 6.2 Risque économique principal : l'API cartographique

Le seul vrai risque de dérapage budgétaire est l'usage excessif de Mapbox. À 10 000 users actifs = 3 millions de loads → **~1 500 USD/mois** rien qu'en Mapbox.

**Mitigation :** cache agressif côté client, lazy loading des tuiles, migration OSM dès 2 000 users actifs.

---

### 6.3 Chronologie estimée

| Phase | Durée | Coût infra/mois | Effort développement |
|-------|-------|-----------------|---------------------|
| PoC | 2 semaines | **0 EUR** | 3-5 devs × temps partiel |
| Développement MVP | Mois 1-6 | ~10 EUR | 3-5 devs × 20h/semaine |
| Alpha test (100 users) | Mois 6-8 | ~10 EUR | Maintenance + bugs |
| Beta publique (1 000 users) | Mois 8-14 | ~45 EUR | Features V2 |
| Scale (5 000+ users) | Mois 14-24 | ~100-230 EUR | Features V3 + infra |

> **Coût infrastructure total sur 2 ans (estimation) : ~2 500-3 500 EUR**

---

### 6.4 Conclusion

GeoRace présente une **viabilité économique très forte** pour un projet étudiant :

- **CAPEX total** : ~130-550 EUR (essentiellement les comptes développeurs Apple/Google)
- **OPEX PoC** : **0 EUR/mois**
- **OPEX MVP** : ~10-18 EUR/mois (quasi-gratuit pour un prototype)
- **OPEX à 10 000 users** : ~230 EUR/mois pour ~4 000 EUR de revenus potentiels
- **Marge brute infrastructure** : > 90% à partir de 1 000 abonnés Premium

> Le principal défi n'est pas le coût mais la **masse critique d'utilisateurs**. Le Ghost Mode asynchrone est crucial car il maintient la valeur de l'app même avec peu d'utilisateurs, sans coût infrastructurel additionnel.

---

*Document réalisé dans le cadre du Workshop Costing & Technical Sizing - Epitech Innovation Track*
*Architecture de référence : VPS self-hosted, stack NestJS + PostgreSQL/PostGIS + React Native*