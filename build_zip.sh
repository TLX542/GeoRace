#!/usr/bin/env bash

# Re-exec under bash if not already running under bash (for Windows compatibility)
# This avoids "set: pipefail: invalid option name" errors with dash/sh
if [ -z "$BASH_VERSION" ]; then
  if command -v bash >/dev/null 2>&1; then
    exec bash "$0" "$@"
  fi
  # If bash not found, continue anyway (pipefail won't be set below)
fi

# Only enable pipefail if running under bash
if [ -n "$BASH_VERSION" ]; then
  set -euo pipefail
else
  set -eu
fi

# Output to build_output directory next to the script (not zipped)
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
OUTDIR="$SCRIPT_DIR/build_output"
AUTHOR="TLX542"

echo "Creating output dir: $OUTDIR"
rm -rf "$OUTDIR"
mkdir -p "$OUTDIR/assets"

echo "Generating markdown and assets..."

# --- GeoRace.md (original) ---
cat > "$OUTDIR/GeoRace.md" <<'EOF'
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
EOF

# --- GeoRace_ppt.md ---
cat > "$OUTDIR/GeoRace_ppt.md" <<'EOF'
### 🟦 Slide 1 - Titre

**GeoRace**

> L'application de course compétitive en temps réel

**Sous‑titre :**
Le premier vrai duel de course instantané et équitable.

---

### 🟦 Slide 2 - Pitch 30-45s pour mercredi

**Notre pitch en 30-45 secondes**

> *« Les applications de running comme Strava se contentent de tracker vos courses. Vous courez seul, vous comparez vos stats à celles des autres, et au bout de 3 mois, vous abandonnez par manque de motivation.*
>
> *GeoRace transforme chaque sortie en véritable compétition en temps réel. Notre application détecte les coureurs actifs près de vous et propose un duel instantané vers un point d'arrivée calculé à distance égale pour tous. Plus besoin d'attendre : vous acceptez, le compte à rebours démarre, et vous courez en direct contre un vrai adversaire.*
>
> *Avec notre système ELO, chaque victoire compte, chaque duel vous fait progresser, et la communauté grandit naturellement. Ce n'est plus du tracking passif : c'est de la compétition active.*
>
> *GeoRace, c'est le seul moyen de transformer le running en sport compétitif accessible à tous. Êtes-vous prêt à courir pour gagner ? »*

---

### 🟦 Slide 3 - Le problème des apps actuelles

**Pourquoi les coureurs s'ennuient sur Strava, Nike Run Club et Runkeeper**

❌ **Compétition asynchrone** : vous comparez vos temps à des performances passées
❌ **Pas d'interaction réelle** : vous êtes seul face à votre écran
❌ **Segments fixes** : toujours les mêmes parcours, aucune surprise
❌ **Motivation en déclin** : partager des stats ne crée pas d'excitation

**Résultat :** 60% des utilisateurs abandonnent après 3 mois

---

### 🟦 Slide 4 - Notre réponse : LE DUEL EN TEMPS RÉEL

**GeoRace = La seule app qui crée de vraies courses spontanées**

🎯 **Détection instantanée** : l'app repère les coureurs actifs près de vous  
⚡ **Défi immédiat** : "Paul (ELO 1420) vous défie - Accepter?"  
📍 **Point équidistant** : algorithme calcule un finish accessible à la même distance pour tous  
🏁 **Course en direct** : départ synchronisé, positions live, arrivée simultanée

**LA DIFFÉRENCE :** Ce n'est plus du tracking, c'est une vraie compétition !

**LE MODE DUEL = NOTRE ADN**
- Chaque course devient un événement unique et excitant
- L'adrénaline de la compétition remplace la solitude du jogging
- Gratification immédiate : vous savez si vous avez GAGNÉ ou PERDU

---

### 🟦 Slide 5 - Pourquoi le duel change tout

**L'adrénaline d'une vraie course, à chaque sortie**

**Ce que ressent l'utilisateur dans un DUEL :**

