# GeoRace - Besoins Clients & Périmètre Fonctionnel

> **Epitech Innovation Track**

---

> **Vision mise à jour :**
> - ~~Duel live = cœur du produit~~
> - **Ghost compétitif = cœur MVP**
> - Duel live = extension premium / évolution
>
> La vision reste : **Transformer la course en compétition.**
> Mais le moyen principal devient : **Affronter une performance réelle, même seul.**

---

## 1. Personas

### Persona 1 - Marie, 32 ans

**Profil :**
- Cadre dynamique
- Court 3 à 4 fois par semaine
- Utilise Strava depuis 6 mois
- Objectif : progresser et rester motivée

**Comportement :**
- Suit ses statistiques
- Compare ses temps aux segments
- Aime les classements

**Frustrations :**
- Compare des chiffres, pas des adversaires réels
- Aucun vrai duel
- Motivation qui baisse après quelques semaines
- Pas d'adrénaline

**Besoins profonds :**
- Ressentir une vraie compétition
- Avoir un objectif concret à chaque sortie
- Mesurer sa progression face à des humains
- Être challengée par des coureurs de son niveau

---

### Persona 2 - Lucas, 24 ans

**Profil :**
- Étudiant
- Court 2-3 fois par semaine
- Sportif compétitif (jeux vidéo, sport collectif)
- Très sensible aux classements et à la gamification

**Comportement :**
- Aime les systèmes de ranking
- Veut « monter de niveau »
- Cherche du fun plus que de la performance pure

**Frustrations :**
- Courir seul est monotone
- Les apps actuelles sont passives
- Pas d'interaction en temps réel

**Besoins profonds :**
- Adrénaline
- Feedback immédiat
- Système de progression clair
- Interaction sociale, même si seul

---

### Persona 3 - Emma, 29 ans

**Profil :**
- Coureuse régulière
- Participe à des courses officielles
- Utilise Nike Run Club

**Comportement :**
- S'entraîne sérieusement
- Analyse ses performances
- Cherche des adversaires à son niveau

**Frustrations :**
- Les défis sont asynchrones
- Difficulté à trouver des partenaires de même niveau
- Les courses officielles nécessitent organisation et déplacement

**Besoins profonds :**
- Tester son niveau régulièrement
- S'entraîner dans des conditions compétitives
- Trouver facilement des adversaires équitables

---

## 2. User Stories

### Mode Asynchrone (Ghost Mode)

- En tant que coureur en zone peu dense, je veux affronter le fantôme d'un autre coureur afin de ne jamais courir seul.
- En tant qu'utilisateur, je veux rejouer contre une performance passée afin de m'améliorer.
- En tant qu'utilisateur, je veux voir un avatar fantôme en temps réel afin de ressentir la compétition.
- En tant que compétiteur, je veux que le système me propose un adversaire de mon niveau automatiquement.
- En tant que joueur, je veux que mon ELO évolue après chaque ghost race.

### Duels Temps Réel

- En tant que coureuse régulière, je veux détecter des coureurs proches de moi afin de pouvoir les défier immédiatement.
- En tant qu'utilisatrice compétitive, je veux un départ synchronisé afin que la course soit équitable.
- En tant que participante à un duel, je veux voir la position de mon adversaire en temps réel afin de ressentir la pression compétitive.
- En tant qu'utilisatrice, je veux un point d'arrivée équidistant afin que personne ne soit avantagé.
- En tant qu'utilisateur, je veux pouvoir créer un duel live lorsqu'un adversaire est disponible.

### Système ELO & Matchmaking

- En tant que coureur, je veux un score ELO afin de mesurer mon niveau réel.
- En tant qu'utilisateur, je veux affronter des adversaires proches de mon ELO afin que les courses soient équilibrées.
- En tant que joueur compétitif, je veux gagner plus de points contre un adversaire plus fort afin que les victoires difficiles soient valorisées.

### Social & Communauté

- En tant qu'utilisateur, je veux ajouter des amis afin de pouvoir les défier directement.
- En tant que compétiteur, je veux voir les classements locaux afin de me situer dans ma ville.
- En tant que participant, je veux discuter avant/après un duel afin de créer une interaction sociale réelle.

