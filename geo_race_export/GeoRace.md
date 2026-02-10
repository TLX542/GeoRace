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

**Avantages :**

* **Matchmaking équilibré** : duels contre coureurs de niveau similaire
* **Progression visible** : montée dans les classements
* **Motivation** : envie d'améliorer son ELO

---

### 👥 4. Aspect social et communautaire

**Fonctionnalités sociales :**

* **Profils de coureurs** : statistiques, ELO, historique des duels
* **Chat en direct** : discussion avant/après les courses
* **Ajout d'amis** : défier des coureurs spécifiques
* **Classements locaux** : voir les meilleurs coureurs de votre ville

**Événements communautaires :**

* **Courses organisées** : événements hebdomadaires dans votre zone
* **Défis collectifs** : atteindre des objectifs de groupe
* **Ligues locales** : compétitions par quartier/ville

---

### 🏆 5. Système de récompenses

**Badges et achievements :**

* "Première victoire"
* "10 duels gagnés"
* "Vainqueur d'un adversaire ELO +200"
* "Champion local" (meilleur ELO de la ville)

**Niveaux et progressions :**

* Bronze : 0-1000 ELO
* Argent : 1000-1500 ELO
* Or : 1500-2000 ELO
* Platine : 2000+ ELO

---

## Ce que GeoRace n'est pas

* ❌ Une application de tracking GPS basique (type Strava)
* ❌ Un réseau social de partage de photos
* ❌ Un coach virtuel avec plans d'entraînement

✔ GeoRace se concentre sur la **compétition en temps réel et spontanée**

---

## Besoin réel

### Problème utilisateur

* Courir seul est **monotone et démotivant**
* Les applications existantes ne créent pas **d'interaction en temps réel**
* Difficile de trouver **des partenaires de course de même niveau**
* Les courses organisées nécessitent **inscription préalable et déplacement**

### Bénéfices de la compétition

* **Motivation accrue** : défi concret à chaque sortie
* **Amélioration des performances** : dépassement de soi
* **Bien-être social** : interaction avec d'autres coureurs
* **Régularité** : envie de s'entraîner plus souvent

---

## Public cible

### 🏃‍♂️ Coureurs réguliers (3-5 fois/semaine)

* Cherchent à améliorer leurs performances
* Aiment la compétition
* Veulent sortir de la routine

### 👟 Coureurs occasionnels

* Ont du mal à rester motivés
* Cherchent un élément de fun
* Veulent rencontrer d'autres coureurs

### 🏅 Coureurs compétitifs

* Participent à des courses officielles
* Utilisent l'app pour s'entraîner entre les événements
* Veulent tester leur niveau régulièrement

---

## Fonctionnalités techniques

### Géolocalisation en temps réel

* **GPS haute précision** pour tracking pendant les duels
* **Optimisation batterie** : mode économie d'énergie
* **Calcul d'itinéraires** : navigation vers le point d'arrivée
* **Détection de proximité** : identification des coureurs dans la zone

### Algorithme de point équidistant

* Calcul d'un point accessible à **distance égale** pour tous
* Prise en compte du **terrain** (routes, chemins praticables)
* Évite les **zones dangereuses** (autoroutes, zones privées)
* **Validation manuelle** possible avant acceptation du duel

### Synchronisation temps réel

* **Serveurs à faible latence** pour départ simultané
* **Mise à jour position** toutes les 2-3 secondes pendant le duel
* **Affichage en direct** de la position des adversaires (optionnel)

### Sécurité et vie privée

* **Position visible uniquement pendant les duels actifs**
* **Mode anonyme** : pseudonyme sans données personnelles
* **Blocage d'utilisateurs** indésirables
* **Zone de confort** : définir un périmètre où on accepte les duels

---

## Marché & positionnement

### Applications existantes

* **Strava** → réseau social, pas de compétition temps réel
* **Nike Run Club** → tracking + défis asynchrones
* **Runkeeper** → tracking GPS basique
* **Zwift Run** → compétition virtuelle sur tapis de course

### Ce qui n'existe pas actuellement

> **Application de course avec duels spontanés en temps réel basés sur la géolocalisation**

---

## Modèle économique

### Version gratuite (core features)

* **3 duels par jour**
* Classement ELO
* Statistiques de base
* Accès aux événements communautaires

### Version Premium (4,99€/mois ou 49€/an)

* **Duels illimités**
* **Statistiques avancées** (vitesse moyenne par zone, progression ELO détaillée)
* **Personnalisation profil** (avatars, badges spéciaux)
* **Mode entraînement** : duels contre ses propres records passés
* **Pas de publicités**

### Revenus additionnels