1. **AVANT** : "Je vais courir 30 minutes..."  
   **AVEC GEORACE** : "Je vais AFFRONTER ce coureur que je vois au parc !"

2. **PENDANT** : "Je suis à 500m du but, je le dépasse ou pas ?"  
   → GPS live, distance restante, position de l'adversaire en temps réel  
   → **Tension maximale** : chaque seconde compte, chaque mètre compte

3. **APRÈS** : "+25 ELO, 1er sur 3 dans ma ville cette semaine !"  
   → Gratification immédiate, envie de recommencer  
   → **Sentiment de victoire** ou leçon pour s'améliorer

**PSYCHOLOGIE DU DUEL :**
- Engagement émotionnel 10x supérieur au tracking solo
- Libération de dopamine à chaque victoire
- Création d'une habitude addictive (le "encore un duel")

**Strava vous dit combien vous avez couru.**  
**GeoRace vous dit si vous avez GAGNÉ.**

---

### 🟦 Slide 6 - Le point équidistant : notre innovation technique

**Pourquoi personne d'autre ne le fait**

**Le problème des courses spontanées :**
- Si on court vers le même point → celui qui est plus proche gagne toujours
- Si on court chacun son parcours → impossible de comparer équitablement

**Notre solution brevetable :**

1. **Algorithme de géolocalisation** : calcule un point accessible à distance ÉGALE pour tous
2. **Prise en compte du terrain** : routes, chemins, zones interdites
3. **Validation en temps réel** : les coureurs voient le parcours avant d'accepter

**Résultat :** Compétition 100% équitable, quelle que soit votre position de départ

**Aucun concurrent ne propose cela.**

---

### 🟦 Slide 7 - Scénario utilisateur : Emma vs Strava

**Pourquoi Emma (29 ans, 4 courses/semaine) quitte Strava pour GeoRace**

**SUR STRAVA (avant) :**
- Lance l'app → court seule → partage son temps → 12 likes
- "Mon meilleur temps sur ce segment : 8min23"
- Motivation : ★★☆☆☆

**SUR GEORACE (maintenant) :**
- Lance l'app → "3 coureurs détectés à 600m"
- Accepte le défi de Lucas (ELO 1395, proche de son niveau 1420)
- Course de 1,8km vers un point au bord de la rivière
- **ELLE GAGNE de 12 secondes** → +28 ELO, badge "5 victoires"
- Motivation : ★★★★★

**CE QUI CHANGE :** L'excitation d'une vraie compétition vs comparaison de chiffres

---

### 🟦 Slide 8 - Pourquoi les utilisateurs vont switcher

**3 raisons concrètes de quitter Strava/Nike Run Club**

**1️⃣ LA COMPÉTITION RÉELLE**
- Strava : "J'ai fait 5km en 28min" → 0 émotion
- GeoRace : "J'ai BATTU ce coureur qui me narguait !" → adrénaline ++

**2️⃣ L'INTERACTION SOCIALE ACTIVE**
- Nike Run Club : partage de stats passives
- GeoRace : duels live, chat en direct, défis entre amis

**3️⃣ LA PROGRESSION VISIBLE**
- Runkeeper : graphiques de distance et temps
- GeoRace : classement ELO qui monte, badges débloqués, statut (Bronze → Or)

**Les utilisateurs ne veulent plus juste "tracker" leurs courses.**  
**Ils veulent GAGNER.**

---

### 🟦 Slide 9 - Tableau comparatif : GeoRace vs Concurrents

| Fonctionnalité | Strava | Nike Run Club | Runkeeper | **GeoRace** |
|----------------|:------:|:-------------:|:---------:|:-----------:|
| Duels en temps réel | ❌ | ❌ | ❌ | ✅ |
| Point d'arrivée équidistant | ❌ | ❌ | ❌ | ✅ |
| Matchmaking ELO | ❌ | ❌ | ❌ | ✅ |
| Compétition synchrone | ❌ | ❌ | ❌ | ✅ |
| Tracking GPS | ✅ | ✅ | ✅ | ✅ |
| Segments fixes | ✅ | ❌ | ❌ | ❌ |
| Défis asynchrones | ✅ | ✅ | ❌ | ✅ |

