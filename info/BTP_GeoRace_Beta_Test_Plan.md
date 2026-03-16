# BETA TEST PLAN (BTP) — GeoRace
**Date :** 2026-03-16  
**Repo :** TLX542/GeoRace  
**Version :** v1.0  
**Objectif :** définir le **scope exact** démontrable en Greenlight / beta, organisé par flow utilisateur, avec critères de succès mesurables.

> Important : cette BTP liste UNIQUEMENT les fonctionnalités qui seront effectivement disponibles en beta. Tout le reste est hors-scope.

---

## 1) Contexte projet (beta)

GeoRace est une application mobile de running compétitive centrée sur la **Ghost Race asynchrone** : l’utilisateur court contre le “fantôme” (replay) d’un autre coureur, affiché en temps réel sur une carte, avec un indicateur d’avance/retard.

La beta vise à prouver :
- que l’expérience “ghost race” est **fun, compréhensible et stable**,
- que le “résultat” est clair,
- que le parcours est suffisamment fluide pour être testé par des utilisateurs réels,
- que l’équipe sait **mesurer et itérer**.

---

## 2) Table des rôles utilisateur (beta)

| Rôle | Description | Objectif principal |
|---|---|---|
| **R-01 Testeur beta (Runner)** | Utilisateur final (runner débutant à confirmé) qui réalise des sessions de test | Vivre 1–3 ghost races, donner feedback structuré |
| **R-02 Admin/Équipe GeoRace** | Équipe projet (support, tri bugs, analyse feedback) | Onboarder, collecter, prioriser, itérer |

---

## 3) Table des fonctionnalités (scope beta) — organisée par flow

### Flow A — Onboarding & démarrage
| Feature ID | Rôle | Nom (verbe) | Description courte |
|---|---|---|---|
| **F-BETA-001** | R-01 | **Accepter les permissions localisation** | Demander et valider les permissions nécessaires au tracking GPS (message clair + fallback si refus) |
| **F-BETA-002** | R-01 | **Lancer une Ghost Race** | Démarrer une session de course avec un ghost sélectionné (beta : ghost de référence / matching simple) |

### Flow B — Course en cours (expérience centrale)
| Feature ID | Rôle | Nom (verbe) | Description courte |
|---|---|---|---|
| **F-BETA-003** | R-01 | **Visualiser la carte et la trajectoire** | Afficher la carte + la polyline du ghost + position utilisateur |
| **F-BETA-004** | R-01 | **Afficher l’avance/retard** | Indiquer en temps réel si l’utilisateur est devant/derrière (UI compréhensible) |
| **F-BETA-005** | R-01 | **Terminer une session** | Finir la course proprement, générer un résumé (distance, durée) |

### Flow C — Résultat & historique
| Feature ID | Rôle | Nom (verbe) | Description courte |
|---|---|---|---|
| **F-BETA-006** | R-01 | **Afficher un résultat de duel** | Donner un résultat (victoire/défaite) basé sur le ghost + un récap clair |
| **F-BETA-007** | R-01 | **Consulter l’historique local** | Afficher une liste simple des runs récents (beta : stockage local acceptable) |

### Flow D — Feedback beta (indispensable Solution Track)
| Feature ID | Rôle | Nom (verbe) | Description courte |
|---|---|---|---|
| **F-BETA-008** | R-01 | **Soumettre un feedback structuré** | L’utilisateur envoie un feedback (form) lié à une session (UX + bugs + ressenti) |
| **F-BETA-009** | R-02 | **Consolider les feedbacks** | L’équipe consolide en tableau : thèmes, fréquence, sévérité, décisions |

> Hors-scope explicite (beta v1) : ELO complet, matchmaking avancé, backend prod, duels live, anti‑triche avancée. (Peuvent exister en “mock” ou “prototype”, mais non exigés si non démontrables.)

---

## 4) Table des critères de succès (mesurables) + résultats

> Pendant la beta, vous remplirez la colonne “Résultat atteint” avec preuves (captures/notes).

| Feature ID | Critère de succès clé | Indicateur / métrique | Résultat atteint |
|---|---|---|---|
| F-BETA-001 | Les permissions localisation sont gérées sans bloquer l’utilisateur | 10 essais, 0 blocage ; message d’erreur si refus | À remplir |
| F-BETA-002 | Une Ghost Race démarre en moins de 10 secondes (hors GPS) | Temps médian start < 10s sur 5 devices | À remplir |
| F-BETA-003 | La carte + trajectoire ghost s’affichent sans crash | 20 lancements, 0 crash ; 0 écran blanc | À remplir |
| F-BETA-004 | L’utilisateur comprend l’avance/retard sans explication externe | 5 tests : ≥4/5 comprennent en < 30s | À remplir |
| F-BETA-005 | La session se termine proprement et génère un résumé | 20 fins de run, 0 perte totale ; résumé non vide | À remplir |
| F-BETA-006 | Le résultat est clair et cohérent avec l’avance/retard | 5 tests : ≥4/5 jugent “clair” ; cohérence vérifiée | À remplir |
| F-BETA-007 | L’historique local persiste après relance app | 10 relances, 0 perte historique | À remplir |
| F-BETA-008 | Le feedback est simple à envoyer et exploitable | Taux de complétion form > 60% ; champs remplis | À remplir |
| F-BETA-009 | Les feedbacks influencent le backlog de manière traçable | 2 itérations documentées (dit → fait) | À remplir |

---

## 5) Organisation des tests (beta)

### 5.1 Panel minimum
- **20 beta testeurs identifiés**
- **≥ 10 actifs** (au moins 1 session)
- **≥ 5 tests utilisateurs “observés”** (proto ou V1)

### 5.2 Scénarios de test (exemples)
- **S1 — Run normal (parc)** : démarrer → courir 10–15 min → terminer → feedback
- **S2 — Run urbain (GPS instable)** : observer stabilité + ressenti
- **S3 — Débutant** : compréhension de l’UI sans guidance
- **S4 — Re-run** : 2e session (effet motivation)

### 5.3 Preuves à archiver (pour jury)
- Captures/vidéos (si possible) sur 2 devices différents
- Table de feedback consolidée + décisions
- Comparatif UI (avant/après itérations)
- Synthèse (top 5 problèmes + actions)

-- Fin.