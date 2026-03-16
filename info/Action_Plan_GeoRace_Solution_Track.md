# ACTION PLAN — GeoRace (Solution Track)
**Date :** 2026-03-16  
**Repo :** TLX542/GeoRace  
**Track :** Solution Track (EIP)  
**Produit :** Application mobile de running compétitive : **Ghost Race asynchrone** (cœur) + **ELO** + **anti‑triche** + **communauté** (+ module duel live en secondaire)

---

## 1) Contexte

### 1.1 Problème
La course à pied en solo entraîne souvent :
- une **démotivation** (absence d’adversaire / d’enjeu),
- un **manque de défi concret**,
- une difficulté à **mesurer ses progrès** d’une manière motivante,
- peu / pas d’**interaction compétitive** pendant l’entraînement.

Les applications actuelles (tracking social, stats, segments) mesurent très bien, mais ne transforment pas systématiquement une sortie en **compétition simple et accessible**.

### 1.2 Solution (proposition de valeur)
**GeoRace** transforme chaque run en compétition grâce à une **Ghost Race asynchrone** :
- l’utilisateur court quand il veut,
- l’app choisit un “ghost” pertinent (même niveau, distance comparable),
- le ghost est rejoué sur la carte en temps réel,
- l’utilisateur voit son avance/retard,
- un résultat est calculé et l’**ELO** est mis à jour,
- une **validation anti‑triche** protège l’équité.

> Positionnement : “Strava dit combien tu as couru. GeoRace dit si tu as gagné.”

### 1.3 Objectifs (succès produit)
Objectifs mesurables (cibles de pilotage) :
- **Engagement** : ghost races / semaine / utilisateur = 5–8
- **Rétention** : J7 > 40%
- **Croissance** : +20% mensuel (via communauté + défis)
- **Qualité** : stabilité tracking GPS, latence acceptable, peu de faux positifs anti‑triche

### 1.4 Périmètre du projet (vision vs phases)
- **Core** : Ghost Race asynchrone + ELO + matching + anti‑triche.
- **Secondaire (V2)** : Duel live temps réel (WebSocket), ��vénements avancés, gamification profonde, premium.

Roadmap indicative (à adapter à ton calendrier EIP) :
- **PoC (2 semaines)** : valider l’expérience “ghost” + mesure satisfaction
- **MVP (1–6 mois)** : matching + ELO + anti‑triche + base communauté + beta structurée
- **V2 (7–12 mois)** : duels live + badges + événements + scaling
- **Scale (an 2)** : premium + tournois + partenariats

---

## 2) Spécifications techniques (ce que le produit doit faire)

> Format volontairement “user stories + exigences”, orienté livrables démontrables.

### 2.1 Personas (résumé)
**P1 — Runner régulier (2–4 runs/sem)**  
Motivation : progresser, objectifs concrets.  
Freins : s’ennuie seul, veut un défi simple.  
Canaux : Strava, Instagram, Discord running, clubs locaux.

**P2 — Runner compétiteur (5+ runs/sem)**  
Motivation : se comparer, classement, performance.  
Freins : “fairness” (triche), fiabilité GPS.  
Canaux : communautés running, clubs, événements, forums.

**P3 — Runner débutant (0–2 runs/sem)**  
Motivation : se motiver, gamification, guidance.  
Freins : peur du jugement, complexité, sur‑compétition.  
Canaux : TikTok, Instagram, apps bien‑être.

### 2.2 Parcours utilisateur cible (MVP — Ghost Race)
1) Onboarding + consentement localisation  
2) Choix d’un mode : Ghost Race  
3) Démarrer la session : tracking GPS + UI claire  
4) Visualiser le ghost (carte + indicateur avance/retard)  
5) Arrivée : résultat + ELO + résumé  
6) Upload + validation (anti‑triche)  
7) Historique + partage (option) + appel à feedback

### 2.3 User stories “MVP” (extraits)
- **US-MVP-001** : En tant qu’utilisateur, je peux **créer un compte / me connecter** (ou mode invité PoC), pour retrouver mes runs.
- **US-MVP-002** : Je peux **enregistrer un run** (distance, durée, trace GPS), sans perte majeure de données.
- **US-MVP-003** : Après un run, je peux **affronter un ghost** choisi automatiquement (matching).
- **US-MVP-004** : Pendant la course, je vois un **indicateur avance/retard** compréhensible.
- **US-MVP-005** : À la fin, je reçois un **résultat** (victoire/défaite) et une **mise à jour ELO**.
- **US-MVP-006** : Le système **refuse/flag** un run suspect (anti‑triche) avant de l’ajouter au pool de ghosts.
- **US-MVP-007** : Je peux consulter **mon historique** et ma progression (ELO, stats basiques).
- **US-MVP-008** : Je peux **rejoindre la communauté** (Discord) et participer à une beta structurée.

### 2.4 Exigences non fonctionnelles (MVP)
- **Latence UX** (affichage / mise à jour) acceptable ; pas de freeze.
- **Consommation batterie** maîtrisée sur sessions 30 min.
- **Précision** : gestion des “GPS jumps”, smoothing minimal.
- **Accessibilité** : tailles de cibles, contraste, labels lecteurs d’écran (checklist A11Y).
- **RGPD** : consentement explicite, minimisation, politique de rétention (au moins documentée).

---

## 3) Spécifications non techniques (Solution Track)

### 3.1 Obligatoire #1 — Développer & retenir une communauté utilisateur

#### a) Personas & proposition de valeur communauté
**Proposition de valeur** : “Chaque sortie devient un duel, même seul : viens tester, influencer le produit, et accéder à des défis exclusifs.”