**GeoRace = Seule app de duel instantané et équitable**

---

### 🟦 Slide 10 - Pourquoi nous nous démarquons

**Nos barrières à l'entrée : ce que Strava ne peut PAS copier**

**1. ALGORITHME DE POINT ÉQUIDISTANT**
- Complexité technique : calcul géospatial en temps réel
- **Brevet déposable** : méthode unique de matching géographique équitable
- Années de R&D pour atteindre notre niveau de précision

**2. INFRASTRUCTURE TEMPS RÉEL**
- WebSocket à faible latence pour positions live (<500ms)
- Architecture distribuée optimisée pour la synchronisation GPS
- **Expertise technique rare** : peu d'équipes maîtrisent le temps réel géolocalisé

**3. COMMUNAUTÉ DE COMPÉTITEURS**
- **Effet réseau puissant** : plus il y a de coureurs, plus de duels disponibles
- Base ELO impossible à transférer vers un concurrent
- Culture de compétition loyale vs culture de tracking passif

**4. POSITIONNEMENT UNIQUE**
- Nous sommes LA plateforme de compétition, pas de tracking
- Strava excelle dans le tracking passif, nous excellons dans la compétition active
- **Impossible pour eux de pivoter** sans cannibaliser leur base existante

**Notre moat : technologie + communauté + positionnement clair**

---

### 🟦 Slide 11 - Stratégie d'acquisition : convertir les utilisateurs de Strava

**Comment faire venir 10 000 utilisateurs Strava en 6 mois**

**Phase 1 : Ciblage hyper-local (Mois 1-3)**
- Lancement dans 2-3 villes (Paris, Lyon, Marseille)
- Partenariats avec running clubs locaux
- Événements "GeoRace Challenge" dans les parcs populaires

**Phase 2 : Viralité par le défi (Mois 4-6)**
- Feature "Inviter un ami Strava à un duel"
- Bonus ELO si vous faites venir un nouveau coureur
- Classements par ville → compétition entre communautés

**Phase 3 : Proof of concept (Mois 6)**
- 500 utilisateurs actifs
- Taux de rétention J7 >40%
- Moyenne 6 duels/semaine par utilisateur

**Objectif final :** Devenir l'app #1 pour la compétition, Strava reste pour le tracking

---

### 🟦 Slide 12 - Comment convertir les utilisateurs existants (Strava/NRC)

**Tactiques concrètes pour faire switcher les coureurs des apps concurrentes**

**1️⃣ ONBOARDING CIBLÉ**
- Détection automatique de l'utilisation de Strava/NRC (permissions)
- Message personnalisé : "Vous utilisez Strava ? Continuez à tracker vos courses là-bas, mais venez COMPÉTITIONNER ici !"
- Import optionnel de l'historique pour calculer ELO initial

**2️⃣ INVITATIONS IN-APP**
- Feature "Défier un coureur Strava" : envoi de lien d'invitation personnalisé
- Bonus ELO pour parrainage : +50 points si votre filleul gagne son 1er duel
- Partage automatique des victoires sur Strava/réseaux sociaux avec CTA "Défie-moi sur GeoRace"

**3️⃣ PARTENARIATS RUNNING CLUBS**
- Sponsoring de clubs locaux : app gratuite Premium pour tous les membres
- Organisation d'événements GeoRace Challenge (tournois locaux)
- Ambassadeurs communautaires : coureurs influents dans chaque ville

**4️⃣ ÉVÉNEMENTS LOCAUX**
- "GeoRace Challenge" hebdomadaires dans les zones de running populaires
- Prix pour les podiums (équipement sportif, abonnements Premium)
- Médiatisation locale (presse, réseaux sociaux)

**5️⃣ CTA VERS LE DUEL**
- Push notifications intelligentes : "3 coureurs actifs à 500m, lancez un défi !"
- Gamification de l'onboarding : "Gagnez votre 1er duel pour débloquer le classement"

