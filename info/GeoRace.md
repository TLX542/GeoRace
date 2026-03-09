# GeoRace

> La course compétitive asynchrone immersive

---

## Présentation

GeoRace est une application mobile de course à pied compétitive qui transforme chaque sortie running en véritable compétition immersive. En courant contre le fantôme enregistré d'un autre coureur - votre **Ghost Race** - vous vivez l'adrénaline d'un duel réel, seul, à votre rythme, n'importe où et n'importe quand.

---

## Pourquoi ce projet ?

La course à pied en solo souffre de plusieurs problèmes fondamentaux :

- 😔 Démotivation lorsqu'on court seul
- 🎯 Manque de défi et d'objectifs concrets
- 📊 Difficulté à mesurer ses progrès face à d'autres coureurs
- ❌ Absence d'interaction compétitive pendant l'entraînement

Ces facteurs conduisent de nombreux coureurs à abandonner leurs objectifs sportifs. GeoRace répond à ce besoin avec une approche novatrice : la **Ghost Race asynchrone**, complétée d'un module de duel live secondaire.

---

## Ce que fait GeoRace

### 1. Ghost Races - La compétition asynchrone immersive (CORE)

Le cœur de GeoRace est la **Ghost Race** : vous courez contre le replay enregistré d'un autre coureur de votre niveau, reconstitué en temps réel sur votre carte. Pas besoin d'être au même endroit ou au même moment.

- Upload de votre run après chaque sortie
- Matching automatique avec un ghost de niveau ELO similaire et de distance comparable
- Replay de sa trajectoire sur votre carte pendant votre propre run
- Indicateur d'avance/retard en temps réel
- Calcul du résultat et mise à jour ELO à l'arrivée

> **Chaque sortie devient une compétition. Vous n'êtes plus seul.**

---

### 2. Système de classement ELO

- Chaque coureur possède un score ELO (inspiré des échecs)
- Victoire contre un ghost plus fort = gains ELO importants
- Victoire contre un ghost plus faible = gains ELO réduits
- Matchmaking par tranche ELO + distance similaire + type de parcours
- Progression visible :

```
  🥉 Bronze (0-1000) → 🥈 Argent → 🥇 Or → 💎 Platine (2000+)
```

---

### 3. Ghost Matching Engine

Le **Ghost Matching Engine** est le moteur central de GeoRace. Il sélectionne automatiquement le ghost le plus pertinent pour chaque run :

- Distance similaire (±15%)
- Niveau ELO proche
- Type de parcours compatible (urbain, parc, trail)
- Analyse anti-triche avant validation du ghost

---

### 4. Duels Live (module secondaire)

Le duel en temps réel reste disponible comme fonctionnalité complémentaire, mais n'est pas le cœur du produit. Il nécessite que deux coureurs soient actifs simultanément dans la même zone.

- Détection de coureurs actifs à proximité
- Défi et départ synchronisé
- Suivi de position en temps réel (WebSocket)
- Mise à jour ELO à l'issue du duel

---

### 5. Aspect social et communautaire

- Profils de coureurs : statistiques, ELO, historique des ghost races
- Classements locaux et globaux
- Badges et achievements (première victoire ghost, 10 ghosts battus, etc.)
- Événements communautaires hebdomadaires

---

## Ce que GeoRace n'est pas

- ❌ Une application de tracking GPS basique (type Strava)
- ❌ Un réseau social de partage de photos
- ❌ Un coach virtuel avec plans d'entraînement
- ❌ Une app qui exige d'autres coureurs actifs au même moment

> GeoRace se concentre sur la **compétition asynchrone immersive via le Ghost Mode**, accessible partout, à tout moment.

---

## Besoin réel

### Problème utilisateur

- Courir seul est monotone et démotivant
- Les applications existantes ne créent pas d'interaction compétitive réelle
- Difficile de trouver des partenaires disponibles en même temps
- Les courses organisées nécessitent inscription préalable et déplacement

### Bénéfices de la Ghost Race

- **Motivation accrue** : un adversaire (fantôme) à chaque sortie
- **Amélioration des performances** : dépassement de soi face à un level réel
- **Régularité** : envie de s'entraîner pour améliorer son ELO
- **Accessibilité totale** : aucun besoin de synchroniser son agenda

---

## Public cible

| Profil | Description |
|--------|-------------|
| **Coureurs réguliers** (3-5 fois/semaine) | Cherchent à améliorer leurs performances, aiment la compétition, veulent sortir de la routine |
| **Coureurs occasionnels** | Ont du mal à rester motivés, cherchent un élément de fun et de progression mesurable |
| **Coureurs compétitifs** | Participent à des courses officielles, utilisent GeoRace pour s'entraîner entre les événements |

---

## Marché & Positionnement

### Applications existantes

| App | Positionnement |
|-----|---------------|
| Strava | Réseau social, segments fixés, pas de ghost dynamique |
| Nike Run Club | Tracking + défis asynchrones sans matchmaking |
| Runkeeper | Tracking GPS basique |
| Zwift Run | Compétition virtuelle sur tapis uniquement |

### Ce qui n'existe pas actuellement

> Un système de Ghost Race asynchrone avec matchmaking ELO intelligent, accessible partout et à tout moment, sur n'importe quel parcours.

### Tableau comparatif