### Sécurité & Équité

- En tant qu'utilisateur, je veux que la position ne soit visible que pendant un duel actif afin de protéger ma vie privée.
- En tant que coureur honnête, je veux que la triche soit détectée afin que le classement reste crédible.
- En tant qu'utilisateur, je veux pouvoir bloquer quelqu'un afin d'éviter le harcèlement.

---

## 3. Product Backlog

Liste consolidée des fonctionnalités identifiées :

- Détection des coureurs à proximité
- Calcul du point équidistant
- Départ synchronisé
- Tracking GPS temps réel
- Système ELO
- Matchmaking intelligent
- Ghost Mode
- Profils utilisateurs
- Classements locaux
- Chat
- Badges & achievements
- Anti-triche GPS
- Paramètres de confidentialité
- Mode premium

---

## 4. Priorisation - Méthode MoSCoW

### MUST HAVE - PoC 2 semaines

Ce sans quoi GeoRace ne peut pas être testé :

- GPS Tracking en temps réel (enregistrement du run)
- Sauvegarde locale du run sur l'appareil
- Ghost Replay (rejouer sa propre course après la fin)
- 1 ghost dummy pré-intégré (run hardcodé)
- Indicateur d'avance/retard face au ghost dummy en temps réel

---

### SHOULD HAVE - MVP Phase 2 (Mois 1-6)

- Authentification (OAuth + email)
- Upload de runs vers un backend
- Ghost Matching Engine (ELO basique)
- Système ELO fonctionnel
- Anti-triche simple
- Leaderboard
- Profils détaillés
- Notifications intelligentes
- Historique des duels

---

### COULD HAVE - V2 (Mois 7-12)

- Détection des coureurs proches
- Départ synchronisé (duel live)
- Calcul du point équidistant
- Classements locaux
- Badges & achievements
- Ajout d'amis
- Duels multi-joueurs (3-5 coureurs)
- Ligues locales
- Tournois saisonniers
- Intégration montres connectées
- Multiplicateurs ELO
- Système de saisons

---

### WON'T HAVE - Pour l'instant

- Coaching personnalisé avancé
- Plans d'entraînement détaillés
- Réseau social photo type Instagram
- Marketplace équipement
- ~~Certificat médical / justificatif d'identité~~ **(retiré définitivement du scope)**

> GeoRace reste focalisé sur la compétition asynchrone immersive.

---

## 5. Early Adopters & Ambassadeurs

### Cibles prioritaires

- Membres de clubs running locaux
- Coureurs réguliers qui courent seuls
- Utilisateurs actifs Strava (3+ sorties/semaine)
- Étudiants sportifs
- Participants à semi-marathons / 10km

### Stratégie d'acquisition

1. Tests en ville pilote (Paris)
2. Recrutement de 20-50 coureurs compétitifs
3. Organisation d'un mini tournoi ghost local
4. Recueil de témoignages vidéo
5. Création d'ambassadeurs

---

## 6. MVP Clair

### PoC (2 semaines)

> ✔ GPS tracking local
> ✔ Ghost replay de sa propre course
> ✔ 1 ghost dummy hardcodé
> ✔ Course contre le ghost dummy
> ✔ 0 backend - 0 auth - 0 ELO - 0 serveur

**Objectif :**
- Valider que la mécanique Ghost Race est engageante
- Obtenir des retours utilisateurs sur la sensation de compétition
- Décider si on investit dans le vrai MVP backend (Phase 2)

### MVP Phase 2 (Mois 1-6)

> ✔ ELO fonctionnel
> ✔ Ghost mode avec matching réel
> ✔ Anti-triche simple
> ✔ 1-2 villes pilotes
> ✔ 500 utilisateurs actifs

**Objectif :**
- Valider l'engagement à grande échelle
- Mesurer la rétention (cible : J7 > 40%)
- Obtenir des retours utilisateurs sur le matchmaking

---

*Document réalisé dans le cadre du projet GeoRace - Epitech Innovation Track*