**L'objectif : faire coexister les deux apps (Strava = tracking, GeoRace = compétition) puis prendre la place**

---

### 🟦 Slide 13 - Le système ELO : matchmaking intelligent

**Pourquoi le duel reste motivant même après 100 courses**

**Problème :** Si on oppose débutants vs experts → frustration des deux côtés

**Solution ELO :**
- Chaque victoire/défaite ajuste votre score
- Algorithme vous oppose à des coureurs de ±100 ELO
- Progression visible : Bronze (0-1000) → Platine (2000+)

**Exemple concret :**
- Emma (ELO 1420) bat Lucas (ELO 1450) → +28 points (victoire difficile)
- Emma bat Sophie (ELO 1200) → +8 points (victoire facile)

**Résultat :** Chaque duel est challengeant mais faisable → motivation maximale

**Strava ne propose rien de tel.**

---

### 🟦 Slide 14 - Aspect social : plus fort que Nike Run Club

**Créer une vraie communauté de compétiteurs**

**FONCTIONNALITÉS SOCIALES :**

**01 - PROFILS DE COMPÉTITEURS**
- Statistiques détaillées : ratio victoires/défaites, progression ELO, parcours favoris
- Historique des duels : "Vous avez battu Paul 3 fois, il vous a battu 2 fois"

**02 - LIGUES LOCALES**
- Classement par ville/quartier : "Top 10 de Paris 15e"
- Tournois hebdomadaires : "Gagnez 3 duels ce week-end pour le badge"

**03 - DÉFIS ENTRE AMIS**
- "Emma défie Paul : course de 2km, RDV Parc Montsouris dans 20min"
- Smack talk via chat intégré avant/après la course

**Nike Run Club = réseau passif**  
**GeoRace = compétition active**

---

### 🟦 Slide 15 - Sécurité et anti-triche

**Réponses aux objections principales**

**OBJECTION 1 : "On peut tricher en vélo/voiture"**
✅ Détection de vitesse anormale (>18 km/h sur longue durée)
✅ Analyse des patterns GPS (accélération impossible)
✅ Signalement communautaire + vérification manuelle
✅ Bannissement permanent des tricheurs

**OBJECTION 2 : "Risque de stalking via GPS"**
✅ Position visible UNIQUEMENT pendant les duels actifs
✅ Mode anonyme : pseudonyme, pas de vraie identité
✅ Blocage d'utilisateurs
✅ Zone de confort : accepter duels uniquement dans un périmètre défini

**OBJECTION 3 : "Sur-effort dangereux"**
✅ Alertes de sécurité si rythme cardiaque trop élevé (intégration montres)
✅ Mode "course prudente" qui limite la vitesse

---

### 🟦 Slide 16 - Modèle économique : freemium optimisé

**Convertir la motivation en revenus**

**GRATUIT (acquisition) :**
- 3 duels/jour
- ELO et classements
- Statistiques de base
- Événements communautaires

**PREMIUM 4,99€/mois (conversion 10-15%) :**
- **Duels illimités** ← valeur principale
- Statistiques avancées (zones de vitesse, analyse progression ELO)
- Mode entraînement vs vos records passés
- Personnalisation (avatars, badges exclusifs)
- 0 publicité

**REVENUS ADDITIONNELS :**
- Partenariats Nike/Adidas (sponsoring tournois)
- Événements premium 5-10€ (courses organisées avec prix)

**LTV estimée :** 60€/utilisateur sur 12 mois (vs 12€ pour Strava)

---

### 🟦 Slide 17 - Métriques de succès (objectifs 6 mois)

**Comment mesurer la traction**