| Fonctionnalité | GeoRace | Strava | Nike Run Club | Runkeeper |
|---|:---:|:---:|:---:|:---:|
| Ghost Race asynchrone | ✅ CORE | ❌ | ❌ | ❌ |
| Matchmaking ELO | ✅ | ❌ | ❌ | ❌ |
| Tracking GPS | ✅ | ✅ | ✅ | ✅ |
| Duel live (temps réel) | ✅ secondaire | ❌ | ❌ | ❌ |
| Défis asynchrones | ✅ | Segments | Défis | ❌ |
| Compétition sans contrainte horaire | ✅ | ❌ | ❌ | ❌ |

---

## Modèle économique

### Version gratuite (core features)

- 3 ghost races par jour
- Classement ELO
- Statistiques de base
- Accès aux événements communautaires

### Version Premium (4,99 €/mois ou 49 €/an)

- Ghost races illimitées
- Duels live illimités
- Statistiques avancées (progression ELO détaillée, analyse de trajectoire)
- Mode entraînement : ghost vs ses propres performances passées
- Personnalisation profil (avatars, badges spéciaux)
- Pas de publicités

### Revenus additionnels

- Partenariats marques de sport (Nike, Adidas, Decathlon)
- Événements premium : ghost races thématiques avec récompenses
- Coaching personnalisé basé sur l'historique ELO

---

## Défis techniques à résoudre

### 1. Précision GPS & compression des traces

Le ghost replay dépend de la qualité des traces GPS enregistrées. GeoRace applique un pipeline de nettoyage, compression et validation avant stockage.

### 2. Ghost Matching pertinent

L'algorithme de matching doit trouver le ghost le plus pertinent parmi la base (distance, ELO, type de terrain) pour garantir une compétition équitable et motivante.

### 3. Anti-triche

Détection de vitesse anormale, téléportation GPS, accélération impossible, modification de trace. Chaque run est validé avant d'être injecté dans la base de ghosts.

### 4. Masse critique de ghosts disponibles

Contrairement au duel live, le Ghost Mode ne nécessite pas d'utilisateurs simultanés. La base de ghosts grandit avec chaque run uploadé, rendant le système de plus en plus pertinent avec le temps.

---

## Roadmap de développement

### ⚠️ Phase 0 - PoC (2 semaines)

- Application mobile (iOS ou Android, une seule plateforme)
- GPS Tracking : enregistrement d'un run en temps réel
- Ghost Replay : rejouer sa propre course après la fin, sauvegarde locale uniquement
- Ghost factice pré-intégré : un run dummy codé en dur dans l'app
- Course contre le ghost dummy : indicateur d'avance/retard en temps réel
- **Pas d'authentification, pas d'ELO, pas de backend, pas d'anti-triche**
- 🎯 Objectif : valider que la mécanique de Ghost Race est fun et engageante

### Phase 1 - MVP (Mois 1-6)

- Application mobile iOS et Android
- Run Recorder + Upload de runs
- Ghost Matching Engine (ELO basique)
- Ghost Replay à l'écran
- Système ELO fonctionnel
- Anti-triche simple
- Test dans 1-2 villes pilotes
- 🎯 Objectif : 500 utilisateurs actifs

### Phase 2 - Gamification et social (Mois 7-12)

- Badges et récompenses
- Profils détaillés et statistiques avancées
- Module duel live activé
- Événements communautaires hebdomadaires
- 🎯 Objectif : 5 000 utilisateurs actifs

### Phase 3 - Scale et monétisation (An 2)

- Version Premium
- Ghost races multi-coureurs (replay de peloton)
- Ligues et tournois ghosts saisonniers
- Partenariats marques de sport
- 🎯 Objectif : 50 000 utilisateurs actifs

---

## Métriques de succès

| Indicateur | Cible | Pourquoi ? |
|---|---|---|
| Rétention J7 | > 40% | Preuve que le Ghost Mode accroche |
| Ghost races/semaine/user | 5-8 | Indicateur d'addiction |
| Croissance mensuelle | +20% | Viralité naturelle |
| Coef. K (viralité) | > 1,2 | Chaque user amène 1,2 nouveau |
| Conversion Premium | 8-12% | LTV/CAC > 3 |

---

## Risques et limitations

### Sécurité des coureurs
Risque de sur-effort pour battre un ghost.
**Solution :** alertes de rythme, mode « course prudente ».

### Qualité du Ghost Matching
Un mauvais matching nuit à l'expérience.
**Solution :** algorithme affiné progressivement avec les données.

### Vie privée
Les traces GPS sont sensibles.
**Solution :** position visible uniquement pendant duel actif, pseudonymisation des ghosts, conformité RGPD stricte.

### Aspects légaux
Responsabilité en cas d'accident.
**Solution :** CGU claires, mode d'emploi sécurité, assurance responsabilité civile.

---

## Points clés à retenir

- 👻 **Concept unique** : Ghost Race asynchrone avec matchmaking ELO intelligent
- 🕐 **Accessible partout, tout le temps** : pas besoin d'un adversaire simultané
- 🔥 **Motivation** : transforme chaque sortie solo en compétition engageante
- ⚖️ **Équité** : le système ELO garantit des matchs équilibrés
- 🏆 **Marché** : aucune app ne propose cette mécanique de ghost dynamique
- ➕ Le duel live reste disponible comme extension, pas comme dépendance

---

> **GeoRace : Transformez chaque course en compétition.**