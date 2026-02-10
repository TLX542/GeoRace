#!/usr/bin/env bash
set -euo pipefail

# Script pour générer la présentation GeoRace
# Usage: ./scripts/generate_presentation.sh [--lang fr|en]

LANG="fr"
OUTDIR="."
AUTHOR="TLX542"

# Parse arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    --lang)
      LANG="$2"
      shift 2
      ;;
    *)
      echo "Usage: $0 [--lang fr|en]"
      exit 1
      ;;
  esac
done

echo "Génération de la présentation en langue: $LANG"

if [ "$LANG" = "fr" ]; then
  # Version française
  cat > "$OUTDIR/GeoRace_ppt.md" <<'EOF'
### 🟦 Slide 1 – Titre

**GeoRace**

> L'application de course compétitive en temps réel

**Sous‑titre :**
Transformez chaque sortie running en duel excitant.

---

### 🟦 Slide 2 – Problème

**Courir seul, une motivation en berne**

* De nombreux coureurs se sentent démotivés seuls
* Manque de défi et d'interaction
* Difficulté à mesurer ses progrès face à d'autres
* Risque d'abandon des objectifs sportifs

➡ Résultat : monotonie, perte de motivation, arrêt de la pratique

---

### 🟦 Slide 3 – Nos différenciateurs

**Ce qui rend GeoRace unique**