**ENGAGEMENT (prouve que le concept marche) :**
- ✅ Taux de rétention J7 : >40% (vs 25% apps fitness standard)
- ✅ Duels/semaine/utilisateur : 6-8 (preuve d'addiction)
- ✅ Taux d'acceptation duels : >60% (les gens veulent compétitionner)

**CROISSANCE (viralité naturelle) :**
- ✅ Coefficient K : >1,2 (chaque utilisateur amène 1,2 nouveau)
- ✅ Croissance mensuelle : +20% nouveaux utilisateurs
- ✅ 500 utilisateurs actifs dans 3 villes pilotes

**MONÉTISATION :**
- ✅ Conversion Premium : 10-12% (vs 5% moyenne marché)
- ✅ LTV/CAC : >3 (rentabilité prouvée)

---

### 🟦 Slide 18 - Roadmap : lancement en 3 phases

**Phase 1 (Mois 1-6) : MVP + Proof of Concept**
- App iOS/Android (React Native)
- Duels 1v1, ELO, point équidistant
- Lancement Paris + Lyon
- **500 utilisateurs actifs, 40% rétention J7**

**Phase 2 (Mois 7-12) : Gamification et viralité**
- Badges, profils, ligues locales
- Événements hebdomadaires
- Feature "Défier un ami"
- **5 000 utilisateurs, expansion 5 villes**

**Phase 3 (An 2) : Scale national**
- Version Premium
- Duels multi-joueurs (3-5 coureurs)
- Partenariats marques
- **50 000 utilisateurs, 10+ villes**

---

### 🟦 Slide 19 - Pourquoi maintenant ?

**Le timing parfait pour GeoRace**

**1. MARCHÉ MATURE MAIS STAGNANT**
- Strava : 100M users, mais taux engagement en baisse
- Utilisateurs cherchent nouveauté et excitation

**2. TECHNOLOGIE DISPONIBLE**
- GPS précis sur tous les smartphones
- WebSocket et infra cloud à faible coût
- Algorithmes géospatiaux open-source (PostGIS)

**3. TENDANCE SOCIALE**
- Génération Z/Millennials : veulent compétition et instant gratification
- Esport et gamification mainstream
- Communautés locales en recherche de connexion IRL

**4. COVID A BOOSTÉ LE RUNNING**
- +40% de coureurs réguliers depuis 2020
- Besoin d'interaction sociale post-confinement

---

### 🟦 Slide 20 - Vision finale

> **GeoRace ne remplace pas Strava.**  
> **GeoRace transforme la course en sport compétitif accessible.**

**Notre ambition :**

🎯 Devenir la plateforme #1 de compétition running temps réel  
🌍 Créer une communauté mondiale de 1M+ coureurs compétitifs  
🏆 Organiser des ligues professionnelles GeoRace (comme l'esport)

**Dans 5 ans :**
- "Tu es sur GeoRace ?" = nouvelle norme chez les coureurs
- Événements physiques GeoRace dans 50 villes
- Partenariats JO Paris 2028 (course urbaine compétitive)

---

### 🟦 Slide 21 - Appel à l'action

**Pourquoi investir/soutenir GeoRace ?**

✅ **Concept unique** : aucun concurrent direct sur le duel temps réel équitable  
✅ **Marché prouvé** : 100M+ utilisateurs apps running cherchent motivation  
✅ **Différenciation forte** : impossible pour Strava de pivoter vers notre modèle  
✅ **Équipe motivée** : passion pour le running + compétences tech  
✅ **Roadmap claire** : MVP en 6 mois, traction mesurable

**Prochaines étapes :**
1. Finaliser MVP (dev en cours)
2. Tester avec 50 beta-testeurs (running clubs Paris)
3. Lancement public dans 3 mois

**Rejoignez-nous pour transformer le running en vraie compétition.**

---

### 🟦 Slide 22 - Phrase finale

**GeoRace**

> Chaque course est un duel.  
> Chaque duel est une victoire ou une leçon.  
> La motivation ne vient pas du tracking.  
> Elle vient de la COMPÉTITION.

**Êtes-vous prêt à courir pour GAGNER ?**

🏁 **GeoRace - Run. Race. Win.**
EOF


# --- Other MD files (shortened for brevity) ---
cat > "$OUTDIR/GeoRace_Personas.md" <<'EOFPERS'
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
EOFPERS

cat > "$OUTDIR/GeoRace_PBS.md" <<'EOFPBS'
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
EOFPBS

cat > "$OUTDIR/GeoRace_Benchmark_Matrix.md" <<'EOFBENCH'
# Benchmark concurrents

| App | Duels réel | Point équidistant | ELO | 1v1 local |
|---|:---:|:---:|:---:|:---:|
| Strava | Non | Non | Non | Non |
| Nike Run Club | Non | Non | Non | Non |
| Zwift Run | Virtuel | Non | Non | Non |
| **GeoRace** | **Oui** | **Oui** | **Oui** | **Oui** |
EOFBENCH

cat > "$OUTDIR/GeoRace_Contexte_Securite.md" <<'EOFCTX'
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
EOFCTX

cat > "$OUTDIR/assets/architecture.mmd" <<'EOFMMD'
flowchart LR
  A[App Mobile] -->|WebSocket| GW[Gateway]
  A -->|REST| API[API]
  GW --> Broker[Broker]
  API --> Broker
  Broker --> Match[Matchmaking]
  Broker --> ELO[ELO]
  Broker --> Race[Orchestrator]
  Race --> DB[(PostGIS)]
EOFMMD

cat > "$OUTDIR/GeoRace_Architecture.md" <<'EOFARCH'
# Architecture MVP

![Architecture](assets/architecture.png)

- WebSocket pour positions haute fréquence
- PostGIS pour géospatial
- Kubernetes auto-scaling
EOFARCH

cat > "$OUTDIR/GeoRace_Stack_Justification.md" <<'EOFSTACK'
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
EOFSTACK

cat > "$OUTDIR/GeoRace_Wireframes.md" <<'EOFWIRE'
# Wireframes

## Home

![Home](assets/wireframe_home.svg)

## Duel Modal

![Duel](assets/wireframe_duel_modal.svg)

## Live Race

![Live](assets/wireframe_live.svg)

## Résultat

![Result](assets/wireframe_result.svg)
EOFWIRE

cat > "$OUTDIR/GeoRace_Couts_Table.md" <<'EOFCOST'
# Chiffrage MVP (6 mois)

## Humains: 215.5k EUR
## Infra: 57k EUR
## Autres: 30k EUR

**Total: ~302.5k EUR**
EOFCOST

cat > "$OUTDIR/GeoRace_Etude_Comparative.md" <<'EOFCOMP'
# Étude hébergement

## Cloud managed (recommandé)
- AWS/GCP
- Déploiement rapide

## Self-host
- CAPEX moindre
- Time-to-market lent

**Choix: Cloud managed**
EOFCOMP

cat > "$OUTDIR/GeoRace_Risques_Mitigation.md" <<'EOFRISK'
# Matrice risques

| Risque | Prob | Impact | Mitigation |
|---|:---:|:---:|---|
| Fuite position | M | H | Chiffrement |
| Triche | H | H | Anti-cheat |
| Densité faible | H | M | Ghost-runners |
| Rejet Store | M | H | Flow onboarding |
EOFRISK

cat > "$OUTDIR/GeoRace_EcoScore.md" <<'EOFECO'
# Éco-score

## Empreinte MVP
- 300-800 kg CO2e/an

## Optimisations
- Adaptive GPS
- Compression
- Cloud green

**Cible: <500 kg CO2e/an**
EOFECO

# --- SVGs ---
cat > "$OUTDIR/assets/wireframe_home.svg" <<'EOFSVG1'
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500">
  <rect width="100%" height="100%" fill="#fff"/>
  <rect x="20" y="20" width="760" height="140" fill="#eee" stroke="#ccc"/>
  <text x="30" y="50" font-family="Arial" font-size="20">Carte mini</text>
  <rect x="20" y="180" width="760" height="280" fill="#fafafa" stroke="#ddd"/>
  <text x="30" y="210" font-family="Arial" font-size="18">Liste coureurs</text>
  <rect x="600" y="420" width="160" height="50" rx="8" fill="#007bff"/>
  <text x="620" y="450" font-family="Arial" font-size="16" fill="#fff">Démarrer run</text>
</svg>
EOFSVG1

cat > "$OUTDIR/assets/wireframe_duel_modal.svg" <<'EOFSVG2'
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="360">
  <rect width="100%" height="100%" fill="#fff"/>
  <rect x="40" y="30" width="520" height="300" fill="#f6f6f6" stroke="#ddd"/>
  <text x="60" y="70" font-family="Arial" font-size="20">Duel proposé</text>
  <rect x="80" y="220" width="100" height="40" fill="#28a745"/>
  <text x="100" y="245" font-family="Arial" font-size="14" fill="#fff">Accepter</text>
  <rect x="220" y="220" width="100" height="40" fill="#dc3545"/>
  <text x="245" y="245" font-family="Arial" font-size="14" fill="#fff">Refuser</text>
</svg>
EOFSVG2

cat > "$OUTDIR/assets/wireframe_live.svg" <<'EOFSVG3'
<svg xmlns="http://www.w3.org/2000/svg" width="900" height="500">
  <rect width="100%" height="100%" fill="#fff"/>
  <rect x="20" y="20" width="860" height="360" fill="#eef6ff" stroke="#cfe2ff"/>
  <text x="40" y="60" font-family="Arial" font-size="18">Live Race</text>
  <rect x="720" y="420" width="140" height="50" rx="8" fill="#ff4136"/>
  <text x="755" y="450" font-family="Arial" font-size="16" fill="#fff">Sécurité</text>
</svg>
EOFSVG3

cat > "$OUTDIR/assets/wireframe_result.svg" <<'EOFSVG4'
<svg xmlns="http://www.w3.org/2000/svg" width="700" height="420">
  <rect width="100%" height="100%" fill="#fff"/>
  <text x="40" y="60" font-family="Arial" font-size="22">Résultat</text>
  <text x="40" y="110" font-family="Arial" font-size="18">1. Vous</text>
  <text x="40" y="200" font-family="Arial" font-size="16">+25 ELO</text>
  <rect x="460" y="320" width="160" height="50" fill="#007bff"/>
  <text x="510" y="350" font-family="Arial" font-size="14" fill="#fff">Partager</text>
</svg>
EOFSVG4

echo "Assets created."

# --- Mermaid ---
if command -v mmdc >/dev/null 2>&1; then
  echo "Rendering mermaid..."
  mmdc -i "$OUTDIR/assets/architecture.mmd" -o "$OUTDIR/assets/architecture.png" -p /dev/null --puppeteerConfigFile <(echo '{"args":["--no-sandbox","--disable-setuid-sandbox"]}') 2>/dev/null || \
  mmdc -i "$OUTDIR/assets/architecture.mmd" -o "$OUTDIR/assets/architecture.png" || echo "Warning: mermaid failed"
else
  echo "mmdc not found, skipping PNG."
fi

# --- Convert (FIX: proper loop syntax) ---
echo "Converting to .docx and .pptx..."

ORIGDIR=$(pwd)
cd "$OUTDIR"

# Fix: use proper glob without redirect
for f in *.md; do
  [ -f "$f" ] || continue
  base="${f%.md}"
  echo "Generating ${base}.docx"
  pandoc -M title="$base" -M author="$AUTHOR" --toc -o "${base}.docx" "$f" || echo "  → Failed: $f"
done

if command -v pandoc >/dev/null 2>&1; then
  echo "Generating PPTX..."
  pandoc -M title="GeoRace" -M author="$AUTHOR" -f markdown -t pptx -o "GeoRace_presentation.pptx" "GeoRace_ppt.md" || echo "  → PPTX failed"
fi

cd "$ORIGDIR"

# --- Summary ---
echo ""
echo "✅ Build complete!"
echo ""
echo "Output files created in: $OUTDIR"
echo ""
echo "Generated files:"
if [ -d "$OUTDIR" ]; then
  find "$OUTDIR" -type f | sort | sed 's|^|  - |'
else
  echo "  (none - build may have failed)"
  exit 1
fi
echo ""
echo "To inspect the generated files, navigate to:"
echo "  $OUTDIR"
echo ""