@echo off
REM Script pour générer la présentation GeoRace (Windows)
REM Usage: scripts\generate_presentation.bat [fr|en]

setlocal enabledelayedexpansion

set LANG=fr
set OUTDIR=.
set AUTHOR=TLX542

REM Parse arguments
if not "%1"=="" (
    set LANG=%1
)

echo Génération de la présentation en langue: %LANG%

if "%LANG%"=="fr" (
    goto :FRENCH
) else if "%LANG%"=="en" (
    goto :ENGLISH
) else (
    echo Langue non supportée: %LANG% (utilisez fr ou en^)
    exit /b 1
)

:FRENCH
(
echo ### 🟦 Slide 1 – Titre
echo.
echo **GeoRace**
echo.
echo ^> L'application de course compétitive en temps réel
echo.
echo **Sous‑titre :**
echo Transformez chaque sortie running en duel excitant.
echo.
echo ---
echo.
echo ### 🟦 Slide 2 – Problème
echo.
echo **Courir seul, une motivation en berne**
echo.
echo * De nombreux coureurs se sentent démotivés seuls
echo * Manque de défi et d'interaction
echo * Difficulté à mesurer ses progrès face à d'autres
echo * Risque d'abandon des objectifs sportifs
echo.
echo ➡ Résultat : monotonie, perte de motivation, arrêt de la pratique
echo.
echo ---
echo.
echo ### 🟦 Slide 3 – Nos différenciateurs
echo.
echo **Ce qui rend GeoRace unique**
echo.
echo * **Duel en temps réel vers un point d'arrivée équidistant** → équité garantie entre coureurs
echo * **Matchmaking ELO** → adversaires de niveau comparable, progression visible
echo * **GPS en direct ^& suivi synchronisé** → expérience compétitive immédiate
echo * **Confidentialité et sécurité** → partage de position limité aux duels actifs
echo * **Anti‑triche intégré** (détection d'anomalies GPS, vérifications de parcours^)
echo * **Fonctions sociales** → profils, chat, badges, classements locaux
echo.
echo ---
echo.
echo ### 🟦 Slide 4 – Pourquoi les utilisateurs nous rejoindront
echo.
echo **Les raisons de passer à GeoRace**
echo.
echo * **Expérience de duel unique et équitable** = plus de fun et de challenge
echo * **Progression visible (ELO^)** = motivation à revenir
echo * **Événements locaux ^& tournois** = opportunités sociales et récompenses
echo * **Transfert facile des amis** via invitations et duels immédiats
echo.
echo ---
echo.
echo ### 🟦 Slide 5 – Stratégie d'acquisition (comment voler des utilisateurs aux concurrents^)
echo.
echo **Tactiques concrètes pour attirer les utilisateurs**
echo.
echo * **Ciblage local** : organiser micro‑événements et challenges dans les parcs et campus
echo * **Partenariats** avec clubs de course, coachs, influenceurs locaux
echo * **Intégrations ^& porte d'entrée** : import simplifié depuis Strava/Runkeeper + import d'amis
echo * **Programmes d'incitation** : duels gratuits/bonus initial ELO, récompenses, badges exclusifs
echo * **Campagnes social media** montrant duels en direct + récits d'utilisateurs
echo * **Fonctionnalités différenciantes en onboarding** (démonstration duel en 30s^)
echo.
echo ---
echo.
echo ### 🟦 Slide 6 – Concept innovant : Le mode duel
echo.
echo **Duels en temps réel pour tous**
echo.
echo 🏃 **DUELS EN TEMPS RÉEL**
echo Affrontez d'autres coureurs à proximité dans des courses spontanées
echo.
echo 📍 **POINT D'ARRIVÉE ÉQUITABLE**
echo Chaque duel se termine à un point équidistant pour tous les participants
echo.
echo ⚖️ **COMPÉTITION JUSTE**
echo Système ELO garantit des matchs équilibrés quel que soit votre niveau
echo.
echo ---
echo.
echo ### 🟦 Slide 7 – Fonctionnement d'un duel
echo.
echo **3 étapes simples**
echo.
echo **01 - DÉTECTION DES COUREURS**
echo Identification automatique des coureurs actifs à proximité
echo.
echo **02 - POINT D'ARRIVÉE ÉQUITABLE**
echo Calcul algorithmique d'un point accessible à distance égale pour tous
echo.
echo **03 - DÉPART SIMULTANÉ**
echo Compte à rebours synchronisé après acceptation mutuelle
echo.
echo ---
echo.
echo ### 🟦 Slide 8 – Un duel GeoRace
echo.
echo **Scénario typique :**
echo.
echo 1. **Vous commencez votre course** → l'app détecte 3 coureurs dans un rayon de 800m
echo 2. **Proposition de duel** → notification "Paul (ELO 1420^) vous défie"
echo 3. **Vous acceptez** → le système calcule un point d'arrivée à 1,2km pour chacun
echo 4. **Départ dans 10 secondes** → compte à rebours
echo 5. **Course en direct** → GPS vous guide, position de l'adversaire visible
echo 6. **Arrivée** → +25 ELO, badge "5 victoires consécutives" débloqué
echo.
echo ---
echo.
echo ### 🟦 Slide 9 – Démo rapide (points clés pour la présentation^)
echo.
echo **Script de présentation - Points à appuyer**
echo.
echo * **Point d'arrivée équidistant** : "Chaque coureur parcourt exactement la même distance - l'équité totale"
echo * **Matchmaking ELO** : "Vous affrontez toujours quelqu'un de votre niveau - ni trop facile, ni impossible"
echo * **Duel en temps réel** : "Pas de comparaison après coup - c'est une vraie course, maintenant"
echo * **Sécurité et confidentialité** : "Votre position n'est visible que pendant les duels actifs"
echo * **Anti-triche** : "Détection automatique des anomalies GPS - pas de tricheurs"
echo * **Engagement social** : "Profils, chat, badges, tournois locaux - une vraie communauté"
echo.
echo **Message clé** : Le duel équitable en temps réel change tout - ce n'est plus du tracking, c'est de la compétition !
echo.
echo ---
echo.
echo ### 🟦 Slide 10 – Aspect social
echo.
echo **Construisez une communauté de coureurs**
echo.
echo **01 - MATCHMAKING ÉQUILIBRÉ**
echo Connexion automatique entre coureurs de niveaux similaires grâce à l'ELO
echo.
echo **02 - DISCUSSION ET PARTAGE**
echo Chat en direct, ajout d'amis, profils détaillés avec statistiques
echo.
echo **03 - ÉVÉNEMENTS COMMUNAUTAIRES**
echo Courses organisées, défis collectifs, ligues locales par ville/quartier
echo.
echo ---
echo.
echo ### 🟦 Slide 11 – Système de classement ELO
echo.
echo **Compétition équitable et progression motivante**
echo.
echo **01 - MATCHS ÉQUILIBRÉS**
echo Algorithme ELO vous oppose à des coureurs de niveau proche
echo.
echo **02 - PROGRESSION VISIBLE**
echo Suivez votre montée dans les classements (Bronze → Argent → Or → Platine^)
echo.
echo **03 - RÉCOMPENSES ET BADGES**
echo Débloquez des achievements à chaque niveau atteint
echo.
echo ---
echo.
echo ### 🟦 Slide 12 – Bénéfices de GeoRace
echo.
echo **Plus qu'une app de running**
echo.
echo **01 - MOTIVATION ACCRUE**
echo Chaque sortie devient un défi concret et excitant
echo.
echo **02 - AMÉLIORATION DES PERFORMANCES**
echo La compétition pousse naturellement au dépassement de soi
echo.
echo **03 - BIEN-ÊTRE SOCIAL**
echo Rencontrez et interagissez avec d'autres coureurs passionnés
echo.
echo ---
echo.
echo ### 🟦 Slide 13 – Fonctionnalités clés
echo.
echo **Technologie au service de la performance**
echo.
echo * **GPS haute précision** : tracking en temps réel pendant les duels
echo * **Algorithme intelligent** : calcul de points équidistants accessibles
echo * **Sécurité** : position visible uniquement en duel actif
echo * **Anti-triche** : détection de vitesse anormale et validation communautaire
echo * **Optimisation batterie** : mode économie d'énergie
echo.
echo ---
echo.
echo ### 🟦 Slide 14 – Cible
echo.
echo **Qui utilise GeoRace ?**
echo.
echo * 🏃‍♂️ **Coureurs réguliers** : cherchent à améliorer leurs performances
echo * 👟 **Coureurs occasionnels** : ont besoin de motivation pour rester réguliers
echo * 🏅 **Coureurs compétitifs** : veulent tester leur niveau entre les courses officielles
echo * 👥 **Nouveaux coureurs** : cherchent une communauté motivante
echo.
echo ---
echo.
echo ### 🟦 Slide 15 – Différenciation vs concurrents
echo.
echo **Ce que les autres apps ne font pas :**
echo.
echo * **Strava** → réseau social, pas de compétition temps réel
echo * **Nike Run Club** → tracking + défis asynchrones
echo * **Runkeeper** → GPS basique sans interaction
echo.
echo **GeoRace combine :**
echo.
echo ^> Duels spontanés en temps réel + Point d'arrivée équitable + Matchmaking ELO
echo.
echo **= Concept unique sur le marché**
echo.
echo ---
echo.
echo ### 🟦 Slide 16 – Modèle économique
echo.
echo **Freemium avec valeur ajoutée**
echo.
echo **Gratuit :**
echo * 3 duels par jour
echo * Classement ELO
echo * Statistiques de base
echo * Événements communautaires
echo.
echo **Premium (4,99€/mois^) :**
echo * Duels illimités
echo * Statistiques avancées
echo * Personnalisation profil
echo * Mode entraînement contre vos records
echo * Pas de publicités
echo.
echo **Revenus additionnels :**
echo * Partenariats marques (Nike, Adidas^)
echo * Événements premium avec prix
echo.
echo ---
echo.
echo ### 🟦 Slide 17 – Roadmap
echo.
echo **Déploiement progressif**
echo.
echo **Phase 1 (6 mois^) - MVP**
echo * Duels 1v1 en temps réel
echo * Système ELO
echo * Test dans 2-3 villes pilotes
echo * **Objectif : 500 utilisateurs actifs**
echo.
echo **Phase 2 (12 mois^) - Gamification**
echo * Badges, statistiques, profils
echo * Événements communautaires
echo * **Objectif : 5 000 utilisateurs**
echo.
echo **Phase 3 (24 mois^) - Scale**
echo * Version Premium
echo * Duels multi-joueurs
echo * Expansion nationale
echo * **Objectif : 50 000 utilisateurs**
echo.
echo ---
echo.
echo ### 🟦 Slide 18 – Défis ^& Solutions
echo.
echo **Anticiper les obstacles**
echo.
echo **Défi : Sécurité des coureurs**
echo → Alertes de sécurité, mode "course prudente"
echo.
echo **Défi : Zones rurales (peu d'utilisateurs^)**
echo → Mode asynchrone contre "ghost runners"
echo.
echo **Défi : Triche (vélo, voiture^)**
echo → Détection vitesse anormale + validation communautaire
echo.
echo **Défi : Vie privée**
echo → Position visible uniquement en duel, blocage d'utilisateurs
echo.
echo ---
echo.
echo ### 🟦 Slide 19 – Vision
echo.
echo ^> GeoRace ne se contente pas de tracker vos courses.
echo ^> Nous transformons la course à pied en une **expérience sociale, compétitive et motivante** accessible à tous, partout, à tout moment.
echo.
echo **Notre ambition :**
echo Devenir la référence de la course compétitive en temps réel et créer une communauté mondiale de coureurs passionnés par le défi.
echo.
echo ---
echo.
echo ### 🟦 Slide 20 – Phrase finale
echo.
echo **GeoRace**
echo.
echo ^> Chaque course est un duel.
echo ^> Chaque duel est une opportunité.
echo ^> Transformez votre motivation.
echo.
echo **Prêt à relever le défi ?**
) > "%OUTDIR%\GeoRace_ppt.md"
goto :GENERATE

:ENGLISH
(
echo ### 🟦 Slide 1 – Title
echo.
echo **GeoRace**
echo.
echo ^> The real-time competitive running app
echo.
echo **Subtitle:**
echo Turn every run into an exciting duel.
echo.
echo ---
echo.
echo ### 🟦 Slide 2 – Problem
echo.
echo **Running alone, declining motivation**
echo.
echo * Many runners feel demotivated when running alone
echo * Lack of challenge and interaction
echo * Difficulty measuring progress against others
echo * Risk of abandoning fitness goals
echo.
echo ➡ Result: monotony, loss of motivation, practice abandonment
echo.
echo ---
echo.
echo ### 🟦 Slide 3 – Our differentiators
echo.
echo **What makes GeoRace unique**
echo.
echo * **Real-time duel to an equidistant finish point** → guaranteed fairness between runners
echo * **ELO Matchmaking** → opponents of comparable level, visible progression
echo * **Live GPS ^& synchronized tracking** → immediate competitive experience
echo * **Privacy and security** → position sharing limited to active duels
echo * **Integrated anti-cheat** (GPS anomaly detection, route verification^)
echo * **Social features** → profiles, chat, badges, local leaderboards
echo.
echo ---
echo.
echo ### 🟦 Slide 4 – Why users will join us
echo.
echo **Reasons to switch to GeoRace**
echo.
echo * **Unique and fair duel experience** = more fun and challenge
echo * **Visible progression (ELO^)** = motivation to return
echo * **Local events ^& tournaments** = social opportunities and rewards
echo * **Easy friend transfer** via invitations and immediate duels
echo.
echo ---
echo.
echo ### 🟦 Slide 5 – Acquisition strategy (how to steal users from competitors^)
echo.
echo **Concrete tactics to attract users**
echo.
echo * **Local targeting**: organize micro-events and challenges in parks and campuses
echo * **Partnerships** with running clubs, coaches, local influencers
echo * **Integrations ^& entry point**: simplified import from Strava/Runkeeper + friend import
echo * **Incentive programs**: free duels/initial ELO bonus, rewards, exclusive badges
echo * **Social media campaigns** showing live duels + user stories
echo * **Differentiating features in onboarding** (30s duel demonstration^)
echo.
echo ---
echo.
echo ### 🟦 Slide 6 – Innovative concept: Duel mode
echo.
echo **Real-time duels for everyone**
echo.
echo 🏃 **REAL-TIME DUELS**
echo Face other nearby runners in spontaneous races
echo.
echo 📍 **FAIR FINISH POINT**
echo Each duel ends at an equidistant point for all participants
echo.
echo ⚖️ **FAIR COMPETITION**
echo ELO system ensures balanced matches regardless of your level
echo.
echo ---
echo.
echo ### 🟦 Slide 7 – How a duel works
echo.
echo **3 simple steps**
echo.
echo **01 - RUNNER DETECTION**
echo Automatic identification of active runners nearby
echo.
echo **02 - FAIR FINISH POINT**
echo Algorithmic calculation of a point accessible at equal distance for all
echo.
echo **03 - SIMULTANEOUS START**
echo Synchronized countdown after mutual acceptance
echo.
echo ---
echo.
echo ### 🟦 Slide 8 – A GeoRace duel
echo.
echo **Typical scenario:**
echo.
echo 1. **You start your run** → the app detects 3 runners within 800m
echo 2. **Duel proposal** → notification "Paul (ELO 1420^) challenges you"
echo 3. **You accept** → the system calculates a finish point at 1.2km for each
echo 4. **Start in 10 seconds** → countdown
echo 5. **Live race** → GPS guides you, opponent's position visible
echo 6. **Finish** → +25 ELO, badge "5 consecutive victories" unlocked
echo.
echo ---
echo.
echo ### 🟦 Slide 9 – Quick demo (key points for presentation^)
echo.
echo **Presentation script - Key points to emphasize**
echo.
echo * **Equidistant finish point**: "Each runner covers exactly the same distance - total fairness"
echo * **ELO Matchmaking**: "You always face someone at your level - neither too easy nor impossible"
echo * **Real-time duel**: "No after-the-fact comparison - it's a real race, now"
echo * **Security and privacy**: "Your position is only visible during active duels"
echo * **Anti-cheat**: "Automatic GPS anomaly detection - no cheaters"
echo * **Social engagement**: "Profiles, chat, badges, local tournaments - a real community"
echo.
echo **Key message**: Fair real-time dueling changes everything - it's no longer tracking, it's competition!
echo.
echo ---
echo.
echo ### 🟦 Slide 10 – Social aspect
echo.
echo **Build a runner community**
echo.
echo **01 - BALANCED MATCHMAKING**
echo Automatic connection between runners of similar levels through ELO
echo.
echo **02 - DISCUSSION AND SHARING**
echo Live chat, friend adding, detailed profiles with statistics
echo.
echo **03 - COMMUNITY EVENTS**
echo Organized races, collective challenges, local leagues by city/neighborhood
echo.
echo ---
echo.
echo ### 🟦 Slide 11 – ELO ranking system
echo.
echo **Fair competition and motivating progression**
echo.
echo **01 - BALANCED MATCHES**
echo ELO algorithm pairs you with runners of similar level
echo.
echo **02 - VISIBLE PROGRESSION**
echo Track your rise in rankings (Bronze → Silver → Gold → Platinum^)
echo.
echo **03 - REWARDS AND BADGES**
echo Unlock achievements at each level reached
echo.
echo ---
echo.
echo ### 🟦 Slide 12 – GeoRace benefits
echo.
echo **More than a running app**
echo.
echo **01 - INCREASED MOTIVATION**
echo Each outing becomes a concrete and exciting challenge
echo.
echo **02 - PERFORMANCE IMPROVEMENT**
echo Competition naturally pushes self-improvement
echo.
echo **03 - SOCIAL WELL-BEING**
echo Meet and interact with other passionate runners
echo.
echo ---
echo.
echo ### 🟦 Slide 13 – Key features
echo.
echo **Technology serving performance**
echo.
echo * **High-precision GPS**: real-time tracking during duels
echo * **Intelligent algorithm**: calculation of accessible equidistant points
echo * **Security**: position visible only during active duel
echo * **Anti-cheat**: abnormal speed detection and community validation
echo * **Battery optimization**: energy-saving mode
echo.
echo ---
echo.
echo ### 🟦 Slide 14 – Target audience
echo.
echo **Who uses GeoRace?**
echo.
echo * 🏃‍♂️ **Regular runners**: seeking to improve their performance
echo * 👟 **Occasional runners**: need motivation to stay consistent
echo * 🏅 **Competitive runners**: want to test their level between official races
echo * 👥 **New runners**: looking for a motivating community
echo.
echo ---
echo.
echo ### 🟦 Slide 15 – Differentiation vs competitors
echo.
echo **What other apps don't do:**
echo.
echo * **Strava** → social network, no real-time competition
echo * **Nike Run Club** → tracking + asynchronous challenges
echo * **Runkeeper** → basic GPS without interaction
echo.
echo **GeoRace combines:**
echo.
echo ^> Spontaneous real-time duels + Fair finish point + ELO Matchmaking
echo.
echo **= Unique concept in the market**
echo.
echo ---
echo.
echo ### 🟦 Slide 16 – Business model
echo.
echo **Freemium with added value**
echo.
echo **Free:**
echo * 3 duels per day
echo * ELO ranking
echo * Basic statistics
echo * Community events
echo.
echo **Premium (€4.99/month^):**
echo * Unlimited duels
echo * Advanced statistics
echo * Profile customization
echo * Training mode against your records
echo * No ads
echo.
echo **Additional revenues:**
echo * Brand partnerships (Nike, Adidas^)
echo * Premium events with prizes
echo.
echo ---
echo.
echo ### 🟦 Slide 17 – Roadmap
echo.
echo **Progressive deployment**
echo.
echo **Phase 1 (6 months^) - MVP**
echo * 1v1 real-time duels
echo * ELO system
echo * Test in 2-3 pilot cities
echo * **Goal: 500 active users**
echo.
echo **Phase 2 (12 months^) - Gamification**
echo * Badges, statistics, profiles
echo * Community events
echo * **Goal: 5,000 users**
echo.
echo **Phase 3 (24 months^) - Scale**
echo * Premium version
echo * Multi-player duels
echo * National expansion
echo * **Goal: 50,000 users**
echo.
echo ---
echo.
echo ### 🟦 Slide 18 – Challenges ^& Solutions
echo.
echo **Anticipating obstacles**
echo.
echo **Challenge: Runner safety**
echo → Safety alerts, "cautious race" mode
echo.
echo **Challenge: Rural areas (few users^)**
echo → Asynchronous mode against "ghost runners"
echo.
echo **Challenge: Cheating (bike, car^)**
echo → Abnormal speed detection + community validation
echo.
echo **Challenge: Privacy**
echo → Position visible only during duel, user blocking
echo.
echo ---
echo.
echo ### 🟦 Slide 19 – Vision
echo.
echo ^> GeoRace doesn't just track your runs.
echo ^> We transform running into a **social, competitive, and motivating experience** accessible to everyone, everywhere, anytime.
echo.
echo **Our ambition:**
echo Become the reference for real-time competitive running and create a global community of runners passionate about challenges.
echo.
echo ---
echo.
echo ### 🟦 Slide 20 – Final message
echo.
echo **GeoRace**
echo.
echo ^> Every run is a duel.
echo ^> Every duel is an opportunity.
echo ^> Transform your motivation.
echo.
echo **Ready to take on the challenge?**
) > "%OUTDIR%\GeoRace_ppt.md"
goto :GENERATE

:GENERATE
echo Fichier markdown créé: GeoRace_ppt.md

REM Vérifier si pandoc est disponible
where pandoc >nul 2>&1
if %errorlevel% equ 0 (
    echo Conversion en PPTX avec pandoc...
    pandoc -M title="GeoRace" -M author="%AUTHOR%" -f markdown -t pptx -o "GeoRace_presentation.pptx" "%OUTDIR%\GeoRace_ppt.md"
    
    if exist "GeoRace_presentation.pptx" (
        echo ✅ Présentation générée: GeoRace_presentation.pptx
    ) else (
        echo ❌ Erreur lors de la génération du PPTX
        exit /b 1
    )
) else (
    echo ⚠️  pandoc n'est pas installé. Veuillez installer pandoc pour générer le PPTX.
    echo    Installation: téléchargez depuis https://pandoc.org/installing.html
    exit /b 1
)

echo ✅ Terminé!
endlocal