* **Partenariats marques de sport** : Nike, Adidas, Decathlon (sponsoring d'événements)
* **Événements premium** : courses organisées avec prix (inscription 5-10€)
* **Coaching personnalisé** : plans d'entraînement basés sur ELO (49€/mois)

---

## Différenciation

### vs Strava

* **Temps réel** vs asynchrone
* **Duels spontanés** vs segments fixes
* **Compétition directe** vs comparaison de performances passées

### vs Nike Run Club

* **Matchmaking automatique** vs solo
* **ELO et équité** vs défis génériques
* **Interaction sociale active** vs passive

### vs Applications de rencontre sportive

* **Compétition immédiate** vs organisation préalable
* **Système équitable** vs courses organisées
* **Gamification poussée** vs simple mise en relation

---

## Défis techniques à résoudre

### 1. Précision GPS

* Utiliser **GPS + GLONASS + Galileo** pour meilleure précision
* **Filtrage des erreurs** GPS (sauts, dérive)
* **Calibration** selon environnement (urbain dense, forêt)

### 2. Équité des parcours

* Algorithme de **calcul d'accessibilité** du point d'arrivée
* Prise en compte du **dénivelé** (bonus/malus ELO)
* **Validation communautaire** des points d'arrivée problématiques

### 3. Triche et abus

* **Détection de vitesse anormale** (vélo, voiture)
* **Analyse des patterns de mouvement** GPS
* **Signalement communautaire**
* **Vérification manuelle** des performances suspectes

### 4. Masse critique d'utilisateurs

* Besoin de **densité minimale** de coureurs dans une zone
* **Système de bots** en phase initiale (ghost runners avec temps réalistes)
* **Expansion géographique progressive** (ville par ville)

---

## Roadmap de développement

### Phase 1 (Mois 1-6) : MVP

* Application mobile iOS et Android
* Duels 1v1 en temps réel
* Système ELO basique
* Géolocalisation et calcul point équidistant
* **Test dans 2-3 villes pilotes**
* **Objectif : 500 utilisateurs actifs**

### Phase 2 (Mois 7-12) : Gamification et social

* Badges et récompenses
* Profils détaillés et statistiques
* Chat et ajout d'amis
* Événements communautaires hebdomadaires
* **Objectif : 5 000 utilisateurs actifs**

### Phase 3 (An 2) : Scale et monétisation

* Version Premium
* Duels multi-joueurs (3-5 coureurs)
* Ligues et tournois
* Partenariats marques de sport
* **Expansion nationale (10+ villes)**
* **Objectif : 50 000 utilisateurs actifs**

---

## Métriques de succès

### Engagement

* **Taux de rétention J7** : >40% (utilisateur revient après 7 jours)
* **Nombre moyen de duels/semaine** : 5-8 par utilisateur actif
* **Taux d'acceptation de duels** : >60%

### Croissance

* **Croissance mensuelle** : +20% nouveaux utilisateurs
* **Viralité** : Coefficient K >1.2 (chaque utilisateur amène 1.2 nouveau)

### Monétisation

* **Taux de conversion Premium** : 8-12%
* **LTV/CAC ratio** : >3 (valeur vie client / coût acquisition)

---

## Vision finale

> GeoRace transforme la course à pied d'une activité solitaire en une expérience sociale et compétitive.
> Notre objectif est de **rendre chaque sortie running excitante** en créant des opportunités de compétition spontanées et équitables.

L'ambition est de devenir **la référence de la course compétitive en temps réel** et de créer une communauté mondiale de coureurs motivés par le défi.

---

## Risques et limitations

### Sécurité des coureurs

* Risque de **sur-effort** pour gagner
* **Attention réduite** à l'environnement pendant la course
* **Solution** : alertes de sécurité, mode "course prudente" qui limite la vitesse

### Dépendance à la densité d'utilisateurs

* **Zones rurales** : peu de coureurs disponibles
* **Solution** : Mode "défi asynchrone" contre ghost runners

### Vie privée et harcèlement

* Risque de **stalking** via géolocalisation
* **Solution** : position visible uniquement en duel actif, blocage utilisateurs

### Aspects légaux

* **Responsabilité en cas d'accident** pendant un duel
* **Solution** : Conditions d'utilisation claires, assurance responsabilité civile

---

## Points clés à retenir

✅ **Concept unique** : duels de course en temps réel avec point équidistant
✅ **Motivation** : transforme la course solo en compétition sociale
✅ **Équité** : système ELO garantit des matchs équilibrés
✅ **Marché** : coureurs cherchant motivation et interaction
✅ **Différenciation forte** : aucune app ne propose cette mécanique de duel spontané

---

## Ce que nous faisons mieux que les concurrents

- **Duel mode en temps réel** : proposition automatique d'un duel avec point d'arrivée équidistant pour garantir l'équité — expérience distinctive difficile à reproduire.
- **Matchmaking ELO** : oppositions entre coureurs de niveau comparable pour des matchs motivants et progressifs.
- **Sécurité & vie privée** : partage de position limité aux duels actifs; anonymisation possible; dispositifs anti‑triche intégrés.
- **Conversion sociale native** : intégration de badges, challenges locaux, classements de quartier et partages pour attirer des communautés existantes.

---

## Plan d'acquisition & conversion (comment nous ferons venir des utilisateurs déjà sur d'autres apps)

- **Partenariats locaux** : clubs de running, boutiques, événements locaux — organiser des tournois GeoRace exclusifs.
- **Incentives de conversion** : défis d'accueil, crédits ou badges pour premiers duels gagnés, parrainage in-app (rewards pour inviter des coureurs).
- **Expérience produit supérieure** : mise en avant du duel équitable et de l'ELO dans la communication produit pour expliquer pourquoi l'expérience est meilleure que les apps de course standard.
- **Campagnes micro-ciblées** : publicités et posts sponsorisés autour d'événements locaux et groupes Facebook / Strava clubs.
- **Migration frictionless** : importer profils/segments (opt-in) ou proposer challenge d'entraînement pour démontrer la valeur en 1 duel.