* **Duel en temps réel vers un point d'arrivée équidistant** → équité garantie entre coureurs
* **Matchmaking ELO** → adversaires de niveau comparable, progression visible
* **GPS en direct & suivi synchronisé** → expérience compétitive immédiate
* **Confidentialité et sécurité** → partage de position limité aux duels actifs
* **Anti‑triche intégré** (détection d'anomalies GPS, vérifications de parcours)
* **Fonctions sociales** → profils, chat, badges, classements locaux

---

### 🟦 Slide 4 – Pourquoi les utilisateurs nous rejoindront

**Les raisons de passer à GeoRace**

* **Expérience de duel unique et équitable** = plus de fun et de challenge
* **Progression visible (ELO)** = motivation à revenir
* **Événements locaux & tournois** = opportunités sociales et récompenses
* **Transfert facile des amis** via invitations et duels immédiats

---

### 🟦 Slide 5 – Stratégie d'acquisition (comment voler des utilisateurs aux concurrents)

**Tactiques concrètes pour attirer les utilisateurs**

* **Ciblage local** : organiser micro‑événements et challenges dans les parcs et campus
* **Partenariats** avec clubs de course, coachs, influenceurs locaux
* **Intégrations & porte d'entrée** : import simplifié depuis Strava/Runkeeper + import d'amis
* **Programmes d'incitation** : duels gratuits/bonus initial ELO, récompenses, badges exclusifs
* **Campagnes social media** montrant duels en direct + récits d'utilisateurs
* **Fonctionnalités différenciantes en onboarding** (démonstration duel en 30s)

---

### 🟦 Slide 6 – Concept innovant : Le mode duel

**Duels en temps réel pour tous**

🏃 **DUELS EN TEMPS RÉEL**
Affrontez d'autres coureurs à proximité dans des courses spontanées

📍 **POINT D'ARRIVÉE ÉQUITABLE**
Chaque duel se termine à un point équidistant pour tous les participants

⚖️ **COMPÉTITION JUSTE**
Système ELO garantit des matchs équilibrés quel que soit votre niveau

---

### 🟦 Slide 7 – Fonctionnement d'un duel

**3 étapes simples**

**01 - DÉTECTION DES COUREURS**
Identification automatique des coureurs actifs à proximité

**02 - POINT D'ARRIVÉE ÉQUITABLE**
Calcul algorithmique d'un point accessible à distance égale pour tous

**03 - DÉPART SIMULTANÉ**
Compte à rebours synchronisé après acceptation mutuelle

---

### 🟦 Slide 8 – Un duel GeoRace

**Scénario typique :**

1. **Vous commencez votre course** → l'app détecte 3 coureurs dans un rayon de 800m
2. **Proposition de duel** → notification "Paul (ELO 1420) vous défie"
3. **Vous acceptez** → le système calcule un point d'arrivée à 1,2km pour chacun
4. **Départ dans 10 secondes** → compte à rebours
5. **Course en direct** → GPS vous guide, position de l'adversaire visible
6. **Arrivée** → +25 ELO, badge "5 victoires consécutives" débloqué

---

### 🟦 Slide 9 – Démo rapide (points clés pour la présentation)

**Script de présentation - Points à appuyer**

* **Point d'arrivée équidistant** : "Chaque coureur parcourt exactement la même distance - l'équité totale"
* **Matchmaking ELO** : "Vous affrontez toujours quelqu'un de votre niveau - ni trop facile, ni impossible"
* **Duel en temps réel** : "Pas de comparaison après coup - c'est une vraie course, maintenant"
* **Sécurité et confidentialité** : "Votre position n'est visible que pendant les duels actifs"
* **Anti-triche** : "Détection automatique des anomalies GPS - pas de tricheurs"
* **Engagement social** : "Profils, chat, badges, tournois locaux - une vraie communauté"

**Message clé** : Le duel équitable en temps réel change tout - ce n'est plus du tracking, c'est de la compétition !

---

### 🟦 Slide 10 – Aspect social

**Construisez une communauté de coureurs**

**01 - MATCHMAKING ÉQUILIBRÉ**
Connexion automatique entre coureurs de niveaux similaires grâce à l'ELO

**02 - DISCUSSION ET PARTAGE**
Chat en direct, ajout d'amis, profils détaillés avec statistiques

**03 - ÉVÉNEMENTS COMMUNAUTAIRES**
Courses organisées, défis collectifs, ligues locales par ville/quartier

---

### 🟦 Slide 11 – Système de classement ELO

**Compétition équitable et progression motivante**

**01 - MATCHS ÉQUILIBRÉS**
Algorithme ELO vous oppose à des coureurs de niveau proche

**02 - PROGRESSION VISIBLE**
Suivez votre montée dans les classements (Bronze → Argent → Or → Platine)

**03 - RÉCOMPENSES ET BADGES**
Débloquez des achievements à chaque niveau atteint

---

### 🟦 Slide 12 – Bénéfices de GeoRace

**Plus qu'une app de running**

**01 - MOTIVATION ACCRUE**
Chaque sortie devient un défi concret et excitant

**02 - AMÉLIORATION DES PERFORMANCES**
La compétition pousse naturellement au dépassement de soi

**03 - BIEN-ÊTRE SOCIAL**
Rencontrez et interagissez avec d'autres coureurs passionnés

---

### 🟦 Slide 13 – Fonctionnalités clés

**Technologie au service de la performance**

* **GPS haute précision** : tracking en temps réel pendant les duels
* **Algorithme intelligent** : calcul de points équidistants accessibles
* **Sécurité** : position visible uniquement en duel actif
* **Anti-triche** : détection de vitesse anormale et validation communautaire
* **Optimisation batterie** : mode économie d'énergie

---

### 🟦 Slide 14 – Cible

**Qui utilise GeoRace ?**

* 🏃‍♂️ **Coureurs réguliers** : cherchent à améliorer leurs performances
* 👟 **Coureurs occasionnels** : ont besoin de motivation pour rester réguliers
* 🏅 **Coureurs compétitifs** : veulent tester leur niveau entre les courses officielles
* 👥 **Nouveaux coureurs** : cherchent une communauté motivante

---

### 🟦 Slide 15 – Différenciation vs concurrents

**Ce que les autres apps ne font pas :**

* **Strava** → réseau social, pas de compétition temps réel
* **Nike Run Club** → tracking + défis asynchrones
* **Runkeeper** → GPS basique sans interaction

**GeoRace combine :**

> Duels spontanés en temps réel + Point d'arrivée équitable + Matchmaking ELO

**= Concept unique sur le marché**

---

### 🟦 Slide 16 – Modèle économique

**Freemium avec valeur ajoutée**

**Gratuit :**
* 3 duels par jour
* Classement ELO
* Statistiques de base
* Événements communautaires

**Premium (4,99€/mois) :**
* Duels illimités
* Statistiques avancées
* Personnalisation profil
* Mode entraînement contre vos records
* Pas de publicités

**Revenus additionnels :**
* Partenariats marques (Nike, Adidas)
* Événements premium avec prix

---

### 🟦 Slide 17 – Roadmap

**Déploiement progressif**

**Phase 1 (6 mois) - MVP**
* Duels 1v1 en temps réel
* Système ELO
* Test dans 2-3 villes pilotes
* **Objectif : 500 utilisateurs actifs**

**Phase 2 (12 mois) - Gamification**
* Badges, statistiques, profils
* Événements communautaires
* **Objectif : 5 000 utilisateurs**

**Phase 3 (24 mois) - Scale**
* Version Premium
* Duels multi-joueurs
* Expansion nationale
* **Objectif : 50 000 utilisateurs**

---

### 🟦 Slide 18 – Défis & Solutions

**Anticiper les obstacles**

**Défi : Sécurité des coureurs**
→ Alertes de sécurité, mode "course prudente"

**Défi : Zones rurales (peu d'utilisateurs)**
→ Mode asynchrone contre "ghost runners"

**Défi : Triche (vélo, voiture)**
→ Détection vitesse anormale + validation communautaire

**Défi : Vie privée**
→ Position visible uniquement en duel, blocage d'utilisateurs

---

### 🟦 Slide 19 – Vision

> GeoRace ne se contente pas de tracker vos courses.
> Nous transformons la course à pied en une **expérience sociale, compétitive et motivante** accessible à tous, partout, à tout moment.

**Notre ambition :**
Devenir la référence de la course compétitive en temps réel et créer une communauté mondiale de coureurs passionnés par le défi.

---

### 🟦 Slide 20 – Phrase finale

**GeoRace**

> Chaque course est un duel.
> Chaque duel est une opportunité.
> Transformez votre motivation.

**Prêt à relever le défi ?**
EOF

elif [ "$LANG" = "en" ]; then
  # Version anglaise
  cat > "$OUTDIR/GeoRace_ppt.md" <<'EOF'
### 🟦 Slide 1 – Title

**GeoRace**

> The real-time competitive running app

**Subtitle:**
Turn every run into an exciting duel.

---

### 🟦 Slide 2 – Problem

**Running alone, declining motivation**

* Many runners feel demotivated when running alone
* Lack of challenge and interaction
* Difficulty measuring progress against others
* Risk of abandoning fitness goals

➡ Result: monotony, loss of motivation, practice abandonment

---

### 🟦 Slide 3 – Our differentiators

**What makes GeoRace unique**

* **Real-time duel to an equidistant finish point** → guaranteed fairness between runners
* **ELO Matchmaking** → opponents of comparable level, visible progression
* **Live GPS & synchronized tracking** → immediate competitive experience
* **Privacy and security** → position sharing limited to active duels
* **Integrated anti-cheat** (GPS anomaly detection, route verification)
* **Social features** → profiles, chat, badges, local leaderboards

---

### 🟦 Slide 4 – Why users will join us

**Reasons to switch to GeoRace**

* **Unique and fair duel experience** = more fun and challenge
* **Visible progression (ELO)** = motivation to return
* **Local events & tournaments** = social opportunities and rewards
* **Easy friend transfer** via invitations and immediate duels

---

### 🟦 Slide 5 – Acquisition strategy (how to steal users from competitors)

**Concrete tactics to attract users**

* **Local targeting**: organize micro-events and challenges in parks and campuses
* **Partnerships** with running clubs, coaches, local influencers
* **Integrations & entry point**: simplified import from Strava/Runkeeper + friend import
* **Incentive programs**: free duels/initial ELO bonus, rewards, exclusive badges
* **Social media campaigns** showing live duels + user stories
* **Differentiating features in onboarding** (30s duel demonstration)

---

### 🟦 Slide 6 – Innovative concept: Duel mode

**Real-time duels for everyone**

🏃 **REAL-TIME DUELS**
Face other nearby runners in spontaneous races

📍 **FAIR FINISH POINT**
Each duel ends at an equidistant point for all participants

⚖️ **FAIR COMPETITION**
ELO system ensures balanced matches regardless of your level

---

### 🟦 Slide 7 – How a duel works

**3 simple steps**

**01 - RUNNER DETECTION**
Automatic identification of active runners nearby

**02 - FAIR FINISH POINT**
Algorithmic calculation of a point accessible at equal distance for all

**03 - SIMULTANEOUS START**
Synchronized countdown after mutual acceptance

---

### 🟦 Slide 8 – A GeoRace duel

**Typical scenario:**

1. **You start your run** → the app detects 3 runners within 800m
2. **Duel proposal** → notification "Paul (ELO 1420) challenges you"
3. **You accept** → the system calculates a finish point at 1.2km for each
4. **Start in 10 seconds** → countdown
5. **Live race** → GPS guides you, opponent's position visible
6. **Finish** → +25 ELO, badge "5 consecutive victories" unlocked

---

### 🟦 Slide 9 – Quick demo (key points for presentation)

**Presentation script - Key points to emphasize**

* **Equidistant finish point**: "Each runner covers exactly the same distance - total fairness"
* **ELO Matchmaking**: "You always face someone at your level - neither too easy nor impossible"
* **Real-time duel**: "No after-the-fact comparison - it's a real race, now"
* **Security and privacy**: "Your position is only visible during active duels"
* **Anti-cheat**: "Automatic GPS anomaly detection - no cheaters"
* **Social engagement**: "Profiles, chat, badges, local tournaments - a real community"

**Key message**: Fair real-time dueling changes everything - it's no longer tracking, it's competition!

---

### 🟦 Slide 10 – Social aspect

**Build a runner community**

**01 - BALANCED MATCHMAKING**
Automatic connection between runners of similar levels through ELO

**02 - DISCUSSION AND SHARING**
Live chat, friend adding, detailed profiles with statistics

**03 - COMMUNITY EVENTS**
Organized races, collective challenges, local leagues by city/neighborhood

---

### 🟦 Slide 11 – ELO ranking system

**Fair competition and motivating progression**

**01 - BALANCED MATCHES**
ELO algorithm pairs you with runners of similar level

**02 - VISIBLE PROGRESSION**
Track your rise in rankings (Bronze → Silver → Gold → Platinum)

**03 - REWARDS AND BADGES**
Unlock achievements at each level reached

---

### �� Slide 12 – GeoRace benefits

**More than a running app**

**01 - INCREASED MOTIVATION**
Each outing becomes a concrete and exciting challenge

**02 - PERFORMANCE IMPROVEMENT**
Competition naturally pushes self-improvement

**03 - SOCIAL WELL-BEING**
Meet and interact with other passionate runners

---

### 🟦 Slide 13 – Key features

**Technology serving performance**

* **High-precision GPS**: real-time tracking during duels
* **Intelligent algorithm**: calculation of accessible equidistant points
* **Security**: position visible only during active duel
* **Anti-cheat**: abnormal speed detection and community validation
* **Battery optimization**: energy-saving mode

---

### 🟦 Slide 14 – Target audience

**Who uses GeoRace?**

* 🏃‍♂️ **Regular runners**: seeking to improve their performance
* 👟 **Occasional runners**: need motivation to stay consistent
* 🏅 **Competitive runners**: want to test their level between official races
* 👥 **New runners**: looking for a motivating community

---

### 🟦 Slide 15 – Differentiation vs competitors

**What other apps don't do:**

* **Strava** → social network, no real-time competition
* **Nike Run Club** → tracking + asynchronous challenges
* **Runkeeper** → basic GPS without interaction

**GeoRace combines:**

> Spontaneous real-time duels + Fair finish point + ELO Matchmaking

**= Unique concept in the market**

---

### 🟦 Slide 16 – Business model

**Freemium with added value**

**Free:**
* 3 duels per day
* ELO ranking
* Basic statistics
* Community events

**Premium (€4.99/month):**
* Unlimited duels
* Advanced statistics
* Profile customization
* Training mode against your records
* No ads

**Additional revenues:**
* Brand partnerships (Nike, Adidas)
* Premium events with prizes

---

### 🟦 Slide 17 – Roadmap

**Progressive deployment**

**Phase 1 (6 months) - MVP**
* 1v1 real-time duels
* ELO system
* Test in 2-3 pilot cities
* **Goal: 500 active users**

**Phase 2 (12 months) - Gamification**
* Badges, statistics, profiles
* Community events
* **Goal: 5,000 users**

**Phase 3 (24 months) - Scale**
* Premium version
* Multi-player duels
* National expansion
* **Goal: 50,000 users**

---

### 🟦 Slide 18 – Challenges & Solutions

**Anticipating obstacles**

**Challenge: Runner safety**
→ Safety alerts, "cautious race" mode

**Challenge: Rural areas (few users)**
→ Asynchronous mode against "ghost runners"

**Challenge: Cheating (bike, car)**
→ Abnormal speed detection + community validation

**Challenge: Privacy**
→ Position visible only during duel, user blocking

---

### 🟦 Slide 19 – Vision

> GeoRace doesn't just track your runs.
> We transform running into a **social, competitive, and motivating experience** accessible to everyone, everywhere, anytime.

**Our ambition:**
Become the reference for real-time competitive running and create a global community of runners passionate about challenges.

---

### 🟦 Slide 20 – Final message

**GeoRace**

> Every run is a duel.
> Every duel is an opportunity.
> Transform your motivation.

**Ready to take on the challenge?**
EOF

else
  echo "Langue non supportée: $LANG (utilisez fr ou en)"
  exit 1
fi

echo "Fichier markdown créé: GeoRace_ppt.md"

# Conversion avec pandoc si disponible
if command -v pandoc >/dev/null 2>&1; then
  echo "Conversion en PPTX avec pandoc..."
  pandoc -M title="GeoRace" -M author="$AUTHOR" -f markdown -t pptx -o "GeoRace_presentation.pptx" "$OUTDIR/GeoRace_ppt.md"
  
  if [ -f "GeoRace_presentation.pptx" ]; then
    echo "✅ Présentation générée: GeoRace_presentation.pptx"
  else
    echo "❌ Erreur lors de la génération du PPTX"
    exit 1
  fi
else
  echo "⚠️  pandoc n'est pas installé. Veuillez installer pandoc pour générer le PPTX."
  echo "   Installation: sudo apt-get install pandoc (Linux) ou brew install pandoc (Mac)"
  exit 1
fi

echo "✅ Terminé!"