Segments ciblés (pour la beta) :
- Runners réguliers (priorité) : “motivation + progression”
- Compétiteurs (2e) : “fairness + ranking”
- Débutants (3e) : “fun + gamification légère”

#### b) Canaux (minimum 2) + identité
Canaux recommandés (choisir 2 minimum, idéalement 3) :
1. **Discord** (cœur beta + feedback + événements)
2. **Instagram** ou **TikTok** (acquisition + démonstrations courtes)
3. **LinkedIn** (crédibilité projet, partenariats, suivi EIP) — optionnel

Identité :
- Nom : GeoRace
- Ton : énergique, compétitif mais bienveillant (“compète contre toi-même + les autres”)
- Cadence : 2 posts/semaine minimum (social), + 2 annonces/sem sur Discord

#### c) Plan éditorial (8 semaines initiales)
Formats à alterner :
- Démo (ghost sur la carte)
- “Devlog” (progrès / coulisses)
- Challenge hebdo (ex : “Ghost 3km”)
- Sondage (UX : lisibilité avance/retard)
- Témoignage bêta (1 phrase + capture)
Objectif par format :
- Awareness (démo), engagement (sondages), conversion (inscription beta), feedback (forms)

#### d) Recrutement beta (objectif : 20 testeurs actifs)
Stratégie :
- Call-to-action public (réseaux)
- Outreach clubs running locaux + groupes Facebook/Discord
- “friend-of-friend” mais avec onboarding et suivi

Parcours beta :
1) Inscription (form)  
2) Onboarding Discord + règles + consentement test  
3) Test #1 (scénario guidé)  
4) Feedback structuré (form + discussion)  
5) Itération + annonce “ce qu’on a changé”

Incentives :
- Badge “Founding Runner”
- Accès anticipé aux features
- Mise en avant hebdomadaire (top feedback)

#### e) Mesure & rétention
Dashboard minimal (hebdo) :
- membres Discord, actifs / semaine
- messages / jour
- taux de complétion test
- bugs majeurs
- top 5 insights
Boucle : insight → décision → roadmap → retour public (“dit & fait”)

**Livrables attendus** :
- Persona sheets
- Liens canaux
- Planning éditorial
- Captures de posts
- Dashboard activité
- Liste beta testeurs actifs
- Synthèse feedback + actions prises

---

### 3.2 Obligatoire #2 — Améliorer l’expérience utilisateur (UX/UI)

Process UX (cadre simple mais démontrable) :
1) Hypothèses (où l’utilisateur décroche)
2) Scénarios d’usage (run normal, run en ville GPS instable, débutant)
3) User Journey + points de friction
4) Prototype hi-fi (Figma)
5) 5 tests utilisateurs minimum
6) 2 itérations significatives documentées

Cibles UX (MVP) :
- Lancement run “sans stress” (permissions + start clair)
- Compréhension de l’avance/retard (feedback visuel)
- Fin de run : résultat + ELO lisible
- Accessibilité minimale (contraste, tailles, labels)

**Livrables attendus** :
- Experience map illustrée
- Figma (wireframes → hi-fi)
- Scénarios + grille d’observation
- Synthèse tests + backlog UX
- Comparatif v1/v2

---

### 3.3 Optionnels (Solution Track) — choix recommandé : 2 objectifs

#### Optionnel A — Optimiser la relation avec l’audience (feedback system)
Pourquoi : c’est directement aligné avec la beta + le jury.
- Mettre en place un rituel mensuel : “Bêta Review”
- Table de synthèse : verbatims, thèmes, fréquence, décision
- 2 évolutions produit justifiées par feedback récurrent
- Publication “dit & fait” sur Discord / réseaux

#### Optionnel B — Partenariats stratégiques
Pourquoi : accélère acquisition + crédibilité + test terrain.
Cibles (2–3) :
- Club running local / association sportive (accès testeurs)
- Magasin sport (Decathlon local) ou coach indépendant (expertise + audience)
- Événement running local (visibilité + tests)
Livrables :
- Partner map + emails + traces échanges
- 1 collaboration formalisée (même simple mail récap)

---

## 4) Planning (timeline type) + jalons

> À adapter à ton calendrier EIP exact. Ici je propose une timeline “12 semaines” pour structurer **Action Plan + BTP + communauté + UX**.

### Semaine 1–2 — Cadrage & setup
- Finaliser personas + proposition de valeur
- Ouvrir canaux (Discord + 1 réseau) + identité
- Mettre en place GitHub Project + templates issues
- Préparer BTP v1 (scope beta)
- Figma : v0 des écrans clés

### Semaine 3–4 — Acquisition beta + prototype
- Recruter 20 beta testeurs (inscrits) + onboarding
- Prototype hi-fi Figma + 5 tests utilisateurs
- Itération UX #1
- Définir métriques & dashboard

### Semaine 5–8 — Beta V1 (fonctionnel)
- Implémenter scope beta (features démontrables)
- Exécuter tests BTP + renseigner résultats
- Anti‑triche MVP (heuristiques)
- Animation communauté (challenge hebdo + feedback)

### Semaine 9–12 — Stabilisation + itérations
- Itération UX #2 (fondée sur feedback)
- “Dit & fait” + release notes
- Synthèse beta + backlog final
- Partenariat (si choisi) + preuve

---

## 5) Annexes — “Definition of Done” (DoD) beta
Une feature “beta-ready” est :
- démontrable en défense,
- testée (critères de succès remplis),
- documentée (notes + captures),
- et reliée à un feedback/objectif utilisateur.

-- Fin.